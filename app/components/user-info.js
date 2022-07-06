/* eslint-disable ember/no-observers */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class UserComponent extends Component {
  constructor() {
    super(...arguments);

    // QUESTION: I'd have expect this to be loaded in a route and passed to the component
    // why do you load the data directly in the compoment?
    // also, why are you loading users/1 not users/me?
    this.store
      .findRecord('user', 1, { reload: true })
      .then((user) => {
        this.username = user.get('name');
      })
      .catch(() => {
        this.username = null;
      });

    // QUESTION: is this to reflect a chnage in the cookie and then reload the user?
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
