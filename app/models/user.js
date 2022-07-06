import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') email;
  @attr('string') name;
  // QUESTION: are these needed? or are they copied over from the main app?
  @attr('string') user_hash;
  @attr('string') created_at;
  @attr('number') unread_messages_count;
  @attr('string') role;
  @attr('boolean') externally_remove;
  @attr('boolean') lapsed;
}
