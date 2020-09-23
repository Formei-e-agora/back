module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'job-microservice/src/**/*.js',
    '!.eslintrc.js'
    // '!<rootDir>/src/main/**',
    // '!<rootDir>/src/**/*-protocols.js',
    // '!**/protocols/**',
    // '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node'
  // preset: '@shelf/jest-mongodb',
  // moduleNameMapper: {
  //   '@/(.*)': '<rootDir>/src/$1'
  // }
}
