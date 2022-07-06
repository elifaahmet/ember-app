import { Response } from 'miragejs';

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export default function () {
  this.namespace = 'api';

  // QUESTION: We could also add GET /users/you to respond with a 404 for a user not found
  // that we could thne use in a test scenario?
  this.get('/users/me', (schema, request) => {
    let jwtToken;
    try {
      jwtToken = request.requestHeaders['Authorization'].split('Bearer ')[1];
    } catch (error) {
      return new Response(401, {}, { message: 'Bad authorization header' });
    }
    // QUESTION: I think we can just assume this finds the first user in the schema rather than parsing the token
    // not sure why we need to parse the token here?
    const user = schema.db.users.findBy(parseJwt(jwtToken));
    return {
      data: {
        type: 'user',
        id: user.id,
        attributes: schema.db.users.find(user.id),
      },
    };
  });

  this.get('/users', (schema) => {
    return schema.users.all();
  });
}
