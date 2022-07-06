import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Evented from '@ember/object/evented';

export default class CookieValueService extends Service.extend(Evented) {
  @service router;
  @tracked token = `; ${document.cookie}`
    .split(`; idToken=`)
    .pop()
    .split('; ')
    .shift();

  updateToken(token) {
    this.token = token;
    this.trigger('updateToken');
  }
  constructor() {
    super(...arguments);

    const _this = this;
    const checkCookie = (function () {
      let lastCookie = document.cookie; // 'static' memory between function calls

      return function () {
        const currentCookie = document.cookie;

        if (currentCookie !== lastCookie) {
          lastCookie = currentCookie; // store latest cookie
          _this.updateToken(
            `; ${document.cookie}`.split(`; idToken=`).pop().split('; ').shift()
          );
        }
      };
    })();

    window.setInterval(checkCookie, 100);
  }
}
