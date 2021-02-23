import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Int } from "type-graphql"

@ObjectType()
export class CreateCatDto {
  // @Field(() => ID)
  // id: string
  @Field()
  readonly name: string
  @Field(() => Int)
  readonly age: number
  @Field()
  readonly breed: string
}