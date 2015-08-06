EventManager.module("EventosApp.List", function(List, 
	EventManager, Backbone, Marionette, $, _){

	List.Controller = {
		listEventos: function () {
			var fetchEventos = EventManager.request("eventos:entities");
			
			$.when(fetchEventos).done(function(eventos){
				
				
				var eventosListView = new List.EventosView({
					collection: eventos
				});

				eventosListView.on("childview:evento:show", function(
					childView, model){
					EventManager.trigger("evento:show", model.get('id'));
				});

				EventManager.mainRegion.show(eventosListView);
			});

			
		}
	};
});