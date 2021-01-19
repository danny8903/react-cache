import { LoadData } from '../interfaces';

export default class NeverLoadData implements LoadData {
  shouldFetchData() {
    return true;
  }

  filter() {
    return false;
  }
  distinct() {
    return true;
  }
}
