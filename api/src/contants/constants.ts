/* eslint-disable max-len */

const constants = Object.freeze({
  LOCALHOST: 'localhost',
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
  VALID_EMAIL_REGEX:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  VALID_PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  ENCRYPTION_KEY: 'SOME_ENCRYPTION_KEY',
  ENCRYPTION_SALT: 'SOME_ENCRYPTION_SALT',
  DB_FILE_NAME: 'db_file.json',
});

export default constants;
