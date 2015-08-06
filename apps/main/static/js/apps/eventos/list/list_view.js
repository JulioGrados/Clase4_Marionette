EventManager.module("EventosApp.List", function(List, 
	EventManager, Backbone, Marionette, $, _){

	List.StaticView = Marionette.ItemView.extend({
		tagName: "article",
		className: "item-event",
		template: "#static-template",

		events: {
			'click #item-detail-evento': 'detalleEvento'
		},

		detalleEvento: function (e) {
			e.stopPropagation();
			this.trigger("evento:show", this.model);
		}
	});

	// List.EventosView = Marionette.CompositeView.extend({
	// 	tagName: 'section',
	// 	template: "#eventList-template",
	// 	childView: List.StaticView,
	// 	childViewContainer: '.container-events',
	// 	attachHtml: function (compositeView, childView, index) {
	// 		compositeView.$el.prepend(childView.el);		
	// 	}
	// });

	List.EventosView = Marionette.CollectionView.extend({
		tagName: "section",
		className: "container-events",
		childView: List.StaticView,

		attachHtml: function (collectionView, childView, index) {
			collectionView.$el.prepend(childView.el);		
		}
	});
});