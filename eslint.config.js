module.exports = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        $: 'readonly',
        jQuery: 'readonly',
        ScrollReveal: 'readonly',
        sr: 'writable',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
];
