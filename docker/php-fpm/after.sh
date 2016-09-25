#!/bin/bash
set -eo pipefail
shopt -s nullglob

cd ${SCH_APP_PATH}
echo ${SCH_APP_PATH}
echo "migrating tenant manager database"
php artisan  migrate --database "tenantsmgr" --path "database/migrations/tenantsMgr/" 
echo "seeding tenant for example ..."
php artisan db:seed  --database "tenantsmgr" --class "TenantDatabaseSeeder" --verbose
echo "Seeding is completed."

exec "$@"
