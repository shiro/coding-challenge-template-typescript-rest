<div align="center">
   <h1>Coding Challenge Template - Typescript REST</h1>
   <h3>A simple template for API prototyping and coding challenges.</h3>

[![GitHub](https://img.shields.io/badge/GitHub-code-blue?logo=github)](https://github.com/shiro/coding-challenge-template-typescript-rest)
[![MIT License](https://img.shields.io/github/license/shiro/coding-challenge-template-typescript-rest?color=43A047&logo=linux&logoColor=white)](https://github.com/shiro/coding-challenge-template-typescript-rest/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/Ko--Fi-donate-orange?logo=ko-fi&color=E53935)](https://ko-fi.com/C0C3RTCCI)

</div>

Built with a bleeding edge tech stack that enables quick development combined with amazing developer experience!

- 🖌️ **Zod** for input parsing and validation
- 🖌️ **Node test runner** for quick unit test execution
- 🖌️ **TypeORM** using sqlite for rapid local DB iteration
- ❤️ **Open source**, made with love

---

<div align="center">
   <b>If you like open source, consider supporting</b>
   <br/>
   <br/>
   <a href='https://ko-fi.com/C0C3RTCCI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
</div>

---

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
