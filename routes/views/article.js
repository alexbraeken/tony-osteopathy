var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'articles';
	locals.filters = {
		article: req.params.article,
	};
	locals.data = {
		articles: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Article').model.findOne({
			state: 'published',
			slug: locals.filters.article,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.article = result;
			next(err);
		});

	});

	// Load other articles
	view.on('init', function (next) {

		var q = keystone.list('Article').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.articles = results;
			next(err);
		});

	});

	// Render the view
	view.render('article');
};
