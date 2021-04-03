import { config } from "./config";
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  // defaultMeta: { service: config.userAgent },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're in development then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.env === "development") {
  logger.level = "debug";
  // logger.add(
  //   new winston.transports.Console({
  //     format: winston.format.simple(),
  //   })
  // );
}
