var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Testimonial Model
 * ==========
 */

var Testimonial = new keystone.List('Testimonial');

Testimonial.add({
	name: { type: String, required: true },
  age: { type:String },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400},
});

Testimonial.defaultColumns = 'name';
Testimonial.register();
