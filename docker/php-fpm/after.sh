#!/bin/bash
set -eo pipefail
shopt -s nullglob
TENANT_MANAGER_DATABASE_NAME="tenants-manager"

cd ${SCH_APP_PATH}
echo ${SCH_APP_PATH}
echo "Optimizing code"
php artisan optimize
echo "Migrating tenant manager database"
php artisan  migrate --database ${TENANT_MANAGER_DATABASE_NAME} --path "database/migrations/tenantsMgr/" 
echo "Seeding tenant for example ..."
php artisan db:seed  --database ${TENANT_MANAGER_DATABASE_NAME} --class "TenantDatabaseSeeder" --verbose
echo "Seeding is completed."

exec "$@"
