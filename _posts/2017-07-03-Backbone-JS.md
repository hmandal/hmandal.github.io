---
layout: post
title: (Draft)Backbone.JS > Why Backbone? > What is it? > How it works? > Current Support > Future goals
excerpt: Backbone.js is basically an uber-light framework that allows you to structure your Javascript code in a MVC (Model, View, Controller) fashion.

js_arr:
- scripts/jquery-3.2.1.js
- scripts/expandable-header.js

- scripts/highlight.js
- scripts/javascript.min.js
- scripts/diff2html.js
- scripts/diff2html-ui.js
- scripts/git-diff.js

css_arr:
- styles/github.min.css
- styles/diff2html.min.css

tags: [backbone.js, short reading, javascript, technical]
date: 2017-07-03
published: true
---

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
    <link rel="stylesheet" href="styles/styles.css" />
  </head>

  <body>

    <div id="todoapp">

      <header>
        <h1>Todos</h1>
        <input id="new-todo" type="text">
      </header>

      <section id="main">
        <ul id="todo-list"></ul>
      </section>

    </div>

    <!-- scripts -->
    <script src="scripts/vendor/jquery-3.2.1.min.js"></script>
    <script src="scripts/vendor/underscore-min.js"></script>
    <script src="scripts/vendor/backbone-min.js"></script>
    <script src="scripts/App.js"></script>

  </body>

</html>
```

Don't read into the next file, just copy-paste it. Css files just add cosmetic-beauty to ugly pure html pages.

=== `styles/styles.css` ===

```css
html,
body {
    margin: 0;
    padding: 0;
}

body {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #eeeeee;
    color: #333333;
    width: 520px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
}

#todoapp {
    background: #fff;
    padding: 20px;
    margin-bottom: 40px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    -moz-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    -ms-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    -o-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    -webkit-border-radius: 0 0 5px 5px;
    -moz-border-radius: 0 0 5px 5px;
    -ms-border-radius: 0 0 5px 5px;
    -o-border-radius: 0 0 5px 5px;
    border-radius: 0 0 5px 5px;
}

#todoapp h1 {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    padding: 0 0 10px 0;
}

#todoapp input[type="text"] {
    width: 466px;
    font-size: 24px;
    font-family: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    padding: 6px;
    border: 1px solid #999999;
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    -moz-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    -ms-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    -o-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
}

#todoapp input::-webkit-input-placeholder {
    font-style: italic;
}

#main {
    display: none;
}

#todo-list {
    margin: 10px 0;
    padding: 0;
    list-style: none;
}

#todo-list li {
    padding: 18px 20px 18px 0;
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #cccccc;
}

#todo-list li:last-child {
    border-bottom: none;
}

#todo-list li.done label {
    color: #777777;
    text-decoration: line-through;
}

#todo-list .destroy {
    position: absolute;
    right: 5px;
    top: 20px;
    display: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: url(destroy.png) no-repeat;
}

#todo-list li:hover .destroy {
    display: block;
}

#todo-list .destroy:hover {
    background-position: 0 -20px;
}

#todo-list li.editing {
    border-bottom: none;
    margin-top: -1px;
    padding: 0;
}

#todo-list li.editing:last-child {
    margin-bottom: -1px;
}

#todo-list li.editing .edit {
    display: block;
    width: 444px;
    padding: 13px 15px 14px 20px;
    margin: 0;
}

#todo-list li.editing .view {
    display: none;
}

#todo-list li .view label {
    word-break: break-word;
}

#todo-list li .edit {
    display: none;
}

#todoapp footer {
    display: none;
    margin: 0 -20px -20px -20px;
    overflow: hidden;
    color: #555555;
    background: #f4fce8;
    border-top: 1px solid #ededed;
    padding: 0 20px;
    line-height: 37px;
    -webkit-border-radius: 0 0 5px 5px;
    -moz-border-radius: 0 0 5px 5px;
    -ms-border-radius: 0 0 5px 5px;
    -o-border-radius: 0 0 5px 5px;
    border-radius: 0 0 5px 5px;
}

#clear-completed {
    float: right;
    line-height: 20px;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.1);
    color: #555555;
    font-size: 11px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 0 10px 1px;
    cursor: pointer;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    -ms-border-radius: 12px;
    -o-border-radius: 12px;
    border-radius: 12px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
    -moz-box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
    -ms-box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
    -o-box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
}

#clear-completed:hover {
    background: rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 0 0;
    -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 0 0;
    -ms-box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 0 0;
    -o-box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 0 0;
    box-shadow: rgba(0, 0, 0, 0.3) 0 -1px 0 0;
}

#clear-completed:active {
    position: relative;
    top: 1px;
}

#todo-count span {
    font-weight: bold;
}

#instructions {
    margin: 10px auto;
    color: #777777;
    text-shadow: rgba(255, 255, 255, 0.8) 0 1px 0;
    text-align: center;
}

#instructions a {
    color: #336699;
}

#credits {
    margin: 30px auto;
    color: #999;
    text-shadow: rgba(255, 255, 255, 0.8) 0 1px 0;
    text-align: center;
}

#credits a {
    color: #888;
}
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
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {
  // Handler for .ready() called.

  // Todo Model
  // ----------

  // Our basic **Todo** model has a `title` attribute.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
      };
    }

  });
});
```
</div>

Right now nothing is noticeable on the UI because model rests inside the code, we need a `view` to render the model.

### Views
<div class="expandable-header"></div>
<div class="expandable-content">
It often renders the data from a specific model, or number of models — but views can also be data-less chunks of UI that stand alone.

Models should be generally unaware of views. Instead, views listen to the model **"`change`"** events, and react or re-render themselves appropriately.

![Image of backbone Model-View interaction](/images/Backbone-JS/model-view-interaction.svg "Model-View interaction")

Now we will add some html to support our `TodoView`, and the `TodoView` itself.

```patch
Subject: [PATCH] step-02: Create Todo View.

---
 index.html     |  9 +++++++++
 scripts/App.js | 27 +++++++++++++++++++++++++++
 2 files changed, 36 insertions(+)

diff --git a/index.html b/index.html
index 16529af..422d030 100644
--- a/index.html
+++ b/index.html
@@ -27,6 +27,15 @@
     <script src="scripts/vendor/backbone-min.js"></script>
     <script src="scripts/App.js"></script>
 
+    <!-- Templates -->
+    <script type="text/template" id="item-template">
+      <div class="view">
+        <label>
+          <%- title %>
+        </label>
+      </div>
+    </script>
+
   </body>
 
 </html>
diff --git a/scripts/App.js b/scripts/App.js
index 48ebd21..7127d6c 100644
--- a/scripts/App.js
+++ b/scripts/App.js
@@ -16,4 +16,31 @@ $(function() {
     }
 
   });
+
+  // Todo Item View
+  // --------------
+
+  // The DOM element for a todo item...
+  var TodoView = Backbone.View.extend({
+
+    //... is a list tag.
+    tagName: "li",
+
+    // Cache the template function for a single item.
+    template: _.template($('#item-template').html()),
+
+    // The TodoView listens for changes to its model, re-rendering. Since there's
+    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
+    // app, we set a direct reference on the model for convenience.
+    initialize: function() {
+      this.listenTo(this.model, 'change', this.render);
+    },
+
+    // Re-render the titles of the todo item.
+    render: function() {
+      this.$el.html(this.template(this.model.toJSON()));
+      return this;
+    }
+
+  });
 });
```
<div class = "diff-container">
  <div class = "url-diff-container"></div>
</div>

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

Now we need to add our `Todo Colection`:

```patch
Subject: [PATCH] step-03: Create Todo Collection.

---
 scripts/App.js | 15 +++++++++++++++
 1 file changed, 15 insertions(+)

diff --git a/scripts/App.js b/scripts/App.js
index 7127d6c..f5705ea 100644
--- a/scripts/App.js
+++ b/scripts/App.js
@@ -17,6 +17,21 @@ $(function() {
 
   });
 
+  // Todo Collection
+  // ---------------
+
+  // The collection of todos is backed by *Local Variable* instead of a *localStorage* or a remote
+  // server.
+  var TodoList = Backbone.Collection.extend({
+
+    // Reference to this collection's model.
+    model: Todo,
+
+  });
+
+  // Create our global collection of **Todos**.
+  var Todos = new TodoList;
+
   // Todo Item View
   // --------------
 
```
<div class = "diff-container">
  <div class = "url-diff-container"></div>
</div>

</div>

### Events
<div class="expandable-header"></div>
<div class="expandable-content">
In Backbone you can bind events to any Object, when events `trigger` -> things happen.

We bind the backbone event to an object with `on` (alias: `bind`), and un-bind with `off`.

We will add the events in the `AppView` which is the top-level piece of UI.

```patch
Subject: [PATCH] step-04: Create App View.

---
 scripts/App.js | 62 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 62 insertions(+)

diff --git a/scripts/App.js b/scripts/App.js
index f5705ea..785d6e4 100644
--- a/scripts/App.js
+++ b/scripts/App.js
@@ -58,4 +58,66 @@ $(function() {
     }
 
   });
+
+  // The Application
+  // ---------------
+
+  // Our overall **AppView** is the top-level piece of UI.
+  var AppView = Backbone.View.extend({
+
+    // Instead of generating a new element, bind to the existing skeleton of
+    // the App already present in the HTML.
+    el: $("#todoapp"),
+
+    // Delegated events for creating new items.
+    events: {
+      "keypress #new-todo": "createOnEnter",
+    },
+
+    // At initialization we bind to the relevant events on the `Todos`
+    // collection, when items are added or changed.
+    initialize: function() {
+
+      this.input = this.$("#new-todo");
+
+      // whenever anything changes, re-render.
+      this.listenTo(Todos, 'all', this.render);
+
+      this.main = $('#main');
+    },
+
+    // Re-rendering the App just means refreshing the statistics -- the rest
+    // of the app doesn't change.
+    render: function() {
+      if (Todos.length) {
+        this.main.show();
+      } else {
+        this.main.hide();
+      }
+    },
+
+    // If you hit return in the main input field, create new **Todo** model,
+    // adding it to a *Local Variable* instead of persisting it to *localStorage*.
+    createOnEnter: function(e) {
+      if (e.keyCode != 13) return;
+
+      var todo = new Todo({
+        title: this.input.val()
+      });
+      Todos.add(todo);
+
+      var view = new TodoView({
+        model: todo
+      });
+      this.$("#todo-list").append(view.render().el);
+
+      // clear the input once the todo is added to our list.
+      this.input.val('');
+    }
+
+  });
+
+  // Finally, we kick things off by creating the **App**.
+  var App = new AppView;
+
 });
```
<div class = "diff-container">
  <div class = "url-diff-container"></div>
</div>

At this point you can see that adding a `Todos` item acutally adds it to the `Todo List`.

![Image of Create App-View](/images/Backbone-JS/create-appView.png "Create App-View")

</div>

### Add "done" functionality
<div class="expandable-header"></div>
<div class="expandable-content">
Here we will develop the feature to mark a particular `Todo` as completed.
Recall that we added a `styles.css` file initially. This file contains all the "cosmetics" of the Todo app. The strikethrough style is also present in the css file (search for "li.done" there without quotes). So we just need to use the `done` class to apply it.

```patch
Subject: [PATCH] step-05: Feature: add done.

---
 index.html     |  1 +
 scripts/App.js | 19 ++++++++++++++++++-
 2 files changed, 19 insertions(+), 1 deletion(-)

diff --git a/index.html b/index.html
index 422d030..0ec3842 100644
--- a/index.html
+++ b/index.html
@@ -30,6 +30,7 @@
     <!-- Templates -->
     <script type="text/template" id="item-template">
       <div class="view">
+        <input class="toggle" type="checkbox" <%=done ? 'checked="checked"' : '' %> />
         <label>
           <%- title %>
         </label>
diff --git a/scripts/App.js b/scripts/App.js
index 785d6e4..57065aa 100644
--- a/scripts/App.js
+++ b/scripts/App.js
@@ -5,14 +5,20 @@ $(function() {
   // Todo Model
   // ----------
 
-  // Our basic **Todo** model has a `title` attribute.
+  // Our basic **Todo** model has `title`, and `done` attributes.
   var Todo = Backbone.Model.extend({
 
     // Default attributes for the todo item.
     defaults: function() {
       return {
         title: "empty todo...",
+        done: false
       };
+    },
+
+    // Toggle the `done` state of this todo item.
+    toggle: function() {
+      this.set('done', !this.get("done"));
     }
 
   });
@@ -44,6 +50,11 @@ $(function() {
     // Cache the template function for a single item.
     template: _.template($('#item-template').html()),
 
+    // The DOM events specific to an item.
+    events: {
+      "click .toggle": "toggleDone",
+    },
+
     // The TodoView listens for changes to its model, re-rendering. Since there's
     // a one-to-one correspondence between a **Todo** and a **TodoView** in this
     // app, we set a direct reference on the model for convenience.
@@ -54,7 +65,13 @@ $(function() {
     // Re-render the titles of the todo item.
     render: function() {
       this.$el.html(this.template(this.model.toJSON()));
+      this.$el.toggleClass('done', this.model.get('done'));
       return this;
+    },
+
+    // Toggle the `"done"` state of the model.
+    toggleDone: function() {
+      this.model.toggle();
     }
 
   });
```
<div class = "diff-container">
  <div class = "url-diff-container"></div>
</div>

Now you can add a `Todo` as well as check it to mark it as `done`.

![Image of Todo Done](/images/Backbone-JS/todo-done.png "Todo Done")

</div>

### Fixed: Can add empty Todo
<div class="expandable-header"></div>
<div class="expandable-content">
Have you noticed that your Todo app is not perfect! It enables blank entries.

![Image of Todo Empty](/images/Backbone-JS/todo-empty.png "Todo Empty")

So here we'll skip adding a Todo if it's empty.

```patch
Subject: [PATCH] step-06: Fixed: can add empty Todo.

---
 scripts/App.js | 1 +
 1 file changed, 1 insertion(+)

diff --git a/scripts/App.js b/scripts/App.js
index 57065aa..20e1126 100644
--- a/scripts/App.js
+++ b/scripts/App.js
@@ -117,6 +117,7 @@ $(function() {
     // adding it to a *Local Variable* instead of persisting it to *localStorage*.
     createOnEnter: function(e) {
       if (e.keyCode != 13) return;
+      if (!this.input.val()) return;
 
       var todo = new Todo({
         title: this.input.val()
```
<div class = "diff-container">
  <div class = "url-diff-container"></div>
</div>

</div>

Congratulations! you've just finished your `Todo Backbone App`.

Here are some things you can explore yourself and are not covered in this blog post:

- Add a persistent store instead of a temp variable to store your `Todos`. Right now if you close your browser, all your `todos` are gone!
- Add mechanism to delete a `Todo` (Required if you've mistakenly added a `Todo` and wanted to delete it or you might want to clear a completed `Todo`.)

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

[Reference: https://adamjspooner.github.io/coffeescript-meet-backbonejs/01/docs/script.html](https://adamjspooner.github.io/coffeescript-meet-backbonejs/01/docs/script.html)

Visit [Official WebSite: http://backbonejs.org/](http://backbonejs.org/)

Visit [StackOverflow Answer: https://stackoverflow.com/questions/5418369/what-is-the-purpose-of-backbone-js](https://stackoverflow.com/questions/5418369/what-is-the-purpose-of-backbone-js)
