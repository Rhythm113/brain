const { Configuration, OpenAIApi } = require("openai");
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  
});
const openai = new OpenAIApi(configuration);

bot.command('start', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, "Hey this is BRAIN. An experimental A.I created by @Rhythm113. I can do anything just ask me :)", {
  })
})

bot.command('id', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, `Current Chat ID : ${ctx.chat.id}` , {
  })
})

async function dho(msg){
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: msg,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text
}

bot.on('message', (ctx) =>
 bot.telegram.sendMessage(ctx.chat.id, "AI Processing....", {
  })
dho(ctx.message.text).then(re => 
  ctx.telegram.sendMessage(ctx.message.chat.id, re).catch((err) => console.log(err))
  ))


  bot.on('sticker', (ctx) => ctx.reply('👍'))
  const http = require('http');
  //Listener
  const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('BOT Up & Running..');
  }
  
  const server = http.createServer(requestListener);
  server.listen(process.env.PORT || 8080);
  console.log("Server Running")
  //Launch
  bot.launch();
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
  //Keep Alive the node 
  var http2 = require("http");
  setInterval(function() {
      http2.get("http://brain-fuel.herokuapp.com");
      console.log("I'm Alive hehe")
  }, 300000);
  


