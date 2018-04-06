# Ember Typeahead.js Component

An autocomplete component for [ember.js](http://www.emberjs.com) using [typeahead.js](https://github.com/twitter/typeahead.js)

## Usage

Include ```typeahead.js```, ```bloodhound.js``` and ```ember-typeahead.js```

```
<script src="typeahead.js"></script>
<script src="bloodhound.js"></script>
<script src="ember-typeahead.js"></script>
```

Add the typeahead tag in your handlebars template

```
{{type-ahead local=content name="colour" selection=myColour}}
```

Since `ember-typeahead` extends `Ember.TextField`, you can still bind other properties such as `value` and `action`:

```
{{type-ahead data=content name="colour" selection=myColour action=createNewColour value=colourText}}
```

## Properties

### Data

#### Using Automatic Searching

This component can automatically search sources of data using a preconfigured Bloodhound.js adapter. To provide data to this adapter the following arguments can be set on the component. To use a custom search adapter specify the source parameter specified below.

* `local` - An array of ember objects used for the lookup. This can also be a promise that resolves to an array. Will be ignored if `source` is set.
* `prefetch` - Can be a URL to a JSON file containing an array of datums or, if more configurability is needed, a [prefetch options hash](https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md#prefetch).
* `remote` - Can be a URL to fetch suggestions from when the data provided by local and prefetch is insufficient or, if more configurability is needed, a [remote options hash](https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md#remote).

#### Using a Source Adapter

* `source` - The backing data source for suggestions. Expected to be a function with the signature `(query, cb)`. It is expected that the function will compute the suggestion set (i.e. an array of JavaScript objects) for `query` and then invoke `cb` with said set. `cb` can be invoked synchronously or asynchronously. A Bloodhound suggestion engine can be used here, to learn  how, see [Bloodhound Integration](#bloodhound-integration). **Required**.

### Ember Integration
* `selection` - Binds the selected value. This changes on the ```typeahead:selected``` and ```typeahead:autocompleted``` events (see [typeahead.js custom events](https://github.com/twitter/typeahead.js/#custom-events))

### Options
* `highlight` – If `true`, when suggestions are rendered, pattern matches for the current query in text nodes will be wrapped in a `strong` element with  `tt-highlight` class. Defaults to `false`.
* `hint` – If `false`, the typeahead will not show a hint. Defaults to `true`.
* `minLength` – The minimum character length needed before suggestions start   getting rendered. Defaults to `1`.

### Display
* `name` – The name of the dataset. This will be appended to `tt-dataset-` to
  form the class name of the containing DOM element.  Must only consist of
  underscores, dashes, letters (`a-z`), and numbers. Defaults to a random
  number.

* `displayKey` – For a given suggestion object, determines the string
  representation of it. This will be used when setting the value of the input
  control after a suggestion is selected. Can be either a key string or a
  function that transforms a suggestion object into a string. Defaults to
  `value`.

* `templates` – A hash of templates to be used when rendering the dataset. Note
  a precompiled template is a function that takes a JavaScript object as its
  first argument and returns a HTML string.

  * `empty` – Rendered when `0` suggestions are available for the given query.
  Can be either a HTML string or a precompiled template. If it's a precompiled
  template, the passed in context will contain `query`.

  * `footer`– Rendered at the bottom of the dataset. Can be either a HTML
  string or a precompiled template. If it's a precompiled template, the passed
  in context will contain `query` and `isEmpty`.

  * `header` – Rendered at the top of the dataset. Can be either a HTML string
  or a precompiled template. If it's a precompiled template, the passed in
  context will contain `query` and `isEmpty`.

  * `suggestion` – Used to render a single suggestion. If set, this has to be a
  precompiled template. The associated suggestion object will serve as the
  context. Defaults to the value of `displayKey` wrapped in a `p` tag i.e.
  `<p>{{value}}</p>`.

## Tests

I didn't do any tests. For every line of untested code a puppy dies. 59 puppies died in the making of this component.
