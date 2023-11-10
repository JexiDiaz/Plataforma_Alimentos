import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
    

    export class CreateProteinDto{
        @IsNotEmpty()
        @IsNumber()
        id?: number;
    
        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        grain_id: number;

        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        nombre: string;

        @IsNumber()
        @IsNotEmpty()
        dairy_id: number;  

    }