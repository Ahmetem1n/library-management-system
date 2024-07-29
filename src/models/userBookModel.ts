import User from "./userModel";
import Book from "./bookModel";
import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsTo,
} from "sequelize-typescript";

@Table({
  tableName: "user_books",
  timestamps: true,
})
class UserBook extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId!: number;

  @Column({
    type: DataType.INTEGER,
  })
  score!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  borrowDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  returnDate?: Date;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Book)
  book!: Book;
}

export default UserBook;
