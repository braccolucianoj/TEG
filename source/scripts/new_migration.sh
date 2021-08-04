#!/usr/bin/env bash
set -eou pipefail

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

if [ $# -ne 1 ]; then
    echo "Usage: ./new_migration.sh MIGRATION_NAME"
    echo "Example: ./new_migration.sh create_users"
    exit 1
fi

migration_dir="${parent_path}/../devops/flywayMigrations"
migration_filename="${migration_dir}/V$(date -u +%Y\.%m.%d.%H.%M.%S.000000000)__$1.sql"
echo "Creating a new migration ${migration_filename}"
touch "$migration_filename"
