module.exports = {
  semi: true, // Puntos y comas al final de las sentencias
  trailingComma: 'es5', // Comas al final en objetos y arrays (es5, none, all)
  singleQuote: true, // Comillas simples en lugar de dobles
  printWidth: 100, // Ancho máximo de línea antes de envolver
  tabWidth: 2, // Ancho de la tabulación
  useTabs: false, // Usar espacios en lugar de tabulaciones
  jsxSingleQuote: true, // Comillas simples en JSX
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
};