module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json"
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier'
  ],
  settings: {
    'import-parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import-resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'coverage',
    'dist',
    'build'
  ],
  rules: {
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index'
        ]
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          'src/tests/**/*',
          'src/setupTests.ts'
        ]
      }
    ]
  }
}