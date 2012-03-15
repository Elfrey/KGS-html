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
        /*
        $("input, select").each(function(){
            $(this).attr("disabled","disabled");
        });
        */
        $("#header").addClass("document-header");
    }
    $(".breadcrumb, .quickaccess").remove();
})



