### 安装mysql

```bash
sudo apt install mysql-server mysql-client
```


### 使用密码登录mysql

在 Ubuntu 20.04 中安装 MySQL 8.0 后，默认的身份验证方式是 auth_socket。这意味着，可以通过系统用户身份验证连接到 MySQL 服务器，而无需输入密码。

如果您想要更改为使用密码进行身份验证，则需要执行以下步骤：

1. 以 root 身份登录到 MySQL：
    ```
    sudo mysql -u root
    ```

2. 创建一个新的 MySQL 用户，并设置其密码：

    ```sql
    CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'your_password';
    ```
    
    其中，new_user 是新创建的用户名，your_password 是该用户的密码。

3. 授予新用户适当的权限：

    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'new_user'@'localhost' WITH GRANT OPTION;
    # 刷新权限
    FLUSH PRIVILEGES;
    ```

4. 退出 MySQL：

    ```sql
    EXIT;
    ```

5. 修改 MySQL 配置文件（/etc/mysql/mysql.conf.d/mysqld.cnf），将 auth_socket 改为 mysql_native_password：

    ```
    # Replace this line
    auth_socket = /var/run/mysqld/mysqld.sock

    # With this line
    default_authentication_plugin = mysql_native_password
    ```

6. 重新启动 MySQL 服务：

    ```
    sudo systemctl restart mysql
    ```

接下来，就可以使用新创建的用户和密码进行身份验证了。

记得在服务器的防火墙开放3306端口。


### 远程登录

假定： 设置允许 IP 地址为 120.78.13.180 的主机进行远程连接

```sql
# 在 MySQL 服务器上创建用户，并授予该用户来自特定 IP 地址的连接权限。
CREATE USER 'new_user'@'120.78.13.180' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'new_user'@'120.78.13.180' WITH GRANT OPTION;
FLUSH PRIVILEGES;


# 查看具有GRANT权限的用户列表：
SELECT User, Grant_priv, Host FROM mysql.user;
# 如果“Grant_priv”列中的值为“Y”，则表示该用户具有GRANT权限。如果“Grant_priv”列中的值为“N”，则表示该用户没有GRANT权限。

# 请注意，您需要以具有至少“SELECT”权限的MySQL用户身份登录才能运行此命令。
```

确保服务器上的防火墙已打开 MySQL 端口（通常是3306）。可以使用以下命令检查

```bash
sudo ufw allow mysql
```

远程登录

```bash
mysql -u new_user -h server_ip_address -p
```