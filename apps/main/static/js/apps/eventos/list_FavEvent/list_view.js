EventManager.module("EventosApp.ListFav", function(ListFav, 
	EventManager, Backbone, Marionette, $, _){

	ListFav.StaticView = Marionette.ItemView.extend({
		tagName: "article",
		className: "item-event",
		template: "#static-template",

		events: {
			'click #item-detail-evento': 'detalleEvento'
		},

		detalleEvento: function (e) {
			e.stopPropagation();
			this.trigger("evento:showFav", this.model);
		}
	});

	ListFav.EventosView = Marionette.CollectionView.extend({
		tagName: "section",
		className: "container-events",
		childView: ListFav.StaticView,

		attachHtml: function (collectionView, childView, index) {
			collectionView.$el.prepend(childView.el);		
		}
	});
});