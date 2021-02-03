export default class NeverLoadData {
  shouldFetchData() {
    return true;
  }

  filter() {
    return false;
  }

  normalize(data: unknown) {
    return data;
  }
}
