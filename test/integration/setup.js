/*
 * setup, run server
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app.js')

chai.use(chaiHttp);

before(async function() {
	console.info("Setting up...")
	global.server = await app()
	global.chai = chai
	global.expect = chai.expect
});
