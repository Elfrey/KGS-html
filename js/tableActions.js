
/**
 * @description JSON объект с действиями над строками таблицы(просмотр, удаление, редактирование)
 * Первый ключ = атрибут строки data-action-id
 *
 */
var tableActionJSON = {
    0: {
        actions: [
            {
                code: "show",//Код действия
                title: "Просмотр", //Название пункта
                href: "#show", //Ссылка
                isDefault: true //действие по умолчание, вызывается при клике левой кнопкой по строке
            },
            {
                code: "makeExt",
                title: "Сделать выписку",
                href: "#make"
            },
            {
                code: "edit",
                title: "Редактировать",
                href: "#edit"
            },
            {
                breaker: true
            },
            {
                code: "delete",
                title: "Удалить",
                href: "#delete"
            }
        ]
    },
    1: {
        actions: [
            {
                code: "show",//Код действия
                title: "Просмотр", //Название пункта
                href: "#show", //Ссылка
                isDefault: true //действие по умолчание, вызывается при клике левой кнопкой по строке
            },
            {
                code: "makeExt",
                title: "Сделать выписку",
                href: "#make"
            },
            {
                code: "edit",
                title: "Редактировать",
                href: "#edit"
            },
            {
                breaker: true
            },
            {
                code: "delete",
                title: "Удалить",
                href: "#delete"
            }
        ]
    },
    2: {
        actions: [
            {
                code: "show",//Код действия
                title: "Просмотр", //Название пункта
                href: "#show", //Ссылка
                isDefault: true //действие по умолчание, вызывается при клике левой кнопкой по строке
            },
            {
                code: "makeExt",
                title: "Сделать выписку",
                href: "#make"
            },
            {
                code: "edit",
                title: "Редактировать",
                href: "#edit"
            },
            {
                breaker: true
            },
            {
                code: "delete",
                title: "Удалить",
                href: "#delete"
            }
        ]
    },
    3: {
        actions: [
            {
                code: "show",//Код действия
                title: "Просмотр", //Название пункта
                href: "#show", //Ссылка
                isDefault: true //действие по умолчание, вызывается при клике левой кнопкой по строке
            },
            {
                code: "makeExt",
                title: "Сделать выписку",
                href: "#make"
            },
            {
                code: "edit",
                title: "Редактировать",
                href: "#edit"
            },
            {
                breaker: true
            },
            {
                code: "delete",
                title: "Удалить",
                href: "#delete"
            }
        ]
    },
    4: {
        actions: [
            {
                code: "show",//Код действия
                title: "Просмотр", //Название пункта
                href: "#show", //Ссылка
                isDefault: true //действие по умолчание, вызывается при клике левой кнопкой по строке
            },
            {
                code: "makeExt",
                title: "Сделать выписку",
                href: "#make"
            },
            {
                code: "edit",
                title: "Редактировать",
                href: "#edit"
            },
            {
                breaker: true
            },
            {
                code: "delete",
                title: "Удалить",
                href: "#delete"
            }
        ]
    },
    7: {
        actions: [
            {
                code: "show",//Код действия
                title: "Просмотр", //Название пункта
                href: "#show", //Ссылка
                isDefault: true //действие по умолчание, вызывается при клике левой кнопкой по строке
            },
            {
                code: "makeExt",
                title: "Сделать выписку",
                href: "#make"
            },
            {
                code: "edit",
                title: "Редактировать",
                href: "#edit"
            },
            {
                breaker: true
            },
            {
                code: "delete",
                title: "Удалить",
                href: "#delete"
            }
        ]
    }

};

$(function() {

    var tableActionsOptions = {
            showSingleAction: true
        },
        tableActionListTemplate = '<script id="lookUpTmpl" type="text/x-jquery-tmpl">' +
            '<div class="table-actions">' +
            '<ul>' +
            '{{each actions}}' +
            '{{if $value.breaker}}' +
            '<li class="breaker"></li>' +
            '{{else}}' +
            '<li><a href="${$value.href}"{{if $value.isDefault}} class="default"{{/if}}>${$value.title}</a></li>' +
            '{{/if}}' +
            '{{/each}}' +
            '</ul>' +
            '</div>' +
            '</script>';



    /***************************************************************************
     * переход по селектам data-actions
     **************************************************************************/
    if ($(".data-actions")) {
        $(".data-actions").live(
            "change",
            function() {
                var pattern = /[а-яА-Я]/;
                if ($(this).val() != '' && $(this).val() != 0
                    && !pattern.test($(this).val()))
                    document.location = $(this).val();
            })
    }

    /***************************************************************************
     * Работа с кнопками в ".data-table"
     **************************************************************************/
    if ($(".data-table").length>0 && tableActionJSON != undefined){
        var $dataTable = $(".data-table tbody");
        $dataTable.children("tr").each(function(){
            var $tr = $(this),
                actionId = $tr.data("action-id");

            if (tableActionJSON[actionId] != undefined){
                $(tableActionListTemplate).tmpl(tableActionJSON[actionId]).attr("data-action-id",actionId).appendTo("body");
            }
        })
        .on("contextmenu",function(event){
                var $tr = $(this),
                    actionId = $tr.data("action-id");
                $(".table-actions[data-action-id='"+actionId+"']").css({
                    left: event.clientX+5,
                    top: event.clientY+5
                }).show();
                $(document).on("click.table-actions",function(event){
                    if (!$(event.target).parents(".table-actions").length){
                        $(".table-actions").hide();
                        $(document).off("click.table-actions");
                    }
                })
                event.preventDefault();

            });
    }

    /*
    if ($(".data-table") && false) {
        var $dataTable = $(".data-table tbody");
        var tdCount = $dataTable.find("tr:first td").length;
        $dataTable
            .find("tr")
            .each(
            function() {
                var $this = $(this);
                if ($this.attr('actions')) {
                    var actions = $(this).attr('actions')
                        .split(" ");
                    if (actions.length > 1 || tableActionsOptions.showSingleAction) {
                        var $td = $this.find("td:first").next();

                        $this.addClass("data-table-main-tr");
                        var $actionsDiv = $("<div />").addClass(
                            "data-table-actions-tr").appendTo(
                            $td);
                        var actionsLength = actions.length;

                        for (i = 0; i < actionsLength; i++) {
                            var action = actions[i];
                            var name = $this.attr('action-name-'
                                + action);
                            var href = $this.attr('action-href-'
                                + action);
                            var $tmpLink = $("<a />").addClass(
                                "data-" + action + "-a").attr(
                                "href", href).text(name).attr(
                                "title", name).appendTo(
                                $actionsDiv);
                            $("<span>&nbsp</span>").appendTo(
                                $actionsDiv);
                        }
                        $td.css({
                            "padding-bottom" : "+=20"
                        });
                    } else {
                        $this.bind("click", function() {
                            document.location = $(this).attr(
                                "action-href-" + actions[0]);
                        });
                    }
                    if ($this.is("[action-default]")) {
                        $this
                            .bind(
                            "click",
                            function() {
                                document.location = $(
                                    this)
                                    .attr(
                                    "action-href-"
                                        + $this
                                        .attr("action-default"));
                            });
                    }
                }

                if ($this.attr("add-info-data-href")) {
                    $(this).unbind("click");
                    var $addTr = $("<tr />").addClass(
                        "add-info-data-tr").insertAfter($this)
                        .hide();
                    var tdColspan = $this.find("td").length;
                    var $addTd = $("<td />").attr("colspan",
                        tdCount).load(
                        $this.attr("add-info-data-href"))
                        .appendTo($addTr);

                    $this.addClass("can-expand");
                }
            });

        $(".data-table-actions-tr").live("mouseenter", function() {
            $(this).addClass("opened");
            $(this).css("visibility", "visible");
        })

        $(".data-table-main-tr").live(
            "mouseenter",
            function() {
                if ($(this).find(".data-table-actions-tr"))
                    $(this).addClass("opened").find(
                        ".data-table-actions-tr").css("visibility",
                        "visible");
            }).live(
            "mouseleave",
            function() {
                if ($(this).find(".data-table-actions-tr"))
                    $(this).removeClass("opened").find(
                        ".data-table-actions-tr").css("visibility",
                        "hidden");
            })

        $(".data-table-main-tr").live("click", function(event) {
            if ($(this).next().hasClass("add-info-data-tr")) {
                $(this).next().toggle();
            }
        })
    }
    */
    /***************************************************************************
     * END Работа с кнопками в ".data-table"
     **************************************************************************/

    $("#check-all-filters").live("click", function() {
        var $input = $(this);
        var $parentBlock = $(this).parentsUntil("div").parent();

        $parentBlock.find("input[type=checkbox]").each(function() {
            if ($input.attr("checked")) {
                $(this).removeAttr("checked");
            } else {
                $(this).attr("checked", "true");
            }
        });
        if ($input.attr("checked")) {
            $input.removeAttr("checked");
        } else {
            $input.attr("checked", "true");
        }
    });

    $("#field-settings,#filter,#gray-add").live("click", function() {
        var $this = $(this);

        var $block = $this.next();
        var thisPos = $this.position();

        $block.css("left", thisPos.left - 35).toggle();
        generateOverlay($block, function() {
            $(".close-filter-block").click()
        });
        return false;
    });

    $(".close-filter-block").live("click", function() {
        $(this).parent().hide();
        if ($("#overLay")) {
            $("#overLay").remove();
        }
    });

    /**
     *Закрепление шапки таблицы при скроле
     */


})

function showNotification(message, classIndex, $table) {
    var noteClasses = [ "notification-blue", "notification-green",
        "notification-red" ];
    if (typeof noteClasses == "undefined") {
        classIndex = 0;
    }
    $table.find(".notification-tr").remove();
    var $noteTr = $("<tr />").addClass("notification-tr").addClass(
        noteClasses[classIndex]);
    var tdCount = $table.find("tbody tr:first td").length;
    var $noteTd = $("<td />").attr("colspan", tdCount).html(message).appendTo(
        $noteTr);
    var $closeButton = $("<a />").attr("href", "#").addClass(
        "notification-close").text("x").appendTo($noteTd);
    $noteTr.prependTo($table.find("tbody"));
}

