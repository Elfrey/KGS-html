$(function () {
    var options = {
        selecBoxClass: "selectBox"
    };

    if ($(".left a#action_2")) {
        var $div = $("<div />").css({
            "display":"block",
            "width":"20px",
            "height":"35px"
        }).insertBefore(".left a#action_2")
    }

    if ($(".form_submit_block")) {
        $(".form_submit_block a").each(function () {
            var $div = $("<div />").css({
                "display":"table-cell",
                "padding":"0 10px",
                "height":"35px"
            }).text(" ").insertAfter($(this));
        })
    }


    $("select.green, ."+options.selecBoxClass+", select").each(function () {

        var $select = $(this);

        if ($("optgroup", $select)) {
            $("optgroup", $select).each(function () {
                var $optGroup = $(this);
                //var $newOption = $("<option />").appendTo($optGroup);
            })
        }

        $select.selectBox();
    });


    //$("select.green").selectBox();
    $("a.selectBox").each(function () {
        var $this = $(this),
            width = ($(".selectBox-label", $this).text().length + 2) + 'em';
        $this.css("width", width);
    });

    $("a.element-select").width("277");

    $(".selectBox-options").each(function(){
        var $optionList = $(this);
        var $select = $(this).data("selectBoxSelect");
        var classList = $select.get(0).classList;
        for (var i=0;i<classList.length;i++){
            if (classList[i]!=options.selecBoxClass){
                $optionList.addClass(classList[i]);
            }
        }
        if ($optionList.hasClass("element-select")){

        }
    });

    $(".selectBox-options li").live('mouseup', function (event) {
        var $a = $(this).find("a");
        $a.trigger("mouseup.selectBox", event);
    });
})