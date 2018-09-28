var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var nodemailer = require('nodemailer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
				//Send email
				var transporter = nodemailer.createTransport({
					service: 'hotmail',
					auth: {
						user: process.env.email,
						pass: process.env.email_password
					}
				});
				
				var mailOptions = {
					from: 'alex_barca2006@hotmail.com',
					to: 'alex_barca2006@hotmail.com',
					subject: 'Contact Form Query from: ' + req.body['name.full'],
					text: req.body.message +
					'\n Email: ' + req.body.email +
					'\n phone: ' + req.body.phone +
					'\n Enquiry Type: ' + req.body.enquiryType
				};

				transporter.sendMail(mailOptions, function(error, info) {
					if(error){
						locals.validationErrors = err.errors;
					}
				});
			}
			next();
		});
	});

	view.render('contact');
};
