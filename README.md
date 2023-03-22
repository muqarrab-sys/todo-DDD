# Todo-DDD

This is a todo app created by following DDD principles and practices and as instructed in:
https://dev-portal.carbonteq.com/docs/Training/nodejs/Todo

## Preparation:

- [x] Create a todo item API
- [ ] Cover gitflow and prepare a custom diagram in draw.io. Goal is to visualize SDLC from gitflow perspective

Refactor Phase 1:

---

- [x] Refactor the code to adapt following features from 12 Factor Apps.
  - [x] Codebase
  - [x] Dependencies
  - [x] Config
- [x] Create domain layer and refactor your code to house entities and utilize factory pattern for todo and users.
- [x] Create a physical store like API on top of the mongoose model using an adapter pattern.
- [x] Implement Google Auth for login, using google nodejs client.

## Refactor Phase 2:

- [x] Create application services to move the logic away from controllers.
- [x] Add pagination options to API endpoints.
- [x] Add custom exceptions to stores and services and rely on exception handling to send appropriate error messages from API.
- [x] Use custom exceptions to express errors in system and log your exceptions.

## Refactor Phase 3:

- [ ] Cover next concepts in 12 factor app
  - [ ] Processes
  - [ ] Port binding
  - [ ] Concurrency
- [x] Add Infrastructure Layer and refactor your stores to repositories.
- [x] Use Migrations and fakers to repopulate databases.
- [x] Express server invocation should be moved to its own (BIN or CLI) presentation layer.
- [x] Implement JWT auth for login.

## Refactor Phase 4:

- [x] Use single docker containers to run databases.
- [x] Shift Login related to passport js with jwt support.
- [x] Implement the Command Bus pattern to interact with stores and entities in todo app.
- [x] Use mocha, sinon and chai to add test cases to the app.
