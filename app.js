'use strict';

// Boilerplate setup
let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json({type: 'application/json'}));

var score = 0;
var track = -2;
var questionnumber=1;

//Copy hard-coded in matrix
var content= [];

//Questions
content[0] = [
'What is the planet which name is also a famous cartoon dog?',
'What is the biggest planet in the solar system?',
'How many days does it take for the moon to go around the Earth?',
'What is the real name of the planet people call the Red planet?',
'What is the planet in the solar system with the largest set of rings?'];

//Correct answers
content[1] = [
'Pluto',
'Jupiter',
'27',
'Mars',
'Saturn'];

//Explanation to the question if user gets answer wrong
content[2] = [
'Pluto is not very big. It is only half as wide as the United States. Pluto is very, very cold; Much colder than Antarctica. It is the furthest planet in the solar system.',
'Jupiter is the fifth planet from our sun and the largest planet in the solar system. Jupiter is surrounded by more than 50 moons. Its iconic Great Red Spot is a giant storm bigger than Earth that has raged for hundreds of years. ',
'The Moon orbits Earth and completes one revolution in 27 days. An easy way to recall it is to remember that it is slighly less than a month.',
'Mars is often referred to as the "Red Planet" because the iron oxide on its surface gives it a reddish appearance. Everything is red rusty on Mars.',
'There are billions of ring particles in Saturn\'s ring system. The ring particle sizes range from tiny, dust-sized icy grains to a few particles as large as mountains. They are believed to be pieces of comets, asteroids or shattered moons that broke up before they reached the planet',
];

//Cheering message if user gets answer right
content[3] = [
'Yeah! Awesome! You got the right answer!',
'Hooray? That\'s correct!',
'Cheers? That was a tough one and you got it perfectly right!',
'Kudos to you! That\'s the right answer',
'Meeeow? That was cat for correct'];

//Cheering message if user gets answer wrong
content[4] = [
'Not quite, the correct answer is ',
'Blimey Buccaneer?. That was pirate for "too bad". Jack Sparrow just told me the correct answer is',
'Non. Non. Non. That\'s french for no. Here is the correct answer:',
'Target missed. Over. The right answer is',
'Based on my calculations, knowing that root of 49 is 7, the correct answer is '];

//Prompt to check if user is ready
content[5] = [
'Sounds good? How about we move to question',
'Oki doki? Ready for question',
'All right? Moving on! Should I move forward to question',
'Learning is pretty fun, right?. Are you ready for question',
'Next question coming through! Ready for question'];

//Congrats Sound
content[6] = [
"https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-five/zapsplat_cartoon_ascend_tone_high_pitched_sci-fi.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/comedy_marimba_ascend_003.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/magic_spell_trick_001.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-sound-ex-machina/sound_ex_machina_Applause,%20Clapping,%20Crowd%20Ambience.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/arcade-game-fruit-machine-jackpot-002-short.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/arcade-game-fruit-machine-payout-collect.mp3"];

//Sorry Sound
content[7] = [
"https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/arcade_game_fall_tone_001.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/cc0/impact_car_crash.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-four/zapsplat_musical_recorder_playing_badly.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-four/zapsplat_multimedia_game_lose_negative_003.mp3", "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-little-robot-sound-factory/little_robot_sound_factory_Jingle_Lose_01.mp3"];

//Comments based on the final score
content[8] = [
"Hey you know what? Your score might be kind of low, but we did learn a ton while practicing together, and that's what matters",
"Hey you know what? Your score might be kind of low, but we did learn a ton while practicing together, and that's what matters",
"That's pretty good? You missed a just couple of answers but it's a tough quizz. I am positive next time you'll crush it!",
"Wow? Great job! That's impressive! You clearly know a LOT about this topic! ",
"Amazing? You are as smart as IQ! I am super impressed! This topic has no secret for you."];

//Topics of study
var topic = ["science", "history", "biology", "maths", "computers"];

//Webhook application where we handle the business logic

app.post('/', function (request, response) {
  //console.log('headers: ' + JSON.stringify(request.headers));
  //console.log('body: ' + JSON.stringify(request.body));

  const assistant = new ApiAiAssistant({request: request, response: response});

  function askQuestion(assistant, question) {
    console.log('ASK QUESTION');
    assistant.ask(question);
    track++;
  }



  function giveAnswer (assistant, answer) {
    console.log('ENTER INTO GIVEANSWER FUNCTION');
    console.log('LENGTH TEST:' + content[6].length);
    var myAnswer = assistant.getArgument('Answers');
    var nextquestion = questionnumber+1;
    console.log('Myanswer:' + myAnswer);

      if (myAnswer == answer) {

        /* RIGHT answer*/

        score++;

        if (questionnumber == 5) {
            assistant.tell('<speak> <audio src="' + content[6][getRandomNumber(0,content[6].length-1)] + '"></audio>' +
            content[3][getRandomNumber(0,content[3].length-1)] +
            '.That\'s a wrap! You got '+ score + ' out of 5 right! ' +
            content[8][score-1] +
            ".  <break time='1s'/> That was really fun! Come back anytime! I have plenty of other quizzes on" + topic[getRandomNumber(topic.length-1)] +", " + topic[getRandomNumber(topic.length-1)]+", and " + topic[getRandomNumber(topic.length-1)]+"</speak>");
        }
        else {
        assistant.ask('<speak> <audio src="' + content[6][getRandomNumber(0,content[6].length-1)] + '"></audio> ' + content[3][getRandomNumber(0,content[3].length-1)] +'. <break time="1s"/>'+
        content[5][getRandomNumber(0,content[5].length-1)] + " "+
        nextquestion + ' !?</speak>');
        }

      } else {

        /* WRONG answer*/

        if (questionnumber == 5) {
            assistant.tell('<speak> <audio src="' + content[7][getRandomNumber(0,content[7].length-1)] + '"></audio> ' +
             content[4][getRandomNumber(0,content[4].length-1)] + ". " +
             content[2][questionnumber-1] + ".  "+
             'That\'s a wrap! Your got '+
             score + " out of 5 right!" +'. <break time="1s"/>'+
             content[8][score-1] +
             ".  <break time='1s'/> That was really fun! Come back anytime! I have plenty of other quizzes on" + topic[getRandomNumber(topic.length-1)] +", " + topic[getRandomNumber(topic.length-1)]+", and " + topic[getRandomNumber(topic.length-1)]+"</speak>");

        } else {
        assistant.ask('<speak> <audio src="' + content[7][getRandomNumber(0,content[7].length-1)] + '"></audio> ' + content[4][getRandomNumber(0,content[4].length-1)] + " " +
        content[1][questionnumber-1] + ". " +
        content[2][questionnumber-1] + '. <break time="1s"/>'+
        content[5][getRandomNumber(0,content[5].length-1)] + " " +
        nextquestion + " !?</speak>");
        }

      }
    track++;
    questionnumber++;
    console.log("ENDOFGIVEANSWERFUNCTION TRACK#:" + track);
    console.log("QUESTIONUMBER Giveanswer:" + questionnumber);

  }

//Set of functions to manage the case where the user tries to interrompt the quizz question flow by showing a negative intent

function holdon(assistant) {
  if (track%2 == 0) {
    console.log("PAIR");
    assistant.setContext("holdon");
    assistant.ask("Ok. Do you want to continue the quizz, take a break, or stop playing?");

  } else {
  console.log("IMPAIR");
  track = track -2;
  console.log("QUESTIONUMBERREBOOT:" + questionnumber);
  askQuestion(assistant,content[0][questionnumber-1]);
  }

  }

//Manage the set of options when user interrompts the flow after an answer between two questions

function pause(assistant) {
  console.log("PAUSE");
  assistant.ask("Sounds good. I'll wait for you here. Just let me know when you are ready to continue the quizz?");
}

function resume(assistant) {
  console.log("RESUME");
  console.log("QUESTIONUMBERRESUMEAFTER-1:" + questionnumber);
  askQuestion(assistant, content[0][questionnumber-1]);
}

function exit(assistant) {
  assistant.tell("Ok. Come back any time if you want to practice and learn cool things!");
}


//Custom routing function that tracks where the user is in the quizz flow and core loop

  function router(assistant) {
    switch (track) {
      case -2:
        askQuestion(assistant,"What subject do you want to study and practice with me? I am really good at "+ topic[0]+" and "+topic[1]+". I also have quizzes on " + topic[3] +", " +topic[2]+", and " + topic[4]);
        break;
      case -1:
        askQuestion(assistant,'<speak> Sounds good! Here is how the quizz work:<break time="1s"/> I\'m going to ask you 5 questions in a row and I\'ll give you some explanations if you get some answers wrong. Are you ready to get started?</speak>');
        break;
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

  //Action Map. Most of these intents coming from API.AI will deverse in the custom routing function above

  let actionMap = new Map();
  actionMap.set("Start-quizz", router);
  actionMap.set("GenAnswer", router);
  actionMap.set("Positive", router);
  actionMap.set("Negative", holdon);
  actionMap.set("Clueless", router);
  actionMap.set("Pause", pause);
  actionMap.set("Resume", resume);
  actionMap.set("Exit", exit);
  // actionMap.set(CHECK_GUESS_ACTION, checkGuess);
  assistant.handleRequest(actionMap);

});

//GetRandom function we use to randomize sounds and prompts

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start the server and listen
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});


//TODO_Add hook on the topic when closing
