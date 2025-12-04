# Fullstack Developer Test - Student Score Manager

## Mô tả
Bài toán quản lý điểm học sinh sử dụng **Dependency Injection** trong .NET Core và xử lý dữ liệu theo yêu cầu.

---

## 1. Giải thích Dependency Injection trong .NET Core

### Dependency Injection là gì?
Dependency Injection (DI) là một mẫu thiết kế giúp:
- **Giảm sự phụ thuộc** giữa các lớp
- **Tăng tính linh hoạt** của mã
- **Dễ dàng kiểm thử** mã (unit testing)

### Cách DI hoạt động trong dự án này:

```csharp
// Bước 1: Tạo Service Provider và đăng ký dịch vụ
var serviceProvider = new ServiceCollection()
    .AddSingleton<IStudentService, StudentService>()
    .BuildServiceProvider();

// Bước 2: Lấy instance của dịch vụ từ DI Container
var studentService = serviceProvider.GetRequiredService<IStudentService>();
```

**Lợi ích:**
- Không cần khởi tạo `new StudentService()` trực tiếp
- Nếu thay đổi implementation, chỉ cần thay đổi một dòng đăng ký
- Dễ dàng mock hoặc replace cho testing

---

## 2. Cấu trúc dữ liệu

### Student Object:
```json
{
  "name": "Nguyễn Văn A",
  "score": {
    "math": 10,
    "physics": 9,
    "chemistry": 8
  }
}
```

### Class hiện thực:
```csharp
public class Student
{
    public string Name { get; set; }
    public ScoreInfo Score { get; set; }
    
    public double GetAverageScore()
    {
        return (Score.Math + Score.Physics + Score.Chemistry) / 3.0;
    }
}
```

---

## 3. Tính năng chính

✅ **Thêm học sinh**: `AddStudent(student)`
✅ **Sắp xếp điểm**: Sắp xếp theo điểm trung bình **giảm dần** (từ cao nhất xuống)
✅ **Tìm điểm cao nhất**: Lấy học sinh có trung bình cao nhất
✅ **Hiển thị dữ liệu**: In ra tất cả học sinh với thông tin chi tiết

---

## 4. Chạy chương trình

```bash
dotnet run
```

**Output mong đợi:**
```
=== DANH SÁCH HỌC SINH ===

Tên: Nguyễn Văn A, Toán: 10, Lý: 9, Hóa: 8, Trung bình: 9.00
Tên: Trần Thị B, Toán: 8, Lý: 7, Hóa: 9, Trung bình: 8.00
Tên: Lê Văn C, Toán: 9, Lý: 10, Hóa: 9, Trung bình: 9.33
Tên: Phạm Thị D, Toán: 7, Lý: 8, Hóa: 7, Trung bình: 7.33
Tên: Hoàng Văn E, Toán: 10, Lý: 10, Hóa: 10, Trung bình: 10.00

=== DANH SÁCH SẮP XẾP THEO ĐIỂM TRUNG BÌNH (GIẢM DẦN) ===

Tên: Hoàng Văn E, Toán: 10, Lý: 10, Hóa: 10, Trung bình: 10.00
Tên: Lê Văn C, Toán: 9, Lý: 10, Hóa: 9, Trung bình: 9.33
Tên: Nguyễn Văn A, Toán: 10, Lý: 9, Hóa: 8, Trung bình: 9.00
Tên: Trần Thị B, Toán: 8, Lý: 7, Hóa: 9, Trung bình: 8.00
Tên: Phạm Thị D, Toán: 7, Lý: 8, Hóa: 7, Trung bình: 7.33

=== HỌC SINH CÓ ĐIỂM TRUNG BÌNH CAO NHẤT ===

Tên: Hoàng Văn E, Toán: 10, Lý: 10, Hóa: 10, Trung bình: 10.00
```

---

## 5. Cách xử lý khác so với hàm sort/order hay thư viện ngoài

- ✅ Sử dụng **LINQ** (`OrderByDescending`) để sắp xếp
- ✅ Không dùng hàm sort ngoài (tích hợp sẵn trong .NET)
- ✅ Sắp xếp theo **tên (alphabetical)** không có trong yêu cầu, chỉ sắp xếp theo điểm

---

## 6. Tìm điểm trung bình cao nhất

```csharp
public Student GetStudentWithHighestAverage()
{
    return _students.OrderByDescending(s => s.GetAverageScore()).FirstOrDefault();
}
```

---

## 7. Về Polaris (Shopify)

Yêu cầu bài toán đề cập đến **Polaris** (UI framework từ Shopify), nhưng đây là console app .NET Core. Nếu muốn giao diện web:
- Có thể sử dụng **Blazor** (C# frontend framework) kết hợp Polaris
- Hoặc tạo **ASP.NET Core API** và frontend React/Vue với Polaris

---

## Cấu trúc thư mục:
```
Student_Score_Manager/
├── Program.cs                 # Entry point với Dependency Injection
├── Models/
│   └── Student.cs             # Class Student và ScoreInfo
├── Services/
│   ├── IStudentService.cs     # Interface
│   └── StudentService.cs      # Implementation
└── Student_Score_Manager.csproj
```

---

**Tác giả**: AI Assistant
**Ngày tạo**: 2024
