import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dairy } from './entities/dairy.entity';
import { DairyImage } from './entities/dairy.image.entity';
import { DairyController } from './controllers/dairy.controller';
import { DairyService } from './services/dairy.service';


@Module({
    imports: [TypeOrmModule.forFeature([Dairy,DairyImage])],
    controllers: [DairyController],
    providers: [DairyService],
    exports: [TypeOrmModule, DairyModule]
   
})
export class DairyModule{}