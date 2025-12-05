// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress specific console messages in tests
const originalError = console.error;
const originalWarn = console.warn;

// Mock console.error to filter out expected test errors
console.error = jest.fn((...args: any[]) => {
  const errorString = args[0]?.toString() || '';
  
  // Suppress React Hook Form controlled/uncontrolled input warning
  if (errorString.includes('A component is changing an uncontrolled input to be controlled')) {
    return;
  }
  
  // Suppress intentional test errors (these are tested scenarios)
  if (
    errorString.includes('Error: Failed to save volume discount') ||
    errorString.includes('Error: Network error')
  ) {
    return;
  }
  
  // Call original console.error for other errors
  originalError.call(console, ...args);
});

// Mock console.warn similarly
console.warn = jest.fn((...args: any[]) => {
  const warnString = args[0]?.toString() || '';
  
  if (warnString.includes('A component is changing an uncontrolled input to be controlled')) {
    return;
  }
  
  originalWarn.call(console, ...args);
});
