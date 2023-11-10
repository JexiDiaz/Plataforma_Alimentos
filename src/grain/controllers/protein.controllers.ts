import { Controller,
  Post,
  Body, 
  Get, 
  Param,
  ParseIntPipe,
  Delete, 
  Patch,
  } from '@nestjs/common';
  import { CreateProteinDto } from '../dto/protein.dto';
  import { ProteinService } from '../services/protein.service';
  
  
  
  @Controller('protein')
  
     export class ProteinController {
   constructor(private readonly proteinService: ProteinService) {}
  
   @Post()
   async create(@Body() ProteinDto: CreateProteinDto ) {
     return await this.proteinService.create(ProteinDto);
   }
  
  @Get() //Este seria para encontrar todas las proteinnas
   findAll() { 
     return this.proteinService.findAll();
   }
   
   @Get(':id')
   finOne( @Param('id', ParseIntPipe)  id: number) {
     return this.proteinService.findOne(id);
   }
  
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
    return this.proteinService.remove(id);
   }
  
   @Patch(':id')
   update( 
     @Param('id', ParseIntPipe) id: number,
     @Body() createProteinDto:CreateProteinDto, 
     ) {
       return this.proteinService.update(id,createProteinDto)
     }
   }
   