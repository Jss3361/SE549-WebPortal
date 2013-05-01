$(function () {
    console.log($("#homeStockSearchField"));

    $("#homeStockSearchField").autocomplete({
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
});