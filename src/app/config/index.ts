import "dotenv/config";
export default {
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
};
