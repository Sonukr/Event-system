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
$(document).scroll(function(){
  if ($(this).scrollTop() > 100) {
      $('.flexslider').animate({height: '200px', opacity: '1'}, "500");
      $('.flexslider').css("position", "fixed");
       $('.discrip').css("display", "none")
      $('.searchbar').css({"margin-top": "20px", "position": "fixed", "width": "90%"});
      $('.event-detail').css({"margin-top": "10%", "z-index": "9"});
      }
});

$('#deleteEvent').click(function(e){
  var id = $(e.target).data('eventid');
});
