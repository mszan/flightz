import { applyDecorators } from "@nestjs/common";
import { ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { InternalException } from "../errors/Errors";

export function ApplyApiInternalServiceExceptionResponse() {
    return applyDecorators(
        ApiInternalServerErrorResponse({
            type: InternalException,
        }),
    );
}
