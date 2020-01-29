import "@testing-library/jest-dom/extend-expect";
import context from "jest-plugin-context";

// Add Rspec declarative TDD method for Jest
global.context = context;
