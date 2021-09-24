import { OrganizationModel } from 'src/modules/organization/models/organization.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttributeTypeEnum } from './attribute-type.enum';

@Entity()
export class AttributeModel {
  constructor(
    name: string,
    displayName?: string,
    type?: AttributeTypeEnum,
    required?: boolean,
  ) {
    this.name = name;
    this.displayName = displayName;
    this.type = type || 'STRING';
    this.required = required || false;
  }
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: true })
  public displayName: string;

  @Column({ nullable: false })
  public type: AttributeTypeEnum;

  @Column({ nullable: false, default: true })
  public required: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => OrganizationModel, { nullable: false })
  public organization: OrganizationModel;
}
