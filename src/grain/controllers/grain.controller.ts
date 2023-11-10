import { Controller,
  Post,
   Body, 
   Get, 
   Param,
   ParseIntPipe,
   Delete, 
   Patch,
   } from '@nestjs/common';
import { GrainService } from '../services/grain.service';
import { CreateGrainDto } from '../dto/grain.dto';

    @Controller('grain ')

   export class GrainController {
 constructor(private readonly grainService: GrainService) {}

 @Post()
 async create(@Body() GrainDto: CreateGrainDto) {
   return await this.grainService.create(GrainDto);
 }

 @Get() //Este seria para encontrar todos los granos
 findAll() { 
   return this.grainService.findAll();
 }

 @Get(':id')
 finOne( @Param('id', ParseIntPipe)  id: number) {
   return this.grainService.findOne(id);
 }
  
 @Delete(':id')
 remove(@Param('id', ParseIntPipe) id: number) {
  return this.grainService.remove(id);
 }

 @Patch(':id')
 update( 
   @Param('id', ParseIntPipe) id: number,
   @Body() createGrainDto:CreateGrainDto, 
   ) {
     return this.grainService.update(id,createGrainDto)
   }
 }