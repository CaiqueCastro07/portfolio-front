const Dotenv = require('dotenv-webpack');

module.exports = {

  // OTHER CONFIGS

  plugins: [
    new Dotenv({
        safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    })
  ]
};