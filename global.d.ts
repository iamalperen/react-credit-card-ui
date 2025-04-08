// This declaration allows importing CSS Modules in TypeScript
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Add declarations for other extensions like scss if needed
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
} 