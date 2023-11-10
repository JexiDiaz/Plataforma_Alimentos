import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodController } from './controllers/food.controller';
import { FoodService } from './services/food.service';
import { FoodImage } from './entities/food.image.entity';
import { Fruit } from './entities/fruit.entity';
import { FruitController } from './controllers/fruits.controller';
import { FruitService } from './services/fruit.service';
import { Vegetables } from './entities/vegetables.entity';
import { VegetablesService } from './services/vegetables.service';
import { VegetablesController } from './controllers/vegetables.controller';





@Module({
    imports: [TypeOrmModule.forFeature([Food, FoodImage,Vegetables, Fruit])], 
    controllers: [FoodController, VegetablesController, FruitController],
    //Aqui van los controladorres
    providers: [FoodService, VegetablesService, FruitService],
    // aqui van los servicios
   
})


export class FoodModule{}