import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { Logger } from "@nestjs/common";
import { configInstance } from "../../config";

const entitiesPath = "/opt/source/dist/src/schema/entities/**/*.js";
const entitiesTsPath = __dirname + "/../../schema/entities/**/*.ts";
export const logger = new Logger(`ORM`);

// logger.debug(`${Object.keys({ entitiesPath })[0]}: ${entitiesPath}`);
// logger.debug(`${Object.keys({ entitiesTsPath })[0]}: ${entitiesTsPath}`);

// Mikro-ORM configuration object.
export default {
    user: configInstance.db.user,
    password: configInstance.db.pass,
    dbName: configInstance.db.name,
    host: configInstance.db.host,
    port: configInstance.db.port,
    type: "postgresql",

    debug: true,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    logger: logger.debug.bind(logger),
    cache: { options: { cacheDir: "./tmp/orm_cache" } },
    forceUtcTimezone: true,

    entities: [entitiesPath],
    entitiesTs: [entitiesTsPath],

    migrations: {
        path: "./src/modules/orm/migrations",
        tableName: "migrations",
        transactional: true,
        snapshot: false,
    },
} as Options;
