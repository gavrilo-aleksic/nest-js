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

  @ManyToOne(() => UserModel, { nullable: true })
  public user: UserModel;

  @Column({ nullable: true })
  public userId: number;

  @Column({ nullable: true })
  public organizationId: number;

  @ManyToOne(() => OrganizationModel, {
    nullable: true,
  })
  public organization: OrganizationModel;

  @Column({ nullable: true, type: 'json' })
  public roles: IUserRoles;

  public static createUserOrganization(
    user: UserModel,
    organization: OrganizationModel,
    isAdmin?: boolean,
  ) {
    const userOrganization = new UserOrganizationModel();
    userOrganization.organization = organization;
    userOrganization.user = user;
    if (isAdmin) {
      userOrganization.roles = { admin: true };
    }
    return userOrganization;
  }
}
