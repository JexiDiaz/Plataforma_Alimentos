
import { Dairy } from 'src/dairy/entities/dairy.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
  export class Vegetables{
    @PrimaryGeneratedColumn({type: 'int4' }) 
    id?: number;

    @Column({ type: 'varchar', nullable: false })
    vegetables: string;

    @CreateDateColumn({ type:'timestamp', default: () => 'CONCURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ type:'int8', nullable: false})
    dairy_id: number;
    
    @ManyToOne(() => Dairy )
    @JoinColumn ({
    name:'dairy_id',
    referencedColumnName: 'id',
    })

    autor: Dairy;
  
}
