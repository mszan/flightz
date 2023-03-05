import { ArgumentsHost, Catch, Logger } from "@nestjs/common";
import { Response } from "express";
import { InternalException } from "../Errors";

@Catch(InternalException)
export class ExceptionFilter implements ExceptionFilter {
    private logger = new Logger(ExceptionFilter.name);

    catch(exception: InternalException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.httpStatus;

        const finalResponse: InternalException = {
            exceptionCode: exception.exceptionCode,
            httpStatus: exception.httpStatus,
            message: exception.message,
            timeStamp: new Date().toISOString(),
        };

        response.status(status).json(finalResponse);
    }
}
