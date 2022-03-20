import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Logger } from 'src/classes/logger';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserModel } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private readonly model: UserModel,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...rest } = createUserInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.model({
      ...rest,
      password: hashedPassword,
    });

    try {
      await user.save();

      return user.toJSON();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }

      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(_id: string) {
    const user = await this.model.findOne({ _id }).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    await this.findOne(_id);

    try {
      const user = await this.model.findOneAndUpdate(
        { _id },
        { $set: updateUserInput },
        { new: true },
      );

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }

      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(_id: string) {
    const user = await this.model.findByIdAndDelete(_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return true;
  }
}
