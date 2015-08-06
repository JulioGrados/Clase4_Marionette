EventManager.module("EventosApp.ListMy", function(ListMy, 
	EventManager, Backbone, Marionette, $, _){

	ListMy.StaticView = Marionette.ItemView.extend({
		tagName: "article",
		className: "item-event",
		template: "#static-template",

		events: {
			'click #item-detail-evento': 'detalleEvento'
		},

		detalleEvento: function (e) {
			e.stopPropagation();
			this.trigger("evento:showMy", this.model);
		}
	});

	ListMy.EventosView = Marionette.CollectionView.extend({
		tagName: "section",
		className: "container-events",
		childView: ListMy.StaticView,

		attachHtml: function (collectionView, childView, index) {
			collectionView.$el.prepend(childView.el);		
		}
	});
});