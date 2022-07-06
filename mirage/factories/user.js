import { Factory } from 'miragejs';
import { generateEmail, generateName, generateHash } from './helpers';

export default Factory.extend({
  email() {
    return generateEmail();
  },

  name() {
    return generateName();
  },

  user_hash() {
    return generateHash();
  },

  created_at() {
    return new Date().toISOString();
  },
  unread_messages_count() {
    return Math.floor(Math.random() * 11);
  },
  role() {
    return 'account_owner';
  },
  externally_remove() {
    return false;
  },
  lapsed() {
    return false;
  },
});
