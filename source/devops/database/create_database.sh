#!/bin/bash

psql -U postgres -a -f /docker-entrypoint-initdb.d/database/create.sql

psql -U app_user -d teg_database -a -f /docker-entrypoint-initdb.d/database/schema.sql

