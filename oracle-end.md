### Quản lý Instance Oracle

#### Chế độ Start và Shutdown

- **Start Database:**

  ```sql
  STARTUP;
  ```

- **Shutdown Database:**

  ```sql
  SHUTDOWN IMMEDIATE;
  ```

  NORMAL: Đây là option mặc định. Oracle sẽ không chấp nhận kết nối mới và chờ cho đến khi tất cả các kết nối hiện tại đều được đóng và tất cả các giao dịch đang hoạt động được hoàn thành trước khi dừng cơ sở dữ liệu.

  IMMEDIATE: Oracle sẽ hủy bỏ tất cả các giao dịch đang hoạt động, ngắt kết nối tất cả các session và đóng cơ sở dữ liệu mà không cần chờ.

  TRANSACTIONAL: Oracle sẽ chờ cho đến khi tất cả các giao dịch hiện tại hoàn thành trước khi dừng cơ sở dữ liệu. Trong thời gian này, không chấp nhận kết nối mới hoặc giao dịch mới.

  ABORT: Lệnh này dừng cơ sở dữ liệu ngay lập tức mà không cần lưu trữ dữ liệu chưa được ghi hoặc hoàn thành các giao dịch đang hoạt động. Đây là cách nhanh nhất để dừng cơ sở dữ liệu nhưng cũng có rủi ro cao nhất về mất mát dữ liệu hoặc hỏng cơ sở dữ liệu.

- **Read Only Mode:**

  ```sql
  ALTER DATABASE OPEN READ ONLY;
  ```

- **Restricted Session:**
  ```sql
  ALTER SYSTEM ENABLE RESTRICTED SESSION;
  ```

### Quản lý Tablespace & Datafile

#### Thêm Tablespace

```sql
CREATE TABLESPACE my_tablespace DATAFILE '/path/to/datafile.dbf' SIZE 50M;
```

#### Sửa Tablespace

```sql
ALTER TABLESPACE my_tablespace ADD DATAFILE '/path/to/new_datafile.dbf' SIZE 50M;
```

#### Xóa Tablespace

```sql
DROP TABLESPACE my_tablespace INCLUDING CONTENTS AND DATAFILES;
```

#### Di chuyển vị trí Datafile

```sh
# Đầu tiên, shutdown database
SHUTDOWN IMMEDIATE;
# Di chuyển file bằng lệnh OS, ví dụ:
mv /old/path/datafile.dbf /new/path/datafile.dbf
# Sau đó, khởi động lại và chỉnh sửa vị trí trong Oracle
STARTUP MOUNT;
ALTER DATABASE RENAME FILE '/old/path/datafile.dbf' TO '/new/path/datafile.dbf';
ALTER DATABASE OPEN;
```

#### Bật/Tắt tự động mở rộng của Datafile

```sql
-- Bật
ALTER DATABASE DATAFILE '/path/to/datafile.dbf' AUTOEXTEND ON;
-- Tắt
ALTER DATABASE DATAFILE '/path/to/datafile.dbf' AUTOEXTEND OFF;
```

#### Truy vấn thông tin Tablespace và Datafile

```sql
SELECT * FROM DBA_TABLESPACES;
SELECT * FROM DBA_DATA_FILES;
```

#### Khôi phục Datafile bị mất

```sql
# Ví dụ khôi phục datafile:
RECOVER DATAFILE '/path/to/lost_datafile.dbf';
```

### Quản trị người dùng, phân quyền, chức danh

#### Tạo người dùng

```sql
CREATE USER new_user IDENTIFIED BY password;
```

#### Phân quyền

```sql
GRANT CONNECT, RESOURCE TO new_user;
```

#### Tạo chức danh

```sql
CREATE ROLE new_role;
GRANT SELECT ON my_table TO new_role;
```

### Minh hoạ Import, Export một Schema

#### Export Schema

```sh
expdp system/password schemas=your_schema directory=your_directory dumpfile=your_schema.dmp logfile=export.log
```

#### Import Schema

```sh
impdp system/password schemas=your_schema directory=your_directory dumpfile=your_schema.dmp logfile=import.log
```

Lưu ý: Thay thế `system/password`, `your_schema`, `your_directory`, `your_schema.dmp` bằng thông tin thực tế của bạn.
