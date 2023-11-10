import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Protein } from '../entities/protein.entity';
import { CreateProteinDto } from '../dto/protein.dto';


 @Injectable()
 export class ProteinService {
  constructor(
    @InjectRepository(Protein)
    private readonly proteinRepo: Repository<Protein>,
  ) {}

  //Este es para crear un registro de proteinas
  async create(createProteinDto: CreateProteinDto) {
    const protein = this.proteinRepo.create(createProteinDto);
    await this.proteinRepo.save(protein);

    return protein;
  }
    //Encontrar un registro de  proteinas
    findOne(id: number){
      return this.proteinRepo.findOne({
        where: {id},
        relations: {
          autor: true,
        }
    });
  }
    //Mostrar todas las proteinas
    findAll(){
      return this.proteinRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de las proteinas
    async remove(id: number){
      const Protein = await this.findOne(id);
      await this.proteinRepo.remove(Protein);
      return 'Proteina eliminada satisfactoriamente';
    }
     //Actualizar una proteina
    async update(id: number, cambios: CreateProteinDto){
      const oldProtein = await this.findOne(id);
      const updatedProtein = await this.proteinRepo.merge(oldProtein, cambios);
      return this.proteinRepo.save(updatedProtein);
    }
  }