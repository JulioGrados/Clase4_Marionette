EventManager.module("HeaderApp.List", function(List,
	EventManager, Backbone, Marionette, $, _){

	List.Controller = {
		listMenu: function (){
			var links = EventManager.request("header:entites");
			
			var headers = new List.Headers({
				collection: links
			});
			EventManager.headerRegion.show(headers);
		}
	};
});