import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Fullname is too short (2 characters min)' })
  @MaxLength(50, { message: 'Fullname is too long (50 characters max)' })
  @Field(() => String, { description: 'User fullname' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { description: 'User email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @Field(() => String, { description: 'User password' })
  password: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { description: 'User status', nullable: true })
  isActive?: boolean;

  @IsOptional()
  @IsIn([Role.ADMIN, Role.USER])
  @Field(() => String, { description: 'User role', nullable: true })
  role?: Role;
}
