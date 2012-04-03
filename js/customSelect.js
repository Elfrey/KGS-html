/**
 *
 * @description скрипт для оформления селектов
 */

$(function () {
    var options = {
        selecBoxClass: "selectBox"
    };


    /*
     * @TODO это вообще не понято для чего, я даже найти id="action_2" не могу
     */
    if ($(".left a#action_2")) {
        $("<div />").css({
            "display":"block",
            "width":"20px",
            "height":"35px"
        }).insertBefore(".left a#action_2")
    }

    /*
     * @TODO вот тоже. Такое чувство что я это скопировал с прототипа и забыл
     */
    if ($(".form_submit_block")) {
        $(".form_submit_block a").each(function () {
            $("<div />").css({
                "display":"table-cell",
                "padding":"0 10px",
                "height":"35px"
            }).text(" ").insertAfter($(this));
        })
    }


    $("select.green, ."+options.selecBoxClass+", select").each(function () {
        var $select = $(this);
       /*
        @TODO на кой черт это тут..
        if ($("optgroup", $select)) {
            $("optgroup", $select).each(function () {
                var $optGroup = $(this);
                //var $newOption = $("<option />").appendTo($optGroup);
            })
        }
        */
        $select.selectBox();
    });


    /**
     * @description задание размера кастомным селектам
     */
    $("a.selectBox").each(function () {
        var $this = $(this),
            width = ($(".selectBox-label", $this).text().length + 2) + 'em';
        $this.css("width", width);
    });

    /**
     * @description задание размера кастомным селектам
     */
    $("a.element-select").width("277");

    /*
     * @TODO к тем же непонятным вещам
     */
    $(".selectBox-options").each(function(){
        var $optionList = $(this),
            $select = $(this).data("selectBoxSelect"),
            classList = $select.get(0).classList;

        for (var i=0;i<classList.length;i++){
            if (classList[i]!=options.selecBoxClass){
                $optionList.addClass(classList[i]);
            }
        }
    });

    /**
     * @description обработка клика по кастомным селектам
     */
    $(".selectBox-options li").live('mouseup', function (event) {
        var $a = $(this).find("a");
        $a.trigger("mouseup.selectBox", event);
    });
})