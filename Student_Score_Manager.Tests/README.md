# Unit Tests for Student_Score_Manager

Comprehensive unit tests for the Student Score Manager application.

## 🚀 Running Tests

### Run all tests:
```bash
dotnet test
```

### Run tests with verbose output:
```bash
dotnet test -v detailed
```

### Run specific test class:
```bash
dotnet test --filter "ClassName=StudentServiceTests"
```

## 📊 Test Coverage

- **Total Test Count:** 37
- **StudentServiceTests.cs** - 23 tests covering student service operations
- **StudentModelTests.cs** - 9 tests covering model classes
- **IntegrationTests.cs** - 5 tests covering complete workflows

### Key Areas Tested:
- ✅ Student addition and retrieval
- ✅ Sorting by average score with alphabetical secondary sort
- ✅ Finding highest-scoring student
- ✅ Binary search functionality
- ✅ Edge cases and data integrity

## 📈 Test Results

**Test Status:** ✅ 37/37 Passing (100%)

---

**Technology Stack:** .NET 6+, C#, xUnit  
**Last Updated:** December 5, 2025
