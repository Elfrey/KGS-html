/**
 * @description валидация полей
 * Для игнорирования валидации использовать класс ignore-validation
 */
/*
@TODO Доделать валидацию таблиц, но это надо будет согласовать с легионом, что именно надо проверять и как они будут передавать таблицу
@TODO доделать хинты для сообщений об обшибках валидации
 */
$(function(){

    var $errorCountTemplate = $('<script id="errorCountTemplate" type="text/x-jquery-tmpl">' +
        '<div class="element-messages-validation-error">' +
        'Для сохранения необходимо правильно заполнить: ' +
        '<br /><br />' +
        '<a href="#">${count} ${word}</a>' +
        '</div>' +
        '</script>');

    var showErrorBlock = function(eSize){
        $(".element-messages-validation-error").remove();
        if (eSize>0){
            var sizeWord = plural_str(eSize,"поле","поля","полей"),
                $errorBlock = $errorCountTemplate.tmpl({count: eSize, word: sizeWord});
            $errorBlock.insertAfter(".element-actions-list");
        }
    };

    $(".element-messages a").live("click",function(event){
        event.preventDefault();

        var $input = $("input.error:first"),
            pos = $input.position();
        //$input.focus();
        $.scrollTo(pos.top+50);
        console.log($input);
    });

    var validator = $("#main_form").validate({
        debug: true,
        messages: validateErrorMessages,
        errorElement: 'span',
        wrapper: "hintcontainer",
        ignore: ".ignore-validation",
        onfocusout: function(input, event){
            var eSize = validator.numberOfInvalids();
            showErrorBlock(eSize)
        },
        invalidHandler: function(){
            var eSize = validator.numberOfInvalids();
            showErrorBlock(eSize)
        },
        showErrors: function(errorMap, errorList){
            var elements = $(this.currentElements);

            this.defaultShowErrors();
            this.toShow.hide();
            elements.each(function(){
                var $item = $(this),
                    $parent = $item.parents(".element-field"),
                    $label = $parent.children(".element-label");
                $parent.addClass("validation-error");
            })
        }
    });

    $(".bottom-apply-green-button.green-button, .left-apply-green-button").live("click",function(event){
        event.preventDefault();
        $("#main_form").submit();
        return false;
    });


    //$("#main_form").trigger("submit");
});


var validateErrorMessages = {
    field_1: "Какой-то текст 1",
    field_2: "Какой-то текст 2",
    field_3: "Какой-то текст 3",
    field_4: "Какой-то текст 4",
    field_5: "Какой-то текст 5",
    field_6: "Какой-то текст 6",
    field_7: "Какой-то текст 7"
};