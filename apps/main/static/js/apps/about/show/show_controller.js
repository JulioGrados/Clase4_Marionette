EventManager.module("AboutApp.Show", function(Show, 
	EventManager, Backbone, Marionette, $, _){

	Show.Controller = {
		showAbout: function () {
			var view = new Show.About();
			EventManager.mainRegion.show(view);
		}
	};
});