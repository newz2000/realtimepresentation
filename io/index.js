var connection_count = 0;
var questions = [];
var current_slide;

var io;

var gotoHandler = function(data) {
    current_slide = data;
    io.emit('goto', data);
};
var questionHandler = function(data) {
    questions.push({question: data, upvotes: 0});
    io.emit('questions', questions);
};

var upvoteHandler = function(data) {
    var questionId = Number(data);

    if(questionId >= 0 && questionId < questions.length) {
        questions[questionId].upvotes++;
        io.emit('questions', questions);
    }
};

var disconnectionHandler = function() {
    connection_count--;
    io.emit('connections', connection_count);
}

var connectionHandler = function(socket) {
    connection_count++;

    io.emit('connections', connection_count);
    socket.emit('questions', questions);
    socket.emit('goto', current_slide);

    socket.on('disconnect', disconnectionHandler);
    socket.on('goto', gotoHandler);
    socket.on('question', questionHandler);
    socket.on('upvote', upvoteHandler);

}

var init = function(ioinit) {
    io = ioinit;
}

module.exports = {
    connectionHandler: connectionHandler,
    disconnectionHandler: disconnectionHandler,
    upvoteHandler: upvoteHandler,
    questionHandler: questionHandler,
    gotoHandler: gotoHandler,
    init: init
};