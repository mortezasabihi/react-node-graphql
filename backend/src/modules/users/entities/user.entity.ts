import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';
import { Role } from '../enums/role.enum';

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.password = '';
      return ret;
    },
  },
})
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'User fullname' })
  name: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User email' })
  email: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User password' })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.USER })
  @Field(() => String, { description: 'User role' })
  role: Role;

  @Prop({ type: Boolean, default: false })
  @Field(() => Boolean, { description: 'User status' })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
