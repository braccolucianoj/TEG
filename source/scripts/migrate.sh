#!/usr/bin/env bash
set -eou pipefail

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

. $parent_path/utils.sh

main() {
    echo "Running migrations"
    cd $parent_path
    migrate_db
    wait
}

main

