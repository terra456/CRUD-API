export interface IErrorHandler extends Error {
  code: number;
}

class ErrorHandler extends Error implements IErrorHandler {
  code: number;
  
  constructor (code: number, msg: string) {
    super(msg);
    this.code = code;
  }
}

export default ErrorHandler;