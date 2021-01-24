export default class NeverLoadData {
  shouldFetchData() {
    return true;
  }

  filter() {
    return false;
  }
}
