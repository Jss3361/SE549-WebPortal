google.load('visualization', '1.0', { 'packages': ['corechart'] });

/*$(function () {

    $("#stockSearchField").autocomplete({
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
        select: function (event, ui) {
            log(ui.item ?
              "Selected: " + ui.item.label :
              "Nothing selected, input was " + this.value);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

});*/



function getStockQuote() {
    
    var symbol = document.getElementById("stockSearchField").value;
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22" + symbol + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    
    $.getJSON(url, function (data) {
        
        if (data.query.results.quote.Change != null && data.query.results.quote.DaysHigh != null
            && data.query.results.quote.DaysLow != null) {

            var result = "<table class='table' id='queryTable'>";
            result += "<tr><th colspan='2'>" + data.query.results.quote.Name + "</th></tr>";
            result += "<tr><td>Symbol</td><td>" + data.query.results.quote.symbol + "</td></tr>";

            var change = data.query.results.quote.Change;
            if (change.indexOf('-') == -1) {
                result += "<tr><td>Change</td><td style='color:green'>" + change
            }
            else {
                result += "<tr><td>Change</td><td style='color:red'>" + change + "</td></tr>";
            }
            result += "<tr><td>Days High</td><td>$" + data.query.results.quote.DaysHigh + "</td></tr>";
            result += "<tr><td>Days Low</td><td>$" + data.query.results.quote.DaysLow + "</td></tr>";
            result += "<tr><td>Days Range</td><td>$" + data.query.results.quote.DaysRange + "</td></tr>";
            result += "<tr><td>Volume</td><td>" + data.query.results.quote.Volume + "</td></tr>";
            result += "<tr><td>Last Trade Price</td><td>$" + data.query.results.quote.LastTradePriceOnly + "</td></tr>";
            result += "<tr><td>Year High</td><td>$" + data.query.results.quote.YearHigh + "</td></tr>";
            result += "<tr><td>Year Low</td><td>$" + data.query.results.quote.YearLow + "</td></tr></table>";

            var stockName = data.query.results.quote.Name;

            // 2009-09-11
            var today = new Date();
            var dd = today.getDate() - 4;
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = yyyy + '-' + mm + '-' + dd;

            var startDate = (yyyy - 5) + '-' + mm + '-' + dd;
            var endDate = today;

            
            var chartUrl = "http://dev.markitondemand.com/Api/Timeseries/jsonp/";
            $.ajax({
                url:chartUrl,
                dataType: "jsonp",
                data: {
                    symbol: symbol,
                    duration: 1096
                },
                success: function (data) {
                    console.log(data);
                    var preparedData = new Array();

                    var first = new Array();
                    first[0] = "x";
                    first[1] = "Closing";

                    preparedData[0] = first;


                    for (i = 0; i < data.Data.SeriesDates.length; i++) {
                        var item = new Array();

                        item[0] = data.Data.SeriesDates[i];
                        item[1] = parseFloat(data.Data.Series.close.values[i]);

                        
                        preparedData[i + 1] = item;
                    }
                    console.log(preparedData);

                    // Create the chart
                    var data = google.visualization.arrayToDataTable(preparedData);

                    new google.visualization.LineChart(document.getElementById("graphDiv")).draw(
                            data, {
                                curveType: "function",
                                width: 647,
                                height: 370,
                                title: stockName + ' - History for Past 5 Years'
                            }
                        );
                }
            });


            $("#resultsDiv").html(result);
            
        }
        else {
            var result = "<h4 class='noQuote'>Symbol invalid.  Please enter a valid stock symbol</h4>";
            $("#resultsDiv").html(result);
        }
    });
}

function getStockQuoteOnHome() {
    var symbol = document.getElementById("homeStockSearchField").value;
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22" + symbol + "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="

    $.getJSON(url, function (data) {

        if (data.query.results.quote.Change != null && data.query.results.quote.DaysHigh != null
            && data.query.results.quote.DaysLow != null) {

            var result = "<table class='table' id='quoteTable'>";
            result += "<tr><th colspan='2'>" + data.query.results.quote.Name + "</th></tr>";
            result += "<tr><td>Symbol</td><td>" + data.query.results.quote.symbol + "</td></tr>";
            result += "<tr><td>Change</td><td>" + data.query.results.quote.Change + "</td></tr>";
            result += "<tr><td>Days High</td><td>" + data.query.results.quote.DaysHigh + "</td></tr>";
            result += "<tr><td>Days Low</td><td>" + data.query.results.quote.DaysLow + "</td></tr>";
            result += "<tr><td>Days Range</td><td>" + data.query.results.quote.DaysRange + "</td></tr>";
            result += "<tr><td>Volume</td><td>" + data.query.results.quote.Volume + "</td></tr>";
            result += "<tr><td>Last Trade Price</td><td>" + data.query.results.quote.LastTradePriceOnly + "</td></tr>";
            result += "<tr><td>Year High</td><td>" + data.query.results.quote.YearHigh + "</td></tr>";
            result += "<tr><td>Year Low</td><td>" + data.query.results.quote.YearLow + "</td></tr></table>";

            var stockName = data.query.results.quote.Name;

            var chartUrl = "http://dev.markitondemand.com/Api/Timeseries/jsonp/";
            $.ajax({
                url: chartUrl,
                dataType: "jsonp",
                data: {
                    symbol: symbol,
                    duration: 365
                },
                success: function (data) {
                    console.log(data);
                    var preparedData = new Array();

                    var first = new Array();
                    first[0] = "x";
                    first[1] = "Closing";

                    preparedData[0] = first;


                    for (i = 0; i < data.Data.SeriesDates.length; i++) {
                        var item = new Array();

                        item[0] = data.Data.SeriesDates[i];
                        item[1] = parseFloat(data.Data.Series.close.values[i]);


                        preparedData[i + 1] = item;
                    }
                    console.log(preparedData);

                    // Create the chart
                    var data = google.visualization.arrayToDataTable(preparedData);

                    new google.visualization.LineChart(document.getElementById("stockChartDiv")).draw(
                            data, {
                                curveType: "function",
                                width: 375,
                                height: 300,
                                title: stockName + ' - History for Past Year',
                                legend: {position:'none'}
                            }
                        );
                }
            });

            $("#stockQuoteDiv").html(result);
        }
        else {
            var result = "<h5 class='noQuote'>Symbol invalid.  Please enter a valid stock symbol</h5>";
            $("#stockQuoteDiv").html(result);
        }
    });

}

   


