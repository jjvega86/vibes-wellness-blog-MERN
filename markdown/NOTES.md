# General Notes

- Installed eslint using npx eslint --init - resulted in better autocomplete and compile time warnings

# How a post gets added

- A request is made to the posts.js POST route first. This is the initial creation of the post.
- Then, another request is made to the users.js route, which will find the post and add it to the users' posts sub-document
- At that point, the only way to access any CRUD operations on that post is via an authorized user

# The JWT (JSON Web Token) authorization process

- When a user registers or logs in, a token is automatically generated and sent to the client as part of the header of the response
- Whenever certain routes with the middleware authorization function included are hit, they check first for that token. If it isn't sent as part of the request in the <x-auth-token> header key/value pair, it returns an unauthorized response. Therefore, the client must have the token in the headers of its requests in order to successfully complete the request/response cycle.
