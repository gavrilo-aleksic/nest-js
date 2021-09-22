import { OrganizationModel } from 'src/modules/organization/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity({ name: 'user_organization' })
export class UserOrganizationModel {
  @PrimaryGeneratedColumn()
  public id?: number;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @ManyToOne(() => UserModel, { nullable: true, cascade: true })
  public user: UserModel;

  @ManyToOne(() => OrganizationModel, { nullable: true, cascade: true })
  public organization: OrganizationModel;

  @Column({ nullable: true, type: 'json' })
  public roles: IUserRoles;
}
