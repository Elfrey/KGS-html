/**
 * @author Elfrey
 * @date 21-11.2011
 * @project KGS
 * @dependencies jQuery
 * @description Расширение возможностей таблицы(фиксированный хедер, первая колонка[, сортировка])
 * 
 */

(function($) {
    $.fn.extTable = function(opts) {
	var options = $.extend({}, $.fn.extTable.defaults, opts); //мержим опции
	var $table = $(this); // таблица, с которой мы работаем
	
	var $firstTh = $("th:first",$table)
	var firstTdWidth = parseInt($firstTh.width())+parseInt($firstTh.css("padding-left"))+parseInt($firstTh.css("padding-right"));
	
	
	var $tableWrapper = $("<div />") //враппер таблицы
	    .addClass("scrollable-table-wrapper")
	    .insertAfter($table)
	    .css({
		width: options.maxWidth
	    });
	
	var $tHeadFull = $("<div />").addClass("thead-wrapper-fixed").append("<table />").css("width",$table.width());
	$tHeadFull.prependTo($tableWrapper);
	
	$("table",$tHeadFull).append($("thead",$table)).attr("class",$table.attr("class"));
	
	
	var $firstTableTr = $("tbody tr:first",$table);
	$("th",$tHeadFull).each(function(index){
	    var td = $firstTableTr.find("td").get(index);

	    $(this).css({
		//display: block,
		//width: $(td).width()
	    });
	})
	
	
	
	    
	$table.remove().appendTo($tableWrapper);
    };
})(jQuery);