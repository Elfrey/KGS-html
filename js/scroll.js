/**
 * © css-tricks.com
 * http://css-tricks.com/snippets/jquery/persistant-headers-on-tables/
 */

$(function(){
    var $clonedHeaderRow,
        whereToFix = "table",
        whatToFix = "thead",
        fixedClass = "floatingHeader";

    $(whereToFix).each(function() {
        $clonedHeaderRow = $(whatToFix, this);
        $clonedHeaderRow.find("th").each(function(){
            var $this = $(this)
                width = $this.width();
            $this.css("width",width);

        }).end()
            .before($clonedHeaderRow.clone())
            .css("width", $clonedHeaderRow.width())
            .addClass(fixedClass);

    });

    $(window)
        .scroll(UpdateTableHeaders)
        .trigger("scroll");
})