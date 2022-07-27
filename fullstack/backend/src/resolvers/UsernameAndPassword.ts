import { Field, InputType } from 'type-graphql';

@InputType()
export class UsernameAndPassword {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
