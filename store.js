// Persistent storage using Upstash Redis (REST-based, works great in
// serverless environments like Vercel — no long-lived connections needed).
//
// Requires two environment variables (get them from your Upstash dashboard,
// or automatically if you add the Upstash integration from the Vercel
// marketplace):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN

const { Redis } = require('@upstash/redis');
const crypto = require('crypto');

const redis = Redis.fromEnv();
const DB_KEY = 'readsync:db';

async function loadDB() {
  const data = await redis.get(DB_KEY);
  if (!data) {
    const empty = { feeds: [], articles: [], readIds: [] };
    await redis.set(DB_KEY, empty);
    return empty;
  }
  return data;
}

async function saveDB(db) {
  await redis.set(DB_KEY, db);
}

function id() {
  return crypto.randomBytes(12).toString('hex');
}

// Deterministic id for an article so re-fetching the same feed never
// creates duplicates — this is what lets "read" state survive refreshes.
function hashArticle(feedId, guid) {
  return crypto.createHash('sha1').update(feedId + '::' + guid).digest('hex');
}

module.exports = { loadDB, saveDB, id, hashArticle };
