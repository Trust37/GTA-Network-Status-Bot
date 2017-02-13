const commando = require('discord.js-commando');
const Cachet = require('cachet-node').Cachet;
const cjson = require('cjson');

const cachetconf = cjson.load('./conf/cachet.json'); //Loads the config for cachet
const cachet = new Cachet({
  domain: (cachetconf.domain),
  token: {
    value: (cachetconf.value),
    headerOrQueryName: (cachetconf.headerOrQueryName)
  }
});

class SetBackupCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'set-backup', //CommandName
            group: 'incident',
            memberName: 'set backup commands',
            description: 'Creates an Incident Report for the Backup Service',

            args:[
                {
                    key: 'status',
                    type: 'integer',
                    prompt: 'What status do you want to set for the Backup Service?',
                    min: 1,
                    max: 4,
                    default: 0
                }
            ]
        });
    }

    hasPermission(message){
        return message.member.roles.exists('name', 'Staff') || message.member.roles.exists('name', 'Administrator'); //SetPermission
    }
    
    async run(message, args){
        const status = args.status;

        if (status === 1){ //if !set-backup 1 then
        message.channel.sendMessage("", {embed: {
        color: 7456369,
        title: 'Incident Report created!', //Embed Title
        url: 'EMBED URL',
        description: 'The issues with our Backup Service has been RESOLVED', //Embed Description
        timestamp: new Date(),
        footer: {
            text: 'Operational',
            icon_url: 'IMAGE URL'
    }}});
        cachet.createIncident({
            body:{
            name: 'Automated Service Status Update', //Title for Incident Report
            message: 'The issues with our Backup Service has been **RESOLVED**', //Message for Incident Report
            component_id: 1, // This is the Backup Server component
            component_status: 1, //Operational
            status: 4, //fixed
            visible: 1
            }
        })
        } else if (status === 2){
        message.channel.sendMessage("", {embed: {
        color: 3447003,
        title: 'Incident Report created!',
        url: 'EMBED URL',
        description: 'Our Backup Server is expecting some Performance Issues',
        timestamp: new Date(),
        footer: {
            text: 'Performance Issues',
            icon_url: 'IMAGE URL'
    }}});
        cachet.createIncident({
            body:{
            name: 'Automated Service Status Update',
            message: 'Our Backup Server is expecting some Performance Issues',
            component_id: 1,
            component_status: 2,
            status: 2,
            visible: 1
            }
        })
        }  else if (status === 3){
        message.channel.sendMessage("", {embed: {
        color: 16753920,
        title: 'Incident Report created!',
        url: 'EMBED URL',
        description: 'Our Backup Server is expecting Partial Outage!',
        timestamp: new Date(),
        footer: {
            text: 'Performance Issues',
            icon_url: 'IMAGE URL'
    }}});
        cachet.createIncident({
            body:{
            name: 'Automated Service Status Update',
            message: 'Our Backup Server is expecting Partial Outage!',
            component_id: 1,
            component_status: 3,
            status: 2,
            visible: 1
            }
        })
        } else if (status === 4){
        message.channel.sendMessage("", {embed: {
        color: 16711680,
        title: 'Incident Report created!',
        url: 'EMBED URL',
        description: 'Our Backup Server is expecting Major Outage!',
        timestamp: new Date(),
        footer: {
            text: 'Performance Issues',
            icon_url: 'IMAGE URL'
    }}});
        cachet.createIncident({
            body:{
            name: 'Automated Service Status Update',
            message: 'Our Backup Server is expecting Major Outage!',
            component_id: 1,
            component_status: 4,
            status: 2,
            visible: 1
            }
        })
         } else if (status === 0){
        message.channel.sendMessage("", {embed: {
        color: 16711680,
        title: 'No Report created Wrong ID!',
        url: 'EMBED URL',
        description: 'Please use id`s from 1 - 4! ```Usage example: /set-backup 4``````1 = Investigating``````2 = Identified``````3 = Watching``````4 = Fixed```',
        timestamp: new Date(),
        footer: {
            text: 'Backup Server'
    }}});
        }
    }
}

module.exports = SetBackupCommand;
