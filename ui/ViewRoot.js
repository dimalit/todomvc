define_view("ui/ViewRoot", ["ui/TodosView", "ui/BottomView"], {
	name: 'ViewRoot',
	model: null,						// TodosModel
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
