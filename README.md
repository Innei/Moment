# 一瞬

一瞬 (Moment)，目的显而易见，就是希望它能够记录下生活中的美好瞬间。

<del>后端正在测试和完善，咕咕咕咕</del>

后端使用 Express + MongoDB 开发。

后端仓库地址： <https://github.com/Innei/Moment-server>

preview: 

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191020211642.png)

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191119152019.png)

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191119152039.png)

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191119152106.png)

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191119152131.png)

![](https://raw.githubusercontent.com/Innei/img-bed/master/20191119153624.png)

## 快速构建

以 `yarn` 为例

```bash
cd
# 构建前端
git clone https://github.com/Innei/moment.git
cd moment
yarn

# 构建后端
# 注意 您已正确安装了 redis 和 MongoDB
cd 
git clone http://github.com/Innei/moment-server.git
cd moment-server
yarn

```

经过以上的步骤，已经正确的搭建完了主要的环境。接下你可以配合 nginx 等把该项目托管到网站上。

## 托管生产环境

接下来，我会以 nginx 为例，简要的说明如何构建。

```bash
cd ~/moment
mkdir -p /home/wwwroot/www
yarn build --modern
cd ~/moment-server
yarn prod
```

通过以上的步骤已经把前端编译成静态页面，后端监听在本地 3000 端口上。使用 `yarn build --modern` 可以编译一个速度更快，体积更小的仅支持现代浏览器的版本，你也可以去掉 `--modern` 参数来编译一个兼容更多浏览器的版本。

接下来我们使用 `nginx` 来启用反向代理，将 `/api` 反向代理到本地的 3000 端口。

```bash
sudo vim /etc/nginx/sites-enabled/moment.conf
```

在该文件中写入

```


server {

	server_name example.com; #在这里输入你绑定的域名
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

}
```

```
nginx -s reload
```

即刻访问你的绑定的网址，开始初始化。

## 浏览器兼容性

此项目使用 ES6 以及最新 CSS 规范编写，顾不支持旧版浏览器。

```
Chrome >= 76
Firefox >= 70
```

## 做出贡献

接下来，我们来构建开发环境。

```bash
cd ~/moment
yarn serve .
cd ~/moment-server
yarn start
```

## 环境变量


