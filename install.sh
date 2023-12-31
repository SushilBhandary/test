#!/bin/sh
cd ReactJS
rm calculate-score.js
sudo apt-get remove nodejs -y
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash
sudo apt-get install -y nodejs
npm install
npm install jest@24.9.0
echo "React installation is done"
cd ../NodeJS/
npm install;
echo "Nodejs installation is done"
node src/mongoose/db/defaultDB.js
echo "Mongodb setup is done"
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
echo "All installations and setup are done. You are ready to go ahead!!!"