---
layout: post
title: (Draft)Backbone.JS > Applications > What is it? > How it works? > Current Support > Future goals
tags: [backbone.js, short reading, javascript, technical]
date: 2017-07-03
published: false
---

## Backbone.JS

Backbone.js is basically an uber-light framework that allows you to structure your Javascript code in an **MVC** (Model, View, Controller) fashion.

<!--more-->

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

Visit [Official WebSite: http://backbonejs.org/]

Visit [StackOverflow Answer: https://stackoverflow.com/questions/5418369/what-is-the-purpose-of-backbone-js]
