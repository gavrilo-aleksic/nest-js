import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column({ nullable: false })
  public username: string;

  @Column({ nullable: false })
  public encPassword: string;
}
