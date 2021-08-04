#!/bin/bash

psql -U postgres -a -f /docker-entrypoint-initdb.d/database/create.sql
