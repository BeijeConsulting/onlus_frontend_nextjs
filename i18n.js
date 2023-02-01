module.exports = {
  locales: ["default", "it", "en"], // Array with the languages that you want to use
  defaultLocale: "default", // Default language of your website
  localeDetection: false,
  // 'name of the page where you will apply the translation' : ['name of the translation file]
  // common style will be apply to all pages --> '*'
  pages: {
    "*": ["common"], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
  },
};
