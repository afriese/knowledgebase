var Imap = require('imap'), inspect = require('util').inspect;
var fs = require('fs'), fileStream;
var MailParser = require("mailparser").MailParser;

var mailparser = new MailParser();

var email = "From: 'Sender Name' <sender@example.com>\r\n" + "To: 'Receiver Name' <receiver@example.com>\r\n" + "Subject: Hello world!\r\n" + "\r\n" + "How are you today?";

// setup an event listener when the parsing finishes

exports.getMails = function(req, res) {
	var imap = new Imap({
		user : 'andrefriese@freenet.de',
		password : 'alternderfriese',
		host : 'mx.freenet.de',
		port : 993,
		tls : true
	});

	function openInbox(cb) {
		imap.openBox('INBOX', true, cb);
	}


	imap.once('ready', function() {
		openInbox(function(err, box) {
			if (err)
				throw err;
			var f = imap.seq.fetch('3:3', {
				bodies : ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT']
			});
			f.on('message', function(msg, seqno) {
				msg.on('body', function(stream, info) {
					var buffer = '', count = 0;
					stream.on('data', function(chunk) {
						count += chunk.length;
						buffer += chunk.toString();

						if (info.which === 'TEXT') {
							res.send(buffer)
							var parts = buffer.split(/--==String_Boundary_[a-z0-9]{34}\nContent-Type: (text)\/(plain|html); charset="(utf-8)"\nContent-Transfer-Encoding: 7bit/g)
							console.log(parts.length)
							var themail = new Array();
							for (var i = 1; i < parts.length; i += 4) {
								var single = {
									"type" : parts[i],
									"subtype" : parts[i + 1],
									"encoding" : parts[i + 2],
									"content" : new Object()
								}
								console.log(single)
								themail.push(single)
							}
						}
					});
					stream.once('end', function() {
						console.log(Imap.parseHeader(buffer));

					});

				});
				msg.once('attributes', function(attrs) {
					//console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
				});
				msg.once('end', function() {
					//console.log(prefix + 'Finished');
				});
			});
			f.once('error', function(err) {
				//console.log('Fetch error: ' + err);
			});
			f.once('end', function() {
				//console.log('Done fetching all messages!');
				imap.end();
			});
		});
	});

	imap.once('error', function(err) {
		console.log(err);
	});

	imap.once('end', function() {
		console.log('Connection ended');
	});

	imap.connect();
}
/*
 var imap = new Imap({
 user : 'gadfgjoaeijg@gmail.com',
 password : 'alternder',
 host : 'imap.gmail.com',
 port : 993,
 tls : true
 });
 */

