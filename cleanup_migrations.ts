import { getDataSource } from "./src/app/api/infrastructure/database/data-source";

async function cleanup() {
  const ds = await getDataSource();
  console.log("Cleaning up migrations table...");
  await ds.query(`DELETE FROM "migrations" WHERE "name" LIKE 'SyncEntities%'`);
  console.log("Cleanup done.");
  process.exit(0);
}

cleanup().catch(err => {
  console.error(err);
  process.exit(1);
});
