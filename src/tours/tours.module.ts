import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { AuthModule } from '../auth/auth.module';
import { ToursController } from './tours.controller';
import { ToursRepository } from './tours.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour]),
    AuthModule
  ],
  providers: [ToursService, ToursRepository],
  controllers: [ToursController]
})
export class ToursModule {}
