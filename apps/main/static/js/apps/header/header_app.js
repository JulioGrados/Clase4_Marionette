EventManager.module("HeaderApp", function(HeaderApp, 
	EventManager, Backbone, Marionette, $, _){

	var API = {
		listHeader: function (){
			HeaderApp.List.Controller.listMenu();
		}
	};

	HeaderApp.on("start", function(){
		API.listHeader();
	});
});