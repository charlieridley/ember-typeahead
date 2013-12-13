# Ember Typeahead.js Component

An autocomplete component for [ember.js](http://www.emberjs.com) using [typeahead.js](https://github.com/twitter/typeahead.js)

## Installation

Install using Bower

```
bower install ember-typeahead
```

## Usage

Include ```typeahead.js``` and ```ember-typeahead.js```

```
<script src="typeahead.js"></script> 
<script src="ember-typeahead.js"></script> 
```

Add the typeahead tag in your handlebars template

```
{{type-ahead data=content name="colour" selection=myColour}}
```

## Properties

- ```data``` An array of ember objects used for the lookup. This can also be a promise that resolves to an array
- ```name``` The name of the property on the ember object which is to be displayed
- ```selection``` Binds the selected value. This changes on the ```typeahead:selected``` and ```typeahead:autocompleted``` events (see [typeahead.js custom events](https://github.com/twitter/typeahead.js/#custom-events))

## Tests

I didn't do any tests. For every line of untested code a puppy dies. 59 puppies died in the making of this component.
