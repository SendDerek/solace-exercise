## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Testing

Run all tests:

```bash
npm test
```

Run frontend tests only:

```bash
npm run test:frontend
```

Run backend tests only:

```bash
npm run test:backend
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push 
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

## About the Assignment

Below, you'll find an exercise we've chosen to represent the work you may encounter in this role. There is no single right answer — we've left it intentionally open-ended to understand how you think. Our goals with this challenge are to:

- Learn as much as we can about how you think about code, improve existing code, and add features to a new code base.
- Require as little of your time as possible. By limiting this to 2 hours, we hope this is manageable with your busy schedule.
- Demonstrate your ability in our stack.

### Background

At Solace, we aim to match patients with the advocate who is best suited to their needs. To support this goal, we have a table of all of our advocates with some information about them that the patient can search on to find the best match. For this assignment, we have an initial version of this table built in a NextJS application, however it was built by an AI chimpanzee who hadn’t had his latest update yet so it’s full of bugs, bad patterns, and performance pitfalls.

### Tasks

1. Fix any glaring bugs and anti patterns.
2. Improve the design UI/UX to make the experience better for prospective patients. We value design heavily at Solace so feel free to flex your skills in this area. The repo is set up with tailwind but feel free to use any styling framework you’d like.
3. Consider both frontend and backend performance improvements. Assume we have a database of hundreds of thousands of advocates we need to search through.

Feel free to be creative if you see any other improvements you think are worth spending time on!
