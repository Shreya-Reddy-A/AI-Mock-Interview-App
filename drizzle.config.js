/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview_owner:zTYnXJLP3Fb4@ep-icy-credit-a5p0z3u9.us-east-2.aws.neon.tech/ai-interview?sslmode=require',
    }
  };