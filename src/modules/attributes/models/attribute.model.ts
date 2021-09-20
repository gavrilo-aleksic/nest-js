import { OrganizationModel } from 'src/modules/organization/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttributeTypeEnum } from './attirubute-type.enum';

@Entity()
export class AttributeModel {
  constructor(name: string) {
    this.name = name;
  }
  @PrimaryGeneratedColumn()
  public id?: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public type: AttributeTypeEnum;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => OrganizationModel, { nullable: false })
  public organization: OrganizationModel;
}
