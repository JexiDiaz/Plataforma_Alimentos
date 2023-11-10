import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DairyImage } from './dairy.image.entity';



@Entity()
export class Dairy {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar',  nullable: false })
  name: string;

  @Column({ type: 'varchar',  nullable: false })
  code: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text', array: true, default: [ 'dairy'] })
  roles: string;

  @OneToMany(() => DairyImage, (dairyImage) => dairyImage.dairy, {
    cascade : true
  })
  images?:DairyImage[];
}