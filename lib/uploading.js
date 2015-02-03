
// var tours = [
// 	{ id: 0, name: 'Hood River', price: 99.99 },
// 	{ id: 1, name: 'Oregon Coast', price: 149.95 },
// ];

// /************************************** DEFAULT UPLOAD REQUEST **************************************/

// // Upload form page
// app.get('/vacation-photo',function(req,res){
// 	var now = new Date();
// 	res.render('vacation-photo',{
// 		 year: now.getFullYear(),month: now.getMonth	()
// 	 });
// });

// // Upload function
// app.post('/contest/vacation-photo/:year/:month', function(req, res){
//  	var form = new formidable.IncomingForm();
// 	form.parse(req, function(err, fields, files){
// 		if(err) return res.redirect(303, '/error');
// 		console.log('received fields:');
// 		console.log(fields);
// 		console.log('received files:');
// 		console.log(files);
// 		res.redirect(303, '/thank-you');
// 	 });
// });

// app.get('/about', function(req, res){
// 	res.render('about', { fortune: fortune.getFortune() });
// });


 /************************************** Handlebars **************************************/

// app.get('/handlebars', function(req, res){
// 	res.render('functionality', 
// 	{

// 		currency: {

// 			name: 'United States dollars',
// 			abbrev: 'USD'

// 		},

// 		tours: [

// 			{ name: 'Hood River', price: '$99.95' },
// 			{ name: 'Oregon Coast', price: '$159.95' }

// 		],

// 		specialsUrl: '/january-specials',
// 		currencies: [ 'USD', 'GBP', 'BTC' ]

// 	});
// });