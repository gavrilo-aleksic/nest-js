import { OrganizationModel } from 'src/modules/organization/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  public encPassword: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @ManyToOne(() => OrganizationModel, { eager: true })
  public selectedOrganization?: OrganizationModel;

  @ManyToMany((type) => OrganizationModel)
  @JoinTable({
    name: 'user_organization',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'organization_id' },
  })
  public organizations?: OrganizationModel[];
}
