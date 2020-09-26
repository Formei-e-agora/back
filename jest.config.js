module.exports = {
  roots: ['person-microservice', 'authentication-microservice'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    // '!<rootDir>/src/main/**',
    // '!<rootDir>/src/**/*-protocols.js',
    // '!**/protocols/**',
    // '!**/test/**'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/helpers/',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  // preset: '@shelf/jest-mongodb',
  // moduleNameMapper: {
  //   '@/(.*)': '<rootDir>/src/$1'
  // }
};
