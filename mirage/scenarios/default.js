export default (server) => {
  server.createList('user', 10);
  server.create('user', {
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
};
