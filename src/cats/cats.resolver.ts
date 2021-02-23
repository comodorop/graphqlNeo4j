import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";
import { CatsService } from "./cats.services";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatInput } from "./inputs/cat.input";

@Resolver()
export class CatResolver {
  constructor(
    private catServices: CatsService,

  ) { }

  @Query(() => [CreateCatDto])
  async cats() {
    return this.catServices.findAll()
  }

  @Mutation(() => CreateCatDto)
  async createCats(@Args('input') input: CatInput) {
    return this.catServices.create(input)
  }

}