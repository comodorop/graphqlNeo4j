import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cats.schema';
import { CatInput } from './inputs/cat.input';
import { Neo4jService } from 'nest-neo4j'


@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
    private readonly neo4jService: Neo4jService) { }

  async create(createCatDto: CatInput): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    this.neo4jService.write(`CREATE (n:cat {name: '${createCatDto.name}', age: '${createCatDto.age.toString()}', breed: '${createCatDto.breed}' })`)
    return createdCat.save();
  }

  async findAll(): Promise<any[]> {
    let lstInfo = []
    const res = await this.neo4jService.read(`MATCH (cat:cat) RETURN cat`)
    for (let data of res.records) {
      lstInfo.push(data.get('cat').properties)
    }
    return lstInfo
  }

}