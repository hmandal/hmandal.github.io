---
layout: post
title: (Draft)Backbone.JS > Why Backbone? > What is it? > How it works? > Current Support > Future goals
excerpt: Backbone.js is basically an uber-light framework that allows you to structure your Javascript code in a MVC (Model, View, Controller) fashion.
js_arr:
- scripts/jquery-3.2.1.min.js
- scripts/default.js
tags: [backbone.js, short reading, javascript, technical]
date: 2017-07-03
published: false
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

![Image of MVC Process](/images/mvc_process.svg "MVC Process")

</div>

> With Backbone, you represent your data as Models. Whenever a UI action causes an attribute of a model to change, the model triggers a "change" event; all the Views that display the model's state can be notified of the change, so that they are able to respond accordingly, re-rendering themselves with the new information. In a finished Backbone app, you don't have to write the glue code that looks into the DOM to find an element with a specific id, and update the HTML manually — when the model changes, the views simply update themselves :)

Model | View
--- | ---
<abbr title="The automated arrangement, coordination, and management of data">Orchestrates</abbr> data and business logic. &nbsp;| Listens for changes and renders UI.
Loads and saves from the server. | Handles user input and interactivity.
Emits events when data changes. | Sends captured input to the model.
{:.striped}

### Models
<div class="expandable-header"></div>
<div class="expandable-content">
Keeps your **business logic separate from your user interface**.

Design your models as the atomic reusable objects containing **all** of the helpful functions for manipulating **their** particular bit of data.
</div>

### Views
<div class="expandable-header"></div>
<div class="expandable-content">
It often renders the data from a specific model, or number of models — but views can also be data-less chunks of UI that stand alone.

Models should be generally unaware of views. Instead, views listen to the model **"`change`"** events, and react or re-render themselves appropriately.

![Image of backbone Model-View interaction](/images/model-view-interaction.svg "Model-View interaction")
</div>

Ok, enough talking, let's get our hands dirty:

### Collections
<div class="expandable-header"></div>
<div class="expandable-content">
A Collection helps you deal with a **group of related models**, handling the **loading** and **saving** of new models to the server and providing **helper functions** for performing aggregations or computations against a list of models. Aside from their own events, collections also **proxy** through all of the events that occur to models within them, allowing you to listen in one place for any change that might happen to any model in the collection.

![Image of backbone Collection](/images/collection.svg "Backbone Collection")
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
