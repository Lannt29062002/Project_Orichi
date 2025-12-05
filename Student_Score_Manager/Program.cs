using System;
using Microsoft.Extensions.DependencyInjection;
using Student_Score_Manager.Models;
using Student_Score_Manager.Services;

// Dependency Injection Container Setup
var serviceProvider = new ServiceCollection()
    .AddSingleton<IStudentService, StudentService>()
    .BuildServiceProvider();

// Lấy instance của StudentService thông qua DI
var studentService = serviceProvider.GetRequiredService<IStudentService>();

// Thêm dữ liệu học sinh để kiểm tra các yêu cầu:
// 1. Sắp xếp theo điểm trung bình giảm dần
// 2. Khi điểm bằng nhau, sắp xếp tên alphabet tăng dần
// 3. Tìm kiếm nhanh với Binary Search
studentService.AddStudent(new Student("Nguyen Van A", new ScoreInfo(8, 8, 8)));           // TB = 8.0 (A - ten dau tien)
studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));         // TB = 8.0 (B - o giua)
studentService.AddStudent(new Student("Le Van C", new ScoreInfo(8, 8, 8)));           // TB = 8.0 (C - o giua A va B)
studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(9, 9, 9)));       // TB = 9.0
studentService.AddStudent(new Student("Hoang Van E", new ScoreInfo(10, 10, 10)));      // TB = 10.0 (cao nhat)
studentService.AddStudent(new Student("Tran Thi E", new ScoreInfo(7, 7, 7)));           // TB = 7.0 (thap nhat)

Console.WriteLine("=== DANH SÁCH HỌC SINH GỐC ===\n");
foreach (var student in studentService.GetAllStudents())
{
    Console.WriteLine(student);
}

Console.WriteLine("\n=== DANH SÁCH SẮP XẾP THEO ĐIỂM TRUNG BÌNH (GIẢM DẦN) ===");
Console.WriteLine("Yêu cầu 1: Sắp xếp theo điểm giảm dần");
Console.WriteLine("Yêu cầu 2: Khi điểm bằng nhau, sắp xếp tên alphabet tăng dần (Alice → Bob → Zoe)\n");
foreach (var student in studentService.GetStudentsSortedByAverage())
{
    Console.WriteLine(student);
}

Console.WriteLine("\n=== TÌM KIẾM HỌC SINH CÓ ĐIỂM TRUNG BÌNH BẰNG 8.0 (BINARY SEARCH) ===");
Console.WriteLine("Yêu cầu 3: Tìm nhanh nhất có thể trên mảng đã sắp xếp\n");
var studentsWithScore8 = studentService.FindStudentsByAverageScore(8.0);
if (studentsWithScore8.Count > 0)
{
    Console.WriteLine($"✓ Tìm thấy {studentsWithScore8.Count} học sinh có điểm trung bình = 8.0:\n");
    foreach (var student in studentsWithScore8)
    {
        Console.WriteLine(student);
    }
}
else
{
    Console.WriteLine("✗ Không tìm thấy học sinh có điểm trung bình bằng 8.0");
}
