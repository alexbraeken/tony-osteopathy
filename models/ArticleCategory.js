var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var ArticleCategory = new keystone.List('ArticleCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ArticleCategory.add({
	name: { type: String, required: true },
});

ArticleCategory.relationship({ ref: 'Article', path: 'articles', refPath: 'categories' });

ArticleCategory.register();
