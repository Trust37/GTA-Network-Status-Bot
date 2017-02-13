const Discord = require('discord.js');
const commando = require('discord.js-commando');
const Cachet = require('cachet-node').Cachet;
const bot = new commando.Client();
const cjson = require('cjson');

const config = cjson.load('./conf/config.json');

bot.registry.registerGroups([
  ['help', 'Help'],
  ['incident','Create Incident Report'],
  ['status','Set´s the Status for our Components'],
  ['test','DO NOT USE']
])

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('ready', () => {
  console.log('I am online :)');
});

bot.on('exit', () => {
  console.log('I am offline :(');
});

bot.on('reconnecting', () => {
  console.log('I am reconnecting :o')
});

bot.login(config.token);
