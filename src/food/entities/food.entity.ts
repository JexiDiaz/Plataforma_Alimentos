import { Column,
    CreateDateColumn,
    Entity, 
    JoinColumn, 
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
 } from 'typeorm';
import { Dairy } from 'src/dairy/entities/dairy.entity';
import { Fruit } from './fruit.entity';
import { FoodImage } from './food.image.entity';
import {  Vegetables } from './vegetables.entity';



@Entity()
export class Food {
    @PrimaryGeneratedColumn({type: 'int4' }) //este decorador hace referencia al primari key
    id?: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 300, nullable: false })
    description: string;

    @Column({ type: 'int4', nullable: false})
    price: number;

    @Column({ type: 'int4', nullable: false})
    stock: number;  
    
    @Column({type: 'int4', nullable: true})
    dairy_id: number;
    
    @Column({type: 'varchar', nullable: true })
    filename: string;

    //Esta columna me servira para almacenar la hora y la fecha en la que se crea est registro  
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({type: 'int4', nullable: false})
    vegetables_id: number;

    @Column({type: 'int4', nullable: false})
    fruit_id: number;


    //Relaciones  Dairy

    @ManyToOne(() => Dairy)
    @JoinColumn({
    name: 'dairy_id', //es el camponde referencia a mi tabla dairy_id
    referencedColumnName: 'id', //Este es el id del dairy
    })
   autor: Dairy;


  //Relaciones de vegetables
  @ManyToOne(() => Vegetables)
  @JoinColumn({
  name: 'vegetables_id', //es el campo en relacion a mi tabla  categoria_id
  referencedColumnName: 'id', //Este es el id del usuario 
  })
 vegetables: Vegetables;



  //Relaciones de fruit
  @ManyToOne(() => Fruit)
  @JoinColumn({
  name: 'fruit_id', //es el campo en relacion a mi tabla  fruit_id
  referencedColumnName: 'id', //Este es el id de las frutas 
  })
  fruit: Fruit;

  //Un alimento puede tener muchas imagenes
 //Definicion de la relacion OneToMany
 
  @OneToMany(() => FoodImage, (foodImage) => foodImage.food, {
    cascade: true,
  })
  images?: FoodImage[];
}
   
