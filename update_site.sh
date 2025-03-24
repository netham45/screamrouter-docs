#!/bin/bash
cd ~
rm -rf screamrouter-docs
git clone https://www.github.com/netham45/screamrouter-docs
cd screamrouter-docs
npm install
npm run build
cd build
mv * /var/www/html