import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityTypeModel } from './entity-type.model';

@Entity()
export class EntityModel {
  @PrimaryGeneratedColumn()
  public id?: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => EntityTypeModel, { nullable: false })
  public entityType: EntityTypeModel;
}
