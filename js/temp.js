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

    /*
    $("tr[action-href-edit!='']").attr("action-href-edit","element.html");
    $("tr[action-href-note!='']").attr("action-href-note","element.html");
    $("tr[action-href-delete!='']").attr("action-href-delete","element.html");
    */
});



