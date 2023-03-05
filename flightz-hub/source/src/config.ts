import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { GlobalPrefixOptions, PipeTransform, RouteInfo } from "@nestjs/common/interfaces";
import { CorsOptions, CorsOptionsDelegate } from "@nestjs/common/interfaces/external/cors-options.interface";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";

export enum AppEnv {
    LOCAL = "local",
    // PRODUCTION = "production",
}

export type Configs = {
    [key in AppEnv]: Config;
};

export type Config = {
    /**
     * Object that contains args passed to ``app`` instance during bootstrapping.
     * E2E tests require the very same args, thus the extracted object.
     */
    nestApp: {
        setGlobalPrefix: [prefix: string, options?: GlobalPrefixOptions<string | RouteInfo>];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useGlobalPipes: [...pipes: PipeTransform<any, any>[]];
        /**
         * Must be called right after ``app.create()``.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useHelmet: [...args: any[]];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useCookieParser: [...args: any[]];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useBodyParser: [...args: any[]];
        enableCors: CorsOptions | CorsOptionsDelegate<unknown>;
    };
    env: AppEnv;
    db: {
        host: string;
        port: number;
        name: string;
        user: string;
        pass: string;
    };
};

export const configs: Configs = {
    local: {
        env: AppEnv.LOCAL,
        nestApp: {
            setGlobalPrefix: ["v1", { exclude: ["healthcheck"] }],
            useGlobalPipes: [
                new ValidationPipe({
                    disableErrorMessages: false,
                    enableDebugMessages: true,
                    exceptionFactory: (errors: unknown) => new BadRequestException(errors),
                    validationError: {
                        value: true,
                        target: true,
                    },
                    transform: true,
                }),
            ],
            useCookieParser: [cookieParser()],
            useHelmet: [helmet()],
            useBodyParser: [bodyParser.json({ limit: "50mb" }), bodyParser.urlencoded({ limit: "50mb" })],
            enableCors: {
                origin: "*", // todo: remove asterix
            },
        },
        db: {
            name: process.env.DB_NAME,
            host: process.env.DB_HOST,
            pass: process.env.DB_PASS,
            port: 5432,
            user: process.env.DB_USER,
        },
    },
};

export let configFactory: () => Config;
switch (process.env.APP_ENV) {
    case AppEnv.LOCAL:
        configFactory = () => configs.local;
        break;
    // case AppEnv.PRODUCTION:
    //     configFactory = () => configs.production;
    //     break;
    default:
        throw new Error(
            `Could not load application config for ${process.env.APP_ENV}/${process.env.NODE_ENV} environment. See app.config.ts for details.`,
        );
}

export const configInstance = configFactory();
