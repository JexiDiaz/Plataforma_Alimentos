import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { VegetablesService } from '../services/vegetables.service';
import { CreateVegetablesDto } from '../dto/vegetables.dto';


  @Controller('vegetables')
  
    export class VegetablesController {
      constructor(private readonly vegetablesServices: VegetablesService) {}
  
      @Post()
       async create(@Body() vegetablesDto: CreateVegetablesDto ) {
     return await this.vegetablesServices.create(vegetablesDto);
     }
  
     @Get() //Este seria para encontrar todas los vegetales
     findAll() { 
     return this.vegetablesServices.findAll();
     }
   
      @Get(':id')
      finOne( @Param('id', ParseIntPipe)  id: number) {
      return this.vegetablesServices.findOne(id);
      }
  
      @Delete(':id')
      remove(@Param('id', ParseIntPipe) id: number) {
      return this.vegetablesServices.remove(id);
     }
  
     @Patch(':id')
     update( 
       @Param('id', ParseIntPipe) id: number,
       @Body() createVegetablesDto:CreateVegetablesDto, 
        ) {
         return this.vegetablesServices.update(id,createVegetablesDto)
        }
     }