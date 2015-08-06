EventManager.module("AboutApp.Show", function(Show,
	EventManager, Backbone, Marionette, $, _){

	Show.About = Marionette.ItemView.extend({
		tagName: 'section',
		className: 'section-event-register',
		template: "#about-template"
	});
});