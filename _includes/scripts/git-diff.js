{% raw %}
$(function(){
  $('.diff-container').each(function(i){
    var data_elem = $(this).prev('.language-diff');

    if (!data_elem.text()){
      data_elem = $(this).prev('.language-patch');
    }
    var data = data_elem.text();

    if (!data){
      console.info("the diff is empty!");
      return;
    }

    // remove the original diff
    data_elem.remove();

    var outputFormat = 'side-by-side';
    // var outputFormat = 'line-by-line';

    // var $container = $('.diff-container');
    var container = $(this).children('.url-diff-container');

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
  });
{% endraw %}
