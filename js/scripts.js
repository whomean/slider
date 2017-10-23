$(function() {
  var carouselList = $("#carousel ul");
  var currentSlide = 3;
  
  function moveFirstSlides(x) {
    var firstItem = carouselList.find("li").slice(0, x);
    var lastItem = carouselList.find("li:last");
    lastItem.after(firstItem);
    carouselList.css({marginLeft:0});
  }
  
  function updateCurrentSlide(x) {
    if (currentSlide < 5) {
      currentSlide += x;
      if (currentSlide == 0) {
        currentSlide = 5;
      }
    } else {
      if (x > 0) {
        currentSlide = 1;
      } else {
        currentSlide += x;
      }
      
    }
    $('.bullet').removeClass("active");
    $('.bullet').eq(currentSlide-1).addClass("active");
  }
  
  function moveLastSlides(x) {
    var lastItem = carouselList.find("li").slice(-x);
    var firstItem = carouselList.find("li:first");
    firstItem.before(lastItem);
     carouselList.css({marginLeft:0});
  }
  
  
  function bulletScroll(clicked) {
  var active = $(".active")[0].getAttribute('data-index'); 
  var vector = clicked - active;
  moveSlides(vector);
}

$(".bullet").click(function() {bulletScroll(this.getAttribute('data-index'))});
  
  
  function changeSlide(x) {
    carouselList.animate({'marginLeft':-400}, 500, function() {moveFirstSlides(x); updateCurrentSlide(1);});
  }
  
  
  function moveSlides(x) {
    if (x > 0) {
      carouselList.animate({'marginLeft':(-400*x)}, 500, function() {moveFirstSlides(x); updateCurrentSlide(x)});
    }
    if (x < 0) {
      var y = Math.abs(x);
      carouselList.animate({'marginLeft':(400*y)}, 500, function() {moveLastSlides(y); updateCurrentSlide(x)});
    }
  }

  
  setInterval(function() {changeSlide(1)}, 3000);
  
  $("#next").click(function() {
    moveSlides(1);
  });
  $("#before").click(function() {
    moveSlides(-1);
  }); 
});



