import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
    

    export class CreateFoodDto {
        @IsNotEmpty()
        @IsNumber()
        id?: number;
        //  EN EL DTO SE VALIDA QUE LA INFORM QUE SE AGREGUE SEA LA CORRECTA 

        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        name: string;
        
        @IsString()
        @IsNotEmpty()
        @MaxLength(200)
        description: string;

        @IsString()
        @IsNotEmpty()
        @MaxLength(300)
        type: string;

        @IsNumber()
        @IsNotEmpty()
        price: number;

        @IsNumber()
        @IsNotEmpty()
        stock: number;

        @IsString()
        @IsOptional()
        filename: string;

        @IsDateString()
        @IsOptional()
        created_at: string;

        @IsNumber()
        @IsNotEmpty()
        vegetables_id: number;

        @IsNumber()
        @IsNotEmpty()
        fruit_id: number;
        
      //El images en el string lleva [] porque es un arreglo
        @IsArray({ each: true })
        @IsString()
        @IsOptional()
        images?: string[];

    }

