# Todo-DDD
This is a todo app created by following DDD principles and practices and as instructed in:
https://dev-portal.carbonteq.com/docs/Training/nodejs/Todo

Preparation:
---

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

Refactor Phase 2:
---

- [ ] Create application services to move the logic away from controllers.
- [ ] Add pagination options to API endpoints.
- [ ] Add custom exceptions to stores and services and rely on exception handling to send appropriate error messages from API.
- [ ] Use custom exceptions to express errors in system and log your exceptions.
