import { getManager, Repository as TypeORMRepository } from 'typeorm';

export class Repository<EntityType = any> {
  public entity: any;
  public repository: TypeORMRepository<EntityType>;

  constructor(entity: any) {
    this.entity = entity;
  }

  async getRepository() {
    return getManager().getRepository<EntityType>(this.entity);
  }

  async save(entity: EntityType) {
    return (await this.getRepository()).save(entity);
  }

  async saveMany(entities: EntityType[]) {
    return (await this.getRepository()).save(entities);
  }

  async update(entity: EntityType) {
    //@ts-ignore
    return (await this.getRepository()).update(entity.id, entity);
  }

  async deleteById(id: string, logical: boolean) {
    if (logical) {
      //@ts-ignore
      return (await this.getRepository()).update(id, { deleted: 1 });
    } else {
      return (await this.getRepository()).delete(id);
    }
  }
}
