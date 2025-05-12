// import { createDefaultEsmPreset } from 'ts-jest'

const config = {
  preset: "ts-jest",
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/?(*.)+(test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  extensionsToTreatAsEsm: ['.ts'],
  // moduleNameMapper: {
  //   '^axios$': require.resolve('axios'),
  // },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  restoreMocks: true,
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  // transform: {
  //   '^.+\\.tsx?$': [
  //     'ts-jest',
  //     // {
  //     //   compiler: 'ttypescript',
  //     // },
  //   ],
  // },
  transform: {
    "^.+\\.(mt|t|cj|j)s$": [
      "ts-jest",
      {
        "useESM": true
      }
    ]
  },
  // ...createDefaultEsmPreset,
};

export default config;