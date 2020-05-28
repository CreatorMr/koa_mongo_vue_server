module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',
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
      user : 'node',
      host : '106.53.236.144',
      ref  : 'origin/master',
      repo : 'git@github.com:CreatorMr/koa_mongo_vue_server.git',
      path : '/data/app/koa_mongo_vue_server',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
