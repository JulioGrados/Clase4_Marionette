EventManager.module("Entities", function(Entities, 
	EventManager, Backbone, Marionette, $, _){

	EventManager.Evento = Backbone.Model.extend({
		urlRoot: "/api/eventos/",
		activate: false,

		defaults : {
			date: "",
			fecha: "",
			dia: "",
			hora: "",
			category: "",
			address: "",
			description: "",
			organizer: "",
			image: ""
		}
	});

	EventManager.Favorito = Backbone.Model.extend({
		urlRoot: '/api/favoritos/'
	});
			
	EventManager.EventosCollection = Backbone.Collection.extend({
		url: "/api/eventos/",
		model: EventManager.Evento
	});

	EventManager.FavoritosCollection = Backbone.Collection.extend({
		url: '/api/favoritos/',
		model: EventManager.Favorito
	});

	var eventosTodos = false;
	var favoritosTodos = false;

	var API = {
		getEventosEntities: function () {
			var eventosColeccion = new EventManager.EventosCollection();
			var defer = $.Deferred();

			if ( eventosTodos.length ) {
				defer.resolve(eventosTodos);
			} else {
				eventosColeccion.fetch({
					success: function(models){
						eventosTodos = models;
						defer.resolve(models);
					}
				});
			}
			return defer.promise();
		},

		getEventoEntity: function (id) {
			var eventoModel = new EventManager.Evento({id: id});
			var defer = $.Deferred();

			if(eventosTodos.length){
				var evento = eventosTodos.get(id);
				if( evento.activate === true ){
					defer.resolve(eventosTodos.get(id));
				}else{
					eventoModel.fetch({
			          	success: function(data){
			            	defer.resolve(data);
			            	evento.set(data);
			          	}
	        		});
	        		evento.activate = true;
				}
			}else{
				eventoModel.fetch({
		          	success: function(data){
		            	defer.resolve(data);
		          	}
	    		});
			}
			return defer.promise();
		},

		getFavoritosEntities: function () {
			var favoritosColeccion = new EventManager.FavoritosCollection();
			var defer = $.Deferred();

			if ( favoritosTodos.length ) {
				defer.resolve(favoritosTodos);
			} else {
				favoritosColeccion.fetch({
					success: function(models){
						favoritosTodos = models;
						defer.resolve(models);
					}
				});
			}
			return defer.promise();
		},

		getInscritosEntity: function (id) {
			EventManager.Inscrito = Backbone.Model.extend({
				urlRoot: '/api/eventos/' + id + '/inscritos/'
			});

			EventManager.InscritosCollection = Backbone.Collection.extend({
				url: '/api/eventos/' + id + '/inscritos/',
				model: EventManager.Inscrito
			});

			var inscritoColeccion = new EventManager.InscritosCollection();
			var defer = $.Deferred();
			inscritoColeccion.fetch({
				success: function (models) {
					defer.resolve(models);
				}
			});

			return defer.promise();
		}
		
	};

	EventManager.reqres.setHandler("eventos:entities", function () {
		return API.getEventosEntities();
	});

	EventManager.reqres.setHandler("favoritos:entities", function () {
		return API.getFavoritosEntities();
	});

	EventManager.reqres.setHandler("registro:entity", function (id){
		return API.getInscritosEntity(id);
	});

	EventManager.reqres.setHandler("evento:entity", function (id) {
		return API.getEventoEntity(id);
	});
});