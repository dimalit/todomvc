define(["text!ui/BottomView.html", "text!ui/BottomView.css"], function(html, css) {
add_html("BottomView.html", html);
add_css("BottomView.css", css);
BottomView = Backbone.View.extend({
		name: "BottomView",
		model: null,
		todos_view: null,
		initialize: function(options){
			this.todos_view = options.todos_view;
			this.model.on("update", this.render, this);
			this.model.on("change", this.render, this);
			this.render();
		},
		render: function(){
			var count = this.model.reduce(function(cnt, todo){
				return cnt+(todo.get('completed')?0:1);
			}, 0);
			var text = count==1? " item left" : " items left";
			this.$('.count').html(+count+text);
			
			if(this.model.length==0)
				this.$el.hide();
			else
				this.$el.show();
			
			if(this.model.findWhere({completed:true}))
				this.$('.clear_completed').show();
			else
				this.$('.clear_completed').hide();	
		},
		events: {
			"click .all": "filter_all",
			"click .active": "filter_active",
			"click .completed": "filter_completed",
			"click .clear_completed": "clear_completed"
		},
		filter_all: function(){
			this.$("ul a").removeClass("selected");
			this.$("ul a.all").addClass("selected");
			this.todos_view.setFilter("all");
		},
		filter_active: function(){
			this.$("ul a").removeClass("selected");
			this.$("ul a.active").addClass("selected");
			this.todos_view.setFilter("active");
		},
		filter_completed: function(){
			this.$("ul a").removeClass("selected");
			this.$("ul a.completed").addClass("selected");
			this.todos_view.setFilter("completed");
		},
		clear_completed: function(){
			var completed = this.model.where({completed: true});
			this.model.remove(completed);
		}
});
});// requirejs
