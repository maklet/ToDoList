'use strict';

var mocha = require('mocha');
var expect = require("chai").expect;
var app = require('../index');

describe('Trying to see if this test works', function () {

    it('Should allow this test to go through', function () {
        expect(app).to.exist;
    });
});