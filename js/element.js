var addRule = (function(style){
	var sheet = document.head.appendChild(style).sheet;
	return function(selector, css){
		var propText = Object.keys(css).map(function(p){
			return p+":"+css[p]
		}).join(";");
		sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
	}
})(document.createElement("style"));


$(function(){

    /**
     * @description Кнопки переключения верхней панели(просмотр/редактирование)
     */
    /*
    @TODO Это все только для того, чтобы показать как работает. На ссылки должны быть нормальные переходы.
     */
    var tmpTopPanelCounter = 0;
    $("#element-top-panel").find("a#read-element").on("click",function(event){
        event.preventDefault();
        var $this = $(this);
        $this.siblings("a").addClass("inactive").end().removeClass("inactive").next().removeClass("edit");
        tmpTopPanelCounter++;
        if (tmpTopPanelCounter>2){
            var $newSpan = $("<span />",{
                text: "Редактировать",
                "class": "edit-button-disabled"
            });
            $this.parent().find(".already-opened").css("display","inline-block").end().find("a#edit-element").after($newSpan).remove();
            $("#element-top-panel").addClass("element-top-panel-bordered");
        }
    }).end().find("a#edit-element").on("click",function(event){
            event.preventDefault();
            $(this).siblings("a").addClass("inactive").end().removeClass("inactive").prev().addClass("edit");
            tmpTopPanelCounter++;
        });

    function makeAttrLinkList($button){
        var buttonClass = $button.attr("class"),
            $attrLinkListTmpl = $("#attrLinkListTmpl").tmpl([{
            "changeItemTitle": attrLinkChangeItemTitle[buttonClass]
        }]).hide().insertAfter($button);
    }

    /**
     * @description установка position: fixed у верхней панельки, когда мы проскорили вниз на ее высоту
     *
    $(document).scroll(function(event){
        var $this = $(this)
            $panel = $("#element-top-panel");
        $panel.height()<$this.scrollTop() ? $panel.css("position","fixed") : $panel.css("position","relative");
    });*/

	/*
	 * Добавление и обработка кнопки удаления записи
	 */
	$(".element-table-data tbody tr").each(function(){
		var $tr = $(this),
            $firstTd = $("td:first", $tr),
            firstTdHeight = $firstTd.height(),
            $delButton = $(".element-table-delete-row-button",$firstTd);

		$delButton.height(firstTdHeight )
	});
	$(".element-table-delete-row-button").live("click",function(){
		var $delButton = $(this),
            $tr = $delButton.parents("tr"),
            $table = $tr.parents("table"),
            $tbody = $table.find("tbody"),
            $tfoot = $table.find("tfoot"),
            $summaryField = $tfoot.find(".calculated"),
            $toCalculateFields = $tr.find(".calculated"),
            valuesToAnimate = {}; // {field: [from, to]}




		/*Удаление записи
		* $.post("ult_to_delete")
		*/



        var $oldTr = $tr.clone(),
            tdWidths = [],
            colSpan = $tr.children("td").size();

        $tr.children("td").each(function(){
            tdWidths.push($(this).width());
        });


        $tr.empty().append("<td colspan='"+colSpan+"' style='padding: 0px; border: none' />")
            .children("td").append("<div><table></table></div>")
            .find("table").html($oldTr)
            .find("td").each(function(index){
                $(this).width(tdWidths[index])
            });

        $tr.find("td div").animate({
                height: "toggle"
            },
            {
                step: function (now, fx){
                    var $div = $(this),
                        tmpValue;

                    $toCalculateFields.each(function(){
                        var $td = $(this),
                            summaryField = $td.data("summary-field"),
                            value = $td.data("value") || makeFloat($td.find("span").text()),
                            $currentSummaryField = $summaryField.filter("[data-summary-for='"+summaryField+"']"),
                            summaryValue =  makeFloat($currentSummaryField.find("span").text());

                        if (valuesToAnimate[summaryField] == undefined){
                            valuesToAnimate[summaryField] = summaryValue;
                        }

                        summaryValue = valuesToAnimate[summaryField] - (value * fx.pos);
                        $currentSummaryField.find("span").text(formatFloat(summaryValue, 1, " "));
                    });

                },
                duration: 1000,
                complete: function(){
                    $(this).parents("tr").hide();
                }
            });

		return false;
	});


	/*
	 * Добавление стилей для корректного отображения иконок с :after у кнопок полей-ссылок и документов
	 */
	var iconStyleCounter = 0;
	$(".element-document-add-button, .element-link-add-button").each(function(){
		var $button = $(this),
            selector = "."+$button.attr("class")+".style-"+iconStyleCounter;
		$(this).css({
			"display": "inline-block",
			"white-space": "nowrap"
		});

		var thisWidth = $button.width()+5;

        $button
			/*.css({
				"display": "inline",
				"white-space": "normal"
			})*/
			.addClass("style-"+iconStyleCounter);

		addRule(selector+":after", {
            "margin-left": thisWidth+"px"
        });
		iconStyleCounter++
	});

	/*
	 * Обработка нажатия на кнопку у полей-ссылок и документов
	 */
	var $attrLinkListTmpl = $('<script id="attrLinkListTmpl" type="text/x-jquery-tmpl">' +
			'<div class="attr-link-list"><ul>' +
				'<li><a href="#" class="attr-link-view-item">Посмотреть</a></li>' +
				'<li><a href="#" class="attr-link-change-item">${changeItemTitle}</a></li>' +
				'<li><a href="#" class="attr-link-edit-item">Редактировать</a></li>' +
				'<li><a href="#" class="attr-link-delete-item">Убрать</a></li>' +
			'</ul></div>' +
		'</script>'
	).appendTo("body"),
        attrLinkChangeItemTitle = {
		"element-link-edit-button": "Выбрать другое",
		"element-document-edit-button": "Прикрепить другой",
	};

	$(".element-document-edit-button, .element-link-edit-button")
		.each(function(){
			var $button = $(this);

            makeAttrLinkList($button);

		})
		.on("click",function(){
            var $itemlist = $(this).next();
            if ($itemlist.hasClass("attr-link-list")){
                $itemlist.toggle();
            }
            return false;
		});

    $(".element-link, .element-document").on("click",function(event){
        if (event.target.tagName.toUpperCase()!="A"){
            var $div = $(this),
                $a = $div.find(".element-data > a");
            event.preventDefault();
            $a.click();
            return false;
        }
    }).on("mouseenter",function(){
            $(this).addClass("hover");
        }).on("mouseleave",function(){
            $(this).removeClass("hover");
        });

    $(".element-field.element-document, .element-field.element-link").live("mouseleave",function(){
        if ($(".attr-link-list:visible",$(this)).length>0){
            $(".attr-link-list:visible",$(this)).hide();
        }
    });

    $(".element-link-add-button, .element-document-add-button").live("click",function(){
        var $button = $(this),
            $parentDiv = $button.parent(),
            $input = $button.next();
        $button.hide();

        var lookupOptions = {
            listItem: "#lookup_for_field_8",
            button: $button,
            addNewAction: function(){
                alert("Добавить");
            },
            applyAction: function(){
                $button.removeClass("element-link-add-button")
                    .addClass("element-link-edit-button")
                    .css({"display":"inline-block","white-space":"nowrap"});
                var $attrLinkListTmpl = $("#attrLinkListTmpl").tmpl([{
                    "changeItemTitle": attrLinkChangeItemTitle["element-link-edit-button"]
                }]).hide().insertAfter($button);
            }
        };
        if ($button.hasClass("element-document-add-button")){
            lookupOptions.listUrl = "lookuptmplist.json";
            lookupOptions.listReqType = "json";
            lookupOptions.listItem = "";
            lookupOptions.applyAction = function(){
                $button.removeClass("element-document-add-button").addClass("element-document-edit-button");
                var $attrLinkListTmpl = $("#attrLinkListTmpl").tmpl([{
                    "changeItemTitle": attrLinkChangeItemTitle["element-link-edit-button"]
                }]).hide().insertAfter($button);
            }
        }
        $input.lookup("init",lookupOptions);
        $parentDiv.removeClass("hover-clean");
        return false;
    });

    var clickElementLinkDocument = function($a){

        return false;
    };

    function animateDigids(currentValue, startValue, $field){
        var action = (startValue <= currentValue)?"inc":"dec";
/*
        if (startValue != currentValue){
            startValue = (action == "dec")? ++currentValue : --currentValue;
            setTimeout(function(){
                animateDigids(currentValue, startValue, $field);
                $field.children("span").text(currentValue);
            },1000);
        }else{
            $field.children("span").text(currentValue);
        }*/
    }


});


