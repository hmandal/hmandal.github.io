{% raw %}
$(function(){
  var data = `diff --git a/index.html b/index.html
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
  <script src="scripts/vendor/backbone-min.js"><\/script>
  <script src="scripts/App.js"><\/script>
 
+  <!-- Templates -->
+  <script type="text/template" id="item-template">
+    <div class="view">
+      <label><%- title %></label>
+    </div>
+  <\/script>
+
   </body>
 </html>
\ No newline at end of file
`
  var outputFormat = 'side-by-side';
  // var outputFormat = 'line-by-line';

  var $container = $('.diff-container');
  var container = '#url-diff-container';

  var diff2htmlUi = new Diff2HtmlUI({diff: data});

  // if (outputFormat === 'side-by-side') {
  //   $container.css({'width': '100% !important'});
  // } else {
  //   $container.css({'width': ''});
  // }

  diff2htmlUi.draw(container, {
    outputFormat: outputFormat,
    showFiles: true,
    matching: 'words',
    matchWordsThreshold: 0.25,
    matchingMaxComparisons: 2500,
    synchronisedScroll: true
  });
  diff2htmlUi.fileListCloseable(container, false);
  diff2htmlUi.highlightCode(container);
});
{% endraw %}
