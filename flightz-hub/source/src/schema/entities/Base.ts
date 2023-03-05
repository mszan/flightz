import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

export interface BaseInterface {
    id: number;
}

@Entity({ abstract: true })
export abstract class Base implements BaseInterface {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property({
        columnType: "timestamp(0)",
        defaultRaw: "CURRENT_TIMESTAMP",
        nullable: false,
    })
    createdAt: Date = new Date();

    @Property({
        columnType: "timestamp(0)",
        onUpdate: () => new Date(),
    })
    updatedAt: Date = new Date();
}
