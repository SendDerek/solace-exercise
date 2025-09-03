## Derek Hildreth's Assignment Discussion Notes

### Environment
 - I'm going to assume that protecting sensitive information in .env is beyond the scope.  I would normally inject secrets from AWS Secrets Manager or some other workflow.
 - Since I've committed to using the database, I've updated files to remove fallback

### Thought Processes
 - I've noticed there aren't any tests, so I'd like to start with that
   - Installing `jest` with TS support had some hiccups using `moduleNameMapper` (https://stackoverflow.com/a/64487528)
 - 
