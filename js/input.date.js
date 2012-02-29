$(function () {
    $("input[type=date]").each(function () {
        var $this = $(this);
        var $parent = $this.parent();
        var thisClass = "";
        $this.addClass("element-date").get(0).type="text";
        if ($parent.hasClass("element-data")){
            $parent.addClass("element-date");
        }
        generateInputIcon($this,"input-date");
        /*
        if ($this.is("[class]"))
            thisClass = $this.attr("class");
        var $newInput = $("<input />").attr({
            "id":$this.attr("id"),
            "type":"text",
            "class":thisClass + " type-date",
            "name":$this.attr("name")
        }).insertBefore($this);
        $this.remove();
        */
    });

    $.datepicker.setDefaults($.datepicker.regional["ru"]);

    $("input.element-date").datepicker({
        changeMonth:true,
        changeYear:true,
        monthNamesShort:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    });

    $(".input-icon.input-date").live("click",function(){
        $(this).prev().focus();
        return false;
    })
})