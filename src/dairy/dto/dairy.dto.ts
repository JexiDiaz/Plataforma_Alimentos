import { IsArray,
     IsNotEmpty, 
     IsNumber, 
     IsOptional, 
     IsString,
      MaxLength 
    } from 'class-validator';
    

    export class CreateDairyDto {
        @IsNotEmpty()
        @IsNumber()
        id: number;
         

        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        name: string;

        @IsNumber()
        @IsNotEmpty()
        code: number;
        
        @IsString()
        @IsNotEmpty()
        @MaxLength(300)
        active:  boolean;

        @IsNumber()
        @IsNotEmpty()
        stock: number;

     //El images en el string lleva [] porque es un arreglo
        @IsArray({ each: true })
        @IsString()
        @IsOptional()
        images?: string[];
    }
  
