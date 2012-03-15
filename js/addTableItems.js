/**
 * Created by JetBrains WebStorm.
 * User: Elfrey
 * Date: 06.02.12
 *
 */

$(function(){

    var popupOptions = {
            class: "popup-add-linked",
            itemUrl:"table-for-add.html",
            useOverlay: true,
            "styles": {
                backgroundColor: "#fff",
                display: "block",
                width: "1000px",
                zIndex: '102'
            },
            afterOpenCallback: changePopup,
            afterCloseCallback: clearPopup
        },
        counterOptions = {
            counterContainer: "blue-element-counter",
            footerCounterContainer: "footer-popup-counter",

        },
        $blueElementCounterTmpl = $('<div></div>',{
            class: counterOptions.counterContainer,
            html: "Выбрано<br /><span></span>"
        }).hide(),

        $popupFooterCounter = $('<div />',{
            html: '<span>Выбрано</span> <a href="#"></a>',
            class: counterOptions.footerCounterContainer
        }).visHide(),

        objectStrngs = ["объект", "объекта", "объектов"],
        selectedObjString = ["Выбран", "Выбрано", "Выбрано"],
        activeKeyCodes = {
            esc: 27,
            up: 38,
            down: 40,
            "27": "esc",
            "38": "up",
            "40": "down"
        };
    $(".element-table-add-button").kPopup(popupOptions);

    //Клик на чекбокс
    $(".checkboxed th input[type=checkbox]").live("change",function(){
        var $checkbox = $(this),
            $checkboxes = $(".checkboxed td input[type=checkbox]");
        checkHeaderCkeckbox($checkbox,$checkboxes);
    });

    $(".checkboxed td input[type=checkbox]").live("change",function(){
        var $checkbox = $(this),
            $headerCheckbox = $(".checkboxed th input[type=checkbox]"),
            $checkboxes = $(".checkboxed td input[type=checkbox]");
        checkBodyCheckbox($checkbox,$headerCheckbox, $checkboxes);


    });


    /*
     * @TODO Old version of tr click event
     *
     */

    $(".checkboxed tbody tr").live("click",function(){
        var $tr = $(this),
            $checkbox = $("input[type=checkbox]:first",$tr),
            $headerCheckbox = $(".checkboxed th input[type=checkbox]"),
            $checkboxes = $(".checkboxed td input[type=checkbox]");

        checkBodyCheckbox($checkbox,$headerCheckbox, $checkboxes);

    });


    function checkHeaderCkeckbox($checkbox,$checkboxes){
        if ($checkbox.is(":checked")){
            $checkboxes.attr("checked","checked");
            $checkboxes.parents("tr").addClass("hover-blue");

            showCounter($checkboxes.length);
        }else{
            $checkboxes.removeAttr("checked");
            $checkboxes.parents("tr").removeClass("hover-blue");
            hideCounter();
        }


    }

    function checkBodyCheckbox($checkbox,$headerCheckbox, $checkboxes){

        var checkedCount = 0;

        if (!$checkbox.is(":checked")){
            $checkbox.attr("checked",true);
            $checkbox.parents("tr").addClass("hover-blue");
        }else{
            $checkbox.parents("tr").removeClass("hover-blue");
            $checkbox.attr("checked",false);
            $headerCheckbox.removeAttr("checked");
        }

        checkedCount = $checkboxes.filter(":checked").length;
        if ($checkboxes.length == checkedCount){
            $headerCheckbox.attr("checked",true);
        }
        if (checkedCount>0){
            showCounter(checkedCount);
        }else{
            hideCounter();
        }
    }

    function showCounter(count){
        var $popup = $("."+popupOptions.class),
            popupPosition = $popup.position();

        if ($popup == undefined){
            return false;
        }

        $blueElementCounterTmpl
            .find("span").text(count)
            .end()
            .show();

        $popupFooterCounter
            .find("span")
            .text(plural_str(count, selectedObjString[0], selectedObjString[1], selectedObjString[2]))
            .end()
            .find("a")
            .text(count+" "+plural_str(count, objectStrngs[0], objectStrngs[1], objectStrngs[2]))
            .end()
            .visShow();
    }
    function hideCounter(popup){

        //var $popup = popup!=undefined ? $(popup) : $("."+popupOptions.class);
        $blueElementCounterTmpl.hide();
        $popupFooterCounter.visHide();
    }

    function changePopup(popup,params,options){
        var $popup = $(popup);

        var $popupFooter = $("<div />",{
            class: "popup-footer"
        }).appendTo($popup),
            $applyButton = $('<a />',{
                text: "Применить",
                href: "#apply",
                class: "popup-footer-apply-button"
            }).appendTo($popupFooter),

            $addButton = $('<a />',{
                href: "#add",
                html: '<span class="big-plus">+</span>Добавить',
                class: "popup-footer-add-button"
            }).appendTo($popupFooter),

            $calcenButton = $('<a />',{
                text: "Отменить",
                href: "#cancel",
                class: "popup-footer-cancel-button"
            }).appendTo($popupFooter);

        $popup.find("input[type=checkbox]").removeAttr("checked");

        $("<a />",{
            text: "x",
            href: "#close",
            class: "popup-close"
        })
            .on("click",function(event){
                event.preventDefault();
                $.kPopup.removePopup();
            })
            .prependTo($popup);

        hideCounter($popup);

        $blueElementCounterTmpl.prependTo($popup);

        $popupFooterCounter.prependTo($popupFooter);

        $calcenButton.bind("click",function(){
            $.kPopup.removePopup();
        });
        $(document).bind("keypress.addedTable",function(e,customKeyCode){

            if (customKeyCode>=0) e.keyCode = customKeyCode;


            if (activeKeyCodes[e.keyCode]){

                e.preventDefault();

                if (activeKeyCodes[e.keyCode]=="esc"){
                    $.kPopup.removePopup();
                }else{
                    var $tbody = $popup.find("tbody"),
                        $tr = $tbody.find("tr.on-hover");


                    if (activeKeyCodes[e.keyCode]=="down"){
                        if ($tr.length==0){
                            $tr = $tbody.find("tr:first")
                        }else{
                            $tr = $tr.next();
                            if ($tr.length==0) {
                                $tr = $tbody.find("tr:first")
                            }
                        }

                    } else if (activeKeyCodes[e.keyCode]=="up"){
                        if ($tr.length==0){
                            $tr = $tbody.find("tr:last")
                        }else{
                            $tr = $tr.prev();
                            if ($tr.length==0) {
                                $tr = $tbody.find("tr:last")
                            }
                        }
                    }
                    $tr.siblings(".on-hover").removeClass("on-hover").end().addClass("on-hover").focus();

                }
            } else if (e.which==32){

                e.preventDefault();

                $popup.find(".on-hover").addClass("hover-blue");
            } else if (e.keyCode == 13){

                e.preventDefault();

                var $checkbox = $popup.find(".on-hover input[type=checkbox]"),
                    $headerCheckbox = $(".checkboxed th input[type=checkbox]"),
                    $checkboxes = $(".checkboxed td input[type=checkbox]");

                checkBodyCheckbox($checkbox,$headerCheckbox, $checkboxes);
            }
        });

        $popup.find("tbody tr").bind("keypress.addedTable",function(e){


        })

        /*
         * @TODO А тут вот реализация перелистывания строк на колесико мышки
         *
        $(document).bind("mousewheel.addedTable",function(e, delta){
            e.preventDefault();

            keyCode = delta>0?38:40;
            $(document).trigger("keypress.addedTable",keyCode);
        });
        */

        $popup.find("tbody tr").bind("mouseenter.addedTable",function(){
            $(this).siblings(".on-hover").removeClass("on-hover").end().addClass("on-hover");
        }).bind("mouseleave.addedTable",function(){
                $(this).siblings(".on-hover").removeClass("on-hover");
            })

        /*
        $(".checkboxed tbody tr", $popup).live("click",function(e){
            console.log(e.target);
            var $tr = $(this);
            if ($tr.is(":first")) return false;
            return false;
            $tr.kPopup({
                class: "popup-tr-data",
                openerClass: "popup-tr-opened",
                itemUrl:"table-for-add.html",
                useOverlay: true,
                "styles": {
                    backgroundColor: "#fff",
                    display: "block",
                    width: "1000px",
                    zIndex: '102'
                },
                afterOpenCallback: changePopup
            })
        });*/

    }

    function clearPopup(popup,params){
        $(document).unbind(".addedTable")
    }
});
