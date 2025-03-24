#!/bin/bash
## * * * * * /root/update_cron.sh >> /var/log/git-update.log 2>&1

# Change to the document directory
cd /root/screamrouter-docs || exit 1

# Fetch the latest changes from the remote repository without modifying the local repo
git fetch

# Check if the local repository is behind the remote
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

# If they're different, run the update script
if [ "$LOCAL" != "$REMOTE" ]; then
    echo "Repository is not up to date. Running update script..."
    /root/update_site.sh
else
    echo "Repository is up to date. No action needed."
fi