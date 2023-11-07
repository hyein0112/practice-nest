import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(
  //   @Query('year') searchingYear: string,
  //   @Query('name') searchingName: string,
  // ) {
  //   return `We are searching for a moie made after: ${searchingYear}, movie name: ${searchingName}`;
  // }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() data: CreateMovieDto) {
    return this.moviesService.create(data);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.moviesService.remove(id);
  }

  @Patch('/:id')
  path(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(id, updateData);
  }
}
