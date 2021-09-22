import { Exclude } from 'class-transformer';
import { OrganizationModel } from 'src/modules/organization/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserOrganizationModel } from './user-organization.model';

@Entity()
export class UserModel {
  constructor(username: string, password: string) {
    this.username = username;
    this.encPassword = password;
  }
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false, unique: true })
  public username: string;

  @Column({ nullable: false })
  @Exclude()
  public encPassword: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @ManyToOne(() => OrganizationModel, {
    eager: true,
    nullable: true,
  })
  public selectedOrganization?: OrganizationModel;

  @OneToMany(
    () => UserOrganizationModel,
    (userOrganization) => userOrganization.organization,
    { nullable: true },
  )
  public organizations?: OrganizationModel[];
}
