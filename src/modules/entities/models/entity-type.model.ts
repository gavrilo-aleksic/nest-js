import { AttributeModel } from 'src/modules/attributes/models/attribute.model';
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
export class EntityTypeModel {
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

  @ManyToOne(() => OrganizationModel, { nullable: false })
  public organization: OrganizationModel;

  @ManyToMany(() => AttributeModel, { eager: true })
  @JoinTable({
    name: 'entity_type_attribute',
    joinColumn: { name: 'entity_type_id' },
    inverseJoinColumn: { name: 'attribute_id' },
  })
  public attributes?: AttributeModel[];
}
