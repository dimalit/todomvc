define(["text!ui/TodosView.html", "text!ui/TodosView.css", "ui/TodoView", "ui/TodoAdderView"], function(html, css) {
add_html("TodosView.html", html);
add_css("TodosView.css", css);
TodosView = Backbone.View.extend({
		name: "TodosView",
		model: null,
		_model2view: {},
		filter: "all",
		initialize: function(){
			this.model.on("add remove", this.on_add_remove, this);
			this.model.on("update", this.render, this);
			this.render();
		},
		setFilter: function(filter){
			assert(filter == "all" || filter == "active" || filter == "completed");
			if(this.filter != filter)
				this.filter = filter;
			
			for(var i=0; i<this.model.length; i++){
				var todo = this.model.at(i);
				var show = false;
				if(filter=="all")
					show = true;
				if(filter=="active" && !todo.get('completed'))
					show = true;
				if(filter=="completed" && todo.get('completed'))
					show = true;
				
				if(show)
					this._model2view[todo.cid].$el.show();
				else
					this._model2view[todo.cid].$el.hide();
			}// for
			
			this.trigger("filter");
		},
		getFilter: function(){
			return this.filter;
		},
		on_add_remove: function(todo){
			var holder_elem = this.$('.todo_views');
			if(this.model.get(todo)){
				var view = this.new_view(todo);
				holder_elem.append(view.$el);
				this._model2view[todo.cid] = view.$el;
			}
			else{
				var view = this._model2view[todo.cid];
				view.$el.remove();
				delete this._model2view[todo.cid];
			}
		},
		render: function(collection, options){
			if(options && options.changes && (options.changes.added.length==1 && options.changes.removed.length==1))
				return;
			this.$('.TodoView').remove();
			this._model2view = {};
			
			var adder_el = this.$('.TodoAdderView');
			var adder = new TodoAdderView({el: adder_el, model: this.model});
			
			var holder_elem = this.$('.todo_views');
			for(var i=0; i<this.model.length; i++){
				var todo = this.model.at(i);
				var view = this.new_view(todo)
				holder_elem.append(view.$el);
			}
		},
		new_view: function(todo){
			var view = new TodoView({model: todo});
			this._model2view[todo.cid] = view;
			view.on("delete_pressed", function(){
				var todo = view.model;
				this.model.remove(todo);
			}, this);
			return view;
		}
});
});// requirejs