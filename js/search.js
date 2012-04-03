$(function(){
    var $itemCont = $(".ext-search-content"),
        searchItemSetmplate = '<script id="attrLinkListTmpl" type="text/x-jquery-tmpl">' +
        '<div class="search-item">' +
        '   <a href="#remove" class="search-item-delete">x</a>' +
        '' +
        '       <div class="search-item-field">' +
        '           <select name="search_field[]" class="selectBox select-editable">' +
        '               <option data-type="text">Наименовани</option>' +
        '               <option data-type="list">Балансодержатель</option>' +
        '               <option data-type="select">Акт приема-передачи</option>' +
        '               <option >Дата последнего изменения</option>' +
        '           </select>' +
        '       </div>' +
        '       <div class="search-item-action">' +
        '           <select name="action[]" class="selectBox select-editable">' +
        '               <option>=</option>' +
        '               <option>></option>' +
        '               <option><</option>' +
        '               <option>>=</option>' +
        '               <option><=</option>' +
        '               <option>==</option>' +
        '           </select>' +
        '       </div>' +
        '' +
        '       <div class="search-item-value">' +
        '           <input type="text" class="search-item-value-input" />' +
        '       </div>' +
        '       <br class="clear" />' +
        '   </div>' +
        '</sctipt>';

    $("#show-all-ext-search-params").on("change",function(){
        if ($(this).attr("checked")){
            $(".ext-search-params ul input[type=checkbox]").attr("checked",true);
            $.uniform.update();
        }else{
            $(".ext-search-params ul input[type=checkbox]").removeAttr("checked",true);
            $.uniform.update();
        }
    });

    $(".ext-search-add a").on("click",function(event){
        event.preventDefault();
        var $newItem = $(searchItemSetmplate).tmpl();

        $newItem.find("select").selectBox();

        $newItem.appendTo($itemCont);
    });

    $(".search-item-delete").live("click",function(event){
        event.preventDefault();
        var $item = $(this).parent();

        $item.animate({
            height: "toggle"
        },function(){
            $(this).remove();
        })
    })
});