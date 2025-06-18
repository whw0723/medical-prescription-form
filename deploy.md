# 部署指南

这个项目可以通过以下几种方式部署，让别人可以直接通过网址访问：

## 方法1：Vercel（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 将项目代码上传到GitHub
4. 在Vercel中导入GitHub仓库
5. Vercel会自动检测到这是Vue项目并进行构建
6. 部署完成后会得到一个免费的域名，如：https://your-project.vercel.app

## 方法2：Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 注册并登录
3. 将项目代码上传到GitHub
4. 在Netlify中连接GitHub仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 部署完成后会得到一个免费域名

## 方法3：GitHub Pages

1. 将代码推送到GitHub
2. 在仓库设置中启用GitHub Pages
3. 选择从Actions部署
4. 会自动生成一个 https://username.github.io/repository-name 的地址

## 方法4：本地网络共享

如果只是临时让同事访问，可以：

1. 运行 `npm run dev -- --host`
2. 找到你的本地IP地址（如192.168.1.100）
3. 告诉同事访问 http://192.168.1.100:5173

## 推荐使用方法1（Vercel），因为：
- 完全免费
- 自动HTTPS
- 全球CDN加速
- 每次推送代码自动重新部署 