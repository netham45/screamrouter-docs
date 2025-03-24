#!/bin/bash
echo $0 | grep -q "^/dev/fd" || ! bash <(cat ${0}) || exit 0
WORKDIR=/root
PUBLICDIR=/var/www/html
REPODIR=screamrouter-docs
REPO=https://www.github.com/netham45/screamrouter-docs
whereis apache2 | grep -q ": ." || (  # Install Apache if not
    apt-get update
    apt-get install apache2 -y
    a2enmod rewrite
    grep -q "Directory /var/www/html" /etc/apache2/sites-enabled/000-default.conf ||
        sed -i 's#</VirtualHost>#        <Directory /var/www/html>\n                AllowOverride All\n        </Directory>\n</VirtualHost>#' /etc/apache2/sites-enabled/000-default.conf &&
        systemctl restart apache2

)
whereis git | grep -q ": ." || apt-get install git -y
whereis npm | grep -q ": ." || (  # Install node if not
    wget https://deb.nodesource.com/setup_20.x -o /dev/null -O - | bash -
    apt install nodejs -y
)
rm -rf $WORKDIR/$REPODIR
cd $WORKDIR
git clone $REPO $WORKDIR/$REPODIR
cd $WORKDIR/$REPODIR
cp $WORKDIR/$REPODIR/update_site.sh $WORKDIR/$REPODIR/update_cron.sh $WORKDIR
chmod +x $WORKDIR/update_site.sh $WORKDIR/update_cron.sh
npm install
npm run build
cd $WORKDIR/$REPODIR/build
rm -rf $PUBLICDIR/*
mv * $PUBLICDIR/
rm -rf $WORKDIR/$REPODIR
