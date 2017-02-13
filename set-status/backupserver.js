const commando = require('discord.js-commando');
const Cachet = require('cachet-node').Cachet;
const cjson = require('cjson');

const cachetconf = cjson.load('./conf/cachet.json');
const cachet = new Cachet({
  domain: (cachetconf.domain),
  token: {
    value: (cachetconf.value),
    headerOrQueryName: (cachetconf.headerOrQueryName)
  }
});

class BackupServerCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'backup',
            group: 'status',
            memberName: 'backup server commands',
            description: 'Set´s the status for the Backup Server',

            args:[
                {
                    key: 'status',
                    type: 'integer',
                    prompt: 'What status do you want to set for the Backup Server?',
                    min: 1,
                    max: 4,
                    default : 0
                }
            ]
        });
    }

    hasPermission(message){
        return message.member.roles.exists('name', 'Staff') || message.member.roles.exists('name', 'Administrator');
    }

    async run(message, args){
        const status = args.status;
        
        if (status === 1){
        message.channel.sendMessage("", {embed: {
        color: 7456369,
        title: 'Backup Server Status Change',
        url: 'https://status.gtanet.work',
        description: 'Backup Server Status has been changed to Operational!',
        timestamp: new Date(),
        footer: {
            text: 'Operational',
            icon_url: 'http://responding-community.de/bot/green.png'
    }}});
        cachet.updateComponentById({
            component: 11,
            body:{
            status: 1
            }
        })
        } else if (status === 2){
        message.channel.sendMessage("", {embed: {
        color: 3447003,
        title: 'Backup Server Status Change',
        url: 'https://status.gtanet.work',
        description: 'Backup Server Service Status has been changed to Performance Issues!',
        timestamp: new Date(),
        footer: {
            text: 'Performance Issue',
            icon_url: 'http://responding-community.de/bot/blue.png'
    }}});
        cachet.updateComponentById({
            component: 11,
            body:{
            status: 2
            }
        })
        } else if (status === 3){
        message.channel.sendMessage("", {embed: {
        color: 16753920,
        title: 'Backup Server Status Change',
        url: 'https://status.gtanet.work',
        description: 'Backup Server Service Status has been changed to Partial Outage!',
        timestamp: new Date(),
        footer: {
            text: 'Partial Outage',
            icon_url: 'http://responding-community.de/bot/yellow.png'
    }}});
        cachet.updateComponentById({
            component: 11,
            body:{
            status: 3
            }
        })
        } else if (status === 4){
        message.channel.sendMessage("", {embed: {
        color: 16711680,
        title: 'Backup Server Status Change',
        url: 'https://status.gtanet.work',
        description: 'Backup Server Service Status has been changed to Major Outage!',
        timestamp: new Date(),
        footer: {
            text: 'Major Outage',
            icon_url: 'http://responding-community.de/bot/red.png'
    }}});
        cachet.updateComponentById({
            component: 11,
            body:{
            status: 4
            }
        })
        } else if (status === 0){
        message.channel.sendMessage("", {embed: {
        color: 16711680,
        title: 'Wrong ID!',
        url: 'https://status.gtanet.work',
        description: 'Please use id`s from 1 - 4',
        timestamp: new Date(),
        footer: {
            text: 'Backup Server',
    }}});
        } else if (status >= 5){
        message.channel.sendMessage("", {embed: {
        color: 16711680,
        title: 'Wrong ID!',
        url: 'https://status.gtanet.work',
        description: 'Please use id`s from 1 - 4',
        timestamp: new Date(),
        footer: {
            text: 'Backup Server'
    }}});
        }
    }
}

module.exports = BackupServerCommand;
