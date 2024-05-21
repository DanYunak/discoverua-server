import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { GetToursFilterDto } from './dto/getToursFilter.dto';
import { Tour } from './tour.entity';
import { CreateTourDto } from './dto/createTour.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/getUser.decorator';

@Controller('tours')
// @UseGuards(AuthGuard())
export class ToursController {
    constructor(private toursService: ToursService) {}

    @Get()
    getTours(@Query() filterDto: GetToursFilterDto): Promise<Tour[]> {
        return this.toursService.getTours(filterDto)
    }

    @Get('/:id')
    getTourById(@Param('id') id: string): Promise<Tour> {
        return this.toursService.getTourById(id)
    }

    @Post()
    createTour(@Body() createTourDto: CreateTourDto): Promise<Tour> {
        return this.toursService.createTour(createTourDto)
    }

    @Delete('/:id')
    deleteTour(@Param('id') id: string): Promise<void> {
        return this.toursService.deleteTour(id)
    }
}
