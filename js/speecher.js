$(document).ready(function() {
  $(".slide").css("display", "none"); 
  $(".step").parent().hide();

  firstSlide();

  $("body").click(function() {
    next_step_or_slide();
  })

  $("body").keydown(function(e) {
    switch (e.keyCode) {
      case 39:
        next_step_or_slide();
        break;
      case 37:
        previous_step_or_slide();
        break;
    }
  })

  $("#control a").click(function(e) {
    if ($(this).hasClass("active")) {
      e.stopPropagation();
    } else {
      var next_id = $(this).html();
      var next = $("#" + next_id);
      transition(next);
    }
  })
})

function next_step_or_slide() {
  var current_slide = $(".slide:visible");
  var next_step = current_slide.find(".step").parent(":hidden:first");

  if (next_step.length == 0) {
    var next_slide = current_slide.next(".slide:hidden:first");
    if (next_slide.length > 0) {
      transition(next_slide);
    }
  } else {
    next_step.show();
  }
}

function previous_step_or_slide() {
  var current_slide = $(".slide:visible");
  var current_step = current_slide.find(".step").parent(":visible:last");
  var visible_steps = current_slide.find(".step").parent(":visible");

  if (visible_steps.length == 0) {
    var previous_slide = current_slide.prev(".slide");
    if (previous_slide.length > 0) {
      transition(previous_slide);
    }
  } else {
    current_step.hide();
  }
}

function firstSlide() {
  var firstSlideID = "1";
  if (window.location.hash.length > 0) {
    var firstSlideID = window.location.hash.match(/#(\d+)/)[1];
  }
  var firstSlide = $("#" + firstSlideID);
  document.title = firstSlide.find("h1").html();
  firstSlide.css("display", "inherit");
  $("#control a:eq(" + (firstSlideID - 1) + ")").addClass("active");
}

function transition(to) {
  var from = $(".slide:visible");

  if (from[0].id < to[0].id) {
    // Forward
    var from_direction = "left";
    var to_direction = "right";
  } else {
    // Rewind
    var from_direction = "right";
    var to_direction = "left";
  }

  from.hide("slide", { direction: from_direction }, 500);
  to.animate({border: "inherit"}, 500). // Stupid trick.
    show("slide", { direction: to_direction }, 500);
  document.title = to.find("h1").html();
  window.location.hash = "#" + to[0].id;
  change_active_control(from, to);
}

function change_active_control(from, to) {
  $("#control a[href=#" + from[0].id + "]").removeClass("active");
  $("#control a[href=#" + to[0].id + "]").addClass("active");
}
