import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react'; // Importamos el plugin de React
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'; // Importamos el plugin de JSX A11y
import eslintPluginPrettier from 'eslint-plugin-prettier'; // Importamos el plugin de Prettier
import eslintConfigPrettier from 'eslint-config-prettier'; // Importamos la configuración de Prettier
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';

export default tseslint.config(
  { ignores: ['dist'] }, // Archivos y directorios a ignorar

  // Configuración base para JavaScript y TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended, // Reglas recomendadas de ESLint
      ...tseslint.configs.recommended, // Reglas recomendadas de TypeScript ESLint
      'plugin:tailwindcss/recommended',
      eslintConfigPrettier, // ¡Desactiva las reglas de ESLint que Prettier manejará! Siempre va casi al final.
    ],
    languageOptions: {
      ecmaVersion: 2020, // O 'latest'
      globals: globals.browser, // Entornos globales del navegador
      parser: tseslint.parser, // Especifica el parser de TypeScript
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Habilita el soporte para JSX
      },
    },
    plugins: {
      'react-hooks': reactHooks, // Plugin para React Hooks
      'react-refresh': reactRefresh, // Plugin para React Fast Refresh
      react: eslintPluginReact, // Plugin general de React
      'jsx-a11y': eslintPluginJsxA11y, // Plugin de accesibilidad JSX
      prettier: eslintPluginPrettier, // Plugin de Prettier
      tailwindcss: eslintPluginTailwindcss,
    },
    rules: {
      // Reglas de React Hooks
      ...reactHooks.configs.recommended.rules,

      // Reglas de React Refresh (para Vite)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Reglas generales de React
      ...eslintPluginReact.configs.recommended.rules,
      'react/jsx-uses-react': 'off', // Desactiva si usas la nueva transformación JSX
      'react/react-in-jsx-scope': 'off', // Desactiva si usas la nueva transformación JSX
      'react/prop-types': 'off', // Desactiva si usas TypeScript para validación de props

      // Reglas de accesibilidad JSX
      ...eslintPluginJsxA11y.configs.recommended.rules,

      // Reglas de Prettier (hace que Prettier formatee como un error de ESLint)
      'prettier/prettier': 'error',

      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Aquí puedes añadir tus propias reglas personalizadas o sobrescribir las existentes
      // Por ejemplo:
      // '@typescript-eslint/no-explicit-any': 'warn', // Permite 'any' pero con advertencia
      // 'no-unused-vars': 'warn', // Advertencia para variables no usadas (ESLint)
      // '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Advertencia para variables no usadas (TS ESLint)
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
      tailwindcss: {
        config: 'tailwind.config.js',
      },
    },
  }
);
