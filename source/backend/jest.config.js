/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: [`node_modules`],displayName: {
    name: 'BACKEND',
    color: 'blue',
  },
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
};
