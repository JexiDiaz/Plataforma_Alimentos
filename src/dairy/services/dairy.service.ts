import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Dairy } from "../entities/dairy.entity";
import { DairyImage } from "../entities/dairy.image.entity";
import * as bcrypt from 'bcrypt';
import { CreateDairyDto } from "../dto/dairy.dto";
import { LoginDairyDto } from "../dto/login-dairy.dto";



@Injectable()
export class DairyService{
    constructor(
     @InjectRepository(Dairy)
      private  readonly dairyRepo: Repository<Dairy>,

     @InjectRepository(DairyImage)
        private dairyImageRepo: Repository<DairyImage>,

        private readonly dataSource: DataSource,
    ){}

    async create (dairyDto: CreateDairyDto){
        const {images = [], code, ...detailDairy} = dairyDto;
        const dairy = await this.dairyRepo.create({
            ...detailDairy,
            code: bcrypt.hashSync(code, 10),
            images:images.map((image) => this.dairyImageRepo.create({url:image}))
        });

        await this.dairyRepo.save(dairy);
        return  dairy;
    }

    async login(login: LoginDairyDto) {
        const { code } = login;
        const dairy = await  this.dairyRepo.findOne({
            select: { code: true},
        });

        if (!dairy) {
            throw new UnauthorizedException(
             'Credenciales no validas,  no encontrado',
            );
        }
    
        //Comparar si  la password ingresada es la misma que esta en la base de datos 
        if (!bcrypt.compareSync(code, dairy.code)) {
            throw new UnauthorizedException(
                'Credenciales no validas, codigo incorrecto',
            );
        }

        return dairy;
    }

    //Encontrar un lacteo
    findOne(id: number){
        return this.dairyRepo.findOne({  
            where:{id},
            relations:{
            images:true
        }});
    }
    //mostrar todos los lacteos
    findAll(){
        return   this.dairyRepo.find({
            order: {id: 'ASC'},
            relations:{
            images:true}
        });
    }
    //eliminar un lacteo
    async remove(id:number){
        const dairy =await this.findOne(id);
        await this.dairyRepo.remove(dairy);
        return ' Estos lacteos estan eliminado';
    }

  
    async update(id: number, dairyDto: CreateDairyDto){
        const {images, ...updateAll} = dairyDto
        const dairy = await this.dairyRepo.preload({
           id:id,
            ... updateAll
        });

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images){
            await queryRunner.manager.delete(DairyImage, {dairy: {id}});

            dairy.images = images.map((image)=>
                this.dairyImageRepo.create({url: image}),
            )

        }else{
            dairy.images =await this.dairyImageRepo.findBy({ dairy: {id}});
        }

        await queryRunner.manager.save(dairy);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return dairy;
    }
}