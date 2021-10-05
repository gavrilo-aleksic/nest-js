import { getManager, Repository as TypeORMRepository } from 'typeorm';

export class Repository<EntityType extends { id?: number; [k: string]: any }> {
  public entity: any;
  public repository: TypeORMRepository<EntityType>;

  constructor(entity: any) {
    this.entity = entity;
  }

  async getRepository() {
    return getManager().getRepository<EntityType>(this.entity);
  }

  async query(query: string) {
    return (await this.getRepository()).query(query);
  }

  async save(entity: Partial<EntityType>, withReload?: boolean) {
    const updateResult = (await this.getRepository()).save(entity);
    if (withReload) {
      return (await this.getRepository()).findOne({ id: entity.id });
    }
    return updateResult;
  }

  async saveMany(entities: EntityType[]) {
    return (await this.getRepository()).save(entities);
  }

  async update(entity: EntityType) {
    return (await this.getRepository()).update(entity.id, entity);
  }

  async deleteById(id: number) {
    return (await this.getRepository()).delete(id);
  }
}
