import NeverLoadData from './neverLoadData';
import LoadDataById, { LoadDataByIdOptions } from './loadDataById';
import LoadDataByIdList, { LoadDataByIdListOptions } from './loadDataByIdList';
import LoadDataByUrl from './loadDataByUrl';
import { LoadData, Schema } from '../interfaces';
import { validateSchema } from '../utils';

type Options = {
  schema: Schema;
  id?: LoadDataByIdOptions['id'];
  shouldFetchData?: LoadDataByIdOptions['shouldFetchData'];
  findEntityIds?: LoadDataByIdListOptions['findEntityIds'];
};

export function createLoadDataOptions(
  url: string,
  options: LoadDataByIdListOptions
): LoadData;
export function createLoadDataOptions(
  url: string,
  options: LoadDataByIdOptions
): LoadData;
export function createLoadDataOptions(url: string): LoadData;
export function createLoadDataOptions(
  url: string,
  options?: Options
): LoadData {
  if (!options) return new NeverLoadData();

  validateSchema(options.schema);

  if (!!options.id && !!options.findEntityIds)
    throw new Error(
      'Invalid options, you should only use "id" or "findEntityIds".'
    );

  if (!!options.id) return new LoadDataById(options as LoadDataByIdOptions);

  if (!!options.findEntityIds)
    return new LoadDataByIdList(options as LoadDataByIdListOptions);

  return new LoadDataByUrl({ url });
}