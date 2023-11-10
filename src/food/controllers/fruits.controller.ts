import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { FruitService } from '../services/fruit.service';
import { CreateFruitDto } from '../dto/fruit.dto';

  @Controller('fruit')
  
    export class FruitController {
      constructor(private readonly fruitService: FruitService) {}
  
      @Post()
       async create(@Body() fruitDto: CreateFruitDto) {
     return await this.fruitService.create(fruitDto);
     }
  
     @Get() //Este seria para encontrar todos las frutas 
     findAll() { 
     return this.fruitService.findAll();
     }
   
      @Get(':id')
      finOne( @Param('id', ParseIntPipe)  id: number) {
      return this.fruitService.findOne(id);
      }
  
      @Delete(':id')
      remove(@Param('id', ParseIntPipe) id: number) {
      return this.fruitService.remove(id);
     }
  
     @Patch(':id')
      update( 
         @Param('id', ParseIntPipe) id: number,
         @Body() createFruitDto:CreateFruitDto, 
         ) {
         return this.fruitService.update(id,createFruitDto)
         }
    }