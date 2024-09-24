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

/* The `defaultLogLevels` constant is an object that stores predefined log levels along with their
respective configurations. Each log level is represented as a key-value pair within the object.
 */
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
};

let customLogLevels: { [key: string]: LogLevel } = {};

/**
 * The function `formatDate` takes a `Date` object and returns a formatted string representing the date
 * and time in a specific format.
 * @param {Date} date - Date object that represents a specific date and time.
 * @returns The `formatDate` function takes a `Date` object as input and returns a formatted string
 * representing the date in the format "YYYY-MM-DD HH:mm:ss.SSS".
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
 * The function `addCustomLogLevel` adds a custom log level with a specified name, color, and log
 * function to a collection of custom log levels.
 * @param {string} name - The `name` parameter is a string that represents the custom log level name.
 * @param {string} color - The `color` parameter is a string that represents the color associated with
 * the custom log level. This color will be used to distinguish the custom log level in the console
 * output or any other logging mechanism.
 * @param logFunction - The `logFunction` parameter in the `addCustomLogLevel` function is a function
 * that takes a message (optional) and any number of optional parameters. By default, it is set to
 * `console.log`, but you can provide a custom logging function when calling `addCustomLogLevel`. This
 * allows you
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
 * The function `logWithLocation` logs a message with location information such as file name and line
 * number.
 * @param {string} message - The `message` parameter is a string that represents the log message you
 * want to output along with its location information.
 * @param {string} level - The `level` parameter in the `logWithLocation` function is used to specify
 * the log level of the message being logged. It can be a string indicating the severity or importance
 * of the log message, such as "info", "warning", "error", etc. The function then determines the
 * appropriate
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
		`${COLOR_GREEN}--- ${fileName}${COLOR_RESET}:${COLOR_ORANGE}${line},${COLOR_RESET} ${logLevel.color}${BOLD} *[${logLevel.name}]${COLOR_RESET} ${COLOR_BLUE}:${timestamp}:${COLOR_RESET}\n ${message}\n${COLOR_GREEN}--- \n`
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

// Performance logging
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
