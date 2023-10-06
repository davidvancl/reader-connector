/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(jpg|jpeg|png|gif|svg)$':'<rootDir>/tests/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.ts',
    '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
  },
  setupFiles: ["jest-webextension-mock"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setupTests.ts']
};