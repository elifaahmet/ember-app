import { module, test } from 'qunit';
import { setupRenderingTest, generateJWTToken } from 'ember-app/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-info', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders the text to login from uplisting site when there is no token', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<UserInfo />`);

    assert.dom(this.element).hasText('Please login from app.uplisting.io');
  });

  test('it displays the current users name when the token is set correctly', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.server.create('user', {
      email: 'elifaahmet@gmail.com',
      name: 'Elif Alev Ahmet',
      user_hash:
        '8cf71d73ee95e7c9f3fda1d22f45fe0a1ce4e085a10f25fb0fefe8b50ecaabfc',
      created_at: '2022-06-21T08:00:52Z',
      unread_messages_count: 0,
      role: 'account_owner',
      externally_remove: false,
      lapsed: false,
    });
    const jwtToken = generateJWTToken({
      user_hash:
        '8cf71d73ee95e7c9f3fda1d22f45fe0a1ce4e085a10f25fb0fefe8b50ecaabfc',
    });
    const cookieValue = this.owner.lookup('service:cookie-value');
    cookieValue.updateToken(jwtToken);

    await render(hbs`<UserInfo />`);

    assert.dom(this.element).hasText('User Info Elif Alev Ahmet');
  });

  test('it displays the text to login from uplisting site when the existing token does not return a user from api', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.server.create('user', {
      email: 'elifaahmet@gmail.com',
      name: 'Elif Alev Ahmet',
      user_hash:
        '8cf71d73ee95e7c9f3fda1d22f45fe0a1ce4e085a10f25fb0fefe8b50ecaabfc',
      created_at: '2022-06-21T08:00:52Z',
      unread_messages_count: 0,
      role: 'account_owner',
      externally_remove: false,
      lapsed: false,
    });
    const jwtToken = generateJWTToken({
      user_hash:
        '8cf71d73ee95e7c9f3fda1d22f45fe0a1ce4e085a10f25fb0fefe8b50ecaabfx',
    });
    const cookieValue = this.owner.lookup('service:cookie-value');
    cookieValue.updateToken(jwtToken);

    await render(hbs`<UserInfo />`);

    assert.dom(this.element).hasText('Please login from app.uplisting.io');
  });
});
