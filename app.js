'use strict';

// Boilerplate setup
let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json({type: 'application/json'}));

var score = 0;
var track = 0;
var questionnumber=1;
var content= [];
content[0] = ['Q1 Is earth a planet or a satellite?','Q2 Is MOON a planet or a satellite?','Q3','Q4','Q5'];
content[1] = ['Planet','Satellite','Planet','Planet','Planet'];
content[2] = ['This is explanation 1','This is explanation 2','This is explanation 3','This is explanation 4','This is explanation 5'];
content[3] = ['Cheersplus1','Cheersplus2','Cheersplus3','Cheersplus4'];
content[4] = ['Cheersneg1','Cheersneg2','Cheersneg3','Cheersneg4'];
content[5] = ['Ready1', 'Ready2', 'Ready3', 'Ready4'];
//Congrats Sound
content[6] = ["http://www.noiseaddicts.com/samples_1w72b820/279.mp3"];
//Sorry Sound
content[7] = ["http://www.noiseaddicts.com/samples_1w72b820/279.mp3"];
//End Score comment
content[8] = ["You suck", "lame","average","good job", "You are as smart as the Donald"];

app.post('/', function (request, response) {
  //console.log('headers: ' + JSON.stringify(request.headers));
  //console.log('body: ' + JSON.stringify(request.body));

  const assistant = new ApiAiAssistant({request: request, response: response});
  // const assistant = new Assistant({request: request, response: response});

  function askQuestion(assistant, question) {
    console.log('ASK QUESTION');
    assistant.ask(question);
    track++;
  }

  function giveAnswer (assistant, answer) {
    console.log('Give Answer');
    var myAnswer = assistant.getArgument('Answers');
    var nextquestion = questionnumber+1;
    console.log('Myanswer:' + myAnswer);

      if (myAnswer == answer) {
                /* RIGHT answer*/

        //assistant.tell('<speak> <audio src="http://www.noiseaddicts.com/samples_1w72b820/279.mp3"></audio> </speak>');
        /*TODOInsert Replace with array and add random */
        score++;

        if (questionnumber == 5) {
            assistant.tell('<speak> <audio src="http://www.noiseaddicts.com/samples_1w72b820/279.mp3"></audio> You got the right answer! '+ content[3][getRandomNumber(0,3)] +'.That\'s a wrap! You got '+ score + ' out of 5 right! ' + content[8][score-1] + 'That was fun! Come back anytime!');
        }
        else {
        assistant.ask('<speak> <audio src="http://www.noiseaddicts.com/samples_1w72b820/279.mp3"></audio> You got the right answer! '+ content[3][getRandomNumber(0,3)] +'.'+ content[5][getRandomNumber(0,3)] + nextquestion + ' !?</speak>');
        }

      } else {
              /* WRONG answer*/

        if (questionnumber == 5) {
            assistant.tell("Ahhhh, sorry wrong answer..." + content[4][getRandomNumber(0,3)] + "." + content[2][questionnumber-1] + "."+'That\'s a wrap! Your got '+ score + " out of 5 right!" + content[8][score-1] + ". That was fun! Come back anytime!")
        } else {
        assistant.ask(/*TODOInsert sound here*/
          "Ahhhh, sorry wrong answer..." + content[4][getRandomNumber(0,3)] + "." + content[2][questionnumber-1] + "."+ content[5][getRandomNumber(0,3)] + nextquestion + " !?")
        }

      }
    track++;
    questionnumber++;
    console.log("TRACK Giveanswer:" + track);
    console.log("QUESTIONUMBER Giveanswer:" + questionnumber);

  }

function holdon(assistant) {
  assistant setContext("holdon");
  assistant.ask("Ok. Do you want to continue the quizz, take a break, or stop playing?");
}

function pause(assistant) {
  assistant setContext("holdon");
  assistant.tell("Sounds good. I'll wait for you here. Just let me know when you are ready to continue the quizz?");
}

function resume(assistant) {
  assistant setContext("holdon");
  assistant.ask("Ok. Do you want to take a break or stop the quizz?");
}

function exit(assistant) {
  assistant.tell("Ok. Come back any time if you want to practice and learn cool things!");
}

  function router(assistant) {
    switch (track) {
      case 0:
        askQuestion(assistant,content[0][questionnumber-1]);
        break;
      case 1:
        giveAnswer (assistant,content[1][questionnumber-1])
        break;
      case 2:
        askQuestion(assistant,content[0][questionnumber-1]);
        break;
      case 3:
        giveAnswer (assistant, content[1][questionnumber-1])
        break;
      case 4:
        askQuestion(assistant,content[0][questionnumber-1]);
        break;
      case 5:
        giveAnswer (assistant, content[1][questionnumber-1])
        break;
      case 6:
        askQuestion(assistant,content[0][questionnumber-1]);
        break;
      case 7:
        giveAnswer (assistant, content[1][questionnumber-1])
        break;
      case 8:
        askQuestion(assistant,content[0][questionnumber-1]);
        break;
      case 9:
        giveAnswer (assistant, content[1][questionnumber-1])
        break;

        default: console.log("DEFAULT SWITCH LOOP");
    }
  }


  let actionMap = new Map();
  actionMap.set("Start-quizz", router);
  actionMap.set("GenAnswer", router);
  actionMap.set("Positive", router);
  actionMap.set("Negative", holdon);
  actionMap.set("Pause", pause);
  actionMap.set("Resume", resume);
  actionMap.set("quit", quit);
  // actionMap.set(CHECK_GUESS_ACTION, checkGuess);
  assistant.handleRequest(actionMap);

});


function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start the server
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
