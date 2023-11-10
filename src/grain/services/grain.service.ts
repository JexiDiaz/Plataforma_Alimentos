import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grain } from '../entities/grain.entity';
import { CreateGrainDto } from '../dto/grain.dto';



@Injectable()
export class GrainService {
  constructor(
    @InjectRepository(Grain)
    private readonly grainRepo: Repository<Grain>,
  ) {}

  //Este es para crear un registro de los granos
  async create(createGrainDto: CreateGrainDto) {
    const grain = this.grainRepo.create(createGrainDto);
    await this.grainRepo.save(grain);

    return grain;
  }

    //Encontrar un grano
    findOne(id: number){
      return this.grainRepo.findOneBy({id});
    }
  
    //Mostrar todos los grano
    findAll(){
      return this.grainRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de los granos
    async remove(id: number){
      const Grain = await this.findOne(id);
      await this.grainRepo.remove(Grain);
      return 'Granos  eliminados satisfactoriamente';
    }

    //Actualizar un grano 
    async update(id: number, cambios: CreateGrainDto){
      // aqui se encuentra los granos
      const oldGrain = await this.findOne(id);
      //Aqui lo actualizo o lo uno con los nuevos cambios
      const updatedGrain = await this.grainRepo.merge(oldGrain, cambios);
      //Aqui retornare  a la marca
      return this.grainRepo.save(updatedGrain);
    }
  }
