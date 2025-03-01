#!/bin/sh
set -e

# Define the base directory
#BASE_DIR="warehouse-management-system/taxforyou"
BASE_DIR="warehouse-management-system/TeamPlanner"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if the directory $BASE_DIR exists
if [ -d "$BASE_DIR" ]; then
  cd "$BASE_DIR"
  # Check if node_modules directory exists
  if [ -d "node_modules" ]; then
    echo "node_modules directory found. Running npm run dev..."
#    npm run dev
  else
    echo "node_modules directory not found. Skipping npm run dev."
  fi
# Check if prisma directory exists for executing migrations
#   if [ -d "prisma" ]; then
#     echo "prisma directory found. Executing migrations..."
#     npx prisma migrate dev --name init && npx prisma db seed
#   else
#     echo "prisma directory not found. Skipping migrations."
#   fi
# else
#   echo "$BASE_DIR directory not found. Exiting script."
fi

# Check if cronie is installed before starting cron
if command_exists crond; then
    echo "✅ cronie found. Add proxy service to cron..."
    echo "✅ Clean Cronie..."
    crontab -r 2>/dev/null > mycron
    echo "✅ Add proxy service to cron..."
    echo "##   Entry              Description     Equivalent To" >> mycron
    echo "##   @yearly (or @annually)     Run once a year at midnight in the morning of January 1         0 0 1 1 *" >> mycron
    echo "##   @monthly   Run once a month at midnight in the morning of the first of the month   0 0 1 * *" >> mycron
    echo "##   @weekly    Run once a week at midnight in the morning of Sunday    0 0 * * 0" >> mycron
    echo "##   @daily             Run once a day at midnight      0 0 * * *" >> mycron
    echo "##   @hourly    Run once an hour at the beginning of the hour   0 * * * *" >> mycron
    echo "##   @reboot    Run at startup  @reboot" >> mycron
    echo "##   " >> mycron
    echo "##   * * * * * command to be executed" >> mycron
    echo "##   ┬    ┬    ┬    ┬    ┬" >> mycron
    echo "##   │    │    │    │    │" >> mycron
    echo "##   │    │    │    │    │" >> mycron
    echo "##   │    │    │    │    └───── day of week (0 - 7) (0 or 7 are Sunday, or use names)" >> mycron
    echo "##   │    │    │    └────────── month (1 - 12)" >> mycron
    echo "##   │    │    └─────────────── day of month (1 - 31)" >> mycron
    echo "##   │    └──────────────────── hour (0 - 23)" >> mycron
    echo "##   └───────────────────────── min (0 - 59)" >> mycron    
    echo "40 9 * * 1-5 curl http://proxy/api/cron" >> mycron
    crontab mycron
    rm mycron
    echo "✅ Starting cron service..."
    /usr/sbin/crond -f &
else
    echo "❌ ERROR: cronie is not installed in the container. Cron service will not start."
    exit 1
fi

# Execute any additional commands passed as arguments to the script
tail -f /dev/null
#exec "$@"
