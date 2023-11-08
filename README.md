# Merge Panic project

Merge Panic project build on Fresh is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

#### Environment variables

- `JWT_SECRET` - secret for Json Web Token
- `GA_ID` - id for Google Analytics
- `SERVER_URL` - server url for apis (e.g. `http://localhost:8000`)
- `ENV` - environment (used to setup loging etc) possible values : `dev` | `prod`. Default value is `dev`.

For development, values must be set in `.env` file.

To start the project and watch for changes:

```
deno task dev
```

To start the project:

```
deno task start
```
