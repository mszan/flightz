import { Entity, Property } from "@mikro-orm/core";
import { Base } from "./Base";

@Entity()
export class Test extends Base {
    @Property({ nullable: false })
    test!: string;
}
