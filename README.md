# Nova SDK for JavaScript

A utility library for common Node.js tasks.

## Installation

```bash
npm install @hypernova-sdk/core
```

Or using yarn/pnpm:

```bash
yarn add @hypernova-sdk/core
pnpm add @hypernova-sdk/core
```

## Quick Start

```javascript
import novasdk from "@hypernova-sdk/core";

console.log(novasdk.__version__);

// Use the default logger
novasdk.print_success("Operation completed!");
novasdk.print_warning("This is a warning.");
novasdk.print_error("Something went wrong.");
novasdk.print_info("Here is some info.");

// Or use the logger directly
const { nova_log } = novasdk;
nova_log.success("Logged in successfully!");
nova_log.info("Server is running on port 3000.");

// Print a styled header
novasdk.print_header("Section Title");

// Print a table
novasdk.print_table(
  ["Name", "Age", "City"],
  [["Alice", "28", "NYC"], ["Bob", "34", "LA"]],
  "People"
);

// Print a tree structure
novasdk.print_tree("Project", "src/index.js", "README.md", "package.json");

// Progress bar
const bar = novasdk.progress("Downloading...", 100);
for (let i = 0; i <= 100; i++) {
  bar.update(i);
}
bar.stop();

// Status spinner
const spinner = novasdk.status("Loading data...");
setTimeout(() => spinner.stop(), 2000);

// Timer
const result = novasdk.timer(() => {
  // some work
  for (let i = 0; i < 1000000; i++) {}
  return "done";
});
console.log(result);
```

## API Reference

### Logger

```javascript
import { NovaLogger } from "@hypernova-sdk/core";

const logger = new NovaLogger({ showTime: true, showLevel: true });
logger.success("Hello!");
logger.info("Server started");
logger.warning("Low memory");
logger.error("Connection failed");
logger.debug("Variable x = 5");
logger.plain("Raw text output");
logger.section("Important Section");
```

### Functions

| Function | Description |
|----------|-------------|
| `nova_log` | Default shared logger instance |
| `print_success(msg)` | Print a success message |
| `print_warning(msg)` | Print a warning message |
| `print_error(msg)` | Print an error message |
| `print_info(msg)` | Print an info message |
| `print_header(title)` | Print a styled section header |
| `print_table(headers, rows, title?)` | Print a formatted table |
| `print_tree(label, ...children)` | Print a tree structure |
| `progress(label, total?)` | Create a progress bar |
| `status(message?)` | Create a status spinner |
| `timer(fn)` | Time a synchronous function |
| `timerAsync(fn)` | Time an async function |

## License

MIT License