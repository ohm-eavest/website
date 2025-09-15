// PM2 configuration for staging deployment
module.exports = {
  apps: [{
    name: 'eavest-staging',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/website',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      BACKEND_URL: 'http://localhost:8000' // Update this to your Django backend URL
    },
    error_file: '/var/log/pm2/eavest-error.log',
    out_file: '/var/log/pm2/eavest-out.log',
    log_file: '/var/log/pm2/eavest-combined.log',
    time: true
  }]
};