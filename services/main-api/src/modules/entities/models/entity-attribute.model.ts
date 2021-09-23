import { AttributeModel } from 'src/modules/attributes/models/attribute.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { EntityModel } from './entity.model';

export type EntityValue =  string | number | boolean | ({[k: string]: any})

@Entity()
export class EntityAttribute {

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => EntityModel, { nullable: false,  primary: true})
  public entity: EntityModel;

  @ManyToOne(() => AttributeModel, { nullable: false, primary: true })
  public attribute: AttributeModel;

  @Column()
  private rawValue: string;

  public value: EntityValue
}
