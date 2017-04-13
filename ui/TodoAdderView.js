define(["text!ui/TodoAdderView.html", "text!ui/TodoAdderView.css", "model/TodoModel"], function(html, css) {
add_html("TodoAdderView.html", html);
add_css("TodoAdderView.css", css);
TodoAdderView = Backbone.View.extend({
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
});// requirejs