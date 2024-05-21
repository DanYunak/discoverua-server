import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { GetToursFilterDto } from './dto/getToursFilter.dto';
import { CreateTourDto } from './dto/createTour.dto';

@Injectable()
export class ToursRepository extends Repository<Tour> {
    constructor(
        @InjectRepository(Tour)
        repository: Repository<Tour>
    ) {
        super(repository.target, repository.manager, repository.queryRunner)
    }

    async getTours(filterDto: GetToursFilterDto): Promise<Tour[]> {
        const { search } = filterDto

        const query = this.createQueryBuilder('tour')

        if (search) {
            query.andWhere(
                '(LOWER(tour.location) LIKE LOWER(:search))',
                { search: `%${search}%` }
            )
        }

        try {
            const tours = await query.getMany()
            return tours
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }

    async createTour(createTourDto: CreateTourDto): Promise<Tour> {
        const { title, city, location, price, persons, duration, img } = createTourDto

        const tour = this.create({
            title,
            city,
            location,
            price,
            persons,
            duration,
            img
        })

        await this.save(tour)

        return tour
    }
}