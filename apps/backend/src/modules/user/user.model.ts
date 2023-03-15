import { Optional, Sequelize } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

@Table
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @AllowNull(false)
  @NotNull
  @Column
  name: string;

  @AllowNull(false)
  @NotNull
  @Column({
    unique: true,
  })
  email: string;

  @AllowNull(false)
  @NotNull
  @Column
  password: string;

  @AllowNull(true)
  @Column
  avatar: string;
}
