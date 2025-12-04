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

// Thêm dữ liệu học sinh
studentService.AddStudent(new Student("Nguyen VVan A", new ScoreInfo(10, 9, 8)));
studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 7, 9)));
studentService.AddStudent(new Student("Le Van C", new ScoreInfo(9, 10, 9)));
studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(7, 8, 7)));
studentService.AddStudent(new Student("Hoang Van E", new ScoreInfo(10, 10, 10)));
Console.WriteLine("=== DANH SÁCH HỌC SINH ===\n");
foreach (var student in studentService.GetAllStudents())
{
    Console.WriteLine(student);
}

Console.WriteLine("\n=== DANH SÁCH SẮP XẾP THEO ĐIỂM TRUNG BÌNH (GIẢM DẦN) ===\n");
foreach (var student in studentService.GetStudentsSortedByAverage())
{
    Console.WriteLine(student);
}

Console.WriteLine("\n=== HỌC SINH CÓ ĐIỂM TRUNG BÌNH CAO NHẤT ===\n");
var topStudent = studentService.GetStudentWithHighestAverage();
if (topStudent != null)
{
    Console.WriteLine(topStudent);
}
