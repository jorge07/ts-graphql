module.exports = {
   "type": "postgres",
   "host":  process.env.POSTGRES_HOST || '127.0.0.1',
   "port": 5432,
   "username": process.env.POSTGRES_USER || 'demo',
   "password": process.env.POSTGRES_PASSWORD || 'demo',
   "database": process.env.DATABASE_NAME || 'demo',
   "synchronize": true,
   "dropSchema": true,
   "logging": false,
  "migrationsTableName": "migrations",
  "entities": [
      "src/Infrastructure/Shared/ORM/Postgres/Projections/*.js"
   ],
   "migrations": [
      "src/Infrastructure/Shared/ORM/Postgres/Migration/**/*.js"
   ],
   "subscribers": [
      "src/Infrastructure/Shared/ORM/Postgres/Subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/Infrastructure/Shared/ORM/Postgres/Projections",
      "migrationsDir": "src/Infrastructure/Shared/ORM/Postgres/Migration",
      "subscribersDir": "src/Infrastructure/Shared/ORM/Postgres/Subscriber"
   }
};
