import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { service } from '@ember/service';
import { get } from '@ember/object';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service cookieValue;
  namespace = 'api';

  urlForFindRecord(id, modelName, snapshot) {
    return 'api/users/me';
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.cookieValue.token}`,
    };
  }
}
