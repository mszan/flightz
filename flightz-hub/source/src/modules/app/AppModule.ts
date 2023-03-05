import { HttpModule } from "@nestjs/axios";
import { Module, ModuleMetadata } from "@nestjs/common";
import { OrmModule } from "../orm/OrmModule";
import { AppController } from "./controllers/AppController";

export const moduleMetadata: ModuleMetadata = {
    imports: [
        // NEST MODULES
        HttpModule.register({
            validateStatus: function (status: number) {
                return status >= 200 && status < 400; // default
            },
        }),
        OrmModule,
    ],
    providers: [],
    controllers: [AppController],
};

@Module(moduleMetadata)
export class AppModule {}
