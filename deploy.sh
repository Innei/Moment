# For Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get install gnupg -y
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update
sudo apt-get install -y nodejs  yarn redis mongodb-org git nginx screen

cd ~
git clone https://github.com/Innei/moment.git
git clone https://github.com/Innei/moment-server.git

mkdir -p /home/wwwroot/www
cd moment
yarn
yarn build --modern
cd ../moment-server
yarn
cp .env.example .env
yarn global add pm2
sudo echo "server {

	server_name _; #在这里输入你绑定的域名
	root /home/wwwroot/www;

	location / {
		try_files $uri $uri/ /index.html;
	}

	# 反代
	location /api {
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header REMOTE-HOST $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://127.0.0.1:3000;
	}
    

# gzip
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

}" >> /etc/nginx/sites-enabled/moment.conf

nginx -s reload

pm2 start ecosystem.config.js --env production