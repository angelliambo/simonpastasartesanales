module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^shared-types/(.*)$": "<rootDir>/../shared/$1",
    ".*/contexts/PersonalizationContext(?:\\.tsx|\\.ts|\\.js)?$":
      "<rootDir>/src/test/mocks/personalizationContextMock.ts",
    ".*/hooks/personalization/usePersonalization(?:\\.tsx|\\.ts|\\.js)?$":
      "<rootDir>/src/test/mocks/usePersonalizationHookMock.ts",
    ".*/hooks(?:/index)?(?:\\.tsx|\\.ts|\\.js)?$":
      "<rootDir>/src/test/mocks/hooksIndexMock.ts",
    ".*/hooks/useThemeColors(?:\\.tsx|\\.ts|\\.js)?$":
      "<rootDir>/src/test/mocks/useThemeColorsMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
  ],
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/reportWebVitals.ts",
    "!src/serviceWorkerRegistration.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transformIgnorePatterns: [
    "node_modules/(?!(@reduxjs/toolkit|@reduxjs/toolkit/query|antd|@ant-design|rc-.*|@babel/runtime|@standard-schema|react-router-dom|react-router)/)",
  ],
  globals: {
    "ts-jest": {
      useESM: false,
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
};
