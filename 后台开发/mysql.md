### 常用sql

```sql
# 索引相关
show index from table_name;
alter table table_name add index index_name(field1, field2);
alter table table_name drop index index_name;

# 分页 
# 两种查询方式是等价的，都是从表中的第1001条数据（包含第1001条）开始查，查出20条。
# 在没有索引的情况下，都需要扫描1020条数据，抛弃前1000条。
select * from table limit 1000,20;
select * from table limit 20 offset 1000;
```

### mysql索引

#### 索引原理

索引的目的是为了提高查询效率，原理是将随机事件变成顺序事件，总是通过同一种方式来锁定数据。

数据库也是一样，但显然要复杂许多，因为不仅面临着等值查询，还有范围查询(>、<、between、in)、模糊查询(like)、并集查询(or)等等。数据库应该选择怎么样的方式来应对所有的问题呢？我们回想字典的例子，能不能把数据分成段，然后分段查询呢？最简单的如果1000条数据，1到100分成第一段，101到200分成第二段，201到300分成第三段……这样查第250条数据，只要找第三段就可以了，一下子去除了90%的无效数据。但如果是1千万的记录呢，分成几段比较好？稍有算法基础的同学会想到搜索树，其平均复杂度是lgN，具有不错的查询性能。但这里我们忽略了一个关键的问题，复杂度模型是基于每次相同的操作成本来考虑的，数据库实现比较复杂，数据保存在磁盘上，而为了提高性能，每次又可以把部分数据读入内存来计算，因为我们知道访问磁盘的成本大概是访问内存的十万倍左右，所以简单的搜索树难以满足复杂的应用场景。

#### 建索引的几大原则

1.最左前缀匹配原则，非常重要的原则，mysql会一直向右匹配直到遇到范围查询(>、<、between、like)就停止匹配，比如a = 1 and b = 2 and c > 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。

2.=和in可以乱序，比如a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，mysql的查询优化器会帮你优化成索引可以识别的形式。

3.尽量选择区分度高的列作为索引，区分度的公式是count(distinct col)/count(*)，表示字段不重复的比例，比例越大我们扫描的记录数越少，唯一键的区分度是1，而一些状态、性别字段可能在大数据面前区分度就是0，那可能有人会问，这个比例有什么经验值吗？使用场景不同，这个值也很难确定，一般需要join的字段我们都要求是0.1以上，即平均1条扫描10条记录。

4.索引列不能参与计算，保持列“干净”，比如from_unixtime(create_time) = ’2014-05-29’就不能使用到索引，原因很简单，b+树中存的都是数据表中的字段值，但进行检索时，需要把所有元素都应用函数才能比较，显然成本太大。所以语句应该写成create_time = unix_timestamp(’2014-05-29’)。

5.尽量的扩展索引，不要新建索引。比如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可。

6.索引字段不能太大，降低b+树的高度。

#### 慢查询优化基本步骤

0.先运行看看是否真的很慢，注意设置SQL_NO_CACHE
1.where条件单表查，锁定最小返回记录表。这句话的意思是把查询语句的where都应用到表中返回的记录数最小的表开始查起，单表每个字段分别查询，看哪个字段的区分度最高
2.explain查看执行计划，是否与1预期一致（从锁定记录较少的表开始查询）
3.order by limit 形式的sql语句让排序的表优先查
4.了解业务方使用场景
5.加索引时参照建索引的几大原则
6.观察结果，不符合预期继续从0分析

##### 辅助索引

辅助索引也称为二级索引，索引中除了存储索引列外，还存储了主键id，对于user_name的索引idx_user_name(user_name)而言，其实等价于idx_user_name(user_name, id)，MySQL会自动在辅助索引的最后添加上主键id，熟悉Oracle数据库的都知道，索引里除了索引列还存储了row_id（代表数据的物理位置，由四部分组成：对象编号+数据文件号+数据块号+数据行号）

##### 索引回表

加入已有索引idx_user_name(user_name, id)，如果只查询索引中的列，只需要扫描索引就能获取到所需数据，是不需要回表的，如下SQL语句：

```sql
# sql1 无需回表，id, user_name字段可直接通过索引查出来
select id, user_name from users where user_name = 'Laaa'; 
# sql2
select id from users where user_name = 'Laaa';

# sql1 和sql2 的执行计划中的Extra=Using index 表示使用覆盖索引扫描，不需要回表


# sql3 需要回表，user_id，phone不在索引字段
select user_id, user_name, phone from users where user_name = 'Laaa';
# sql3 相当于以下两个sql
select **id** from users where user_name = 'Laaa' //id = 100101
select user_id, user_name, phone from users where id = 100101;
```

#### 分页查询优化

业务要根据时间范围查询交易记录，接口原始的SQL如下：

```sql
select  * from trade_info where status = 0 and create_time >= '2020-10-01 00:00:00' and create_time <= '2020-10-07 23:59:59' order by id desc limit 102120, 20;
```

表trade_info上有索引idx_status_create_time(status,create_time)，通过上面分析知道，等价于索引（status,create_time,id)，对于典型的分页limit m, n来说，越往后翻页越慢，也就是m越大会越慢，因为要定位m位置需要扫描的数据越来越多，导致IO开销比较大，这里可以利用辅助索引的覆盖扫描来进行优化，先获取id，这一步就是索引覆盖扫描，不需要回表，然后通过id跟原表trade_info进行关联，可优化如下：

```sql
select  * from trade_info a, (select  * from trade_info where status = 0 and create_time >= '2020-10-01 00:00:00' and create_time <= '2020-10-07 23:59:59' order by id desc limit 102120, 20) b where a.id = b.id;
```

#### 批量大数据的处理，分块

在Oracle里更新500w数据是很快，因为可以利用多个cpu core去执行，但是MySQL就需要注意了，一个SQL只能使用一个cpu core去处理，*如果SQL很复杂或执行很慢，就会阻塞后面的SQL请求，造成活动连接数暴增，MySQL CPU 100%*，相应的接口Timeout，同时对于主从复制架构，而且做了业务读写分离，更新500w数据需要5分钟，Master上执行了5分钟，binlog传到了slave也需要执行5分钟，那就是Slave延迟5分钟，在这期间会造成业务脏数据，比如重复下单等。

优化思路：先获取where条件中的最小id和最大id，然后分批次去更新，每个批次1000条，这样既能快速完成更新，又能保证主从复制不会出现延迟。 laravel中可用 $query->chunk() 如下

```php
$query->chunk(100, function($eleOrders){
  foreach ($eleOrders as $eleOrder){
    
  }
});
```
#### 跳跃索引

一般情况下，如果表users有复合索引idx_status_create_time，我们都知道，单独用create_time去查询，MySQL优化器是不走索引，所以还需要再创建一个单列索引idx_create_time。用过Oracle的同学都知道，是可以走索引跳跃扫描（Index Skip Scan），在MySQL 8.0也实现Oracle类似的索引跳跃扫描，在优化器选项也可以看到skip_scan=on。

> | optimizer_switch             |use_invisible_indexes=off,skip_scan=on,hash_join=on |

适合复合索引前导列唯一值少，后导列唯一值多的情况，如果前导列唯一值变多了，则MySQL CBO不会选择索引跳跃扫描，取决于索引列的数据分表情况。

也可以通过optimizer_switch='skip_scan=off'来关闭索引跳跃扫描特性。


### 参考

- [MySQL索引原理及慢查询优化](https://tech.meituan.com/2014/06/30/mysql-index.html)
- [阿里面试官：MySQL如何设计索引更高效？](https://segmentfault.com/a/1190000038921156)