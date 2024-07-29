import UserBook from "./userBookModel";
import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  DataType,
  HasMany,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
})
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => UserBook)
  userBooks!: UserBook[];
}

export default User;
