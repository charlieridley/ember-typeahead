/*global Bloodhound:false */

(function(root, undefined) {
  "use strict";
  Ember.TypeAheadComponent = Ember.TextField.extend({

    didInsertElement: function() {
      this._super();
      var _this = this;

      if(!this.get("local") && !this.get('prefetch') && !this.get('remote') && !this.get('source')){
        throw "No data source set";
      }

      // respect minLength of 0
      if (this.get('minLength') === undefined) {this.set('minLength', 1); }

      // respect false values for options
      if (this.get('hint')      === undefined) {this.set('hint', true); }
      if (this.get('highlight') === undefined) {this.set('highlight', true); }

      // Resolves futures where necessary.
      if (this.get("local") && jQuery.isFunction(this.get("local").then)){
        this.get("local").then(function(local) {
          _this.local = local;
          _this.initializeTypeahead();
        });
      } else {
        this.initializeTypeahead();
      }

      //Set Classes on the wrapping input element
      if (this.get("typeaheadClassNames")){
        this.$().parent().addClass(this.get("typeaheadClassNames"));
      }

      //Set Classes on the input element
      if (this.get("inputClassNames")){
        this.$().addClass(this.get("inputClassNames"));
      }

      //Set Classes on the hint input element
      if (this.get("hintClassNames")){
        this.$().parent().find('.tt-hint').addClass(this.get("hintClassNames"));
      }

      //Set Placeholder on the input element
      if (this.get("placeholder")){
        this.$().attr("placeholder", this.get("placeholder"));
      }

      // Set maxlength when specified
      if (this.get("maxLength")){
        this.$().attr("maxlength", this.get("maxLength"));
      }
    },

    clearInput: function(target) {
      if (this.get('clearInputAfterEvent')) {
        if (this.get("minLength") === 0) {
          this.$(target).blur();
        }
        Ember.run.next(this, function() {
          this.$(target).val("");
        });
      }
    },

    initializeTypeahead: function(){
      var _this = this;

      var source = null;

      if(this.get('source')){
         source = this.get('source');
      } else {
        var dataSuggester = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: this.get("local") || null,
          prefetch: this.get("prefetch") || null,
          remote: this.get("remote") || null
        });

        dataSuggester.initialize();
        source = dataSuggester.ttAdapter();
      }

      this.typeahead = this.$().typeahead({
        hint: this.get("hint"),
        highlight: this.get("highlight"),
        minLength: this.get("minLength")
      },
      {
        name: this.get("name") || 'typeahead',
        displayKey: this.get("displayKey") || 'value',
        source: source,
        templates: this.get("templates") || {}
      });

      this.typeahead.on("typeahead:selected", function(event, item) {
        _this.set("selection", Ember.Object.create(item));
        _this.set("cursor", Ember.Object.create(item));
        _this.clearInput(event.target);
      });

      this.typeahead.on("typeahead:autocompleted", function(event, item) {
        _this.set("selection", Ember.Object.create(item));
        _this.set("cursor", Ember.Object.create(item));
        _this.clearInput(event.target);
      });

      this.typeahead.on("typeahead:cursorchanged", function(event, item) {
        _this.set("cursor", Ember.Object.create(item));
      });

      // if minLength is 0, open selection list on input focus
      this.typeahead.on( 'focus', function() {
        if (_this.get("minLength") === 0) {
          if(_this.$(this).val() === '') {// you can also check for minLength
            _this.$(this).data().ttTypeahead.input.trigger('queryChanged', '');
          }
        }
      });

      if (this.get("value")) {
        this.typeahead.typeahead('val', this.get('value'));
      } else if (this.get("selection")) {
        var name = this.get("displayKey");
        this.typeahead.typeahead('val', this.get("selection."+name));
      }
    },

    valueObserver: function() {
        var name = this.get("displayKey");

        // When the value changes outside the expected typeahead bounds we need to make sure its updated
        if(this.typeahead.typeahead('val') != this.get('value') && this.get('cursor.'+name) != this.get('value')){
            this.typeahead.typeahead('val', this.get('value'));
        }
    }.observes("value")

  });
  Ember.Handlebars.helper('type-ahead', Ember.TypeAheadComponent);
}(this));
