module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  roots: ['<rootDir>/src'],
  coverageDirectory: '<rootDir>/coverage',
  reporters: ['default'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['jest-extended'],
};
