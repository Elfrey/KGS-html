/**
 * Lookup plugin for KGS project
 * User: Elfrey
 * Date: 31.01.12
 * Time: 14:39
 * @description плагин для полей типа "ссылка"
 *
 * Вызов
 $(".element-link-add-button, .element-document-add-button").live("click",function(){
     var $button = $(this);
     var $parentDiv = $button.parent();
     var $input = $button.next();
     $button.hide();

     var lookupOptions = {
         listItem: "#lookup_for_field_8",
         button: $button,
         addNewAction: function(){
            alert("Добавить");
        },
         applyAction: function(){
             $button.removeClass("element-link-add-button").addClass("element-link-edit-button");
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
     return false;
 })
 *
 */
$(function(){
    /**
     * @description шаблон лукапа
     */
	var $lookUpTmpl = $('<script id="lookUpTmpl" type="text/x-jquery-tmpl">' +
		'<div class="lookup-wrapper">' +
		'<ol class="lookup-actions">' +
		'<li><a href="#select" class="lookup-action-select">Выбрать</a></li>' +
		'<li><a href="#add" class="lookup-action-add"><span class="big-plus">+</span>Добавить</a></li>' +
		'<li><a href="#cancel" class="lookup-action-cancel">Отменить</a></li>' +
		'</ol>' +
		'</div>' +
		'</script>').appendTo("body");
})

if (jQuery) (function ($) {


	var defaults = {
		listItem: "", //Селектор списка в формате, <ul><li></li></ul>
		listUrl: "", //Адрес для получения списка
		listReqType: "html", //тип ответа, html/text отдаст: <ul><li></li></ul>, json отдаст {item:{title: "title",attr_1:"attr_1",attr_n:"attr_n"},{title: "title",attr_1:"attr_1",attr_n:"attr_n"}}
        inputMarginTop: 4,
		wrapperLeftHorizontalPadding: 0, //левый паддинг для враппера, для установки ширины
		wrapperRightHorizontalPadding: 0, //правый паддинг для враппера, для установки ширины
		borderSize: 1, //размер бордера, для установки ширины
		parentClass: "element-field", //Класс родителя,, чтобы подсветить
		parentHoverClass: "hover-clean", //Класс для подсветки родителя
		wrapperItem: false, //сюда кладем враппер, чтобы потом с ним работать
		parentItem: false, //родительский див
		active: false, //флаг активности
		button: false, //на какую кнопку нажали
        newButton: false, //кнопка, которая появится после изменения
        oldButton: false, //темповая кнопка
		input: false, //инпут, куда значение писать
		applyAction: false, //действие для кнопки "Выбрать"
		addNewAction: false, //действие для кнопки "Добавить"
		cancelAction: false, //действие для кнопки "Отмена"

		guid: 0 //Глобальный ID для работы плагина
	};

	$.fn.lookup = function (method,params) {


		var init = function (input,params) {

			var options = $.extend({}, defaults, params),
				$input = $(input);


			if (options.guid==0){
				options.guid = $.guid++;
			}

			var $parent = $input.parents("."+options.parentClass).addClass(options.parentHoverClass);
			$parent.data("guid",options.guid);

            $(".lookup-wrapper").each(function(){
                var $wrapper = $(this);
                if ($wrapper.data("guid")!=options.guid){
                    $wrapper.remove();
                }
            })

			$input.css({
				marginTop: options.inputMarginTop+"px",
				width: "-moz-calc(100% - 73px)"
			}).addClass("lookup").show().get(0).type="text";



			var inputPosition = $input.position(),
				inputWidth = $input.outerWidth()-(options.wrapperLeftHorizontalPadding+options.wrapperRightHorizontalPadding)-(options.borderSize*2);

			var $lookUpWrapper = $("#lookUpTmpl").tmpl([{}])
				.css({
					left: inputPosition.left,
					width: inputWidth
				});

			if (options.listUrl){
				if (options.listReqType == "html"){

					$.get(options.listUrl,function(data){
						$(data).prependTo($lookUpWrapper);
                        $lookUpWrapper.insertAfter($input)
					});

				}else if (options.listReqType == "json"){
					$.getJSON(options.listUrl,function(data){

						var items = [];
						var tmpItem = "";

						$.each(data.items,function(key, item){
							tmpItem = "<li><h3>"+item.title+"</h3><p>";

							var tmpAttrs = [];
							$.each(item.attr,function(attrTitle,attrValue){
								tmpAttrs.push(attrTitle+": "+attrValue);
							});
							tmpItem+=tmpAttrs.join("; ")+"</p></li>";
							items.push(tmpItem);
						});
						$('<ul/>', {
							'class': 'my-new-list',
							html: items.join('')
						}).prependTo($lookUpWrapper);

                        $lookUpWrapper.insertAfter($input)
					});
				}

			}

			if (options.listItem!=""){
				$(options.listItem).clone().prependTo($lookUpWrapper);

                $lookUpWrapper.insertAfter($input)
			}

			$lookUpWrapper.show();
            /*
             * @TODO это тут пиздец какой-то, придумай что-нить.
             * Это для того, чтобы синий фон пропадал и контейнера когда с него якобы уходит мышка, ну когда она фактически на таблицу переходит.
             */
            $lookUpWrapper.on("mouseenter",function(){
                $parent.removeClass("hover");
            });

			/*
			 * Добавление элементов к опциям
			 */

			if (!options.wrapperItem)
				options.wrapperItem = $lookUpWrapper;
			if (!options.parentItem)
				options.parentItem = $parent;
			if (!options.active)
				options.active = true;
			if (!options.button)
				options.button = $input.prev();
			if (!options.input)
				options.input = $input;


			$(document).bind("click.lookup"+options.guid,function(e){
				prepareClose(options, e);
			});

			$("ul li",options.wrapperItem.get(0))
                .live("click.lookup"+options.guid,function(e){
                    checkItem(options,e,this);
                })
                .live("dblclick.lookup"+options.guid,function(e){
                    checkItem(options,e,this);
                    applySelected(options);
                });

			$(".lookup-action-select",options.wrapperItem.get(0)).live("click.lookup"+options.guid,function(){
				applySelected(options);
			});

            $(".lookup-action-cancel",options.wrapperItem.get(0)).live("click.lookup"+options.guid,function(){
                close(options);
                if (options.cancelAction)
                    options.cancelAction.call();
            });


            $(".lookup-action-add",options.wrapperItem.get(0)).live("click.lookup"+options.guid,function(){
                if (options.addNewAction)
                    options.addNewAction.call();
            });

            options.input.live("keyup.lookup"+options.guid,function(e){
                options.wrapperItem.find(".visible").removeClass("visible");

                var $input = $(this),
                    inputValue = $input.val(),
                    $data = options.wrapperItem.find("ul li"),
                    flag = false;

                clearTimeout(timeoutId);


                if (event.keyCode == 27) {
                    $input.val('');
                    $data.hide();
                }
                if (inputValue.length>1 || inputValue==''){

                    toggleLookUp($wrapper,$ul,"open",$scrollableLookup);

                    timeoutId = setTimeout(function(){
                        flag = true;
                        if (flag){
                            lookupFilter($data, inputValue);
                            $ul.find(".odd").removeClass("odd");

                            var i=0;
                            $ul.find("li:visible").each(function(){
                                i++
                                if (i%2==0){
                                    $(this).addClass("odd")
                                }
                            })

                        }
                    },1);
                }else{
                    $data.hide();
                }
                $data.find(":first").addClass("btop");
                var $lastLi = $data.find(":last");
                $lastLi.addClass("bbottom");

                if (!$lastLi.is("[title]")){
                    $lastLi.addClass("visible").show();
                }
                $scrollableLookup.data('jsp').reinitialise();


                filterList(options,e,$(this).val());
            });

			/*return $input.bind("click.lookup",function () {
				return false;
			});*/
		};

        var filterList = function(options, e, value) {
            console.log(value);
        };

		var prepareClose = function(options, e){
			if (
					options.active
					&& $(e.target).parents("." + options.parentClass + "." + options.parentHoverClass).data("guid") != options.guid
					&& $(e.target).data("guid") != options.guid
				) {
				close(options);
			}

            return false;
		};

		var close = function(options){
			options.parentItem.removeClass(options.parentHoverClass);
			options.wrapperItem.remove();
			options.input.hide();
			options.button.show();
			options.active = false;
			$(document).unbind(".lookup"+options.guid);

            return false;
		};

		var checkItem = function(options, e, clickedItem){
			$("ul li",options.wrapperItem.get(0)).data("checked",false).removeAttr("checked").removeClass("hover");
			$(clickedItem).data("checked",true).attr("checked",true).addClass("hover");

            return false;
		};

		var applySelected = function(options){
			var $checkedLi = $("ul li[checked]",options.wrapperItem.get(0));

				if ($checkedLi.length==1){
					options.input.val($checkedLi.find("h3").text());
					options.button.text($checkedLi.find("h3").text());
                    if (options.newButton){
                        options.oldButton = options.button;
                        options.button = options.newButton
                    }
					close(options);
                    if (options.applyAction){
                        options.applyAction.call();
                    }
				}
            return false;
		};

		switch( method ) {
			default:
				$(this).each( function() {
					init(this,params);
				});
				break;
		}
	};
})(jQuery)