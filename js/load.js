/**
 * Created by JetBrains WebStorm.
 * User: Elfrey
 * Date: 09.04.12
 * Time: 9:19
 */
//@TODO scriptPath задается перед вызовом этого файла, если же не указан, то путь идет от корня
if (scriptPath == undefined){
    var scriptPath = "/";
}
var loads = [
    scriptPath+"js/libs/php.js",
    scriptPath+"js/libs/jquery-1.7.2.js",
    scriptPath+"js/libs/jquery-ui-1.8.16.custom.min.js",
    scriptPath+"js/libs/jquery.ui.datepicker-ru.js",
    scriptPath+"js/libs/jquery-ui-timepicker-addon.js",
    scriptPath+"js/libs/jquery.tmpl.min.js",
    scriptPath+"js/libs/jquery.selectBox.js",
    scriptPath+"js/libs/jquery.mousewheel.js",
    scriptPath+"js/libs/jquery.validate.min.js",
    scriptPath+"js/libs/additional-methods.min.js",
    scriptPath+"js/libs/jquery.uniform.min.js",
    scriptPath+"js/libs/capslock.jquery.js",
    scriptPath+"js/libs/jquery.scrollTo.js",

    scriptPath+"js/temp.js",//@TODO временный файл
    scriptPath+"js/dashboard.js",
    scriptPath+"js/script.js",
    scriptPath+"js/jquery.kPopup.js",
    scriptPath+"js/customSelect.js",
    scriptPath+"js/tableActions.js",
    scriptPath+"js/custom.checkbox.js",
    scriptPath+"js/input.date.js",
    scriptPath+"js/input.time.js",
    scriptPath+"js/lookup.js",
    scriptPath+"js/element.js",
    scriptPath+"js/addTableItems.js",
    scriptPath+"js/validation.js",
    scriptPath+"js/calendar.js",
    scriptPath+"js/login.js",
    scriptPath+"js/search.js",
];

yepnope({
    load: loads,
    callback: function (url, result, key) {//@TODO отрубить вывод в консоль в продакшн версии

       // console.log(url+" loaded");
    }
});

