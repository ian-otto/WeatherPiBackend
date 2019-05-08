module.exports = {
  apps : [{
    name: 'WeatherPIBackend',
    script: './bin/www',
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env_debug: {
      NODE_ENV: 'DEBUG=weatherpi:server'
    },
  }]
};
