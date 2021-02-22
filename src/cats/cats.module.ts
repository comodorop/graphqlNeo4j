import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatResolver } from './cats.resolver';
import { CatSchema, Cat } from './cats.schema'
import { CatsService } from './cats.services';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatResolver, CatsService],
})
export class CatsModule { }
