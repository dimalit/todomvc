define_view("ui/TodoAdderView", ["model/TodoModel"], {
		name: "TodoAdderView",
		model: null,
		initialize: function(){
		},
		events:{
			"keypress": 'apply'
		},
		apply: function(e){
			if(e.which!=13)
				return;
			var text = this.$el.val();
			if(text=="")
				return;
			var todo = new TodoModel({'text': text});
			this.model.add(todo);
			this.$el.val("");
		}
});