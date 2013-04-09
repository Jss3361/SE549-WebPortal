/*(function() {

    if ('jQuery' in window) loadAutocomplete();
    else {
        var t = setInterval(function() { // Run poller
            if ('jQuery' in window) {
                loadAutocomplete();
                clearInterval(t);        // Stop poller
            }
        }, 50);
    }
})();


function loadAutocomplete() {
    console.log($(".searchField"));
    $(".searchField").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://dev.markitondemand.com/Api/Lookup/jsonp/",
                dataType: "jsonp",
                data: {
                    input: request.term
                },
                success: function (data) {
                    console.log(data);
                    response($.map(data, function (item) {
                        return {
                            label: item.Name + ',' + item.Symbol + ', ' + item.Exchange,
                            value: item.Symbol
                        }
                    }));
                }
            });
        },
        minLength: 2,
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });


}*/