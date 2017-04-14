/*
 * Test /v1/ubike-station/taipei
 */
const URL = "/v1/ubike-station/taipei"

describe('/GET v1/ubike-station/taipei', function() {
    it('should return 2 stations', function(done) {
    	chai.request(server)
    		.get(URL + '?lat=25.042554&lng=121.5039302')
    		.end((err, res) => {
	    		expect(err).to.be.null
	    		expect(res).to.have.status(200)
	    		expect(res).to.be.json
     			expect(res.body.code).to.be.eql(0)
     			expect(res.body.result).to.have.lengthOf(2)
	    		done()
	    	});
	});
	it('should return code -2 when position outside Taipei City', function(done) {
    	chai.request(server)
    		.get(URL + '?lat=26.042554&lng=12.5039302')
    		.end((err, res) => {
	    		expect(err).to.be.null
	    		expect(res).to.have.status(200)
	    		expect(res).to.be.json
     			expect(res.body.code).to.be.eql(-2)
     			expect(res.body.result).to.have.lengthOf(0)
	    		done()
	    	});
	});
	it('should response when send wrong parameters(1)', function(done) {
    	chai.request(server)
    		.get(URL + '?lat=265&lng=121.5039302')
    		.end((err, res) => {
    			expect(err).not.to.be.null
	    		expect(res).to.have.status(400)
	    		expect(res).to.be.json
     			done()
	    	});
	});
	it('should response when send wrong parameters(2)', function(done) {
    	chai.request(server)
    		.get(URL + '?lat=25.042554')
    		.end((err, res) => {
    			expect(err).not.to.be.null
	    		expect(res).to.have.status(400)
	    		expect(res).to.be.json
     			done()
	    	});
	});
	it('should response when send wrong parameters(3)', function(done) {
    	chai.request(server)
    		.get(URL + '?lat=25.042554&lng="121.5039302"')
    		.end((err, res) => {
    			expect(err).not.to.be.null
	    		expect(res).to.have.status(400)
	    		expect(res).to.be.json
     			done()
	    	});
	});
});