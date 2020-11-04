'use strict';

const emitter = require('./event.js');
require('../driver.js');

jest.useFakeTimers();

beforeEach(jest.clear)