const commando = require('discord.js-commando');
const request = require('request');

var alert = 0; //controls the alert 0 is default for false
var timer = 0; //controls the timer 0 is default for false

class TrackCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'track',
            group: 'tracking',
            memberName: 'track our webservices',
            description: 'Track the status of our Main Server',

            args:[
                {
                    key: 'status',
                    type: 'integer',
                    prompt: '1 = On & 2 = Off',
                    min: 1,
                    max: 2,
                    default: 0
                }
            ]
        });
    }

    hasPermission(message){
        return message.member.roles.exists('name', 'Staff') || message.member.roles.exists('name', 'Administrator');
    }

    async run(message, args){
        var status = args.status;
        if (status === 1){

            message.channel.sendMessage("", {embed: {
            color: 7456369,
            title: 'Tracking of the Main Server started',
            description: 'Our MainServer is now tracked, i will report any issues to this channel.',
            timestamp: new Date(),
            footer: {
                text: 'Tracker',
                icon_url: 'IMAGE URL'
                }}});  

        timer = 1
        var recursive = function () {
            if (timer === 1){
            setTimeout(recursive,30000);//30000 30 seconds

            request('TARGET URL', function (error, response) {
            if (!error && response.statusCode == 200) { //normal status code is 200
                console.log("Service is up and running")
                alert = 0 //if everything is fine var alert is 0
            }
            else {
                alert ++;//if something is wrong alert will be 1 ...
                if (alert === 5){
                    console.log("alert level = 5")

                    message.channel.sendMessage("", {embed: {
                    color: 16711680,
                    title: 'Main Server Issue!',
                    url: 'EMBED URL',
                    description: '@here Our Mainserver has probably an issue! Expected Response Code isn´t 200! Preparing Automated Status Message!',
                    timestamp: new Date(),
                    footer: {
                        text: 'Main Server',
                        icon_url: 'IMAGE URL'
                }}});    
                }
            }
            })
        } }       
        recursive();

        } else if (status === 2){
            timer = 0
            console.log("Timer stopped!")

            message.channel.sendMessage("", {embed: {
            color: 16711680,
            title: 'Tracking of the Main Server stopped',
            description: 'Our MainServer is no more tracked, i don´t report anything anymore.',
            timestamp: new Date(),
            footer: {
                text: 'Tracker',
                icon_url: 'IMAGE URL'
            }}});  
        }
    }
}

module.exports = TrackCommand;
