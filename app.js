var restify = require('restify');
var builder = require('botbuilder');

var questions = [{
    question : "11-3",
    answer: '9'
}, {
    question : "120+50",
    answer: '170'
}, {
    question : "150*10",
    answer: '1500'
},{
    question : "125",
    answer: '9'
}, {
    question : "120+50",
    answer: '170'
}, {
    question : "150*10",
    answer: '1500'
},{
    question : "11-3",
    answer: '9'
}, {
    question : "120+50",
    answer: '170'
}, {
    question : "150*10",
    answer: '1500'
},{
    question : "11-3",
    answer: '9'
}, {
    question : "120+50",
    answer: '170'
}, {
    question : "150*10",
    answer: '1500'
}];
var score= 0;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    // session.send("You said: %s", session.message.text);
    session.beginDialog('greetings');
});

bot.dialog('greetings', [
    // Step 1
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    // Step 2
    function (session, results) {
        console.log(results);
       builder.Prompts.text(session,`Hello ${results.response}!.. How are you?`);
    },
    //step3 
    function(session, result) {
        builder.Prompts.text(session,'Good.. So shall we start calucalation?');
    },
    //step4
    function(session, result){
        if(result.response.toLowerCase().indexOf('ok')>-1 || result.response.toLowerCase().indexOf('yes')>-1
        || result.response.toLowerCase().indexOf('sure')>-1){
            session.endDialog(session,'Ok. Lets begin with the text');
            session.beginDialog("test");
        } else {
            session.endDialog('Ok. We will begin later.');
            
        }
    }

]);
bot.dialog('test', [
    (session) => {
        builder.Prompts.text(session, questions[0].question);
    },
    (session,results) => {
        if(results.response == questions[0].answer){
            score+=1;
            console.log("after 1",score);
        }
        builder.Prompts.text(session, questions[1].question);
    },
    (session, results) => {
        if(results.response == questions[1].answer){
            score+=1;
            console.log("after 2",score);
            
        }
        builder.Prompts.text(session, questions[2].question);
    },
    (session, results) => {
        if(results.response == questions[2].answer){
            score+=1;
            console.log("after 3",score);
            
        }
    session.endDialog(`Test done. Your score is ${score}`);
        score=0;
    }
]);