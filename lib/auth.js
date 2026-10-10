import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        "http://localhost:3000",
        "https://bazar-dor-beta-cyan.vercel.app",
    ],

    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
});