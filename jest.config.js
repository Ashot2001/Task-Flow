module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json'
      }
    },
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true
  };
  