# Branching model
Branching model is inspired by [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

Default branch is `develop` and development should be done in separate topic branches which are merged back by PRs to `develop`.

## New release

1. When the develop branch is close to release state create a new release branch from `develop` with name `release-v<version_number>` ie. `release-v0.2.0`
1. TODO add autobump
1. Commit changes with commit message `Release <version_number>`
1. Merge the branch to main `git checkout main && git merge --no-ff <release branch>`
1. Create and push an **annotated tag** from `main branch` with version number ie. `v0.2.0`
```bash
$ git tag -a <tag_name>
$ git push origin <tag_name>
```
1. Merge the `release branch` back to `develop`
```bash
$ git checkout develop
$ git merge --no-ff release-0.2.0
$ git push origin develop
```
1. Remove the release branch
