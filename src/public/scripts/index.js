$(function(){
    $(".dropdown-menu li a").click(function(){
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val(convertToSlug($(this).text()));
    });

});


function convertToSlug(value) {
    return value
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}
