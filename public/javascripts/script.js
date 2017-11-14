$(document).ready(function() {
// slider
  $("div.blog-post").hover(
    function() {
        $(this).find("div.content-hide").slideToggle("fast");
    },
    function() {
        $(this).find("div.content-hide").slideToggle("fast");
    }
  );


//
// for showing events through arrow

});

// to set scroll height and height

$('#deleteEvent').click(function(e){
  var id = $(e.target).data('eventid');
});
