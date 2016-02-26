'use strict';
//const test = require('tape');
const test = require('blue-tape');
const tapSpec = require('tap-spec');
const getData = require('./../controllers/cheerio');
const superTest = require('supertest');
const app = require('./../server');
const expect = require('chai').expect;

//
// test('getData runs', function (t) {
// 	t.ok( getData('http://www.berkshirehathaway.com', {
// 		name: 'test',
// 		string: 'div:nth-of-type(2) p:nth-of-type(1) a:nth-of-type(1)',
// 		text: false,
// 		attr: 'href'
// 	}, 'getData returns from URL'));
// 	t.end();
// });
describe('serving index.html when user goes to root /', function () {
	it('respond with html', function(done){
		superTest(app)
			.get('/index.html')
			.expect('Content-Type', /html/)
			.expect(302, done)
		});
});

describe('serving blank.html when user goes to /blank.html', function () {
	it('respond with html', function(done){
		superTest(app)
			.get('/blank.html')
			.expect('Content-Type', /html/)
			.expect(200, done)
		});
});

describe('Cookie', function () {
	it('send cookie called website when post request to /apireqpost/post.stf', function (done) {
		superTest(app)
			.post('/apireqpost/post.stf')
			.type('form')
			.send({'Enter website here...' : 'http://berkshirehathaway.com'})
			.expect('set-cookie', /website=/, done);
	});

});


describe('Get request to /goodbye.html should send goodbye.html file', function () {
	it ('respond with html file called goodbye', function (done) {
		superTest(app)
			.get('/goodbye.html')
			.expect('Content-Type', /html/)
			.expect(200, done)
	});
});
