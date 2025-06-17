# InnerGarden

This project contains the source code for the **INNER GARDEN** interactive exhibition site.

## Local setup

1. Make sure you have **Node.js** or **Python** installed.
2. Clone the repository and navigate into its folder.
3. Start a simple web server:
   - Using Python:
     ```bash
     python3 -m http.server 8000
     ```
   - or using Node:
     ```bash
     npx http-server -p 8000
     ```
4. Open `http://localhost:8000` in your browser.

## Deploying on Digital Ocean

1. Create a new Droplet (Ubuntu works well).
2. SSH into the server and install Nginx:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```
3. Clone the repository to `/var/www/innergarden`:
   ```bash
   sudo mkdir -p /var/www/innergarden
   sudo git clone <your repo url> /var/www/innergarden
   ```
4. Configure Nginx. Create `/etc/nginx/sites-available/innergarden` with:
   ```nginx
   server {
       listen 80;
       server_name example.com;
       root /var/www/innergarden;
       index index.html;
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```
   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/innergarden /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Point your domain DNS to the droplet IP. After propagation the site will be available.

