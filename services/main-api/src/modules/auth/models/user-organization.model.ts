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

const createAdminRole = (): IUserRoles => ({ admin: true });
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
    onDelete: 'CASCADE',
  })
  public organization: OrganizationModel;

  @Column({ nullable: true, type: 'json' })
  public roles: IUserRoles;

  public static createUserOrganization(
    userId: number,
    organizationId: number,
    isAdmin?: boolean,
  ) {
    const userOrganization = new UserOrganizationModel();
    userOrganization.organizationId = organizationId;
    userOrganization.userId = userId;
    if (isAdmin) {
      userOrganization.roles = createAdminRole();
    }
    return userOrganization;
  }
}
