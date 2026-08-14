// declare module 'mongo-sanitize' {
//   function sanitize<T>(value: T): T;
//   export = sanitize;
// }

// declare module 'express-xss-sanitizer' {
//   export function xss(input: string): string;
// }

declare global {
  interface String {
    bgRed: string;
    bgGreen: string;
    bgYellow: string;
    bgBlue: string;
    bgMagenta: string;
    bgCyan: string;
    bgWhite: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bold: string;
    italic: string;
    reset: string;
  }
}
