import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';

const coffee = {
  name: 'string',
  brand: 'string',
  flavors: ['string'],
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5433,
          username: 'postgres',
          password: 'sami1234',
          database: 'coffee_test_bd',
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /', () => {
    return (
      request(app.getHttpServer())
        .post('/coffees')
        .set('Authorization', 'Bearer' + process.env.API_KEY)
        .send(coffee as CreateCoffeeDto)
        .expect(HttpStatus.CREATED)
        // .expect({ id: 1, name: 'Espresso', price: 50 });
        .then(({ body }) => {
          const expectedCoffee = {
            ...coffee,
            flavours: jasmine.arrayContaining(
              coffee.flavors.map((name) => jasmine.objectContaining({ name })),
            ),
          };
          expect(body).toEqual(expectedCoffee);
        })
    );
  });

  it('Get all [GET /');
  it('Get one [GET /:id');
  it('Update one [PATCH /:id');
  it('Delete one [DELETE /:id');

  afterAll(async () => {
    await app.close();
  });
});
