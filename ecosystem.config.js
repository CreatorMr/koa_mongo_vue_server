module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',
    "cwd": "/data/app/koa_mongo_vue_server/build/",
    "listen_timeout" : 10000,
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : ['106.52.111.158'],
      ref  : 'origin/master',
      repo : 'https://github.com/CreatorMr/koa_mongo_vue_server.git',
      path : '/data/app/koa_mongo_vue_server2',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
