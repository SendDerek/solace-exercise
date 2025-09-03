## Derek Hildreth's Assignment Discussion Notes

### Environment
 - I'm going to assume that protecting sensitive information in .env is beyond the scope.  I would normally inject secrets from AWS Secrets Manager or some other workflow.
 - Since I've committed to using the database, I've updated files to remove fallback

### Thought Processes
 - I've noticed there aren't any tests, so I'd like to start with that
   - Installing `jest` with TS support had some hiccups using `moduleNameMapper` (https://stackoverflow.com/a/64487528)
 - Now that I have tests, I can see some of them are failing for the frontend.  Start diving into it in order to get to a good starting point so I can truly refactor
 - I now have the tests running on "watch" while I make changes.  Each commit is going to cover a separate thought

### Future Improvements
  - This app is supposed to be geared towards people who need advocacy, we'd better be sure to use best practices around accessibility
  - The API architecture could be improved:
    - Full CRUD operations, Controllers, Resources/Responses, Services, Repositories, DTO Layer, Interfaces, etc
    - API documentation (swagger/openapi)
  - Frontend could use additional features:
    - Sort by columns
    - Filter specific columns
    - Allow users to mark providers as favorite
      - Along these lines, it'd be good to add a compare feature

