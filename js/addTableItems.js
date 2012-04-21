/**
 * User: Elfrey
 * Date: 06.02.12
 * @description скрипт для таблиц в просмотре элемента, вызов попапа для выбора
 */

/*
 * @TODO этот JSON объект нужно будет переделать на получение через AJAX
 */
var detailedInfo = {
    0: {
        items: [
            {
                title: "Общие характеристики 1",
                params: [
                    {
                        name: "Наименование",
                        value: "Объект культурного наследия на первомайской 1"
                    },
                    {
                        name: "Адрес",
                        value: "г. Тюмень, ул. Первомайская 13, кв 4 Памятник культуры"
                    }
                ]
            },
            {
                title: "Технические характеристики",
                params: [
                    {
                        name: "Паспорт БТИ",
                        value: "№ 617 от 13.11.2011"
                    },
                    {
                        name: "Свидетельство о гос.регистрации права собственности",
                        value: "№ 495 от 29.04.2011"
                    },
                    {
                        name: "Год ввода",
                        value: "2001"
                    },
                    {
                        name: "Инвентарный номер",
                        value: "24912343"
                    },
                    {
                        name: "Общая площадь",
                        value: "13 кв.м"
                    },
                    {
                        name: "Этажность",
                        value: "3"
                    },
                    {
                        name: "Количество квартир",
                        value: "1"
                    },
                    {
                        name: "Конструктивные элементы",
                        value: "Бетон, Арматура, Цемент3"
                    }
                ]
            },
            {
                title: "Стоимость",
                params: [
                    {
                        name: "Балансовая стоимость",
                        value: "128 000 руб"
                    },
                    {
                        name: "Остаточная балансовая стоимость",
                        value: "100 000 руб"
                    }
                ]
            },
            {
                other: true,
                params: [
                    {
                        name: "Земельные участки",
                        value: "3 записи"
                    }
                ]
            }
        ],
        link: "detail/1/"
    },

    1: {
        items: [
            {
                title: "Общие характеристики 2",
                params: [
                    {
                        name: "Наименование",
                        value: "Объект культурного наследия на первомайской 2"
                    },
                    {
                        name: "Адрес",
                        value: "г. Тюмень, ул. Первомайская 13, кв 4 Памятник культуры"
                    }
                ]
            },
            {
                title: "Технические характеристики",
                params: [
                    {
                        name: "Паспорт БТИ",
                        value: "№ 617 от 13.11.2011"
                    },
                    {
                        name: "Свидетельство о гос.регистрации права собственности",
                        value: "№ 495 от 29.04.2011"
                    },
                    {
                        name: "Год ввода",
                        value: "2001"
                    },
                    {
                        name: "Инвентарный номер",
                        value: "24912343"
                    },
                    {
                        name: "Общая площадь",
                        value: "13 кв.м"
                    },
                    {
                        name: "Этажность",
                        value: "3"
                    },
                    {
                        name: "Количество квартир",
                        value: "1"
                    },
                    {
                        name: "Конструктивные элементы",
                        value: "Бетон, Арматура, Цемент3"
                    }
                ]
            },
            {
                title: "Стоимость",
                params: [
                    {
                        name: "Балансовая стоимость",
                        value: "128 000 руб"
                    },
                    {
                        name: "Остаточная балансовая стоимость",
                        value: "100 000 руб"
                    }
                ]
            },
            {
                other: true,
                params: [
                    {
                        name: "Земельные участки",
                        value: "3 записи"
                    }
                ]
            }
        ],
        link: "detail/2/"
    },

    2: {
        items: [
            {
                title: "Общие характеристики 3",
                params: [
                    {
                        name: "Наименование",
                        value: "Объект культурного наследия на первомайской 3"
                    },
                    {
                        name: "Адрес",
                        value: "г. Тюмень, ул. Первомайская 13, кв 4 Памятник культуры"
                    }
                ]
            },
            {
                title: "Технические характеристики",
                params: [
                    {
                        name: "Паспорт БТИ",
                        value: "№ 617 от 13.11.2011"
                    },
                    {
                        name: "Свидетельство о гос.регистрации права собственности",
                        value: "№ 495 от 29.04.2011"
                    },
                    {
                        name: "Год ввода",
                        value: "2001"
                    },
                    {
                        name: "Инвентарный номер",
                        value: "24912343"
                    },
                    {
                        name: "Общая площадь",
                        value: "13 кв.м"
                    },
                    {
                        name: "Этажность",
                        value: "3"
                    },
                    {
                        name: "Количество квартир",
                        value: "1"
                    },
                    {
                        name: "Конструктивные элементы",
                        value: "Бетон, Арматура, Цемент3"
                    }
                ]
            },
            {
                title: "Стоимость",
                params: [
                    {
                        name: "Балансовая стоимость",
                        value: "128 000 руб"
                    },
                    {
                        name: "Остаточная балансовая стоимость",
                        value: "100 000 руб"
                    }
                ]
            },
            {
                other: true,
                params: [
                    {
                        name: "Земельные участки",
                        value: "3 записи"
                    }
                ]
            }
        ],
        link: "detail/3/"
    }
};


$(function(){

    var popupOptions = {//натсройки для плагина kPopup
            class: "popup-add-linked", //класс самого окна
            itemUrl:"table-for-add.html", //откуда брать контент
            useOverlay: true, //использовать подложку
            "styles": { //стили
                backgroundColor: "#fff",
                display: "block",
                width: "1000px",
                zIndex: '102'
            },
            afterOpenCallback: changePopup, //функция вызываемая после открытия
            afterCloseCallback: clearPopup //функция вызываемая после закрытия
        },
        counterOptions = { //настройки счетчика(показано количество отмеченных элементов
            counterContainer: "blue-element-counter",
            footerCounterContainer: "footer-popup-counter"

        },
        $blueElementCounterTmpl = $('<div></div>',{ //шаблон синего счетчика(наверху слева)
            class: counterOptions.counterContainer,
            html: "Выбрано<br /><span></span>"
        }).hide(),

        $popupFooterCounter = $('<div />',{ //шаблон счетчика внизу
            html: '<span>Выбрано</span> <a href="#"></a>',
            class: counterOptions.footerCounterContainer
        }).visHide(), //чтобы ничего не прыгало, мы его делаем невидимым, а не убираем

        objectStrngs = ["объект", "объекта", "объектов"], //слова для plural_str
        selectedObjString = ["Выбран", "Выбрано", "Выбрано"], //слова для plural_str
        activeKeyCodes = { //коды клавишь
            esc: 27,
            up: 38,
            down: 40,
            "27": "esc",
            "38": "up",
            "40": "down"
        },
        detailItemTemplate = '<script id="detailfItemTemplate" type="text/x-jquery-tmpl">' + //Шаблон делального просмотра записи(в еще одном попапе)
            '<ul class="detail-info-ul">' +
            '{{each items}}' +
            '   {{if !$value.other}}' +
            '       {{if $value.title}}' +
            '           <li class="detail-info-li-title"><h3>${$value.title}<//h3></li>' +
            '           {{each $value.params}}' +
            '               <li class="detail-info-li-param">${$value.name} &mdash; <span>${$value.value}</span></li>' +
            '           {{/each}}' +
            '       {{/if}}' +
            '   {{else}}' +
            '       {{each $value.params}}' +
            '           <li class="detail-info-li-other">${$value.name} &mdash; <span>${$value.value}</span></li>' +
            '       {{/each}}' +
            '   {{/if}}' +
            '{{/each}}' +
            '' +
            '</ul>' +
            '<div class="detail-info-controls">' +
            '<a href="${link}" class="gray-button detail-info-button-show-more">Открыть карточку</a>' +
            '</div>' +
            '<a href="#close" class="detail-info-close"></a>' +
            '</script>',

        checkHeaderCkeckbox = function($checkbox,$checkboxes){ //функция клика на чекбокс в заголовке таблицы
            if ($checkbox.is(":checked")){
                $checkboxes.attr("checked","checked");
                $checkboxes.parents("tr").addClass("hover-blue");

                showCounter($checkboxes.length);
            }else{
                $checkboxes.removeAttr("checked");
                $checkboxes.parents("tr").removeClass("hover-blue");
                hideCounter();
            }


        },

        checkBodyCheckbox = function ($checkbox,$headerCheckbox, $checkboxes){ //функция клика на чекбокс в строке таблицы

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
            $checkbox.blur();
        }

    $(".element-table-add-button").kPopup(popupOptions); //инициализация плагина

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


    /**
     * @description показываем счетчик
     * @param count {INT} - количество элементов
     */
    function showCounter(count){//Показываем счетчик
        var $popup = $("."+popupOptions.class);

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

    /**
     * @description причем счетчик
     *
     */
    function hideCounter(){

        $blueElementCounterTmpl.hide();
        $popupFooterCounter.visHide();
    }

    /**
     * @description изменяем котент попапа
     * @param popup - попап
     */
    function changePopup(popup){
        var $popup = $(popup);

        var $popupFooter = $("<div />",{
            class: "popup-footer"
        }).appendTo($popup),
            $applyButton = $('<a />',{
                text: "Применить",
                href: "#apply",
                class: "popup-footer-apply-button blue-button"
            }).appendTo($popupFooter),

            $addButton = $('<a />',{
                href: "#add",
                html: '<span class="big-plus">+</span>Добавить',
                class: "popup-footer-add-button green-button"
            }).appendTo($popupFooter),

            $calcenButton = $('<a />',{
                text: "Отменить",
                href: "#cancel",
                class: "popup-footer-cancel-button gray-button"
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

        $applyButton.live("click",function(event){
            event.preventDefault();
            console.log($(".checkboxed input"));
            return false;
        })

        $calcenButton.bind("click",function(){
            $.kPopup.removePopup();
        });
        $(document).bind("keypress.addedTable",function(e,customKeyCode){
            var $item = $popup.find(".on-hover"),
                $parent = $item.parent(),
                itemId = $item.data("item-id");

            if (customKeyCode>=0) e.keyCode = customKeyCode;

            /**
             * @description Обработка нажатий клавишь
             */
            if (activeKeyCodes[e.keyCode]){//Вверх вниз

                e.preventDefault();
                var itemId, itemData;

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

                        if ($parent.hasClass("on-space-opened") && $(".popup-tr-data").size()==1) {
                            itemId = $tr.data("item-id");
                            itemData = detailedInfo[itemId] || {noData: true};


                            setDetailInfoContent(itemId, itemData, detailItemTemplate, $(".popup-tr-data"), true);
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

                        if ($parent.hasClass("on-space-opened") && $(".popup-tr-data").size()==1) {
                            itemId = $tr.data("item-id");
                            itemData = detailedInfo[itemId] || {noData: true};

                            setDetailInfoContent(itemId, itemData, detailItemTemplate, $(".popup-tr-data"), true);
                        }
                    }
                    $tr.siblings(".on-hover").removeClass("on-hover").end().addClass("on-hover").focus();

                }
            } else if (e.which==32){//Пробел

                e.preventDefault();


                /*
                 * @TODO получать это надо через ajax
                 */
                    var itemData = detailedInfo[itemId] || {noData: true};

                if (!$parent.hasClass("on-space-opened")){
                    var tmp = setDetailInfoContent(itemId, itemData, detailItemTemplate, false, true);

                    $item.kPopup({
                        autoOpen: true,
                        class: "popup-tr-data",
                        openerClass: "popup-tr-opened",
                        itemData: tmp,
                        useOverlay: false,
                        container: $popup,
                        "styles": {
                            backgroundColor: "#fff",
                            border: "1px solid #A8B9C7",
                            "border-radius": "9px",
                            display: "block",
                            width: "315px",
                            padding: "25px",
                            zIndex: "103",
                            top: "50px"
                        },
                        afterOpenCallback: function(){
                            $parent.addClass("on-space-opened")
                        },
                        afterCloseCallback: function(){
                            $parent.removeClass("on-space-opened")
                        }
                    });
                }else{
                    $.kPopup.removePopup();
                    $parent.removeClass("on-space-opened");
                }



            } else if (e.keyCode == 13){//Esc

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

        $popup.find("tbody tr").on("mouseenter.addedTable",function(){
            $(this).siblings(".on-hover").removeClass("on-hover").end().addClass("on-hover");
        }).on("mouseleave.addedTable",function(){
                $(this).siblings(".on-hover").removeClass("on-hover");
            })
    }

    function clearPopup(popup,params){
        $(document).unbind(".addedTable")
    }

    function setDetailInfoContent(itemId,itemData,template,$container,showCkeckbox){
        var html = $(template).tmpl(itemData)
        if ($container) {
            $container.html(html);
        }


        if (showCkeckbox){
            var $input = $("<input />",{
                type: "checkbox",
                "class": "detail-info-control-check",
                "data-item-id": itemId
            });

            $(".popup-add-linked tr[data-item-id="+itemId+"] input:checkbox").attr("checked")!=undefined ? $input.attr("checked",true) : $input.removeAttr("checked");
            $(html[1]).prepend($input);
        }
        return html;
    }

    $(".detail-info-control-check").live("click",function(event){

        var $input = $(this),
            itemId = $input.data("item-id"),
            $checkbox = $(".checkboxed tr[data-item-id="+itemId+"] input:checkbox"),
            $headerCheckbox = $(".checkboxed th input[type=checkbox]"),
            $checkboxes = $(".checkboxed td input[type=checkbox]");

        checkBodyCheckbox($checkbox,$headerCheckbox, $checkboxes);

        //$input.attr("checked")!=undefined ? $checkbox.attr("checked",true) : $(".popup-add-linked tr[data-item-id="+itemId+"] input:checkbox").removeAttr("checked");
    });


    $(".detail-info-close").live("click",function(event){
        //@TODO Доделать плагин, чтобы можно было закрыть верхний попап
        event.preventDefault();
        $.kPopup.removePopup();
        return false;
    });
});