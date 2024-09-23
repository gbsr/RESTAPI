// Color codes
export const COLOR_GREEN = "\x1b[32m";
export const COLOR_ORANGE = "\x1b[38;5;208m";
export const COLOR_BLUE = "\x1b[34m";
export const COLOR_RED = "\x1b[31m";
export const COLOR_YELLOW = "\x1b[33m";
export const COLOR_MAGENTA = "\x1b[35m";
export const COLOR_CYAN = "\x1b[36m";
const COLOR_RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const defaultLogLevels = {
    info: { name: "INFO", color: COLOR_RESET, logFunction: console.log },
    warn: { name: "WARN", color: COLOR_ORANGE, logFunction: console.warn },
    error: { name: "ERROR", color: COLOR_RED, logFunction: console.error },
    debug: { name: "DEBUG", color: COLOR_BLUE, logFunction: console.debug },
    success: { name: "SUCCESS", color: COLOR_GREEN, logFunction: console.log },
};
let customLogLevels = {};
function formatDate(date) {
    const pad = (num, digits = 2) => num.toString().padStart(digits, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}
export function addCustomLogLevel(name, color, logFunction = console.log) {
    customLogLevels[name.toLowerCase()] = {
        name: name.toUpperCase(),
        color,
        logFunction,
    };
}
export function logWithLocation(message, level) {
    const logLevel = customLogLevels[level.toLowerCase()] ||
        defaultLogLevels[level.toLowerCase()] ||
        defaultLogLevels.info;
    const stack = new Error().stack;
    const caller = stack?.split("\n")[2]?.trim();
    const match = caller?.match(/at.*?\s+\(?(.+):(\d+):(\d+)\)?$/);
    let fileName = "unknown";
    let line = "?";
    if (match) {
        [, fileName, line] = match;
        fileName = fileName.split("/").pop() || fileName;
    }
    const timestamp = formatDate(new Date());
    logLevel.logFunction(`${COLOR_GREEN}--- ${fileName}${COLOR_RESET}:${COLOR_ORANGE}${line},${COLOR_RESET} ${logLevel.color}${BOLD} *[${logLevel.name}]${COLOR_RESET} ${COLOR_BLUE}:${timestamp}:${COLOR_RESET}\n ${message}\n${COLOR_GREEN}--- \n`);
}
// Usage examples
// logWithLocation("This is an info message");
// logWithLocation("This is a warning message", 'warn');
// logWithLocation("This is an error message", 'error');
// logWithLocation("This is a debug message", 'debug');
// Example of adding a custom log level
// addCustomLogLevel("CRITICAL", COLOR_MAGENTA);
// logWithLocation("This is a critical message", 'critical');
// Performance logging
export function logPerformance(label, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    logWithLocation(`${label} took ${(end - start).toFixed(3)}ms`, "debug");
    return result;
}
// Usage example for performance logging
// const result = logPerformance('Heavy computation', () => {
//   // Your heavy computation here
//   return someResult;
// });
