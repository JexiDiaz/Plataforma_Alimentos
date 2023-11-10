import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
    

    export class CreateVegetablesDto{
        @IsNotEmpty()
        @IsNumber()
        id?: number;
    
        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        vegetables: string;
        
        @IsDateString()
        @IsOptional()
        created_at: Date;

        @IsNumber()
        @IsNotEmpty()
        dairy_id: number;  

    }