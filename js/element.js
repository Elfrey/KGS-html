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


    function makeAttrLinkList($button){
        var buttonClass = $button.attr("class");

        var $attrLinkListTmpl = $("#attrLinkListTmpl").tmpl([{
            "changeItemTitle": attrLinkChangeItemTitle[buttonClass]
        }]).hide().insertAfter($button);
    }

	/*
	 * Добавление и обработка кнопки удаления записи
	 */
	$(".element-table-data tbody tr").each(function(){
		var $tr = $(this);
		var $firstTd = $("td:first", $tr);
		var firstTdHeight = $firstTd.height();
		var $delButton = $(".element-table-delete-row-button",$firstTd);
		$delButton.height(firstTdHeight )
	});
	$(".element-table-delete-row-button").live("click",function(){
		var $delButton = $(this);
		var $tr = $delButton.parent().parent();

		/*Удаление записи
		* $.post("ult_to_delete")
		*/

        /*
         * @TODO тут еще должна быть функция пересчета итоговых данных под таблицей. Сейчас идет пересчет только по видимой области
         */

		$tr.children("td").each(function() {
			$(this).wrapInner("<div />").children("div").slideUp(function() {$tr.remove();})
		});
		return false;
	});


	/*
	 * Добавление стилей для корректного отображения иконок с :after у кнопок полей-ссылок и документов
	 */
	var iconStyleCounter = 0;
	$(".element-document-add-button, .element-link-add-button").each(function(){
		var selector = "."+$(this).attr("class")+".style-"+iconStyleCounter;
		$(this).css({
			"display": "inline-block",
			"white-space": "nowrap"
		});

		var thisWidth = $(this).width()+5;

		$(this)
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
	).appendTo("body");

	var attrLinkChangeItemTitle = {
		"element-link-edit-button": "Выбрать другое",
		"element-document-edit-button": "Прикрепить другой",
	};

	$(".element-document-edit-button, .element-link-edit-button")
		.each(function(){
			var $button = $(this);
            /*
			var buttonClass = $button.attr("class");
            console.log($button);

			var $attrLinkListTmpl = $("#attrLinkListTmpl").tmpl([{
				"changeItemTitle": attrLinkChangeItemTitle[buttonClass]
			}]).hide().insertAfter($button);
			*/
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
});
