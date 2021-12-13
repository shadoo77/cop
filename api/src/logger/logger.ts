import winstonLogger from './winstonConfig';

export default () => {
  const generatePrintContentPart = (printContentPart: any) => {
    // since JSON.stringify is not able to handle Error objects, we return those directly
    if (printContentPart instanceof Error) {
      return printContentPart;
    }
    return JSON.stringify(printContentPart);
  };

  const generatePrintContent = (printContent: any) => {
    let printArgumentsResult = '';
    const printArray = [...Object.values(printContent)];
    if (printArray.length > 1) {
      Object.keys(printContent).forEach((key) => {
        printArgumentsResult += `${generatePrintContentPart(printContent[key])} `;
      });
    } else {
      printArgumentsResult += `${generatePrintContentPart(printArray[0])} `;
    }
    return printArgumentsResult;
  };

  const error = (...args: any[]) => {
    winstonLogger.error(generatePrintContent(args));
  };

  const warn = (...args: any[]) => {
    winstonLogger.warn(generatePrintContent(args));
  };

  const info = (...args: any[]) => {
    winstonLogger.info(generatePrintContent(args));
  };

  const verbose = (...args: any[]) => {
    winstonLogger.verbose(generatePrintContent(args));
  };

  const debug = (...args: any[]) => {
    winstonLogger.debug(generatePrintContent(args));
  };

  const enter = (...args: any[]) => {
    winstonLogger.debug(generatePrintContent(['ENTER', ...args]));
  };

  const exit = (...args: any[]) => {
    winstonLogger.debug(generatePrintContent(['EXIT', ...args]));
  };

  const silly = (...args: any[]) => {
    winstonLogger.silly(generatePrintContent(args));
  };

  return {
    error,
    warn,
    info,
    verbose,
    debug,
    enter,
    exit,
    silly,
  };
};
