$(document).ready(function () {
    $("#stockSearch").click(function () {
        if ($("#stockSearchField").val() === "") {
            if ($("#stockSearchError").length > 0) return false;
            $(this).parent().before('<div id="stockSearchError" class="alert alert-error"><a class="close" data-dismiss="alert">&times;</a>Please enter a valid stock symbol.</div>');
            return false;
        }
    });
});