import { IsOptional, IsString } from 'class-validator';

export class GetToursFilterDto {
    @IsOptional()
    @IsString()
    search?: string
}