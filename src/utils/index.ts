import chalk from "chalk";
import cliProgress from "cli-progress";
import Table from "cli-table3";
import { performance } from "perf_hooks";
import type { SingleBar } from "cli-progress";

export interface LoggerOptions {
  showTime?: boolean;
  showLevel?: boolean;
  levelKey?: boolean;
}

function formatTime(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export class NovaLogger {
  private _showTime: boolean;
  private _showLevel: boolean;
  private _levelKey: boolean;

  constructor(options: LoggerOptions = {}) {
    this._showTime = options.showTime ?? true;
    this._showLevel = options.showLevel ?? true;
    this._levelKey = options.levelKey ?? true;
  }

  private _format(message: string, level: string, styled: string): string {
    const parts: string[] = [];
    if (this._showTime) {
      parts.push(chalk.magenta(`[[${formatTime()}]]`));
    }
    if (this._showLevel) {
      parts.push(styled);
    }
    if (parts.length) {
      return parts.join(" ") + "  " + message;
    }
    return message;
  }

  success(message: string): void {
    console.log(this._format(message, "✓ SUCCESS", chalk.green.bold(" ✓ SUCCESS ")));
  }

  warning(message: string): void {
    console.log(this._format(message, "⚠ WARNING", chalk.yellow.bold(" ⚠ WARNING ")));
  }

  error(message: string): void {
    console.log(this._format(message, "✗ ERROR", chalk.red.bold(" ✗ ERROR ")));
  }

  info(message: string): void {
    console.log(this._format(message, "ℹ INFO", chalk.blue.bold(" ℹ INFO ")));
  }

  debug(message: string): void {
    console.log(this._format(message, "⚙ DEBUG", chalk.gray(" ⚙ DEBUG ")));
  }

  plain(message: string): void {
    console.log(message);
  }

  section(title: string): void {
    const bar = "─".repeat(40);
    console.log(chalk.bold(bar));
    console.log(chalk.bold(` ${title} `));
    console.log(chalk.bold(bar));
  }

  table(headers: string[], rows?: string[][], title?: string): void {
    const table = new Table({
      head: headers.map(h => chalk.bold(h)),
      title: title ? chalk.bold(title) : undefined,
    } as any);
    if (rows) {
      for (const row of rows) {
        table.push(row);
      }
    }
    console.log(table.toString());
  }
}

// ─── Module-level convenience helpers ───────────────────────────────────────

export const nova_log = new NovaLogger();

export function print_success(message: string): void {
  nova_log.success(message);
}

export function print_warning(message: string): void {
  nova_log.warning(message);
}

export function print_error(message: string): void {
  nova_log.error(message);
}

export function print_info(message: string): void {
  nova_log.info(message);
}

export function print_header(title: string): void {
  nova_log.section(title);
}

export function print_table(headers: string[], rows?: string[][], title?: string): void {
  nova_log.table(headers, rows, title);
}

export function print_tree(label: string, ...children: string[]): void {
  console.log(chalk.bold(label));
  for (const child of children) {
    console.log(chalk.gray("  └ " + child));
  }
}

export function progress(
  label: string,
  total: number = 100,
  format?: string
): SingleBar {
  const bar = new cliProgress.SingleBar({
    format: format ??
      `${chalk.magenta(label)} ${chalk.green("{bar}")} {percentage}% | {value}/{total}`,
    barCompleteChar: "█",
    barIncompleteChar: "░",
  });
  bar.start(total, 0);
  return bar;
}

const _spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function status(message: string = "Working..."): { stop: () => void } {
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${chalk.blue(_spinnerFrames[i % _spinnerFrames.length])} ${message} `);
    i++;
  }, 80);
  return {
    stop() {
      clearInterval(interval);
      process.stdout.write("\r" + " ".repeat(60) + "\r");
    },
  };
}

export function timer<T>(fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const elapsed = ((performance.now() - start) / 1000).toFixed(2);
  nova_log.info(`Elapsed: ${elapsed}s`);
  return result;
}

export async function timerAsync<T>(fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const elapsed = ((performance.now() - start) / 1000).toFixed(2);
  nova_log.info(`Elapsed: ${elapsed}s`);
  return result;
}