
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

migrate_db() {
    cd "$parent_path/../devops"
    echo "Waiting for database to become healthy"
    until [ "$(docker inspect $(docker-compose ps -q database) --format '{{json .State.Health.Status}}')" == "\"healthy\"" ]; do
        sleep 1;
    done

    echo "Running migrations"
    docker-compose -f docker-compose.tasks.yml run migration_runner
}