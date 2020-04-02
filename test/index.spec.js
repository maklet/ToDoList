const mocha = require('mocha')
const expect = require("chai").expect
const app = require('../index')

describe('Trying to see if this test works', () => {

    it('Should allow this test to go through', () => {
        expect(app).to.exist

    })
})