import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { configInstance } from "./config";
import { AppModule } from "./modules/app/AppModule";
import { allExceptions } from "./modules/app/errors/Errors";

async function bootstrap(): Promise<void> {
    console.info(`App starting in ${configInstance.env}/${process.env.APP_ENV}/${process.env.NODE_ENV} environment`);

    const app = await NestFactory.create(AppModule, {
        logger: ["debug", "error", "log", "verbose", "warn"],
    });

    app.enableCors(configInstance.nestApp.enableCors);
    app.use(configInstance.nestApp.useHelmet);
    app.use(configInstance.nestApp.useCookieParser);
    app.use(configInstance.nestApp.useBodyParser);
    app.setGlobalPrefix(...configInstance.nestApp.setGlobalPrefix);
    app.useGlobalPipes(...configInstance.nestApp.useGlobalPipes);

    const documentConfig = new DocumentBuilder()
        .addBearerAuth()
        .setExternalDoc("json", `/docs-json`)
        .setVersion("")
        .build();
    const document = SwaggerModule.createDocument(app, documentConfig, {
        deepScanRoutes: true,
        extraModels: [...allExceptions],
    });
    SwaggerModule.setup("docs", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: "alpha",
            operationsSorter: "alpha",
        },
        customSiteTitle: "flightz - docs",
    });

    // Run the server.
    await app.listen(3000);
}

bootstrap();
