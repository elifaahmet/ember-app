/* eslint-disable ember/no-observers */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class UserComponent extends Component {
  constructor() {
    super(...arguments);

    this.store
      .findRecord('user', 1, { reload: true })
      .then((user) => {
        this.username = user.get('name');
      })
      .catch(() => {
        this.username = null;
      });

    this.cookieValue.on('updateToken', () => this.tokenDidUpdate(this));
  }
  @service store;
  @service cookieValue;
  @tracked username;

  get getUserName() {
    return this.username;
  }

  tokenDidUpdate(_this) {
    _this.store
      .findRecord('user', 1, { reload: true })
      .then((user) => {
        _this.username = user.get('name');
      })
      .catch(() => {
        _this.username = null;
      });
  }
}
