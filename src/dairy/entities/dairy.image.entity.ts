import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dairy } from "./dairy.entity";


@Entity()
export class DairyImage{
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({type: 'varchar', nullable: true })
    url: string;

    //Relaciones

    @ManyToOne(() => Dairy, (dairy) => dairy.images, {
      onDelete: 'CASCADE',
    })
    dairy: Dairy;
}