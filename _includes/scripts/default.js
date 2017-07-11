$(function(){
    // variables
    var $EXPAND_ELE = $('<span>').text("► Expand");
    var $COLLAPSE_ELE = $('<span>').text("▼ Collapse");
    var $CONTENT_COLLAPSE_ELE = $('<span>', {"class": "content-collapse"}).text("▲ Collapse");
    // initialize
    initialize();

    $(".expandable-header").on('click', ToggleExpandHeader);

    function initialize(){
        $(".expandable-header").append($EXPAND_ELE);
        $(".expandable-content").append('<br />').append($CONTENT_COLLAPSE_ELE);
        $(".content-collapse").on('click', ToggleExpandHeader);
    }

    function ToggleExpandHeader(){
        // traverse up to the req. level
        $header = $(this).closest('.expandable-header');
        if ($header.length == 0){
            $header = $(this).parent().prev();
        }
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            $header.children('span').replaceWith(function () {
                //change text based on condition
                return $content.is(":visible") ? $COLLAPSE_ELE.clone() : $EXPAND_ELE.clone();
            });
        });
    }
});