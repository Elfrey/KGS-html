$(function(){
    $(".dashboard-big-button span").each(function(){
        var $this = $(this),
            $parent = $this.parent();
        $this.height($parent.height());
        $this.width($parent.width());
    })
})