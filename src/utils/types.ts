export interface Logger {
  success(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  info(message: string): void;
  debug(message: string): void;
  plain(message: string): void;
  section(title: string): void;
  table(headers: string[], rows?: string[][], title?: string): any;
}