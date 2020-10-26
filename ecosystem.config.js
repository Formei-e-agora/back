module.exports = {
  apps: [
    {
      name: 'person',
      script: './person-microservice/src/index.js',
      exec_mode: 'cluster',
      watch: ['./person-microservice', './helpers'],
      ignore_watch: ['./person-microservice/logs'],
      max_memory_restart: '200M',
      restart_delay: 1000,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
    {
      name: 'auth',
      script: './authentication-microservice/src/index.js',
      exec_mode: 'cluster',
      watch: ['./authentication-microservice', './helpers'],
      ignore_watch: ['./authentication-microservice/logs'],
      max_memory_restart: '200M',
      restart_delay: 2000,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
    {
      name: 'job',
      script: './job-microservice/src/index.js',
      exec_mode: 'cluster',
      watch: ['./job-microservice', './helpers'],
      ignore_watch: ['./job-microservice/logs'],
      max_memory_restart: '200M',
      restart_delay: 2000,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
};
