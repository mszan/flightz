import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ExceptionCode, exceptionDataSet } from "../Errors";

export function ApiPropertyMessage(exceptionCode: ExceptionCode) {
    return applyDecorators(
        ApiProperty({
            description: "Detailed description of an exception.",
            default: <string>exceptionDataSet[exceptionCode].message,
        }),
    );
}
