/**
 * @author Elfrey
 * @date 10-11.2011
 * @project KGS
 * @dependencies jQuery, jquery.tmpl.min.js, jquery.jscrollpane.min.js, jquery.mousewheel.js
 *
 */
$(function(){
    /*lookup lookup
     ************/

    //Шаблоны ссылок
    var $linkTmpl = $('<script id="linkTmpl" type="text/x-jquery-tmpl"><a href="${href}" class="${linkClass}" title="${title}">${title}</a></script>').appendTo("body");

});

//Фунция фильтрации
function lookupFilter(selector, query) {
    query	=	$.trim(query); //trim white space
    query = query.replace(/ /gi, '|'); //add OR for regex query

    $data.each(function() {
        if ($(this).is("[title]"))
            ($(this).attr("title").search(new RegExp(query, "i")) < 0) ? $(this).hide().addClass("hidden") : $(this).show();
        else
            $(this).show();
        //($(this).attr("title").search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
    });
}//filter

function createLookUp(){



    return false;

    /*
     * @TODO Не уверен что это будет работать, поэтому я буду делать новую версию
     */

    var timeoutId = 0;
    //Настройка отображения выпадающего списка
    $('div.lookup ul').each(function(){
        var $this = $(this);
        var $ul = $this;
        var $wrapper = $ul.closest(".lookup-wrapper")
        var $input = $wrapper.prev();
        var $searchButton = $input.prev();
        var $lookupResult = $searchButton.prev();

        var marginLeft = $input.width()-$searchButton.width()+parseInt($input.css("padding-left"))+parseInt($input.css("padding-right"));

        var fullInputWidth = $input.width()
            +parseInt($input.css("padding-left"))
            +parseInt($input.css("padding-right"))
            -parseInt($wrapper.css("padding-left"))
            -parseInt($wrapper.css("padding-right"))
            -parseInt($ul.css('border-left-width'))
            -parseInt($ul.css('border-right-width'));
        var liContentWidth = parseInt(fullInputWidth)-23;
        $wrapper.width(fullInputWidth);

        $searchButton.css({'margin-left': marginLeft});
        $ul.width(fullInputWidth).find(".title,.attributes").width(liContentWidth);

        $ul.find('li:odd').addClass("odd");

        if ($input.is("[disabled]")){
            $ul.find("li:first").click();
        }


        var $scrollableLookup = $ul.bind('jsp-initialised',function(event, isScrollable){
                $(".jspDrag",$scrollableLookup).css("height","-=4");
                $(".jspPane",$scrollableLookup).css("width","+=11")
            }
        ).jScrollPane({
                showArrows: true,
            })

        $searchButton.click(function(){
            toggleLookUp($wrapper,$ul,undefined,$scrollableLookup);
            return false;
        })
        $(".lookup-cancel",$wrapper).click(function(){
            toggleLookUp($wrapper,$ul,"close",$scrollableLookup);
        })

        /*
         $input.focus(function(){
         toggleLookUp($wrapper,$ul,"open",$scrollableLookup);
         })
         .blur(function(){
         if ($(this).val()=='')
         toggleLookUp($wrapper,$ul,"close");
         })*/


        //Обработка ввода в инпут для фильтрации
        $input.keyup(function(event) {
            $("div.lookup .visible").removeClass("visible");

            $input = $(this);
            $data = $input.next().find("ul li");
            var flag = false;
            clearTimeout(timeoutId);
            var inputValue = $input.val()


            $data.first().removeClass("btop");
            $data.last().removeClass("bbottom");
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
        });


        //Обработка выбора элемента списка
        $("li",$ul).live('click',function(){
            selectLiItem($(this),$lookupResult,$input,$searchButton,$wrapper,$ul,$scrollableLookup)
        })


    })

    $(".add-new-lookup-result,.edit-lookup-result").live('click',function(){
        var $this = $(this);
        var $actionButton = $this;
        var $resultDiv = $actionButton.parent();
        var $lookupSearch = $resultDiv.next();
        var $input = $lookupSearch.next();
        $lookupSearch.show();
        $input.show();
        $(this).remove();

        if ($actionButton.hasClass("edit-lookup-result")){
            $resultDiv.find(".lookup-result-item").remove();
        }

        return false;
    })

    $(".lookup-result-delete-item").live("click",function(){
        $(this).parent().remove();
        return false;
    })
}
/*END lookup
 ************/

function selectLiItem($liItem,$lookupResult,$input,$searchButton,$wrapper,$ul,$scrollableLookup){

    var $newDiv = $("<div />").addClass("lookup-result-item").html($liItem.html()).appendTo($lookupResult);
    if ($lookupResult.find("div.lookup-result-item").length>1){
        var $deleteItemButton = $("<a />").addClass("lookup-result-delete-item").text("x").prependTo($newDiv);
    }
    $("a.add-new-lookup-result,a.edit-lookup-result",$lookupResult).remove();

    if ($input.attr("multiple")){
        var $link = $("#linkTmpl").tmpl([{
            "href": "#none",
            "linkClass": "add-new-lookup-result",
            "title": "Добавить"
        }]).appendTo($lookupResult);
    }else{
        var $link = $("#linkTmpl").tmpl([{
            "href": "#none",
            "linkClass": "edit-lookup-result",
            "title": "Изменить"
        }]).appendTo($lookupResult);
    }

    $input.hide().val("");
    $searchButton.hide();
    toggleLookUp($wrapper,$ul,"close",$scrollableLookup);

    if ($("#overLay")){
        $("#overLay").remove();
    }
}

function toggleLookUp($wrapper,$ul,toggle,$scrollableLookup){
    toggle=(toggle == undefined)?'toggle':toggle;
    if (!$wrapper.is(":visible") || toggle=='open'){
        $wrapper.show();
        $ul.find(".title").show();

        $ul.show().find("li").each(function(){
            if (!$(this).hasClass("hidden")){
                $(this).show();
            }
        });

        generateOverlay($wrapper,function(){
            toggleLookUp($wrapper,$ul,"close",$scrollableLookup)
        });

        $scrollableLookup.data('jsp').reinitialise();
    }else if ($wrapper.is(":visible") || toggle=='close'){
        $wrapper.hide();
        $ul.find(".title").hide();

        $ul.show().find("li").hide();
    }

    return $ul;
}