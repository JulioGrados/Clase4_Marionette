EventManager.module("EventosApp.ListMy", function( ListMy, 
	EventManager, Backbone, Marionette, $, _) {

	ListMy.Controller = {

		listMyEventos: function () {
			var fetchEventos = EventManager.request("eventos:entities");

			$.when(fetchEventos).done(function(eventos){

				var eventos = eventos.where({user: 2});

				var filtroEvents = new EventManager.EventosCollection(eventos);
				
				var eventsListView = new ListMy.EventosView ({
					collection: filtroEvents
				});

				eventsListView.on("childview:evento:showMy", function(
					childview ,model){
					EventManager.trigger("evento:show", model.get('id'));
				});

				EventManager.mainRegion.show(eventsListView);
			});
		}
	};
});