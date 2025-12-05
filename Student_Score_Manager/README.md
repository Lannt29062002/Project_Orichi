# Student Score Manager

A .NET Core application for managing student scores with Dependency Injection, sorting, and search functionality.

## 🚀 Setup & Run

### Prerequisites
- .NET 6+ SDK installed

### Run Application
```bash
dotnet run
```

### Run Tests
```bash
dotnet test
```

## 📋 Features

- ✅ Add and manage student records
- ✅ Calculate average scores (Math, Physics, Chemistry)
- ✅ Sort students by average score (descending)
- ✅ Find highest-scoring student
- ✅ Search students by average score
- ✅ Dependency Injection pattern implementation

## 🏗️ Project Structure

```
Student_Score_Manager/
├── Program.cs                    # Entry point with DI configuration
├── Models/
│   └── Student.cs                # Student and ScoreInfo classes
├── Services/
│   ├── IStudentService.cs        # Service interface
│   └── StudentService.cs         # Service implementation
└── Student_Score_Manager.csproj
```

## 📊 Data Structure

```csharp
public class Student
{
    public string Name { get; set; }
    public ScoreInfo Score { get; set; }  // Math, Physics, Chemistry
    public double GetAverageScore() { ... }
}
```

## 🧪 Test Coverage

- ✅ 37 comprehensive tests (100% pass rate)
- ✅ StudentServiceTests - 23 tests
- ✅ StudentModelTests - 9 tests
- ✅ IntegrationTests - 5 tests

See [Student_Score_Manager.Tests/README.md](../Student_Score_Manager.Tests/README.md) for details.

---

**Technology:** .NET 6+, C#, xUnit  
**Last Updated:** December 5, 2025
