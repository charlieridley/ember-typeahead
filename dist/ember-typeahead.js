(function(root, undefined) {
  "use strict";
  Ember.TypeAheadComponent = Ember.TextField.extend({
      
    didInsertElement: function() {
      this._super();
      var _this = this;
      
      if(!this.get("data")){
        throw "No data property set";
      }

      if (jQuery.isFunction(this.get("data").then)){
        this.get("data").then(function(data) {
          _this.initializeTypeahead(data);
        });
      }

      else{
        this.initializeTypeahead(this.get("data"));
      }

    },

    initializeTypeahead: function(data){
      var _this = this;
      this.typeahead = this.$().typeahead({
        name: _this.$().attr('id') || "typeahead",
        limit: this.get("limit") || 5,
        local: data.map(function(item) {
          return {
            value: item.get(_this.get("name")),
            name: item.get(_this.get("name")),
            tokens: [item.get(_this.get("name"))],
            emberObject: item
          };
        })
      });

      this.typeahead.on("typeahead:selected", function(event, item) {
        _this.set("selection", item.emberObject);
      });

      this.typeahead.on("typeahead:autocompleted", function(event, item) {
        _this.set("selection", item.emberObject);
      });

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
