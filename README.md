# Coding Challenge Template - Typescript REST

A simple template for API prototyping and coding challenges.

## Running the app

First, ensure the following:

- Node.js (tested with 20.4.0) and yarn are installed
- [sqlite3](https://www.npmjs.com/package/sqlite3) is supported on the platform or built from source (see NPM page)
- TCP port `8080` is not in use

To run locally, run the following in order:

- `yarn`
- `yarn dev`

## Assumptions

The app matches the given requirements, the following points are assumed since
not explicitly specified:

- stack: Node.JS, Express, sqlite, TypeORM, Zod, Node test runner

## Examples

Find user:

```
curl -X POST 'http://localhost:8080/users/find' \
   -H "Content-Type: application/json" \
   -d '{"user": {"email": "foo@bar.com"}}'
```

`{"user":{"id":1,"email":"foo@bar.com","phone":"+81-0736-7841"}}`

## Authors

- Matic Utsumi Gacar <matic@usagi.io>
