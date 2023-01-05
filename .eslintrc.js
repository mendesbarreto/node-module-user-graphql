module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    plugins: ['import'],
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        indent: ['error', 4],
    },
};
