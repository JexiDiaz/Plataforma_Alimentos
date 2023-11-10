import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFruitDto } from "../dto/fruit.dto";
import { Fruit } from '../entities/fruit.entity';


 @Injectable()
 export class FruitService {
  constructor(
    @InjectRepository(Fruit)
    private readonly fruitRepo: Repository<Fruit>,
  ) {}

  //Este es para crear un registro de proveedor
  async create(createFruitDto: CreateFruitDto) {
    const fruit = this.fruitRepo.create(createFruitDto);
    await this.fruitRepo.save(fruit);

    return fruit;
  }

    //Encontrar un registro de las frutas
    findOne(id: number){
      return this.fruitRepo.findOneBy({id});
  }
    //Mostrar todos las frutas
    findAll(){
      return this.fruitRepo.find({
       order: {id: 'ASC' }, 
      });
    }

    //Eliminar un registro de las frutas
    async remove(id: number){
      const Fruit = await this.findOne(id);
      await this.fruitRepo.remove(Fruit);
      return 'Frutas eliminadas satisfactoriamente';
    }
     //Actualizar un frutas
    async update(id: number, cambios: CreateFruitDto){
      const oldFruit = await this.findOne(id);
      const updatedFruit= await this.fruitRepo.merge( oldFruit, cambios);
      return this.fruitRepo.save(updatedFruit);
    }
 }