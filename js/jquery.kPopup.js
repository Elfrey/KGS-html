/**
 * User: Elfrey
 * Date: 26.01.12
 * To change this template use File | Settings | File Templates.
 * extMethods:
 *
 * init - plugin initialisation
 * generatePopup - generatePopup
 * showPopup - show generated popup
 * showOverlay - renegate and show overlay, is "useOverlay" is active
 * afterOpenCallback - method is called after popup show
 * close - method for checking capabilities for closing popup
 * removePopup - remove popup and overlay, if it's active
 *
 * @TODO Надо доделать плагин, чтобы при вызове плагина создавался новый экземпляр, а при закрытии закрывался только последний
 *
 */
if (typeof Object.create !== 'function'){
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


if (jQuery) (function ($) {


	/*var P = $.kPopup = function () {
            P.init.apply( this, arguments );
        };
    */
    var P = $.kPopup = function(){

    };

    $.extend(P,{

        defaults: {
            autoOpen: false,
            active:false, //Activity flag
            container: "body", //Popup container
            after: true, //Adding popup to end of container
            item:"<div />", //item,
            newItem: false, //item clone for work
            openerClass:"popup-opener", //open button class
            class:"popup", //Popup class
            itemData:"", //html content of container
            itemUrl: false, //ajax link content of countainer
            useOverlay: false, //use overlay
            hideOnDocumentClick: true,
            overlay: false, //@TODO remove that
            guid: 0, //GUID
            button: false, //opener button
            "styles":{
                "position":"absolute"
            }, ///Popup styles
            overlayStyles: {
                position: "absolute",
                top: "0",
                left: "0",
                backgroundColor: "#000",
                opacity: 0.7,
                zIndex: 100
            }, //Overlay styles
            afterOpenCallback: false, //callback function after open popup
            afterOpenCallbackParams: false, //params of that
            afterCloseCallback: false, //callback function after open popup
            afterCloseCallbackParams: false, //params of that
            ajaxStarted: false //flag for correctly ajax working

        },

        init: function (button,params) {
            var styles = $.extend({}, P.defaults.styles, params.styles);

            P.options = $.extend({}, P.defaults, params);

            if (!P.options.button){
                P.options.button = $(button);
            }
            P.options.guid = $.guid++;

            if ($("."+P.options.class+":visible").length>0){
                $("."+P.options.class+":visible").each(function(){
                    P.options.newItem = $(this);
                    P.removePopup(P.options);
                })

            }

            if (!P.options.button.hasClass(P.options.openerClass)){
                P.options.button.addClass(P.options.openerClass)
            }

            P.options.styles = styles;



            if (!P.options.active){
                P.options.active = true;
                changed = false;

                P.generatePopup(P.options);
                P.showPopup(P.options);

                if (P.options.useOverlay){
                    P.options.overlay = P.showOverlay(P.options);
                }
            }
        },

        generatePopup: function(){
            if (P.options.newItem){
                P.options.newItem = false;
            }



            P.options.newItem = $(P.options.item);
            P.options.newItem.data("guid",P.options.guid);
            P.options.button.data("guid",P.options.guid);

            P.options
                .newItem
                .addClass(P.options.class)
                .appendTo("body")
                .css(P.options.styles)
                .hide();




            if (P.options.itemData){
                P.options.newItem.html(P.options.itemData);
            }

            if (P.options.itemUrl){
                P.options.newItem.ajaxStart(function(){
                    P.options.ajaxStarted = true;

                });

                $.get(P.options.itemUrl,function(data){
                        P.options.newItem.append($(data).clone());
                    },
                    "html");
                P.options.newItem.ajaxComplete(function(){
                    P.options.ajaxStarted = false;

                });
            }
        },

        showPopup: function(){
            if (P.options.after){
                P.options.newItem.appendTo(P.options.container);
            }else{
                P.options.newItem.prependTo(P.options.container);
            }
            var top,left;

            if (P.options.container == "body"){
                left = ($(document).width()-P.options.newItem.width())/2;
                top = $(window).scrollTop()+50;
            }else{
                left = ($(P.options.container).width()-P.options.newItem.width())/2;
                top = 50;
            }


            top = P.options.styles.top ? P.options.styles.top : top;
            left = P.options.styles.left ? P.options.styles.left : left;
            /*if (P.options.styles.top){
                top = P.options.styles.top;
            }*/
            /*if (P.options.styles.left){
                left = P.options.styles.left;
            }*/

            P.options.newItem
                .css({
                top: top,
                left: left
            })
                .show();

            if (P.options.afterOpenCallback){
                P.afterOpenCallback(P.options);
            }
        },

        showOverlay: function(){
            if (!P.options.popupOverlayActive){
                var $overlay = $("<div />")
                    .attr("id","popupOverlay").hide().appendTo("body")
                    .css(P.options.overlayStyles)
                    .css({
                        width: $(document).width(),
                        height: $(document).height()
                    })
                    .show();

                if (P.options.styles["z-index"] == undefined && P.options.styles.zIndex == undefined){
                    P.options.newItem.css("z-index",101);
                }
                P.options.popupOverlayActive = true;
                return $overlay;
            }else{
                return false;
            }
        },

        afterOpenCallback: function(){
            if (P.options.ajaxStarted){
                P.options.newItem.ajaxComplete(function(){
                    P.options.afterOpenCallback.call(P.options.afterOpenCallbackParams,P.options.newItem);
                    P.options.ajaxStarted = false;
                });
            }else{
                P.options.afterOpenCallback.call(P.options.afterOpenCallbackParams,P.options.newItem,P.options);
            }
        },

        afterCloseCallback: function(){
            if (P.options.ajaxStarted){
                P.options.newItem.ajaxComplete(function(){
                    P.options.afterCloseCallback.call(P.options.afterCloseCallbackParams,P.options.newItem);
                    P.options.ajaxStarted = false;
                });
            }else{
                P.options.afterCloseCallback.call(P.options.afterCloseCallbackParams,P.options.newItem,P.options);
            }
        },

        close: function(e){
            if (P.options.active
                    && $(e.target).data("guid") != P.options.guid
                    && $(e.target).parents("." + P.options.class).data("guid") != P.options.guid
                ) {
                P.removePopup();
            }
        },

        removePopup: function(){
            P.options.newItem.hide().remove();
            P.options.active = false;
            if (P.options.useOverlay) {
                P.options.overlay.remove();
                P.options.overlay = false;
                P.options.popupOverlayActive = false;
            }
            $(document).off(".kPopup_"+P.options.guid);

            if (P.options.afterCloseCallback){
                P.afterCloseCallback(P.options);
            }
            if (P.oldOptions && P.oldOptions.length>0){
                P.options = P.oldOptions.pop();
            }
        }
    });

	$.fn.kPopup = function (params,button) {

        if (!params.autoOpen){
            $(this).bind("click.kPopup",function(event){
                event.preventDefault();

                if (P.options && P.options.active){
                    if (!P.oldOptions){
                        P.oldOptions = [];
                    }
                    P.oldOptions[P.options.guid] = P.options;
                }


                P.init(this,params);

                if (P.options.hideOnDocumentClick){
                    $(document).bind("click.kPopup_"+P.options.guid,function (e) {
                        P.close(e);
                    });
                }

                return P.options.newItem;
            });
        } else{
            if (P.options && P.options.active){
                if (!P.oldOptions){
                    P.oldOptions = [];
                }
                P.oldOptions[P.options.guid] = P.options;
            }


            P.init(this,params);

            if (P.options.hideOnDocumentClick){
                $(document).bind("click.kPopup_"+P.options.guid,function (e) {
                    P.close(e);
                });
            }
        }


	};
})(jQuery);