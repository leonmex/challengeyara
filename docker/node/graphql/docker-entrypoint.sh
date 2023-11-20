#!/bin/sh
set -e
#cd warehouse-management-system && npm run dev
#	>&2 echo "Waiting for NODE to be ready..."
#	until nc -z "$NODE_HOST" "$NODE_PORT"; do
#		sleep 2
#	done
### EXECUTE MIGRATIONS ####
#cd warehouse-management-system && npx prisma migrate dev --name init && npx prisma db seed

cd graphql-server && npm install && npm run build && npm run start
exec "$@"
