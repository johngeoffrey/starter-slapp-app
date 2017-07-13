'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

// use `PORT` env var on Beep Boop - default to 3000 locally
var port = process.env.PORT || 3000

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
})


var HELP_TEXT = `
I will respond to the following messages:
\`help\` - to see this message.
\`hi\` - to demonstrate a conversation that tracks state.
\`thanks\` - to demonstrate a simple response.
\`<type-any-other-text>\` - to demonstrate a random emoticon response, some of the time :wink:.
\`attachment\` - to see a Slack attachment message.
`

//*********************************************
// Setup different handlers for messages
//*********************************************






// Catch-all for any other responses not handled above
slapp.message(/^(what day is it\?)/i, ['mention', 'direct_message', 'direct_mention', 'ambient'], (msg) => {
  var now = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[ now.getDay() ];

  var returnMessage = { text: "It's "+days[ now.getDay()] };

  if(day == "Friday"){
    returnMessage = { text: "IT'S FRIDAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY!!!!!!!!",
                       attachments: [{
                          text: 'DAYBOT SAYS IT\'S FRIDAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
                          title: 'FRIDAY!!!',
                          image_url: 'https://lh5.googleusercontent.com/jnX57kObeYhtEabz-eAdT7MS6FsyLULDjmcv-o0OqA2qwKJawWQdho6ZvHATEbeEpSO9Lre28F3v3yc=w1920-h950',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }] 
                    };
  }
  msg.say(returnMessage);
  
})

// Catch-all for any other responses not handled above
slapp.message(/^(testestest\?)/i, ['mention', 'direct_message', 'direct_mention', 'ambient'], (msg) => {
  var now = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[ now.getDay() ];

  var returnMessage = { text: "It's "+days[ now.getDay()] };

  
    returnMessage = { 
                    text: "What day?",
                    attachments: [{
                          title: 'What day?',
                          image_url: 'https://lh5.googleusercontent.com/jnX57kObeYhtEabz-eAdT7MS6FsyLULDjmcv-o0OqA2qwKJawWQdho6ZvHATEbeEpSO9Lre28F3v3yc=w1920-h950',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }] 
                    };
  
  msg.say(returnMessage);
  
})



// attach Slapp to express server
var server = slapp.attachToExpress(express())

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})
