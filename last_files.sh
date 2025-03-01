#!/bin/sh

current_time=$(date +%s)
four_seconds_ago=$((current_time - 360))

find . -type f -print0 | xargs -0 stat -c "%n %Y" | awk -v now="$current_time" -v four="$four_seconds_ago" '$2 >= four && $2 <= now { print $1 }'
