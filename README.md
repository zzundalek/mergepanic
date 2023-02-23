# Merge Panic project

Merge Panic project build on Fresh is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

To make GA work `GA_ID` must be set in `.envrc` file. Than load the GA_ID value:

```
direnv allow && eval "$(direnv hook zsh)"
```

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
