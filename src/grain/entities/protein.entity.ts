import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';
import { Grain } from './grain.entity';


@Entity()
  export class Protein{
    @PrimaryGeneratedColumn({type: 'int4' }) 
    id?: number;

    @Column({ type: 'int8', nullable: false })
     grain_id: number;

    @Column({ type:'varchar', nullable: false})
      nombre: string;


    @Column({ type:'int8', nullable: false})
    dairy_id: number;
   
    
    @ManyToOne(() =>  Grain)
    @JoinColumn ({
        name:'dairy_id',
        referencedColumnName: 'id',
    })

    autor: Grain;
  
}


