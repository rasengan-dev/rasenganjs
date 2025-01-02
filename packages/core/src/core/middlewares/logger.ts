import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

export const loggerMiddleware = (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	const url = req.originalUrl;

	const time = new Date().toLocaleTimeString();

	console.log(
		`${chalk.grey(time)} ${chalk.blue("[Rasengan]")} ${chalk.green(
			"GET"
		)}: ${chalk.grey(url)}`
	);

	next();
};
