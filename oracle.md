Để shutdown (tắt) một cơ sở dữ liệu Oracle, bạn cần kết nối vào cơ sở dữ liệu với quyền `SYSDBA`. Dưới đây là các bước cụ thể để thực hiện điều này:

1. **Kết nối vào cơ sở dữ liệu với quyền `SYSDBA`**:

   ```sh
   sqlplus sys/Nam24102002@ORCLCDB as sysdba
   ```

2. **Shutdown cơ sở dữ liệu**:

   Sau khi kết nối thành công, bạn có thể thực hiện lệnh `SHUTDOWN`. Có một số cách để shutdown cơ sở dữ liệu Oracle, mỗi cách có các mức độ mạnh mẽ khác nhau:

   - **SHUTDOWN NORMAL**: Tắt cơ sở dữ liệu bình thường. Oracle sẽ đợi tất cả các phiên làm việc kết thúc trước khi tắt.

     ```sql
     SHUTDOWN NORMAL;
     ```

   - **SHUTDOWN IMMEDIATE**: Tắt cơ sở dữ liệu ngay lập tức. Oracle sẽ kết thúc tất cả các phiên làm việc hiện tại một cách an toàn.

     ```sql
     SHUTDOWN IMMEDIATE;
     ```

   - **SHUTDOWN TRANSACTIONAL**: Cho phép các phiên làm việc hiện tại kết thúc giao dịch hiện tại của họ trước khi tắt cơ sở dữ liệu.

     ```sql
     SHUTDOWN TRANSACTIONAL;
     ```

   - **SHUTDOWN ABORT**: Tắt cơ sở dữ liệu ngay lập tức mà không đảm bảo rằng các phiên làm việc hiện tại kết thúc an toàn. Chỉ sử dụng tùy chọn này nếu không còn cách nào khác.

     ```sql
     SHUTDOWN ABORT;
     ```

3. **Khởi động cơ sở dữ liệu**:

   Sau khi kết nối thành công, bạn có thể thực hiện lệnh `STARTUP` để khởi động cơ sở dữ liệu.

   ```sql
   STARTUP;
   ```

   Nếu cơ sở dữ liệu khởi động thành công, bạn sẽ thấy một thông báo xác nhận trong SQL\*Plus, ví dụ như:

   ```
   ORACLE instance started.

   Total System Global Area  1073741824 bytes
   Fixed Size                  2926472 bytes
   Variable Size             536871448 bytes
   Database Buffers          536870912 bytes
   Redo Buffers                1384448 bytes
   Database mounted.
   Database opened.
   ```

### Các tùy chọn khởi động

Oracle cung cấp một số tùy chọn để khởi động cơ sở dữ liệu tùy theo trạng thái mong muốn:

- **STARTUP NOMOUNT**: Khởi động tiến trình nền và cấp phát bộ nhớ nhưng không gắn kết (`mount`) cơ sở dữ liệu.

  ```sql
  STARTUP NOMOUNT;
  ```

- **STARTUP MOUNT**: Khởi động tiến trình nền, cấp phát bộ nhớ và gắn kết (`mount`) cơ sở dữ liệu nhưng không mở (`open`) cơ sở dữ liệu để sử dụng.

  ```sql
  STARTUP MOUNT;
  ```

- **STARTUP OPEN**: Khởi động tiến trình nền, cấp phát bộ nhớ, gắn kết (`mount`) và mở (`open`) cơ sở dữ liệu để sử dụng.

  ```sql
  STARTUP OPEN;
  ```

### Tạo Người Dùng `hr` trong một PDB

Nếu bạn muốn tạo người dùng `hr` trong một PDB cụ thể, bạn cần kết nối đến PDB đó trước khi tạo người dùng. Dưới đây là các bước chi tiết:

1. **Kết nối với CDB và sau đó chuyển sang PDB**:

   ```sh
   sqlplus sys/Nam24102002@ORCLCDB as sysdba
   ```

2. **Chuyển đổi sang PDB mong muốn**:

   ```sql
   ALTER SESSION SET CONTAINER = ORCLPDB1;
   ```

3. **Tạo người dùng `hr` trong PDB**:

   ```sql
   CREATE USER hr IDENTIFIED BY hr;
   GRANT CREATE SESSION, CREATE TABLE, UNLIMITED TABLESPACE TO hr;
   ```

4. **Tắt chế độ hạn chế truy cập và đăng nhập lại user hr: **:

   ```sql
   ALTER USER hr ACCOUNT UNLOCK;
   ```

5. **Đổi mật khẩu cho tài khoản hr: **:
   ```sql
   alter user hr identified by mật khẩu mới;
   ```

### Đăng nhập vào Người Dùng `hr`

Sau khi tạo người dùng `hr`, bạn có thể đăng nhập vào tài khoản `hr` như sau:

```sh
sqlplus hr/hr@ORCLPDB1
```

Để shutdown cơ sở dữ liệu Oracle và sau đó mở lại ở chế độ read-only, bạn có thể làm theo các bước dưới đây:

### 1. Shutdown Database

1. **Kết nối vào cơ sở dữ liệu với quyền `SYSDBA`**:

   ```sh
   sqlplus sys/Nam24102002@ORCLCDB as sysdba
   ```

   Hoặc nếu bạn đang kết nối từ máy chủ cục bộ:

   ```sh
   sqlplus sys/oracle_4U as sysdba
   ```

2. **Shutdown cơ sở dữ liệu**:

   ```sql
   SHUTDOWN IMMEDIATE;
   ```

   Lệnh `SHUTDOWN IMMEDIATE` sẽ tắt cơ sở dữ liệu một cách an toàn bằng cách kết thúc tất cả các phiên làm việc hiện tại và commit tất cả các giao dịch.

### 2. Mở lại Database ở chế độ Read-Only

1. **Khởi động cơ sở dữ liệu ở chế độ mount**:

   ```sql
   STARTUP MOUNT;
   ```

   Chế độ `MOUNT` sẽ khởi động các tiến trình nền và cấp phát bộ nhớ, nhưng không mở cơ sở dữ liệu để sử dụng.

2. **Mở cơ sở dữ liệu ở chế độ read-only**:

   ```sql
   ALTER DATABASE OPEN READ ONLY;
   ```

   Lệnh này sẽ mở cơ sở dữ liệu nhưng chỉ cho phép các truy vấn đọc mà không cho phép các thao tác ghi.

### Kiểm tra trạng thái

Để xác minh rằng cơ sở dữ liệu đã được mở ở chế độ read-only, bạn có thể chạy lệnh sau:

```sql
SELECT NAME, OPEN_MODE FROM V$DATABASE;
```

Kết quả sẽ cho biết rằng cơ sở dữ liệu đang ở chế độ `READ ONLY`.

### Dưới đây là các thực hiện chi tiết trên SQL\*Plus cho mỗi bước:

1. **Đăng nhập vào user HR và thực hiện INSERT vào bảng REGIONS**:

   ```sql
   sqlplus hr/hr
   INSERT INTO regions VALUES (5, 'Mars');
   ```

2. **Chuyển database sang chế độ read-write, thực hiện INSERT lại vào bảng REGIONS nhưng chưa commit**:

   ```sql
   ALTER DATABASE OPEN READ WRITE;
   INSERT INTO regions VALUES (5, 'Mars');
   ```

3. **Mở 1 session mới và đăng nhập vào user sys, thực hiện Shutdown database ở chế độ TRANSACTIONAL**:

   ```sql
   sqlplus sys/Nam24102002 as sysdba
   SHUTDOWN TRANSACTIONAL;
   ```

4. **Rollback dữ liệu vừa insert vào bảng HR**:

   Khi thực hiện shutdown database ở chế độ TRANSACTIONAL, Oracle sẽ tự động rollback tất cả các giao dịch chưa commit, bao gồm cả INSERT vào bảng REGIONS.

5. **Tắt 2 session và tạo 1 session mới với user sys và startup database**:

   ```sql
   sqlplus sys/Nam24102002 as sysdba
   STARTUP;
   ```

6. **Mở 1 phiên làm việc mới với user HR. Ở phiên của sys, bật chức năng hạn chế truy cập. Ở user HR, có thực hiện truy vấn dữ liệu trong bản REGIONS được không?**

   Trong phiên làm việc mới với user HR, không cần thực hiện bất kỳ lệnh nào vì đã đăng nhập thành công. Tuy nhiên, ở phiên làm việc của sys, bạn cần thực hiện lệnh để bật chế độ hạn chế truy cập cho user HR. Đối với user HR, nếu họ có quyền truy cập vào bảng REGIONS, họ có thể thực hiện truy vấn dữ liệu trong bảng này.

7. **Logout user hr, sau đó login lại, hỏi có thể login được không?**

   Để logout user HR và đăng nhập lại, bạn có thể thực hiện:

   ```sql
   EXIT;
   sqlplus hr/hr
   ```

   Nếu tài khoản của user HR vẫn hoạt động và không bị chặn, họ có thể đăng nhập lại được.

8. **Tắt chế độ hạn chế truy cập và đăng nhập lại user hr**:

   Để tắt chế độ hạn chế truy cập cho user HR, bạn có thể thực hiện lệnh:

   ```sql
   ALTER USER hr ACCOUNT UNLOCK;
   ```

   Sau đó, user HR có thể đăng nhập lại như bình thường.

### Quản lý user

1. **Tạo user**:

   ```sql
   CREATE USER username IDENTIFIED BY password;
   ```

   Tạo các user A,B,C chỉ rõ default tablespace là USERS và hạn mưc trên tablespace USERS = 1M.

   ```sql
   CREATE USER A IDENTIFIED BY abc123 DEFAULT TABLESPACE USERS QUOTA 1M ON USERS;
   CREATE USER B IDENTIFIED BY abc123 DEFAULT TABLESPACE USERS QUOTA 1M ON USERS;
   CREATE USER C IDENTIFIED BY abc123 DEFAULT TABLESPACE USERS QUOTA 1M ON USERS;
   ```

2. **Xóa user**:

   ```sql
   DROP USER username;
   ```

3. **Phân quyền cho user**:

   ```sql
   GRANT role TO username;
   ```

4. **Thu hồi quyền của user**:

   ```sql
   REVOKE role FROM username;
   ```

5. **Đổi mật khẩu cho user**:

   ```sql
   ALTER USER username IDENTIFIED BY new_password;
   ```

6. **Khóa tài khoản user**:

   ```sql
   ALTER USER username ACCOUNT LOCK;
   ```

7. **Mở khóa tài khoản user**:

   ```sql
   ALTER USER username ACCOUNT UNLOCK;
   ```

8. **Hiển thị tất cả user trong cơ sở dữ liệu**:

   ```sql
   SELECT username FROM dba_users;
   ```

9. **Hiển thị quyền của user**:

   ```sql
   SELECT * FROM dba_role_privs WHERE grantee = 'username';
   ```

10. **Hiển thị quyền của user**:

```sql
SELECT * FROM dba_sys_privs WHERE grantee = 'username';
```

### Quản lý role

1. **Tạo role**:

   ```sql
   CREATE ROLE role_name;
   ```

2. **Xóa role**:

   ```sql
   DROP ROLE role_name;
   ```

3. **Phân quyền cho role**:

   ```sql
   GRANT privilege TO role_name;
   ```

   gán quyền hệ thống cho user

   ```sql
   GRANT CREATE SESSION TO role_name;
   ```

   quyền emi quyền hệ thống

   ```sql
   GRANT CREATE SESSION TO role_name WITH ADMIN OPTION;
   ```

   quyền đối tượng

   ```sql
   GRANT SELECT ON table_name TO role_name;
   ```

4. **Thu hồi quyền của role**:

   ```sql
   REVOKE 'privilege' FROM role_name;
   ```

   thu hồi quyền hệ thống

   ```sql
   REVOKE CREATE SESSION FROM role_name;
   ```

5. **Hiển thị tất cả role trong cơ sở dữ liệu**:

   ```sql
   SELECT role FROM dba_roles;
   ```

6. **Hiển thị quyền của role**:

   ```sql
   SELECT * FROM dba_role_privs WHERE grantee = 'role_name';
   ```

7. **Hiển thị quyền của role**:

   ```sql
   SELECT * FROM dba_sys_privs WHERE grantee = 'role_name';
   ```

8. **Hiển thị user thuộc role**:

   ```sql
   SELECT * FROM dba_role_privs WHERE granted_role = 'role_name';
   ```

9. **Hiển thị role của user**:

   ```sql
   SELECT * FROM dba_role_privs WHERE grantee = 'username
   ```

10. **Hiển thị role của user**:

```sql
SELECT * FROM dba_sys_privs WHERE grantee = 'username';
```

11. lấy thông tin về quyền

hiển thị tất cả các quyền của user

```sql
SELECT * FROM dba_tab_privs WHERE grantee = 'username';
```

Admin gán cho A có thể đăng nhập và tạo bảng, ngoài ra cho A có thể gán quyền tạo bảng cho các user khác.

```sql
GRANT CREATE SESSION TO A;
GRANT CREATE TABLE TO A WITH ADMIN OPTION;
```

Admin gán cho B có thể đăng nhập và tạo bảng, ngoài ra cho B có thể gán quyền đăng nhập cho các user khác.

```sql
GRANT CREATE SESSION TO B WITH ADMIN OPTION;
GRANT CREATE TABLE TO B;
```

C được gán quyền đăng nhập và tạo bảng bởi A và B.

```sql
GRANT CREATE SESSION TO C;
GRANT CREATE TABLE TO C;
```
