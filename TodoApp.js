requirejs(["model/TodosModel", "ui/ViewRoot"], function() {
TodoApp = Backbone.Model.extend({
		view_root: null,
		defaults:{
			todos_model: new TodosModel()
		},
		initialize: function(){
			this.view_root = new ViewRoot({model: this, el: $('.ViewRoot')});
		}
});

$(function(){
	app = new TodoApp();
});

});// requirejs

