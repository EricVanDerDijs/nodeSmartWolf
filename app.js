var express = require ("express"),
	bodyParser = require("body-parser"),
	nodemailer = require("nodemailer"),
	app = express(),
	port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var smtpTransporter = nodemailer.createTransport({
	host: "imap.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "eric2vanderdijs@gmail.com",
		pass: "%multiv4c"
	},
	tls: {rejectUnauthorized: false}
});

var message = {
    from: '"Eric Van Der Dijs <eric2vanderdijs@gmail.com>"',
    to: 'eric2vanderdijs@hotmail.com',
};

app.get("/", function(req, res){
	res.render("index");
});

app.post("/contacto", function(req,res){

	console.log(req.body);

	var mailBodyTemplate = '<h4>Deseo información sobre los sigueintes servicios:</h4><ul>serviciosSolic</ul><h4>Detalle de información solicitada:</h4><p>descripcion</p><h4>Contacto del cliente</h4><p>contactoCli</p>';
	var serviciosSolic = '', mailBody = '';
	if (typeof req.body.servicios == 'string'){
		serviciosSolic = req.body.servicios;
	}
	else{
		req.body.servicios.forEach( function(serv) {
			serviciosSolic = serviciosSolic + '<li>'+serv+'</li>';
		});
	}
	mailBody = mailBodyTemplate.replace('serviciosSolic', serviciosSolic);
	mailBodyTemplate = mailBody;

	mailBody = mailBodyTemplate.replace('descripcion', req.body.descripcion);
	mailBodyTemplate = mailBody;

	mailBody = mailBodyTemplate.replace('contactoCli', req.body.nombreCli + ' - ' + req.body.emailCli);

	message.subject = 'Solicitud de Informacion - ' + req.body.nombreCli;
	message.replyTo = req.body.emailCli;
	message.html = mailBody;

	smtpTransporter.sendMail(message, function(err,info){
		if(err){
			console.log(err);
		}
		else{
			console.log(info.messageId);
		}
	});
	message.subject = ''; message.html = '';
	res.redirect("/#contacto");
});

app.listen(port, function(req, res){
	console.log("smartwolf started at port: " + port);
});