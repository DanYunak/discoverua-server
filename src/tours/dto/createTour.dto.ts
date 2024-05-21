import { IsNotEmpty } from 'class-validator'

export class CreateTourDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    location: string

    @IsNotEmpty()
    price: number
    
    @IsNotEmpty()
    persons: number

    @IsNotEmpty()
    duration: number

    @IsNotEmpty()
    img: string
}