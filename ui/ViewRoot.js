define(["text!ui/ViewRoot.html", "text!ui/ViewRoot.css", "ui/TodosView", "ui/BottomView"], function(html, css) {
add_html("ViewRoot.html", html);
add_css("ViewRoot.css", css);
ViewRoot = Backbone.View.extend({
	name: 'ViewRoot',
	model: null,
	todos_view: null,
	bottom_view: null,
	initialize: function(){
		this.todos_view = new TodosView({el:this.$('.TodosView'), model: this.model.get('todos_model')});
		this.bottom_view = new BottomView({el: this.$('.BottomView'), model: this.model.get('todos_model'), todos_view: this.todos_view});
		this.render();
	},
	render: function(){
	},
	events:{
	}
});
});// requirejs
