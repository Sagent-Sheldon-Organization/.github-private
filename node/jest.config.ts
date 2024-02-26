module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text", "html"],
  collectCoverageFrom: ["src/**/*.ts", "src/*.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/routes/",
    "/src/index.ts",
    "/src/datasource/",
    "/src/utils/",
  ],
};
