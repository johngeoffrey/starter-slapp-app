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

  var returnMessage = "It's "+days[ now.getDay()];

  if(day == "Friday"){
    returnMessage = "IT'S FRIDAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY!!!!!!!!";
  }
  msg.say({
    text:returnMessage,
    attachments: [{
      text: 'DAYBOT SAYS IT\'S FRIDAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
      title: 'FRIDAY!!!',
      image_url: 'https://lh3.googleusercontent.com/UYxU7SiFjs1WuoegWgHN5hqWmS82GYf-h8ZsAaCuoCvN3tVJWKStW9-SN7oXLnoUTwUN9V2wvitQexk=w1920-h901',
      title_link: 'http://www.usmanjj.com/',
      color: '#7CD197'
    }]
  });
  
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
