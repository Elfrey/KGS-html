$(function(){
    $(".password-input").each(function(){
        var $input = $(this);
        if (!$input.next().hasClass("on-caps-span")){
            var $span = $("<span />",{
                class: "on-caps-span"
            }).insertAfter($input);
        }
    }).capslock({
            caps_lock_on: function() {
                var $input = $(this);
                $input.addClass("caps-on");
            },
            caps_lock_off: function() {
                var $input = $(this);
                $input.removeClass("caps-on");
            },
        });
});