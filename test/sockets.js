var iohelper = require('../io');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);


describe('Test socket.io callbacks', function() {
    var ioStub = {};
    var socketStub = {};

    beforeEach(function() {
        ioStub.emit = sinon.stub();
        iohelper.init(ioStub);

        socketStub.emit = sinon.stub();
        socketStub.on = sinon.stub();

        iohelper.connectionHandler(socketStub);
    });

    it('Should emit a connection count on connect', function() {
        expect(ioStub.emit.callCount).to.equal(1);
        expect(ioStub.emit.calledWith('connections', 1)).to.be.ok;
        expect(socketStub.emit.callCount).to.equal(2);
        expect(socketStub.on.callCount).to.equal(4);
    });

    it('Should emit connections on disconnect', function() {
        ioStub.emit.reset();
        iohelper.disconnectionHandler();

        expect(ioStub.emit.callCount).to.equal(1);
        expect(ioStub.emit.args[0]).to.deep.equal(['connections', 1]);
    });

    it('Should emit a goto event', function() {
        ioStub.emit.reset();
        iohelper.gotoHandler(99);

        expect(ioStub.emit.callCount).to.equal(1);
        expect(ioStub.emit.args[0]).to.deep.equal(['goto', 99]);

        socketStub.emit.reset();

        // calling connectionHandler a 2nd time will allow us to inspect
        // the private value of the current slide when it's emitted as
        // part of the goto event
        iohelper.connectionHandler(socketStub);
        expect(socketStub.emit.args[1]).to.deep.equal(['goto', 99]);
    });

    it('Should return a list of questions', function() {
        ioStub.emit.reset();
        var question = 'this is a question';
        var expected = [{question: question, upvotes: 0}];

        iohelper.questionHandler(question);

        expect(ioStub.emit.args[0][1]).to.deep.equal(expected);
    });

    it('Should show the upvote incremented after upvote event', function() {
        ioStub.emit.reset();
        var question = 'this is a question';
        var expected = [{question: question, upvotes: 1}];

        // CODE SMELL: This test depends on being run after the previous test
        // and for the question text to be the same for both
        iohelper.upvoteHandler(0);

        expect(ioStub.emit.args[0][1]).to.deep.equal(expected);
    })
});