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
<div class="expandable-content" markdown="1">
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

We've a better way to store the data- In JS Objects! You can do it yourself or use Backbone which is already using it. Here's a quick glance at MVC Coding Pattern:

<div class="expandable-header"></div>
<div class="expandable-content" markdown="1">
Model View Controller or MVC as it is popularly called, is a software design pattern for developing web applications. A Model View Controller pattern is made up of the following three parts:

**Model -** The lowest level of the pattern which is responsible for maintaining data (it's not concerned with how will the data be rendered).

**View -** This is responsible for displaying all or a portion of the data to the user (it's not concerned with from where the data is coming from).

**Controller -** Software Code that controls the interactions between the Model and View (decides how and which model to bind with a view).

![Image of MVC Process](/images/mvc_process.svg "MVC Process")

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
