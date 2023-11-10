import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./food.entity";


@Entity()
export class FoodImage{
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({type: 'varchar', nullable: true })
    url: string;

    //Relaciones

    //TODO: Escribir una relacion que se llamara alimentos
    //Muchas imagenes seran de un alimento
    @ManyToOne(() => Food, (food) => food.images, {
      onDelete: 'CASCADE',
    })
    food: Food;
}
