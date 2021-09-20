import { UserModel } from 'src/modules/auth/models/user.model';
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
export class OrganizationModel {
  constructor(name: string) {
    this.name = name;
  }
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column({ nullable: false })
  public name: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToMany((type) => UserModel)
  @JoinTable({
    name: 'user_organization',
    joinColumn: { name: 'organization_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  public users?: UserModel[];
}
