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

  $('.flexslider').flexslider({
		prevText: '',
		nextText: ''
	});

  $('.testimonails-slider').flexslider({
    animation: 'slide',
    slideshowSpeed: 50,
    prevText: '',
    nextText: '',
    controlNav: false
  });

  $(function(){

  // Instantiate MixItUp:

//  $('#Container').mixItUp();
//  $(document).ready(function() {
//      $(".fancybox").fancybox();
//    });

  });

  
//  
// for showing events through arrow
$('.btn-warning').click(function(){
//  $('.flexslider').toggle(1000);
   $('.flexslider').animate({height: '300px', opacity: '1'}, "slow");
   $('.flexslider').css({"position": "fixed", "background-position": "center"});
   $('.discrip').css("display", "none")
   $('.searchbar').css({"margin-top": "60px", "position": "fixed", "width": "90%"});
   $('.event-detail').css({"margin-top": "20%", "z-index": "9"});
  
 });
  
});

// to set scroll height and height
$(document).scroll(function(){
  if ($(this).scrollTop() > 100) {
      $('.flexslider').animate({height: '300px', opacity: '1'}, "500");
      $('.flexslider').css("position", "fixed");
       $('.discrip').css("display", "none")
      $('.searchbar').css({"margin-top": "60px", "position": "fixed", "width": "90%"});
      $('.event-detail').css({"margin-top": "20%", "z-index": "9"});
      } 
});


//textillate
$('h2').textillate({
    selector: '.texts',
    loop:true,
     callback: function () {}
});


$('#deleteEvent').click(function(e){
  var id = $(e.target).data('eventid');
});