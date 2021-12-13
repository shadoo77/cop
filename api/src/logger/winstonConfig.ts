import { createLogger, format, transports } from 'winston';

const { printf, combine, colorize } = format;

const currentDateTime = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const hours = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  const msec = today.getMilliseconds();
  return `${day}/${month}/${year} - ${hours}:${min}:${sec}:${msec}`;
};

const myFormat = printf(({ level, message }) => `${currentDateTime()} [${level}]: ${message}`);

const logger = createLogger({
  level: 'silly',
  format: myFormat,
  transports: [
    new transports.Console({
      format: combine(colorize(), myFormat),
    }),
  ],
});

export default logger;
