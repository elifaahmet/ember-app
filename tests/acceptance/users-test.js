import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { generateJWTToken } from 'ember-app/tests/helpers';

module('Acceptance | Token test', function (hooks) {
  setupApplicationTest(hooks);

  test('I can set the token created by me', async function (assert) {
    const appRoute = this.owner.lookup('route:application');
    const token = generateJWTToken({
      user_hash:
        '8cf71d73ee95e7c9f3fda1d22f45fe0a1ce4e085a10f25fb0fefe8b50ecaabfc',
    });
    appRoute.token = token;
    assert.strictEqual(appRoute.token, token);
  });
});
