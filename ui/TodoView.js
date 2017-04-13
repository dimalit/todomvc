define(["text!ui/TodoView.html", "text!ui/TodoView.css"], function(html, css) {
add_html("TodoView.html", html);
add_css("TodoView.css", css);
TodoView = Backbone.View.extend({
		name: "TodoView",
		model: null,
		initialize: function(){
			this.model.on('change', this.render, this);
			this.render();
		},
		render: function(){
			this.$('.text').html(this.model.get('text'));
			if(this.model.get('completed')){
				this.$el.addClass('completed');
				this.$('.complete').attr("checked");
			}
			else				
				this.$el.removeClass('completed');
		},
		events:{
			"click .delete": 'on_delete_pressed',
			"click .complete": 'on_complete_pressed'
		},
		on_delete_pressed: function(){
			this.trigger('delete_pressed');
		},
		on_complete_pressed: function(){
			var c = this.model.get('completed');
			this.model.set('completed', !c);
		}
});
});// requirejs
