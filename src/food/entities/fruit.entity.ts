import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
  export class Fruit{
    @PrimaryGeneratedColumn({type: 'int4' }) 
    id?: number;

    @Column({ type: 'varchar', nullable: false })
    fruit: string;

    @Column({ type:'int8', nullable: false})
    dairy_id: number;

    @CreateDateColumn({ type:'timestamp', default: () => 'CONCURRENT_TIMESTAMP'})
    created_at: Date;

  }