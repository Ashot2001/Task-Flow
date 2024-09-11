export interface ILoggerConfig {
	level?: string;
	filename?: string;
}

export interface ILogger {
	log: (message: string, level?: string) => void;
	info: (message: string) => void;
	error: (message: string) => void;
	warn: (message: string) => void;
	test:(message:string)  => void;
}
