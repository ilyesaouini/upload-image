import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'image'})
export class Images {
@PrimaryGeneratedColumn()
id: number;

@Column({name:"image", type:"varchar", length:255, nullable: false})
image: string;

@Column({name:"update_at", type:"datetime"})
updateAt: Date;
}