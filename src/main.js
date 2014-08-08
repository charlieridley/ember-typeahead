(function(root, undefined) {
  "use strict";
  Ember.TypeAheadComponent = Ember.TextField.extend({
      
    didInsertElement: function() {
      this._super();

      if(!this.get("data")){
        throw "No data property set";
      }

      if (jQuery.isFunction(this.get("data").then)){
        this.get("data").then(this.initializeTypeahead.bind(this));
      }

      else{
        this.initializeTypeahead(this.get("data"));
      }

    },

    initializeTypeahead: function(data){
      this.typeahead = this.$().typeahead({
        name: this.$().attr('id') || "typeahead",
        limit: this.get("limit") || 5,
        local: data.map(function(item) {
          var name = item.get(this.get("name"));
          return {
            value: name,
            name: name,
            tokens: [name],
            emberObject: item
          };
        }.bind(this))
      });

      this.typeahead.on("typeahead:selected", function(event, item) {
        this.set("selection", item.emberObject);
      }.bind(this));

      this.typeahead.on("typeahead:autocompleted", function(event, item) {
        this.set("selection", item.emberObject);
      }.bind(this));

      if (this.get("selection")) {
        this.typeahead.val(this.get("selection.name"));
      }
    },
    
    selectionObserver: function() {
      if (Ember.isEmpty(this.get('selection')) === true) {
        return this.typeahead.val('');
      }
      return this.typeahead.val(this.get("selection").get(this.get("name")));
    }.observes("selection")

  });
  Ember.Handlebars.helper('type-ahead', Ember.TypeAheadComponent);
}(this));
