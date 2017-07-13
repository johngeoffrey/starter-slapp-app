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

slapp.message(/(can it be friday( yet| already)?\??)/i, ['mention', 'direct_message', 'direct_mention', 'ambient'], (msg) => {
  
  var day = dayOfTheWeek();

  var returnMessage = { text: "Sadly not, it has to be "+day+" first",
                        attachments: [{
                          title: "It's "+day,
                          image_url: 'http://i.imgur.com/O8tOJ0Q.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }]  };

  if(day == "Friday"){
    returnMessage = {  text: "What day?",
                       attachments: [{
                          title: 'What day?',
                          image_url: 'http://i.imgur.com/nKbOKwf.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }] 
                    };
  }
  msg.say(returnMessage);
  
})

slapp.message(/(when is it friday\??)/i, ['mention', 'direct_message', 'direct_mention', 'ambient'], (msg) => {
  
  var day = dayOfTheWeek();

  var returnMessage = { text: "Sadly, it's only "+day,
                        attachments: [{
                          title: "It's "+day,
                          image_url: 'http://i.imgur.com/O8tOJ0Q.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }]  };

  if(day == "Friday"){
    returnMessage = {  text: "What day?",
                       attachments: [{
                          title: 'What day?',
                          image_url: 'http://i.imgur.com/nKbOKwf.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }] 
                    };
  }
  msg.say(returnMessage);
  
})

slapp.message(/(is it friday( yet| already)?\??)/i, ['mention', 'direct_message', 'direct_mention', 'ambient'], (msg) => {
  
  var day = dayOfTheWeek();

  var returnMessage = { text: "It's "+day,
                        attachments: [{
                          title: "It's "+day,
                          image_url: 'http://i.imgur.com/O8tOJ0Q.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }]  };

  if(day == "Friday"){
    returnMessage = {  text: "What day?",
                       attachments: [{
                          title: 'What day?',
                          image_url: 'http://i.imgur.com/nKbOKwf.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }] 
                    };
  }
  msg.say(returnMessage);
  
})





// Catch-all for any other responses not handled above
slapp.message(/(what day is it\??)/i, ['mention', 'direct_message', 'direct_mention', 'ambient'], (msg) => {
  
  var day = dayOfTheWeek();

  var returnMessage = { text: "It's "+day,
                        attachments: [{
                          title: "It's "+day,
                          image_url: 'http://i.imgur.com/O8tOJ0Q.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }]  };

  if(day == "Friday"){
    returnMessage = {  text: "What day?",
                       attachments: [{
                          title: 'What day?',
                          image_url: 'http://i.imgur.com/nKbOKwf.png',
                          title_link: 'http://www.usmanjj.com/',
                          color: '#7CD197'
                        }] 
                    };
  }
  msg.say(returnMessage);
  
})


function dayOfTheWeek(){
  var now = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[ now.getDay() ];


  return day;
}





// attach Slapp to express server
var server = slapp.attachToExpress(express())

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})
