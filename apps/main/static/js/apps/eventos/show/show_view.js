EventManager.module("EventosApp.Show", function(Show,
	EventManager, Backbone, Marionette, $, _){

	Show.Layout = Marionette.LayoutView.extend({
		tagName: 'section',
		className: 'section-event-register',
		template: '#events-register-layout',

		regions: {
			eventRegion: '#event-item',
			panelRegister: '#event-register'
		}
	});	

	Show.Event = Marionette.ItemView.extend({
		tagName: 'section',
		className: 'item-detail',
		template: "#detalle-template",

		events: {
			'click .btn-small': 'atrasEvento',
			'click #item_favorito': 'favoritoEvento'
		},

		atrasEvento: function (e) {
			this.trigger("showList:eventos", this.model);
		},

		favoritoEvento: function (e) {
			this.trigger("favorito:eventos", this.model);
		}
	});

	Show.Register = Marionette.ItemView.extend({
		tagName: 'section',
		className: 'item-registro',
		template: '#register-template',

		events: {
			'click #item_register': 'registrarEvento'
		},

		registrarEvento: function (e) {
			e.stopPropagation();

			this.trigger("registrar:evento", $("#item-nombre").val(),
				$("#item-apellido").val(), $("#item-dni").val(),
				$("#item-telefono").val());

			$("#item-nombre").val('');
			$("#item-apellido").val('');
			$("#item-dni").val('');
			$("#item-telefono").val('');
		}
	});
});