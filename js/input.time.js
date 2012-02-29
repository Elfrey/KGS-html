$(function () {
    $("input[type=time]").each(function () {
        var $this = $(this);
        var $parent = $this.parent();
        var thisClass = "";
        $this.addClass("element-time").get(0).type="text";
        if ($parent.hasClass("element-data")){
            $parent.addClass("element-time");
        }
        generateInputIcon($this,"input-date");
    });

    $("input.element-time").timepicker({});
})