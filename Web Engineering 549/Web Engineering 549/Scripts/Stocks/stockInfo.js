google.load('visualization', '1.0', { 'packages': ['corechart'] });

function getStockQuote() {
    var symbol = symbolParam;
    var url = "http://dev.markitondemand.com/Api/Quote/jsonp/";
    $.ajax({
        url: url,
        dataType: "jsonp",
        data: {
            symbol: symbol
        },
        success: function (data) {
            if (typeof data.Data != "undefined") {

                var result = "";
                result += "<h3 id='stockName'>" + data.Data.Name + "</h3>";
                result += "<p id=\"stockControls\"><input type=\"submit\" value=\"Buy Stock\" class=\"btn btn-primary\" id=\"buyStockButton\" onclick=\"buyStock()\"></p>";

                result += "<table class='table' id='queryTable'>";
                result += "<tr><td>Symbol</td><td id='tickerSymbol'>" + data.Data.Symbol + "</td></tr>";

                var change = data.Data.Change + "";
                if (change.indexOf("-") == -1) {
                    result += "<tr><td>Change</td><td style='color:green'>" + parseFloat(data.Data.Change).toFixed(2) + "</td></tr>";
                }
                else {
                    result += "<tr><td>Change</td><td style='color:red'>" + parseFloat(data.Data.Change).toFixed(2) + "</td></tr>";
                }
                result += "<tr><td>Change Percent</td><td>" + parseFloat(data.Data.ChangePercent).toFixed(2) + "</td></tr>";
                result += "<tr><td>Last Price</td><td id='currentPrice'>$" + parseFloat(data.Data.LastPrice).toFixed(2) + "</td></tr>";
                result += "<tr><td>Open</td><td>$" + parseFloat(data.Data.Open).toFixed(2) + "</td></tr>";
                result += "<tr><td>Days High</td><td>$" + parseFloat(data.Data.High).toFixed(2) + "</td></tr>";
                result += "<tr><td>Days Low</td><td>$" + parseFloat(data.Data.Low).toFixed(2) + "</td></tr>";
                result += "<tr><td>Volume</td><td>" + commaSeparateNumber(data.Data.Volume) + "</td></tr>";
                result += "<tr><td>Market Cap YTD</td><td>" + commaSeparateNumber(data.Data.MarketCap) + "</td></tr>";

                var stockName = data.Data.Name;

                var chartUrl = "http://dev.markitondemand.com/Api/Timeseries/jsonp/";
                $.ajax({
                    url: chartUrl,
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

                        new google.visualization.LineChart(document.getElementById("chartDiv")).draw(
                                data, {
                                    curveType: "function",
                                    height: 500,
                                    title: stockName + ' - History for Past 3 Years'
                                }
                            );
                    },
                    error: function () {
                        $("chartDiv").html("<h4 class='noChart'>No Chart Available for - " + stockName + "</h4>");
                    }
                });


                $("#resultsDiv").html(result);
            }
            else {
                $("#resultsDiv").html("<h4 class='noResultMessage'>No Data Available for " + symbol + "</h4><a href='/Stocks/Stocks'><< Back</a>");
                $("#chartDiv").html("");
                $("#commentDiv").html("");
            }
        },
            error: function () {
                $("chartDiv").html("<h4 class='noChart'>No Chart Available for - " + stockName + "</h4>");
            }
        
    });

}


function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}


function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

function buyStock(stock) {
        console.log("stock = " + stock);

        if (typeof stock == 'undefined') {
            var symbol = document.getElementById("tickerSymbol").textContent;
            var name = document.getElementById("stockName").textContent;
            var price = document.getElementById("currentPrice").textContent;
        }
        else {
            var tableRow = $("#ownedStocksTable").find("tr").eq(stock + 1);
            var data = tableRow[0].childNodes;

            var symbol = data[1].textContent;
            var name = data[0].textContent;
            var price = data[3].textContent;
        }

        $("#buyStockForm").css("display", "inline");
        $("#validateTips").css("display", "inline");

        $("#nameOfStock").attr("value", name).attr("readonly",true);
        $("#ticker").attr("value",symbol).attr("readonly",true);
        $("#stockPrice").attr("value",price).attr("readonly",true);

        $("#stockTrans").dialog({
            resizable: false,
            width:250,
            modal: true,
            buttons: {
                "Purchase": function () {
                    if (validateQuantity($("#quantityToBuy").val())) {
                        var quantity = $("#quantityToBuy").val();
                        $(this).dialog("close");
                        purchaseStock(symbol, name, price, quantity);
                        $("#quantityToBuy").val("");
                        document.getElementsByTagName("body")[0].removeChild(document.getElementById("stockTrans"));
                    }
                    else {
                        alert("invalid quantity");
                    }
                

                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
   
}


function validateQuantity(quantity) {
    console.log("quantity = " + quantity);
    var pattern = /^\d+$/i;

    if (quantity.length > 0 && parseInt(quantity) > 0 && quantity.match(pattern)) {
        return true;
    }
    else {
        return false;
    }

}


function purchaseStock(symbol, name, price, quantity) {
    price = price.replace("$", "");
    console.log("purchasing stock");
    $.ajax({
        url: '/Stocks/SaveBuyTransaction',
        data: {
            stockName: name,
            stockTicker: symbol,
            quantity: quantity,
            rate: price
        },
        type: "post",
        success: function () {
            window.location.href = "/Stocks/StocksOwned";
        }
    });
}
