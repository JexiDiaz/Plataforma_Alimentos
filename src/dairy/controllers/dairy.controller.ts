import { Controller,
    Post,
     Body, 
     Get, 
     Param,
     ParseIntPipe,
     Delete, 
     Patch,
     } from '@nestjs/common';
import { DairyService } from '../services/dairy.service';
import { CreateDairyDto } from '../dto/dairy.dto';
import { LoginDairyDto } from '../dto/login-dairy.dto';

 
 
 @Controller('dairy')
 export class DairyController {
   constructor(private readonly dairyServices: DairyService) {}
 
   @Post()
   async create(@Body() dairyDto: CreateDairyDto ) {
     return await this.dairyServices.create(dairyDto);
   }

   @Post('login')
   async login(@Body() login: LoginDairyDto) {
    return this.dairyServices.login(login);
   }

   @Get() //Este seria para encontrar todo los dairy
   findAll() { //Este seria para encontrar un dairy
     return this.dairyServices.findAll();
   }
 
   @Get(':id')
   finOne( @Param('id', ParseIntPipe)  id: number) {
     return this.dairyServices.findOne(id);
   }
    //El param se utiliza para cuando estamos tocando los campos de la base de datos
 
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
    return this.dairyServices.remove(id);
   }
 
   //El metodo Patch actualiza parcialmente, solamente lo necesario
   // Los pipes son transformadores, transforman la data
   @Patch(':id')
   update( 
     @Param('id', ParseIntPipe) id: number,
     @Body() createDairyDto:CreateDairyDto, 
     ) {
       return this.dairyServices.update(id,createDairyDto)
     }
   }
 