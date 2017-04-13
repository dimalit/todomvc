function assert(cond, text){
	if(cond)
		return;
	if (typeof Error !== "undefined"){
		var e = new Error(text);
		console.log(e);
		throw e;
	}
	else
		throw text;
}

add_html = function(name, html){
	var el = $("<script type='text/template' id='"+name+"'>"+html+"</script>");
	$('head').append(el);
}

add_css = function(name, css){
	var el = $("<style type=\"text/css\" id=\""+name+"\">\n" + css + "</style>\n");
	$('head').append(el);
	var sheet =el[0].sheet;
	var basename = (name.split('.'))[0];
	
	// get all rules
	var all = [];
	var r = false;
	var i = 0;
	try{
		if(sheet.cssRules){
			for(var j=0; j<sheet.cssRules.length; j++){
				r = sheet.cssRules[j];
				all.push({selectorText: r.selectorText, cssText: r.cssText});
			}
		}
	}catch(e){
		console.log("Exception:");
		console.log(e);
		return;
	}	// HACK: strange exception here in firefox...
	//remove all rules
	for(var i=all.length-1; i>=0; i--){
		sheet.deleteRule(i);
	}
	// add new rules
	for(var i=0; i<all.length; i++){
		var rules = all[i].cssText.replace(all[i].selectorText, "");
		var selectors = all[i].selectorText.split(",");
		selectors.forEach(function(el, j){
			selectors[j] = "."+basename+" "+el;
		});
		var new_selector = selectors.join(',');
		sheet.insertRule(new_selector+rules, i);
	}	
	
}

Backbone.View = Backbone.View.extend({
		constructor:function(options){
			// copied from Backbone
			this.cid = _.uniqueId('view');
			_.extend(this, _.pick(options, ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events']));
			this._ensureElement();
			// end
			
			// add html
			if(this.name){
				var $js_el = $("#"+this.name+"\\.html");
				var html = $js_el.html();
				var el = $(html);
				this.$el.replaceWith(el);
				this.setElement(el);
			}
			
			this.initialize.apply(this, arguments);
		}
});