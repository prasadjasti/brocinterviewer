var restify = require('restify');
var builder = require('botbuilder');

var questions = [{
    question : "If Logx (1 / 8) = - 3 / 2, then x is equal to ",
    answer: '4'
}, {
    question : "20 % of 2 is equal to",
    answer: '0.4'
}, {
    question : "If Log 4 (x) = 12, then log 2 (x / 4) is equal to ",
    answer: '22'
},{
    question : "The population of a country increased by an average of 2% per year from 2000 to 2003. If the population of this country was 2 000 000 on December 31, 2003, then the population of this country on January 1, 2000, to the nearest thousand would have been",
    answer: '1846000'
}, {
    question : "A school committee consists of 2 teachers and 4 students. The number of different committees that can be formed from 5 teachers and 10 students is ",
    answer: '2100'
}, {
    question : "Five different books (A, B, C, D and E) are to be arranged on a shelf. Books C and D are to be arranged first and second starting from the right of the shelf. The number of different orders in which books A, B and E may be arranged is______!",
    answer: '3'
},{
    question : "The exam scores of all 500 students were recorded and it was determined that these scores were normally distributed. If Jane's score is 0.8 standard deviation above the mean, then how many, to the nearest unit, students scored above Jane? ",
    answer: '106'
}, {
    question : "When a metallic ball bearing is placed inside a cylindrical container, of radius 2 cm, the height of the water, inside the container, increases by 0.6 cm. The radius, to the nearest tenth of a centimeter, of the ball bearing is______ cm",
    answer: '1.2'
}, {
    question : "The probability that an electronic device produced by a company does not function properly is equal to 0.1. If 10 devices are bought, then the probability, to the nearest thousandth, that 7 devices function properly is",
    answer: '0.057'
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
    appId: "78281f63-2db6-4dc0-8b87-80ad285d8b6c",
    appPassword: "exZkT5jFQzW7xpgoED9w6uf"
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
        builder.Prompts.text(session,'Good.. So shall we start test?');
    },
    //step4
    function(session, result){
        if(result.response.toLowerCase().indexOf('ok')>-1 || result.response.toLowerCase().indexOf('yes')>-1
        || result.response.toLowerCase().indexOf('sure')>-1){
            session.endDialog(session,'Ok. Lets begin with the test');
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
       builder.Prompts.text(session, questions[3].question);

   // session.endDialog(`Test done. Your score is ${score}`);
   //     score=0;
    },
    (session,results) => {
        if(results.response == questions[3].answer){
            score+=1;
            console.log("after 3",score);
        }
        builder.Prompts.text(session, questions[4].question);
    },
    (session, results) => {
        if(results.response == questions[4].answer){
            score+=1;
            console.log("after 4",score);
            
        }
        builder.Prompts.text(session, questions[5].question);
    },
    (session, results) => {
        if(results.response == questions[5].answer){
            score+=1;
            console.log("after 5",score);
            
        }
        builder.Prompts.text(session, questions[6].question);

    // session.endDialog(`Test done. Your score is ${score}`);
    //     score=0;
    },
    (session,results) => {
        if(results.response == questions[6].answer){
            score+=1;
            console.log("after 6",score);
        }
        builder.Prompts.text(session, questions[7].question);
    },
    (session, results) => {
        if(results.response == questions[7].answer){
            score+=1;
            console.log("after 7",score);
            
        }
        builder.Prompts.text(session, questions[8].question);
    },
    (session, results) => {
        if(results.response == questions[8].answer){
            score+=1;
            console.log("after 8",score);
            
        }
    session.endDialog(`Test done. Your score is ${score}`);
        score=0;
    }
]);