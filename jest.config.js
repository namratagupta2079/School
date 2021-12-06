var preset = require("jest-preset-angular/jest-preset");
module.exports = {
  ...preset,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/jest-preset-angular/build/setup-jest.js",
  ],
  testMatch: ["**/*.spec.ts"],
  globals: {
    ...preset.globals,
    "ts-jest": {
      ...preset.globals["ts-jest"],
      tsConfig: "src/tsconfig.test.json",
      isolatedModules: true,
    },
  },
  testResultsProcessor: "jest-sonar-reporter",
  coverageDirectory: "<rootDir>/output/coverage/jest",
  transformIgnorePatterns: ["node_modules/"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  reporters: ["default"],
  transform: {
    "^.+\\.(ts|html)$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@features/(.*)": "<rootDir>/src/app/modules/$1",
    "@callback/(.*)": "<rootDir>/src/app/modules/callback/manage-callback/$1",
    "@testing/(.*)": "<rootDir>/src/testing/$1",
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
    "@environments/(.*)": "<rootDir>/src/environments/$1",
  },
};
