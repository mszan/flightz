import { MikroORM } from "@mikro-orm/core";
import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ORM } from "../../orm/OrmModule";
import { ApplyApiInternalServiceExceptionResponse } from "../decorators/ApplyApiInternalServiceExceptionResponse";

@ApplyApiInternalServiceExceptionResponse()
@ApiTags("app")
@Controller("")
export class AppController {
    @Inject(ORM)
    private readonly orm: MikroORM;

    @ApiOperation({
        summary: "Check application health",
    })
    @Get("healthcheck")
    async getHealthcheck() {
        return {
            status: "UP",
        };
    }
}
