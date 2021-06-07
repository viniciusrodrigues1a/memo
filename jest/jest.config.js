module.exports = {
  preset: "ts-jest",
  rootDir: "../",
  testEnvironment: "node",
  setupFiles: ["./jest/setupFiles/mockAsyncStorage.ts"],
};
