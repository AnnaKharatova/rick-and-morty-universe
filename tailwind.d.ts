declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '@tailwindcss/base' {
    // Пустая декларация - не используется
  }

  declare module '@tailwindcss/components' {
    // Пустая декларация - не используется
  }

  declare module '@tailwindcss/utilities' {
    // Пустая декларация - не используется
  }
  
