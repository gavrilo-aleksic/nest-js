import { OrganizationModel } from 'src/modules/organization/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
  public id?: string;

  @Column({ nullable: false })
  public username: string;

  @Column({ nullable: false })
  public encPassword: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToMany((type) => OrganizationModel)
  @JoinTable({
    name: 'user_organization',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'organization_id' },
  })
  public organizations?: OrganizationModel[];
}
