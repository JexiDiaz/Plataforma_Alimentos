import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { DairyModule } from './dairy/dairy.module';
import { GrainModule } from './grain/grain.module';
import { FilesModule } from './files/files.module';
import { FilesPDFModule } from './filesPDF/filespdf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'shop',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FoodModule,
    DairyModule,
    GrainModule,
    FilesModule,
    FilesPDFModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


