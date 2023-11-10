import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
    

    export class CreateFruitDto {
        @IsNotEmpty()
        @IsNumber()
        id?: number;
       
        @IsString()
        @IsNotEmpty()
        @MaxLength(100)
        fruit: string;

        @IsNotEmpty()
        @IsNumber()
        dairy_id: number;

        @IsDateString()
        @IsOptional()
        created_at: Date;

    }