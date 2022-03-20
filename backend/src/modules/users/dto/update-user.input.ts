import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'] as const),
) {
  @Field(() => String)
  _id: string;
}
