module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
