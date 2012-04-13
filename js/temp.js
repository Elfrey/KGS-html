$(function(){
    $(".data-edit-a, .data-delete-a, .data-note-a").live("click",function(){
        var indexByClass = {
            "data-note-a": 0,
            "data-edit-a": 1,
            "data-delete-a": 2
        }
        var $table = $(this).parentsUntil("table").parent();
        var classIndex = indexByClass[$(this).attr("class")];
        showNotification("В реестр имущества добавлен объект: <a href=\"/\">Продовольственный склад №"+classIndex+"</a> ",classIndex,$table);
        return false;
    });


    if (window.location.href.indexOf("element.html")>=0){


        /*$("input, select").each(function(){
            $(this).attr("disabled","disabled").addClass("disabled");
        });*/

        $("div.element-field input[type=text]").addClass("required").parents(".element-field").addClass("required");

        $("#header").addClass("document-header");
    }
    $(".breadcrumb, .quickaccess").remove();



    $(".elemet-left-apply-button").on("click",function(e){
        e.preventDefault();
        document.location = "table.html";
    });

    /* Ссылки
    $("tr[action-href-edit!='']").attr("action-href-edit","element.html");
    $("tr[action-href-note!='']").attr("action-href-note","element.html");
    $("tr[action-href-delete!='']").attr("action-href-delete","element.html");
    */
});





/**
 * @author Elfrey
 * @date 10-11.2011
 * @project KGS
 * @dependencies jQuery, jquery.tmpl.min.js, jquery.jscrollpane.min.js, jquery.mousewheel.js, jquery.selectBox.js
 *
 */
/*
$(function(){
    if ($(".lookup")){

        var $linkTmpl = $('<script id="linkTmpl" type="text/x-jquery-tmpl"><a href="${href}" class="${linkClass}" title="${title}">${title}</a></script>').appendTo("body");

        function lookupFilter(selector, query) {
            query	=	$.trim(query); //trim white space
            query = query.replace(/ /gi, '|'); //add OR for regex query

            $data.each(function() {
                if ($(this).is("[title]"))
                    ($(this).attr("title").search(new RegExp(query, "i")) < 0) ? $(this).hide().addClass("hidden") : $(this).show();
                else
                    $(this).show();
            });
        }//filter



        var timeoutId = 0;
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


            //ааБбаАаБаОбаКаА аВбаБаОбаА баЛаЕаМаЕаНбаА баПаИбаКаА
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
})

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
            "title": "ааОаБаАаВаИбб"
        }]).appendTo($lookupResult);
    }else{
        var $link = $("#linkTmpl").tmpl([{
            "href": "#none",
            "linkClass": "edit-lookup-result",
            "title": "ааЗаМаЕаНаИбб"
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
*/