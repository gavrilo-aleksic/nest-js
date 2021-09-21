import { Exclude } from 'class-transformer';
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
  @Exclude()
  public encPassword: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @ManyToOne(() => OrganizationModel, { eager: true, nullable: true })
  public selectedOrganization?: OrganizationModel;

  public selectedOrganizationId?: number;

  @ManyToMany(() => OrganizationModel)
  @JoinTable({
    name: 'user_organization',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'organization_id' },
  })
  public organizations?: OrganizationModel[];
}
