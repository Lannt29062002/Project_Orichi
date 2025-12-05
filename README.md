# Project Orichi

A comprehensive fullstack project with a .NET Core backend and React frontend application.

## 📁 Project Structure

```
Project_Orichi/
├── Student_Score_Manager/           # .NET Core backend application
│   ├── Models/
│   ├── Services/
│   └── Program.cs
├── Student_Score_Manager.Tests/     # .NET unit & integration tests (37 tests)
├── VolumeDiscountForm/              # React frontend application
│   ├── src/
│   │   ├── VolumeDiscountForm.tsx   # Main form component
│   │   └── VolumeDiscountForm.test.tsx  # React tests (39 tests)
│   └── jest.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- .NET 6+ SDK
- Node.js 14+ with npm
- Git

### Student_Score_Manager (.NET)

```bash
cd Student_Score_Manager
dotnet run
```

**Run tests:**
```bash
cd Student_Score_Manager.Tests
dotnet test
```

### VolumeDiscountForm (React)

```bash
cd VolumeDiscountForm
npm install
npm start
```

**Run tests:**
```bash
npm test
```

## 📊 Test Coverage

- **Student_Score_Manager.Tests:** 37 tests ✅ 100% pass rate
  - StudentServiceTests (23 tests)
  - StudentModelTests (9 tests)
  - IntegrationTests (5 tests)

- **VolumeDiscountForm:** 39 tests ✅ 100% pass rate
  - Component rendering tests
  - User interaction tests
  - Form validation tests
  - API submission tests

## 📚 Documentation

- [Student_Score_Manager Setup](./Student_Score_Manager/README.md)
- [Student_Score_Manager Tests](./Student_Score_Manager.Tests/README.md)
- [VolumeDiscountForm Setup](./VolumeDiscountForm/README.md)

## 🛠️ Technologies

### Backend
- .NET 6+
- C#
- xUnit (Testing)
- Dependency Injection

### Frontend
- React 18
- TypeScript
- React Hook Form
- Jest & React Testing Library

## 📝 Git Workflow

```bash
# Clone repository
git clone https://github.com/Lannt29062002/Project_Orichi.git
cd Project_Orichi

# Check branch
git status

# Push changes
git push origin main
```

## ✨ Features

✅ Dependency Injection pattern implementation  
✅ Student score management with sorting and search  
✅ Volume discount form with real-time preview  
✅ Comprehensive test coverage  
✅ TypeScript support  
✅ RESTful API integration  

---

**Created by:** Lannt29062002  
**Last Updated:** December 5, 2025  
**Repository:** https://github.com/Lannt29062002/Project_Orichi.git
