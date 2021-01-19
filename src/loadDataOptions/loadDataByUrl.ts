import {
  Entities,
  Entity,
  QueryPool,
  Remove,
  Union,
  LoadData,
} from '../interfaces';

type Options = {
  // schema: Union;
  url: string;
};

export default class LoadDataByUrl implements LoadData {
  // private schema: Union;
  private url: string;

  constructor(options: Options) {
    // this.schema = options.schema;
    this.url = options.url;
  }

  shouldFetchData({ queryPool }: { queryPool: QueryPool }) {
    return !Object.keys(queryPool).includes(this.url);
  }

  filter({
    changes,
    remove,
    queryPool,
  }: {
    changes: Entities;
    remove: Remove;
    queryPool: QueryPool;
  }): boolean {
    const isUrlExist = queryPool[this.url];
    if (!isUrlExist) return false;
    const [, urlLoadedEntity] = isUrlExist;

    if (!!changes) {
      const updatedEntityKeys = Object.keys(changes);
      const urlLoadedEntityKeys = Object.keys(urlLoadedEntity);
      const intersection = updatedEntityKeys.filter((key) =>
        urlLoadedEntityKeys.includes(key)
      );
      if (intersection.length === 0) return false;

      return intersection.some((key) => {
        const updatedIds = Object.keys(changes[key] as Entity);
        const urlLoadedEntityIds = urlLoadedEntity[key];
        const idIntersection = updatedIds.filter((id) =>
          urlLoadedEntityIds.includes(id)
        );

        return idIntersection.length !== 0;
      });
    }

    if (!!remove) {
      const removedEntityKeys = Object.keys(remove);
      const urlLoadedEntityKeys = Object.keys(urlLoadedEntity);
      const intersection = removedEntityKeys.filter((key) =>
        urlLoadedEntityKeys.includes(key)
      );
      if (intersection.length === 0) return false;

      return intersection.some((key) => {
        const removedIds = remove[key];
        const urlLoadedEntityIds = urlLoadedEntity[key];
        const idIntersection = removedIds.filter((id) =>
          urlLoadedEntityIds.includes(id)
        );

        return idIntersection.length !== 0;
      });
    }

    return false;
  }

  distinct() {
    return false;
  }
}
