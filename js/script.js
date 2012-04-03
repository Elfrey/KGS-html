$(function(){
    /*
    * Метод, позволяющий поставить/сбросить фокус с элемента
    *
     */
    $.fn.toggleFocus = function(){
        $(this).is(":focus") ? $(this).blur() : $(this).focus();
    };
})


/**
/ FUNCTION
* getPageSize() by quirksmode.com
*
* @return Array Return an array with page width, height and window width, height
*/
function protoGetPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {	
	xScroll = window.innerWidth + window.scrollMaxX;
	yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
	xScroll = document.body.scrollWidth;
	yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
	xScroll = document.body.offsetWidth;
	yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) {	// all except Explorer
	if(document.documentElement.clientWidth){
	    windowWidth = document.documentElement.clientWidth; 
	} else {
	    windowWidth = self.innerWidth;
	}
	windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
	windowWidth = document.documentElement.clientWidth;
	windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
	windowWidth = document.body.clientWidth;
	windowHeight = document.body.clientHeight;
    }	
    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight){
	pageHeight = windowHeight;
    } else { 
	pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth){	
	pageWidth = xScroll;		
    } else {
	pageWidth = windowWidth;
    }
    arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);


	
    return arrayPageSize;
};

/*
 * Function generateOverlay()
 * @author Elfrey
 * @description генерация слоя поверх документа, при клике на который скрывается модальное окошко
 *
 * jquery object $topBlock - окно
 * function fn - действие, выполняемое при клике на слой
 */

function generateOverlay($topBlock,fn){
    var pageSize = protoGetPageSize();
    $topBlock.css("z-index","100");
    if ($("#overLay")){
	    $("#overLay").remove();
    }
	var $overLay = $('<div id="overLay" />').css({
        "z-index":"99",
        "width": pageSize[0],
        "height": pageSize[1],
        "position": "absolute",
        "left": "0",
        "top": "0"
    }).toggle().die("click").unbind("click").appendTo("body");
	
    $overLay.bind("click",function(){
        $(this).remove();
        if (fn)
            fn.call();
        return false;
    });
}
/*
 * Function showNotification()
 * @author Elfrey
 * @description функция вывода системного сообения под шапкой таблицы
 * string message - текст сообщения
 * int classIndex - индекс класса(0-синий, 1-зеленый, 2-красный)
 * jquery object $table - таблица, получатель сообщения
 *
 * Example
 * showNotification("В реестр имущества добавлен объект: <a href=\"/\">Продовольственный склад №1</a> ",1,$("#table-id"));
 *
 */
function showNotification(message,classIndex,$table){
    var noteClasses = [
        "notification-blue",
        "notification-green",
        "notification-red"
    ];
    if (typeof noteClasses == "undefined"){
        classIndex = 0;
    }
    $table.find(".notification-tr").remove();
    var $noteTr = $("<tr />").addClass("notification-tr").addClass(noteClasses[classIndex]);
    var tdCount = $table.find("tbody tr:first td").length;
    var $noteTd = $("<td />").attr("colspan",tdCount).html(message).appendTo($noteTr);
    var $closeButton = $("<a />").attr("href","#").addClass("notification-close").text("x").appendTo($noteTd);
    $noteTr.prependTo($table.find("tbody"));
}

/*
 * Function plural_str()
 * @description функция генерации строки типа "1 дверь, 2 двери, 5 дверей"
 * float i - число
 * string str1 - строка для еденичного значения (дверь)
 * string str1 - строка для значения 2-4 (двери)
 * string str1 - строка для значения 5-0 (дверей)
 *
 * Example
 * plural_str(8, "дверь", "двери", "дверей")
 */
function plural_str(i, str1, str2, str3){
    function plural (a){
	if ( a % 10 == 1 && a % 100 != 11 ) return 0
	else if ( a % 10 >= 2 && a % 10 <= 4 && ( a % 100 < 10 || a % 100 >= 20)) return 1
	else return 2;
    }

    switch (plural(i)) {
	case 0:
	    return str1;
	case 1:
	    return str2;
	default:
	    return str3;
    }
}
/*
'../libs/additional-methods.min.js',
'../libs/jquery-1.7.2.js',
'../libs/jquery-ui-1.8.16.custom.min.js',
'../libs/jquery.fixedtable.js',
'../libs/jquery.jscrollpane.min.js',
'../libs/jquery.mousewheel.js',
'../libs/jquery.selectBox.js',
'../libs/jquery.tmpl.min.js',
'../libs/jquery.ui.datepicker-ru.js',
'../libs/jquery.validate.min.js',
'../libs/php.js',
'../customSelect.js'
]);
*/


/*
 * Function generateInputIcon()
 * @description генерация иконки для инпутов
 * jquery object $input - инпут
 * string iconClass - класс иконки
 *
 * Example
 * generateInputIcon($this,"input-date");
 */
function generateInputIcon($input,iconClass){
    var $icon = $("<a />").addClass("input-icon "+iconClass).insertAfter($input);
    return false;
}

function getLineCount($block){
    var originalWidth = $block.width();
    var originalWhiteSpace = $block.css("white-space");
    var originalPosition = $block.css("position");

    $block.css({
        "white-space": "nowrap",
        "position": "absolute"
    });

    var tempWidth = $block.width();

    $block.css({
        "white-space": originalWhiteSpace,
        "position": originalPosition
    });

    if (tempWidth > originalWidth){
        return lineCount = Math.ceil(tempWidth/originalWidth);
    }
    return 1;
}

function clog(text){
    if (window.console){
        for (var i=0; i<arguments.length;i++){
            console.log(arguments[i]);
        }
    }
}

function dump(str) {
    Components.classes['@mozilla.org/consoleservice;1'].getService(
        Components.interfaces.nsIConsoleService).logStringMessage(str);
}

function dumpx(obj) {
    for (var i in obj) {
        dump (i + ' - ' + obj);
    }
}

function plural_str(i, str1, str2, str3){
    function plural (a){
        if ( a % 10 == 1 && a % 100 != 11 ) return 0
        else if ( a % 10 >= 2 && a % 10 <= 4 && ( a % 100 < 10 || a % 100 >= 20)) return 1
        else return 2;
    }

    switch (plural(i)) {
        case 0:
            return str1;
        case 1:
            return str2;
        default:
            return str3;
    }
}

$.fn.extend({
    visHide: function(){
        this.css("visibility","hidden");
        return this;
    },
    visShow: function(){
        this.css("visibility","visible");
        return this;
    }
});

function isCapslock(e){

    e = (e) ? e : window.event;

    var charCode = false;
    if (e.which) {
        charCode = e.which;
    } else if (e.keyCode) {
        charCode = e.keyCode;
    }

    var shifton = false;
    if (e.shiftKey) {
        shifton = e.shiftKey;
    } else if (e.modifiers) {
        shifton = !!(e.modifiers & 4);
    }

    if (charCode >= 97 && charCode <= 122 && shifton) {
        return true;
    }

    if (charCode >= 65 && charCode <= 90 && !shifton) {
        return true;
    }

    return false;

}

function makeFloat (value){
    return parseFloat(value
    .split(" ").join("")
    .split(",").join("."));
}


function formatFloat(_number,_decimal,_separator, _decSep) {
    var decimal=(typeof(_decimal)!='undefined')?_decimal:2;

    var separator=(typeof(_separator)!='undefined')?_separator:'';

    var r=parseFloat(_number)

    var exp10=Math.pow(10,decimal);
    r=Math.round(r*exp10)/exp10;

    rr=Number(r).toFixed(decimal).toString().split('.');


    b=rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+separator);
    r=b+'.'+rr[1];

    return r.split(".").join(_decSep);
}