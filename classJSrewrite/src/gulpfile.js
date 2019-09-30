'use strict';
/**
 * By Mapk Volkov.
 */
const dev = require('./build/gulpfile.dev.config');
const prod = require('./build/gulpfile.prod.config');
dev();
prod();