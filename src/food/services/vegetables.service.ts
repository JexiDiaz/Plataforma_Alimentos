import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vegetables } from "../entities/vegetables.entity";
import { CreateVegetablesDto } from "../dto/vegetables.dto";



 @Injectable()
 export class VegetablesService {
  constructor(
    @InjectRepository(Vegetables)
    private readonly vegetablesRepo: Repository<Vegetables>,
  ) {}

  //Este es para crear un registro de vegetales
  async create(createVegetablesDto: CreateVegetablesDto) {
    const vegetables = this.vegetablesRepo.create(createVegetablesDto);
    await this.vegetablesRepo.save(vegetables);

    return vegetables;
  }

    //Encontrar un registro de los vegetales
    findOne(id: number){
      return this.vegetablesRepo.findOneBy({id});
  }
    //Mostrar todos los vegetales
    findAll(){
      return this.vegetablesRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de los vegetales
    async remove(id: number){
      const Vegetables = await this.findOne(id);
      await this.vegetablesRepo.remove(Vegetables);
      return 'Vegetales eliminados satisfactoriamente';
    }
     //Actualizar un vegetal
    async update(id: number, cambios: CreateVegetablesDto){
      const oldVegetables = await this.findOne(id);
      const updatedVegetables= await this.vegetablesRepo.merge( oldVegetables, cambios);
      return this.vegetablesRepo.save(updatedVegetables);
    }
 }