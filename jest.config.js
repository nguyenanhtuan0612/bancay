const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src',
    }),
    testRegex: '.*\\.spec\\.ts$',
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
};
