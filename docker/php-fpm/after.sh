#!/bin/bash
set -eo pipefail
shopt -s nullglob

cd ${SCH_APP_PATH}
echo ${SCH_APP_PATH}
echo "Optimizing code"
php artisan optimize
echo "Migrating tenant manager database"
php artisan  migrate --database "tenantsmgr" --path "database/migrations/tenantsMgr/" 
echo "Seeding tenant for example ..."
php artisan db:seed  --database "tenantsmgr" --class "TenantDatabaseSeeder" --verbose
echo "Seeding is completed."

exec "$@"
