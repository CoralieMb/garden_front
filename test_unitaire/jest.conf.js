const path = require("path");

module.exports = {
  testEnvironment: "jsdom",
  rootDir: path.resolve(__dirname, "../"),
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
  },
  reporters: [
    "default",
    ["jest-junit", { suiteName: "jest tests", outputName: "webresult.xml" }],
  ],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  setupFiles: ["<rootDir>/test_unitaire/setup"],
  verbose: true,
  coverageDirectory: "<rootDir>/tests/coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js",
    "!**/node_modules/**",
  ],
  coverageReporters: ["cobertura", "html", "text"],
};
