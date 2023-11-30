# Merge Panic project

Merge Panic project build on Fresh is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

## Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

### Environment variables

Must be added into gihub actions deployment WFs for dev and prod at `/.github/workflows`!

- `JWT_SECRET` - secret for Json Web Token (e.g. `zH4NRP1HMALaaFnRZABFA6GOJkzU_gIj02alfL1lvI`)
- `GOOGLE_CLIENT_ID` - Google client ID [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
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

## Story points estimation

| Story points | Example task | How much is known about the task | Dependencies | Work effort |
| -- | -- | -- | -- | -- |
| 1 | Add static text to one component | Everything | None | Less than one hour |
| 2 | Add dynamic text to one component | Everything | Update service to get existing data | Less than two hours |
| 3 | Display cookies usage on FE  | Almost everything | Need to store data on client side, what about consent versions, ... | A few hours |
| 5 | Display thumbnails to articles menu | Nearly everything | Need to change data model, existing files, update service, ... | Less than one day |
| 8 | ... | ... | ... | Day |
| 13 | ... | ... | ... | A few days |
| 21 | Post comments | A lot to investigate | Google sign-in, JWT generation, new APIs, etc. | A week |
| 34 | ... | ... | ... | More than a week |
| 55 | ... | ... | ... | ? |
