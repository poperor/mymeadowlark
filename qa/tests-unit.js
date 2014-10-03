var fortune = require ('../lib/fortune.js');
var expect = require('chai').expect;

suite ('Fortune cookies tests', function() {
    test('getFortune() should return a cookie', function() {
        expect(typeof fortune.getFortune() === 'string');
    });
});