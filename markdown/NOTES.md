# General Notes

- Installed eslint using npx eslint --init - resulted in better autocomplete and compile time warnings

# How a post gets added

- A request is made to the posts.js POST route first. This is the initial creation of the post.
- Then, another request is made to the users.js route, which will find the post and add it to the users' posts sub-document
- At that point, the only way to access any CRUD operations on that post is via an authorized user

# The JWT (JSON Web Token) authorization process

- When a user registers or logs in, a token is automatically generated and sent to the client as part of the header of the response
- Whenever certain routes with the middleware authorization function included are hit, they check first for that token. If it isn't sent as part of the request in the <x-auth-token> header key/value pair, it returns an unauthorized response. Therefore, the client must have the token in the headers of its requests in order to successfully complete the request/response cycle.

# Admin and other roles handling

- A boolean property is added to the schema for users (could create schemas for customers, employees, other roles as well)
- Using an auth function in middleware, that boolean property is checked and either an access denied message sent,
  or the next function called (in this case, the route handler function)
- In the case of my delete users endpoint, both the user logged in must send back the correct JWT token, and must have the
  <isAdmin> boolean set to true in order for the route handler callback to be called

# Logging out

- The <CLIENT> is responsible for sending a valid JWT token on every response, so the client is responsible for deleting the token
  that is currently being stored in order for the user to be required to re-login and generate a new JWT token

# Hashing a password

- Taking a plain text password and converting it into a much longer randomized string of numbers and letters
- A <salt> creates an additional random string that tacks onto either side of the hash to make it harder to generate
  the hashed password via brute force attempts
