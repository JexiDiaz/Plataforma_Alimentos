import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';


@Entity()
export class  Grain{
   @PrimaryGeneratedColumn({type: 'int4' }) //este decorador hace referencia al primari key
    id?: number;

    @Column({ type: 'varchar', length: 60, nullable: false })
     grain: string;

    @Column({ type:'int8', nullable: false})
      dairy_id: number;

  
}
