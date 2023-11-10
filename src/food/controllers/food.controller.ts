import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { CreateFoodDto } from '../dto/food.dto';
import { FoodService } from '../services/food.service';
 
 
@Controller('food')
 export class FoodController {
   constructor(private readonly foodServices: FoodService) {}
 
   @Post()
   async create(@Body() foodDto: CreateFoodDto) {
     return await this.foodServices.create(foodDto);
   }
  
   @Get() //Este seria para encontrar todo los alimentos
   findAll() { //Este seria para encontrar un alimento 
     return this.foodServices.findAll();
   }
 
   @Get(':id')
   finOne( @Param('id', ParseIntPipe)  id: number) {
     return this.foodServices.findOne(id);
   }
    //El param se utiliza para cuando estamos tocando los campos de la base de datos
 
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodServices.remove(id);
   }
 
   //El metodo Patch actualiza parcialmente, solamente lo necesario
   // Los pipes son transformadores, transforman la data
   @Patch(':id')
   update( 
     @Param('id', ParseIntPipe) id: number,
     @Body() createFoodDto:CreateFoodDto, 
     ) {
       return this.foodServices.update(id,createFoodDto)
     }
 
    }