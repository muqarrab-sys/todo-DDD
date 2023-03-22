/**
 * This is a preparation file for Mocha.
 *
 * You can add any imports required globally
 * or add global hooks here that should run for all test cases.
 **/

import('reflect-metadata');
const path = require('path');

require('dotenv').config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

exports.mochaHooks = {};
