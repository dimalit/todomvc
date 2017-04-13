define(["model/TodoModel"], function() {
TodosModel = Backbone.Collection.extend({
		model: TodoModel,
		initialize: function(){
		
		},
		clearCompleted: function(){
			var self = this;
			this.remove(
				this.filter(function(todo){
					return todo.get('completed');
				})
			);
		}
});
});// requirejs
