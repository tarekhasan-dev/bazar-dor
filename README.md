# বাজার দর | BazarDor

BazarDor is a responsive market price website for viewing daily prices of essential products in Bangladesh.

## Technologies Used

- Next.js App Router
- JavaScript
- Tailwind CSS
- Better Auth
- PostgreSQL on Neon
- React Hot Toast
- Lucide React

## Features

1. Product cards with prices displayed in Bengali numerals.
2. Separate sections for the top six price risers and fallers.
3. Category navigation and category-specific product lists.
4. Sorting products by price in ascending or descending order.
5. Email and password registration and sign-in.
6. Responsive layouts for mobile, tablet, and desktop.
7. Server-side product fetching with a backup API.
8. Toast notifications for authentication actions.

## Run Locally

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

Create the authentication tables:

```bash
npx auth@latest migrate
```

Start the development server:

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Current Development Status

Product details, social authentication, profile updates, the price ticker, and the footer are planned for upcoming updates.

## Author

Tarek Hasan