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

interface LogLevel {
	name: string;
	color: string;
	logFunction: (message?: string, ...optionalParams: string[]) => void;
}

/****
 * A collection of predefined log levels, each associated with a logging function,
 * a name, and a color for display purposes.
 *
 * The default log levels include:
 * - info
 * - warn
 * - error
 * - debug
 * - success
 * - response
 * - server
 *
 * The 'customLogLevels' variable holds user-defined log levels and can be modified
 * to add additional logging capabilities beyond the defaults.
 ****/
const defaultLogLevels: { [key: string]: LogLevel } = {
	info: { name: "INFO", color: COLOR_RESET, logFunction: console.log },
	warn: { name: "WARN", color: COLOR_ORANGE, logFunction: console.warn },
	error: { name: "ERROR", color: COLOR_RED, logFunction: console.error },
	debug: { name: "DEBUG", color: COLOR_BLUE, logFunction: console.debug },
	success: { name: "SUCCESS", color: COLOR_GREEN, logFunction: console.log },
	response: {
		name: "RESPONSE",
		color: COLOR_YELLOW,
		logFunction: console.log,
	},
	server: {
		name: "SERVER RESPONSE",
		color: COLOR_YELLOW,
		logFunction: console.log,
	},
};

let customLogLevels: { [key: string]: LogLevel } = {};

/**
 * Formats a given Date object into a string with the format:
 * YYYY-MM-DD HH:mm:ss.sss
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date: Date): string {
	const pad = (num: number, digits: number = 2) =>
		num.toString().padStart(digits, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
		date.getSeconds()
	)}.${pad(date.getMilliseconds(), 3)}`;
}

/**
 * Adds a custom log level to the logging system.
 *
 * @param {string} name - The name of the custom log level, which will be converted to lowercase.
 * @param {string} color - The color associated with the custom log level.
 * @param {function} [logFunction=console.log] - The logging function to be used for this log level; defaults to console.log.
 */
export function addCustomLogLevel(
	name: string,
	color: string,
	logFunction: (
		message?: string,
		...optionalParams: any[]
	) => void = console.log
): void {
	customLogLevels[name.toLowerCase()] = {
		name: name.toUpperCase(),
		color,
		logFunction,
	};
}

/**
 * Logs a message with additional information about the location (file name and line number)
 * from which the log was generated, along with a timestamp.
 *
 * @param {string} message - The message to be logged.
 * @param {string} level - The log level to be used. If the provided level is not recognized,
 *                         it falls back to the default log level (info).
 *
 */
export function logWithLocation(message: string, level: string): void {
	const logLevel =
		customLogLevels[level.toLowerCase()] ||
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

	logLevel.logFunction(
		`${COLOR_GREEN}--- ${fileName}${COLOR_RESET}:${COLOR_ORANGE}${line}, ${COLOR_BLUE}:${timestamp}:\n ${logLevel.color}${BOLD}   [${logLevel.name}]: ${COLOR_RESET}${logLevel.color}${message}\n ${COLOR_RESET}`
	);
}

// Usage examples
// logWithLocation("This is an info message");
// logWithLocation("This is a warning message", 'warn');
// logWithLocation("This is an error message", 'error');
// logWithLocation("This is a debug message", 'debug');

// Example of adding a custom log level
// addCustomLogLevel("CRITICAL", COLOR_MAGENTA);
// logWithLocation("This is a critical message", 'critical');

/**
 * Logs the performance of a given function by measuring the time it takes to execute.
 *
 * @param {string} label - A descriptive label for the performance measurement.
 * @param {function} fn - The function whose performance is being measured.
 *
 * The function executes `fn`, computes the time taken for its execution,
 * and logs the time along with the provided label in a debug message.
 */
export function logPerformance(label: string, fn: () => any): any {
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
