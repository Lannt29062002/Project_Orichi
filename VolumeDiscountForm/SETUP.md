# Hướng dẫn Cài đặt

## Bước 1: Cài đặt Dependencies

Mở PowerShell và chạy:

```powershell
cd "d:\Project_Orichi\VolumeDiscountForm"
npm install
```

Quá trình này sẽ mất vài phút. Hãy chờ cho đến khi hoàn thành.

## Bước 2: Chạy Development Server

```powershell
npm start
```

Server sẽ tự động mở trình duyệt và hiển thị ứng dụng tại `http://localhost:3000`

## Bước 3: Xem ứng dụng

- Form sẽ hiển thị với 2 option mặc định
- Nhập liệu để thấy preview thay đổi real-time
- Nhấn "Save" để submit form (validate sẽ chạy)

## Troubleshooting

Nếu gặp lỗi:

1. **Port 3000 đã được sử dụng:**
   ```powershell
   npm start -- --port 3001
   ```

2. **Cache npm bị lỗi:**
   ```powershell
   npm cache clean --force
   ```

3. **node_modules bị lỗi:**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

---

**Note**: Quá trình npm install lần đầu có thể mất 5-10 phút tùy thuộc vào tốc độ internet.
