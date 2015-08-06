EventManager.module("Entities", function(Entities, 
	EventManager, Backbone, Marionette, $, _){

	Entities.Header = Backbone.Model.extend({
		initialize: function () {
			var selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);
		}
	});

	Entities.HeaderCollection = Backbone.Collection.extend({
		model: Entities.Header,

		initialize: function () {
			var singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);
		}
	});

	var initializeHeader = function () {
		Entities.headers = new Entities.HeaderCollection([
			{name: "Eventos", url:"eventos"},
			{name: 'About', url:"about"},
			{name: 'MyEventos', url:"event-my"},
			{name: 'EventosFavoritos', url:"event-fav"},
		]);
	}

	var API = {
		getHeader: function () {
			if (Entities.headers === undefined) {
				initializeHeader();
			}

			return Entities.headers;
		}
	};

	EventManager.reqres.setHandler("header:entites", function(){
		return API.getHeader();
	});
});