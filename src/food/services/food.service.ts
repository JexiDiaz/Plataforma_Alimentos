import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateFoodDto } from '../dto/food.dto';
import { Food } from '../entities/food.entity';
import { FoodImage } from '../entities/food.image.entity';


@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly  foodRepo: Repository<Food>,

    @InjectRepository(FoodImage)
    private readonly foodImageRepo: Repository<FoodImage>,

    private readonly dataSource: DataSource,
) {}

  //CREAR UN ALIMENTO Y AGREGAR LAS IAMGENES
  async create(foodDto: CreateFoodDto) {
    const { images = [], ...detailsFood} = foodDto;


    const food = await this.foodRepo.create({
      ...detailsFood,
      images: images.map((image) => 
       this.foodImageRepo.create({ url: image }),

      ),
    });

    await this.foodRepo.save(food);
    return food;
  }

    
  //Encontrar un alimento
  //Encontrar un registro de los vegetales
    findOne(id: number){
      return this.foodRepo.findOne({
        where: {id},
        relations: {
          autor: true,
          vegetables: true,
        }
    });
  }
    //Mostrar todos los registros de los alimentos
    findAll(){
      return this.foodRepo.find({
       order: {id: 'ASC' }, 
       relations: {
       images: true,
       },
      });
    }

    //Eliminar un registro de alimentos

    async remove(id: number){
      const Food = await this.findOne(id);
      await this.foodRepo.remove(Food);
      return 'Alimentos eliminado satisfactoriamente';
    }
 
      //Actualizar un alimento con imagenes
      async update(id: number, cambios: CreateFoodDto) {
        const { images, ...updateAll } = cambios;
        const food = await  this.foodRepo.preload({
          id: id,
          ...updateAll,
         });

         //Empezamos a correr nuestro queryRunner, esto seria el punto de partida de nuestra trnassaccion 
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if (images) {
          //Si images no esta vacio, vamos a borrar las imagenes existentes
          await queryRunner.manager.delete(FoodImage, { food: { id }});

        
          //Aqui creamos nuevas iamgenes del producto
          food.images = images.map((image) =>
           this.foodImageRepo.create({url: image }),
          );
        } else {
          food.images = await this.foodImageRepo.findBy({food: { id } });
        }

        //Guardamos el alimento
        await queryRunner.manager.save(food);

        //Finalizamos la transaccion y liberamos el queryRunner
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return food;
      }
    }
