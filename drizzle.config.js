module.exports = {
  schema: "./shared/schema.js",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  }
};