import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import bcrypt from 'bcrypt';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;


  // Hash the password before inserting into the database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async verifyPassword(plainTextPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, this.password);
  }
}
