import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToursRepository } from './tours.repository';
import { GetToursFilterDto } from './dto/getToursFilter.dto';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dto/createTour.dto';

@Injectable()
export class ToursService {
    constructor(
        @InjectRepository(ToursRepository)
        private toursRepository: ToursRepository
    ) {}

    getTours(filterDto: GetToursFilterDto): Promise<Tour[]> {
        return this.toursRepository.getTours(filterDto)
    }

    async getTourById(id: string): Promise<Tour> {
        const found = await this.toursRepository.findOneBy({ id })

        if (!found) {
            throw new NotFoundException(`Tour with ID ${id} not found`)
        }

        return found
    }

    async deleteTour(id: string): Promise<void> {
        const result = await this.toursRepository.delete({ id })

        if (result.affected === 0) {
            throw new NotFoundException(`Tour with ID ${id} not found`)
        }
    }

    createTour(createTourDto: CreateTourDto): Promise<Tour> {
        return this.toursRepository.createTour(createTourDto)
    }
}
