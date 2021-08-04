#!/usr/bin/env bash
set -eou pipefail

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

. $parent_path/utils.sh
    
check_deps() {
    for cmd in docker docker-compose npm node; do
        command -v "$cmd" >/dev/null 2>&1 || error "Please install '${cmd}' first."
    done
}

start_deps() {
    echo "Starting docker services"
    docker-compose up -d
}

main() {
    cd "$parent_path/../devops"
    echo "Starting development environment"

    check_deps
    start_deps
    migrate_db
    wait
}

main

