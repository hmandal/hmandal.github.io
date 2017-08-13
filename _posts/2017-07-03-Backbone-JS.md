---
layout: post
title: (Draft)Backbone.JS > Why Backbone? > What is it? > How it works? > Current Support > Future goals
excerpt: Backbone.js is basically an uber-light framework that allows you to structure your Javascript code in a MVC (Model, View, Controller) fashion.

js_arr:
- scripts/jquery-3.2.1.js
- scripts/expandable-header.js

- scripts/highlight.js
- scripts/diff2html-ui.js
- scripts/diff2html.js
- scripts/git-diff.js

css_arr:
- styles/github.min.css
- styles/diff2html.min.css

tags: [backbone.js, short reading, javascript, technical]
date: 2017-07-03
published: true
---

```diff
diff --git a/index.html b/index.html
index 74b9b68..651e9ff 100644
--- a/index.html
+++ b/index.html
@@ -15,6 +15,10 @@
       <input id="new-todo" type="text">
     </header>
 
+    <section id="main">
+      <ul id="todo-list"></ul>
+    </section>
+
   </div>
 
  <!-- scripts -->
@@ -23,5 +27,12 @@
  <script src="scripts/vendor/backbone-min.js"></script>
  <script src="scripts/App.js"></script>
 
+  <!-- Templates -->
+  <script type="text/template" id="item-template">
+    <div class="view">
+      <label><%- title %></label>
+    </div>
+  </script>
+
   </body>
 </html>
\ No newline at end of file
```
<div class = "diff-container">
  <div class = "url-diff-container"></div>
</div>

## Backbone.JS

Backbone.js is basically an uber-light framework that allows you to structure your Javascript code in a **MVC** (Model, View, Controller) fashion.

<!--more-->

## Why Backbone?

> When working on a web application that involves a lot of JavaScript, one of the first things you learn is to stop tying your data to the DOM. It's all too easy to create JavaScript applications that end up as tangled piles of jQuery selectors and callbacks, all trying frantically to keep data in sync between the HTML UI, your JavaScript logic, and the database on your server.

So you must be thinking **How do I tie my data to the DOM?**:

<div class="expandable-header"></div>
<div class="expandable-content">
Any attribute on any element whose attribute name starts with `data-` is a data attribute. Handy in case you want to store some extra information that doesn’t have any visual representation.

```html
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```

Take another example:

```javascript
var list = "";
$.each(data, function (index, value) {
  list += "<li id='item-" + value.Id + "'>" + value.Name + "</li>";
});
$("ul").append(list);
```
</div>

It's good to know this but don't use it.
- [ ] Why is this BAD?

We've a better way to store the data- In JS Objects! You can do it yourself or use Backbone which is already using it. Here's a quick glance at MVC Coding Pattern:
<div class="expandable-header"></div>
<div class="expandable-content">
Model View Controller or MVC as it is popularly called, is a software design pattern for developing web applications. A Model View Controller pattern is made up of the following three parts:

**Model -** The lowest level of the pattern which is responsible for maintaining data (it's not concerned with how will the data be rendered).

**View -** This is responsible for displaying all or a portion of the data to the user (it's not concerned with from where the data is coming from).

**Controller -** Software Code that controls the interactions between the Model and View (decides how and which model to bind with a view).

![Image of MVC Process](/images/Backbone-JS/mvc_process.svg "MVC Process")
</div>

> With Backbone, you represent your data as Models. Whenever a UI action causes an attribute of a model to change, the model triggers a "change" event; all the Views that display the model's state can be notified of the change, so that they are able to respond accordingly, re-rendering themselves with the new information. In a finished Backbone app, you don't have to write the glue code that looks into the DOM to find an element with a specific id, and update the HTML manually — when the model changes, the views simply update themselves :)

Model | View
--- | ---
<abbr title="The automated arrangement, coordination, and management of data">Orchestrates</abbr> data and business logic. &nbsp;| Listens for changes and renders UI.
Loads and saves from the server. | Handles user input and interactivity.
Emits events when data changes. | Sends captured input to the model.
{:.striped}

### Initial Setup

<div class="expandable-header"></div>
<div class="expandable-content">
In order to make the learning more fun, I have a ready-made minimum-code ready for you to get a headstart and we can then focus more on the learning part instead of designing.

Keep your initial project structure as follows:

```shell_session
│   index.html                        
│                                     
├───scripts                           
│   │   App.js                        
│   │                                 
│   └───vendor                        
│           backbone-min.js           
│           jquery-3.2.1.min.js       
│           underscore-min.js         
│                                     
└───styles                            
        styles.css                    
```

Download links:
<div class="expandable-header"></div>
<div class="expandable-content">
<a href="http://backbonejs.org/backbone-min.js">http://backbonejs.org/backbone-min.js</a>

<a href="https://code.jquery.com/jquery-3.2.1.min.js">https://code.jquery.com/jquery-3.2.1.min.js</a>

<a href="http://underscorejs.org/underscore-min.js">http://underscorejs.org/underscore-min.js</a>
</div>

=== `index.html` ===

```html
<!DOCTYPE html>
<html>

<head>
  <title>Backbone.js Todos</title>
  <link rel="stylesheet" href="styles/styles.css"/>
</head>

<body>

  <div id="todoapp">

    <header>
      <h1>Todos</h1>
      <input id="new-todo" type="text">
    </header>

  </div>

  <!-- scripts -->
  <script src="scripts/vendor/jquery-3.2.1.min.js"></script>
  <script src="scripts/vendor/underscore-min.js"></script>
  <script src="scripts/vendor/backbone-min.js"></script>
  <script src="scripts/App.js"></script>

  </body>
</html>
```

Leave `App.js` empty for the moment.

When you'll open the `index.html` you'll see this:

![Image of initial Todo app](/images/Backbone-JS/initial-todo-app.png "Initial Todo app")

Right now nothing will happen if you enter a text and press enter. We need to write the logic for that. This is just a dummy UI (plain HTML + CSS). Explaining how to create it is beyond the scope of this tutorial.
</div>

### Models
<div class="expandable-header"></div>
<div class="expandable-content">
Keeps your **business logic separate from your user interface**.

Design your models as the atomic reusable objects containing **all** of the helpful functions for manipulating **their** particular bit of data.

Ok, enough talking, let's get our hands dirty:

We'll create a model for a TODO App (which is becoming the "Hello World" for dynamic apps).

=== `App.js` ===

```javascript
// Our basic **Todo** model has a `title` attribute.
var Todo = Backbone.Model.extend({

  // Default attributes for the todo item.
  defaults: function() {
    return {
      title: "empty todo...",
    };
  }

});
```
</div>

### Views
<div class="expandable-header"></div>
<div class="expandable-content">
It often renders the data from a specific model, or number of models — but views can also be data-less chunks of UI that stand alone.

Models should be generally unaware of views. Instead, views listen to the model **"`change`"** events, and react or re-render themselves appropriately.

![Image of backbone Model-View interaction](/images/Backbone-JS/model-view-interaction.svg "Model-View interaction")

Now we will add some html to support our `TodoView`.

=== index.html ===

```html
<!DOCTYPE html>
<html>

<head>
  <title>Backbone.js Todos</title>
  <link rel="stylesheet" href="styles/styles.css"/>
</head>

<body>

  <div id="todoapp">

    <header>
      <h1>Todos</h1>
      <input id="new-todo" type="text">
    </header>

  </div>

  <!-- scripts -->
  <script src="scripts/vendor/jquery-3.2.1.min.js"></script>
  <script src="scripts/vendor/underscore-min.js"></script>
  <script src="scripts/vendor/backbone-min.js"></script>
  <script src="scripts/App.js"></script>

  <!-- Templates -->
  <script type="text/template" id="item-template">
    <div class="view">
      <label><%- title %></label>
    </div>
  </script>

  </body>
</html>
```

=== App.js ===

```javascript
// The DOM element for a todo item...
var TodoView = Backbone.View.extend({

  //... is a list tag.
  tagName:  "li",

  // Cache the template function for a single item.
  template: _.template($('#item-template').html()),

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  // Re-render the titles of the todo item.
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
```
</div>

### Collections
<div class="expandable-header"></div>
<div class="expandable-content">
A Collection helps you deal with a **group of related models**, handling the **loading** and **saving** of new models to the server and providing **helper functions** for performing aggregations or computations against a list of models. Aside from their own events, collections also <abbr title="Means if your model triggers an event, your collection can re-direct the event to another model or perform some action in the collection itself">**proxy**</abbr> through all of the events that occur to models within them, allowing you to **listen in one place** for any change that might happen to **any model** in the collection.

![Image of backbone Collection](/images/Backbone-JS/collection.svg "Backbone Collection")

You can use backbone to create two kinds of apps: RESTful and non-RESTful.

Diff. RESTful vs. non-RESTful:

<div class="expandable-header"></div>
<div class="expandable-content">
>Instead of having randomly named setter and getter URLs and using GET for all the getters and POST for all the setters, we try to have the URLs identify resources, and then use the HTTP actions  GET, POST, PUT and DELETE to do stuff to them.

### Non-RESTful way:

```
GET /get_article?id=1
POST /delete_article   id=1
```

### RESTful way:

```
GET /articles/1/
DELETE /articles/1/
```

RESTful | Non-RESTful
--- | ---
Your web API may be cleaner and easier to understand / discover. e.g. `/sync/articles/1` |If designed poorly, it can be a nightmare for others to understand. e.g. articlesSyncHere(1)
When synchronising data with a website, it is probably easier to use REST because you can just say `synchronize("/articles/1/")` |Here you'd use something like synchronize(data)
{:.striped}

For more information visit: [What is the advantage of using REST instead of non-REST HTTP?](https://stackoverflow.com/questions/2191049/what-is-the-advantage-of-using-rest-instead-of-non-rest-http/13034235#13034235)
</div>

Backbone is pre-configured to sync with a RESTful API. Simply create a new Collection with the url of your resource endpoint:

```javascript
var Books = Backbone.Collection.extend({
  url: '/books'
});
```

The Collection and Model components together form a direct mapping of REST resources using the following methods:

```
GET  /books/ .... collection.fetch();
POST /books/ .... collection.create();
GET  /books/1 ... model.fetch();
PUT  /books/1 ... model.save();
DEL  /books/1 ... model.destroy();
```

For the sake of <abbr title="concise and exact use of words in writing or speech.">brevity</abbr>, in our TodoApp we'll be using the non-RESTful approach.

Now we need to add some behaviour to our Todo Model manually:

```javascript
var Todo = Backbone.Model.extend({

  // Default attributes for the todo item.
  defaults: function() {
    return {
      title: "empty todo...",
      done: false
    };
  },

  // Toggle the done state of this todo item.
  toggle: function() {
    this.save({done: !this.get("done")});
  }
});
```

Now we will add some behaviour to our TodoList Collection:

```javascript
var TodoList = Backbone.Collection.extend({

  // Reference to this collection’s model.
  model: Todo,

  // Filter down the list of all todo items that are finished.
  done: function() {
    return this.where({done: true});
  },

  // Filter down the list to only todo items that are still not finished.
  remaining: function() {
    return this.where({done: false});
  },
});
```
</div>

### Events
<div class="expandable-header"></div>
<div class="expandable-content">
In Backbone you can bind events to any Object, when events `trigger` -> things happen.

We bind the backbone event to an object with `on` (alias: `bind`), and un-bind with `off`.

```javascript

```
</div>

- [ ] class ListView extends Backbone.**View**
- [ ] el
- [ ] initialize: ->
- [ ] render: ->
- [ ] events: 'click button': 'addItem'
- [ ] class Item extends Backbone.**Model**
- [ ] @collection.**bind** 'add', @appendItem
- [ ] item.**set** part2: "#{item.**get** 'part2'} #{@counter}"
- [ ] class Item extends Backbone.**Model**
- [ ] **tagName**: 'li'
- [ ] Returning @ is considered a good practice. It let's us chain method calls (i.e., `item_view.render().el)`.
- [ ] @model.destroy()
- [ ] override Backbone.sync: 
    ```
    Backbone.sync = (method, model, success, error) ->
        success()
   ```

[Reference: https://adamjspooner.github.io/coffeescript-meet-backbonejs/01/docs/script.html]

Visit [Official WebSite: http://backbonejs.org/](http://backbonejs.org/)

Visit [StackOverflow Answer: https://stackoverflow.com/questions/5418369/what-is-the-purpose-of-backbone-js](https://stackoverflow.com/questions/5418369/what-is-the-purpose-of-backbone-js)
