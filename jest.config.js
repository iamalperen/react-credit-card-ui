export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // identity-obj-proxy maps CSS module class names to themselves
        '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
        // Handle image imports or other static assets
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
        // Handle module path aliases (if you have them in tsconfig.json, like @/*)
        // Use simpler relative paths for utils in tests to avoid potential issues
        // '^@/(.*)$': '<rootDir>/src/$1', // Temporarily disabled path alias mapping for Jest
    },
    // Setup files to run before each test file
    // Used for global setup, like importing jest-dom matchers
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/example/', // Don't run tests in the example project
    ],
    // Transform files with ts-jest
    transform: {
        // Use ts-jest preset to handle imports correctly
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    // Ignore transforms for node_modules except for specific ESM packages if needed
    transformIgnorePatterns: [
        // Adjusted pattern to be slightly less restrictive for potential ESM modules in node_modules
        // if you encounter issues with specific libraries, you might need to adjust this further.
        '/node_modules/(?!some-es-module-package).+\\.js$'
    ],
    // Collect coverage from src directory, excluding index/types/constants
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.stories.{ts,tsx}',
        '!src/**/*.test.{ts,tsx}',
        '!src/**/*.types.{ts,tsx}',
        '!src/**/index.{ts,tsx}',
        '!src/**/__tests__/**/*', // Exclude test files from coverage
        '!src/**/?(*.)+(spec|test).[tj]s?(x)', // Exclude test files using pattern
    ],
};
