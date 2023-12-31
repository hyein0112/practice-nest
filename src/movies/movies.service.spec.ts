import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies/movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'TestMovie',
        year: 2023,
        genres: ['호러'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'TestMovie',
        year: 2023,
        genres: ['호러'],
      });
      const beforeDelete = service.getAll().length;
      service.remove(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw 404 error', () => {
      try {
        service.remove(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('shuld create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'TestMovie',
        year: 2023,
        genres: ['호러'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'TestMovie',
        year: 2023,
        genres: ['호러'],
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw 404 error', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
