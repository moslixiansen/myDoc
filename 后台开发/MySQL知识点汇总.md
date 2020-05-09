
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [数据类型](#数据类型)
- [跨库事务](#跨库事务)
- [mysql 锁表解锁方法](#mysql-锁表解锁方法)
- [SQL语句中：UNION与UNION ALL的区别](#sql语句中union与union-all的区别)
- [常用sql](#常用sql)
- [laravel中的事务与锁](#laravel中的事务与锁)

<!-- /code_chunk_output -->

### 数据类型

- 符号 int的范围为 -(2^31) ~ 2^31 - 1
- 无符号 int的范围为 0 ~ 2^32 - 1,

### 跨库事务

手动提交、手动回滚

```php
try {
    //开启默认数据库的事务
    DB::beginTransaction();
    //开启test数据库的事务
    DB::connection('test')->beginTransaction();
    //中间各种数据库操作
    Table1::xxxxxx();
    Table2::xxxxxx();
    if (true) {
        //一起提交
        DB::commit();
        DB::connection('test')->commit();
    } else {
        //一起回滚
        DB::rollback();
        DB::connection('test')->rollback();
    }
} catch (\Exception $exception) {
    echo "catch some errors:".$exception->getMessage();
}
```

- [参考文章](https://caihongtengxu.github.io/2018/20181009/index.html)

### mysql 锁表解锁方法

```sql
# mysql 锁表解锁
SHOW PROCESSLIST
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
KILL Id;

# only_full_group_by 临时解决方案
set sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```

###　SQL语句中：UNION与UNION ALL的区别

- union all是直接连接，取到得是所有值，记录可能有重复
- union 是取唯一值，记录没有重复

UNION 和 UNION ALL 的语法如下：

```sql
  [SQL 语句 1]
    UNION
  [SQL 语句 2]

  [SQL 语句 1]
    UNION ALL
  [SQL 语句 2]
```

- 效率：UNION和UNION ALL关键字都是将两个结果集合并为一个，但这两者从使用和效率上来说都有所不同。
  - 对重复结果的处理：UNION在进行表链接后会筛选掉重复的记录，Union All不会去除重复记录。
  - 对排序的处理：Union将会按照字段的顺序进行排序；UNION ALL只是简单的将两个结果合并后就返回。

- 从效率上说，UNION ALL要比UNION快很多，所以，如果可以确认合并的两个结果集中不包含重复数据且不需要排序时的话，那么就使用UNION ALL。
- 简要回答：UNION去重且排序, UNION ALL不去重不排序

### 常用sql

```sql
# 判断第一个表达式是否为 NULL，如果为 NULL 则返回第二个参数的值，如果不为 NULL 则返回第一个参数的值。
IFNULL(expression, alt_value)

# expr1 ? expr2 : expr3
IF(expr1,expr2,expr3)

# IF 语句的使用
select *,if(age=1,"男","女") as ages from user;

# IF 语句的 case when 实现
SELECT
    CASE age
        WHEN 1 THEN '男'
        WHEN 2 THEN '女'
        ELSE '未知'
    END
as ages
```

### laravel中的事务与锁

- 开启事务,不会对事务中处理的数据加锁,事务只是保证数据的完整性;
- 开启事务,对事务中数据进行加锁,其它地方是否可以对数据进行读取\更新?  
  - 普通读取/更新: 均可以读取到,均不可进行更新;
  - 在事务(transaction 中)读取/更新:
    - 如果是用的 sharedLock() 其它事务中任然能读取到,但是不能更新
    - 如果是 lockForUpdate() 其它事务中读取不到,必须等待加锁的事务提交或者回滚才能读取到;
    - 对于非事务中的正常读取,不管是加了 sharedLock() 锁还是 lockForUpdate() 锁,均可读取到;
- 开启事务,对事务中的数据加锁,锁要等到事务提交或回滚才结束;
- sharedLock()， lockForUpdate() 均属于悲观锁,乐观锁用于多读场景,悲观锁用于多写场景;

- [laravel 事务与锁](https://blog.csdn.net/qq_30057893/article/details/52791656)
- [使用 Laravel sharedLock 与 lockForUpdate 进行数据表行锁](https://www.sunzhongwei.com/mip/using-laravel-sharedlock-and-lockforupdate-for-table-row-locks)
- [面试必备之乐观锁与悲观锁](https://blog.csdn.net/qq_34337272/article/details/81072874)
- [【笔记】悲观锁与乐观锁](https://laravel-china.org/topics/3208/note-pessimistic-lock-and-optimistic-lock)
- [laravel 中悲观锁 & 乐观锁的使用](http://www.hu-rong.com/article/362)
- [使用 Laravel sharedLock 与 lockForUpdate 进行数据表行锁](https://www.sunzhongwei.com/mip/using-laravel-sharedlock-and-lockforupdate-for-table-row-locks)