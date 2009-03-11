$(document).ready(function() {
  $(".slide").css("display", "none");
  $(".slide:first").css("display", "inherit");
  $(".step").css("display", "none");

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
})

function next_step_or_slide() {
  var current_slide = $(".slide:visible");
  var current_step = current_slide.find(".step:visible:last");
  var next_step = current_slide.find(".step:hidden:first");

  if (next_step.length == 0) {
    var next_slide = current_slide.next(".slide:hidden:first");
    if (next_slide.length > 0) {
      transition(current_slide, "left", next_slide, "right");
    }
  } else {
    next_step.show();
  }
}

function previous_step_or_slide() {
  var current_slide = $(".slide:visible");
  var current_step = current_slide.find(".step:visible:last");
  var visible_steps = current_slide.find(".step:visible");

  if (visible_steps.length == 0) {
    var previous_slide = current_slide.prev(".slide");
    if (previous_slide.length > 0) {
      transition(current_slide, "right", previous_slide, "left");
    }
  } else {
    current_step.hide();
  }
}

function transition(from, from_direction, to, to_direction) {
  from.hide("slide", { direction: from_direction }, 500);
  to.animate({border: "inherit"}, 500). // Stupid trick.
    show("slide", { direction: to_direction }, 500);
}
