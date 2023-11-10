import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grain } from './entities/grain.entity';
import { GrainController } from './controllers/grain.controller';
import { GrainService } from './services/grain.service';
import { Protein } from './entities/protein.entity';
import { ProteinController } from './controllers/protein.controllers';
import { ProteinService } from './services/protein.service';




@Module ({
  imports: [TypeOrmModule.forFeature([Grain, Protein])],
  controllers: [ProteinController, GrainController],
  providers: [ProteinService, GrainService],

})
  

export class  GrainModule {} 