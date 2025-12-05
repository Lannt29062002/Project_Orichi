# Volume Discount Form

A React application using **react-hook-form** to create a form for managing volume-based discounts.

## 🚀 Quick Start

### 1. Install Dependencies

```powershell
cd "d:\Project_Orichi\VolumeDiscountForm"
npm install
```

### 2. Run Development Server

```powershell
npm start
```

The server will automatically open your browser at `http://localhost:3000`

### 3. Run Tests

```powershell
# Run all tests (one-time)
npm test -- --watchAll=false

# Run tests in watch mode (interactive)
npm test

# Run tests with coverage report
npm test -- --coverage --watchAll=false
```

## 📊 Test Suite

**39 Tests - 100% Pass Rate ✅**

```
Basic Rendering (7 tests)
  ✅ Form rendering, default values, buttons

Form Input Fields (6 tests)
  ✅ Text inputs, textareas, selects

Field Array Management (4 tests)
  ✅ Add/remove options, validation

Conditional Rendering (4 tests)
  ✅ Discount type logic, amount field visibility

Preview Table (3 tests)
  ✅ Real-time updates, data display

Form Validation (5 tests)
  ✅ Required fields, error messages

Form Submission (7 tests)
  ✅ API calls, loading state, error handling

Integration Tests (3 tests)
  ✅ Complete workflows
```

## 🎯 Key Features

✅ **Dynamic Options** - Add/remove options  
✅ **Real-time Preview** - Update instantly while typing  
✅ **Form Validation** - Validate all fields  
✅ **Conditional Fields** - Amount field visibility based on discount type  
✅ **React Hook Form** - Efficient state management  
✅ **Fully Tested** - 39 test cases coverage  

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Hook Form** - Form management
- **Jest** - Test runner
- **React Testing Library** - Component testing

## 📁 Project Structure

```
src/
├── VolumeDiscountForm.tsx       # Main component (375 lines)
├── VolumeDiscountForm.test.tsx  # Tests (735 lines, 39 tests)
├── VolumeDiscountForm.css       # Styles
├── setupTests.ts                # Jest configuration
├── App.tsx
├── index.tsx
└── react-app-env.d.ts

jest.config.js                   # Jest setup
package.json
tsconfig.json
```

## 📖 Troubleshooting

### Port 3000 is already in use
```powershell
npm start -- --port 3001
```

### Clear npm cache
```powershell
npm cache clean --force
npm install
```

### Remove node_modules and reinstall
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

**Last Updated:** December 5, 2025  
**Test Status:** ✅ 39/39 Passing
