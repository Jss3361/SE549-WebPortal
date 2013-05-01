google.load('visualization', '1.0', { 'packages': ['corechart'] });

/*$(document).ready(function () {
    loadMyStocks();
});
*/

function loadMyStocks() {
    $.ajax({
        url: '/Stocks/GetAllTransactions',
        dataType: "json",
        type: "post",
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                updateCurrentStockTable(data);
            }
        }
    });

    function loadStockTransactions() {
        $.ajax({
            url: '/Stocks/GetAllTransactions',
            dataType: "json",
            type: "post",
            success: function (data) {
                if (data.length > 0) {
                    displayTransactions(data);
                }
                else {
                    $("#stockTransactionsDiv").html("<h3 class='no-transactions-message'>No Transactions Currently Saved</h3>");
                }
            }
        });
    }

    function displayTransactions(data) {
        var table = document.createElement("table");
        table.setAttribute("id", "stockTransactionsTable");
     

        var headerRow = document.createElement("tr");

        var transactionType = document.createElement("th");
        transactionType.appendChild(document.createTextNode("Transaction Type"));

        var stockName = document.createElement("th");
        stockName.appendChild(document.createTextNode("Stock Name"));

        var stockSymbol = document.createElement("th");
        stockSymbol.appendChild(document.createTextNode("Ticker Symbol"));

        var quantityOwned = document.createElement("th");
        quantityOwned.appendChild(document.createTextNode("Quantity Owned"));

        var price = document.createElement("th");
        price.appendChild(document.createTextNode("Transaction Price"));

        var transactionDate = document.createElement("th");
        transactionDate.appendChild(document.createTextNode("Transaction Date/Time"));

        headerRow.appendChild(transactionType);
        headerRow.appendChild(stockName);
        headerRow.appendChild(stockSymbol);
        headerRow.appendChild(quantityOwned);
        headerRow.appendChild(price);
        headerRow.appendChild(transactionDate);


        table.appendChild(headerRow);

        for (var i = 0; i < data.length; i++) {
            console.log(data[i].Stock_Name);

            var currentRow = document.createElement("tr");

            var name = document.createElement("td");
            name.appendChild(document.createTextNode(data[i].Stock_Name));

            var symbol = document.createElement("td");
            symbol.appendChild(document.createTextNode(data[i].Ticker_Symbol));

            var quantity = document.createElement("td");
            quantity.appendChild(document.createTextNode(data[i].Quantity));

            var transPrice = data[i].Rate;

            if (transPrice.indexOf("-") == -1){
                var type = document.createElement("td");
                type.appendChild(document.createTextNode("Buy"));
            }
            else{
                var type = document.createElement("td");
                type.appendChild(document.createTextNode("Sell"));
            }

            transPrice.replace("-","");
            
            var rate = document.createElement("td");
            rate.appendChild(document.createTextNode("$" + transPrice));

            var date = document.createElement("td");
            date.appendChild(document.createTextNode(data[i].Timestamp));

            currentRow.appendChild(type);
            currentRow.appendChild(name);
            currentRow.appendChild(symbol);
            currentRow.appendChild(quantity);
            currentRow.appendChild(rate);
            currentRow.appendChild(date);

            table.appendChild(currentRow);
        }
        $("#stockTransactionsDiv").html("");
        document.getElementById("stockTransactionsDiv").appendChild(table);
    }
}

function updateCurrentStockTable(data) {
    var table = document.createElement("table");
    table.setAttribute("id","ownedStocksTable");

    var headerRow = document.createElement("tr");

    var stockName = document.createElement("th");
    stockName.appendChild(document.createTextNode("Stock Name"));

    var stockSymbol = document.createElement("th");
    stockSymbol.appendChild(document.createTextNode("Ticker Symbol"));

    var quantityOwned = document.createElement("th");
    quantityOwned.appendChild(document.createTextNode("Quantity Owned"));

    var lastRate = document.createElement("th");
    lastRate.appendChild(document.createTextNode("Last Price"));

    var buyHeader = document.createElement("th");
    var sellHeader = document.createElement("th");
    var commentHeader = document.createElement("th");

    headerRow.appendChild(stockName);
    headerRow.appendChild(stockSymbol);
    headerRow.appendChild(quantityOwned);
    headerRow.appendChild(lastRate);
    headerRow.appendChild(buyHeader);
    headerRow.appendChild(sellHeader);
    headerRow.appendChild(commentHeader);

    table.appendChild(headerRow);

    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Stock_Name);

        var currentRow = document.createElement("tr");

        var name = document.createElement("td");
        name.appendChild(document.createTextNode(data[i].Stock_Name));

        var symbol = document.createElement("td");
        symbol.appendChild(document.createTextNode(data[i].Ticker_Symbol));

        var quantity = document.createElement("td");
        quantity.appendChild(document.createTextNode(data[i].Quantity));

        var rate = document.createElement("td");
        rate.appendChild(document.createTextNode("$" + data[i].Rate));

        var buyCell = document.createElement("td");

        var buy = document.createElement("a");
        buy.setAttribute("onclick", "buyStock(" + (i + 1) + ")");
        buy.appendChild(document.createTextNode("Buy"));

        buyCell.appendChild(buy);

        var sellCell = document.createElement("td");

        var sell = document.createElement("a");
        sell.setAttribute("onclick", "sellStock(" + (i + 1)  + ")");
        sell.appendChild(document.createTextNode("Sell"));

        sellCell.appendChild(sell);

        var commentCell = document.createElement("td");
        
        var comment = document.createElement("a");
        comment.setAttribute("onclick", "commentStock(" + (i + 1) + ")");
        comment.appendChild(document.createTextNode("Comment"));

        commentCell.appendChild(comment);

        currentRow.appendChild(name);
        currentRow.appendChild(symbol);
        currentRow.appendChild(quantity);
        currentRow.appendChild(rate);
        currentRow.appendChild(buyCell);
        currentRow.appendChild(sellCell);
        currentRow.appendChild(commentCell);

        table.appendChild(currentRow);
    }
    $("#ownedStocksDiv").html("");
    document.getElementById("ownedStocksDiv").appendChild(table);
}

function sellStock(row) {
    console.log("row number = " + row);

    var tableRow = $("#ownedStocksTable").find("tr").eq(row + 1);
    console.log(tableRow);
    var data = tableRow[0].childNodes;
    
    var name = data[0].textContent;
    var symbol = data[1].textContent;
    var price = data[3].textContent;
    var currentQuantity = data[2].textContent;
    
    $("#buyStockForm").css("display", "inline");
    $("#validateTips").css("display", "inline");

    $("#nameOfStock").attr("value", name).attr("readonly", true);
    $("#ticker").attr("value", symbol).attr("readonly", true);
    $("#stockPrice").attr("value", price).attr("readonly", true);

    $("#stockTrans").dialog({
        resizable: false,
        width: 250,
        modal: true,
        buttons: {
            "Sell": function () {
                if (validateSellQuantity($("#quantityToBuy").val(),currentQuantity)) {
                    var quantity = $("#quantityToBuy").val();
                    $(this).dialog("close");
                    sellOffStock(symbol, name, price, quantity);
                    document.getElementsByTagName("body").removeChild(document.getElementById("stockTrans"));
                }
                else {
                    alert("invalid quantity or you are trying to sell more stock than you own");
                }


            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
}



    function commentStock(row) {
        console.log("row number = " + row);
    }


    function getStockQuote() {
    
        var symbol = document.getElementById("stockSearchField").value;
        var url = "http://dev.markitondemand.com/Api/Quote/jsonp/";
        $.ajax({
            url: url,
            dataType: "jsonp",
            data: {
                symbol: symbol
            },
            success: function (data) {
                console.log(data.Data);
            
                var result = "<table class='table' id='queryTable'>";
                result += "<tr><th colspan='2' id='stockName'>" + data.Data.Name + "</th></tr>";
                result += "<tr><td>Symbol</td><td id='tickerSymbol'>" + data.Data.Symbol + "</td></tr>";

                var change = data.Data.Change + "";
                if (change.indexOf("-") == -1) {
                    result += "<tr><td>Change</td><td style='color:green'>" + data.Data.Change + "</td></tr>";
                }
                else {
                    result += "<tr><td>Change</td><td style='color:red'>" + data.Data.Change + "</td></tr>";
                }
                result += "<tr><td>Change Percent</td><td>" + data.Data.ChangePercent + "</td></tr>";
                result += "<tr><td>Last Price</td><td id='currentPrice'>$" + data.Data.LastPrice + "</td></tr>";
                result += "<tr><td>Open</td><td>$" + data.Data.Open + "</td></tr>";
                result += "<tr><td>Days High</td><td>$" + data.Data.High + "</td></tr>";
                result += "<tr><td>Days Low</td><td>$" + data.Data.Low + "</td></tr>";
                result += "<tr><td>Volume</td><td>" + data.Data.Volume + "</td></tr>";
                result += "<tr><td>Market Cap YTD</td><td>" + data.Data.MarketCap + "</td></tr>";

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

                        new google.visualization.LineChart(document.getElementById("graphDiv")).draw(
                                data, {
                                    curveType: "function",
                                    width: 647,
                                    height: 370,
                                    title: stockName + ' - History for Past 3 Years'
                                }
                            );
                    },
                    error: function () {
                        $("chartDiv").html("<h4 class='noChart'>No Chart Available for - " + stockName + "</h4>");
                    }
                });


                $("#resultsDiv").html(result);
                $("#buyStockButton").css("display","inline");
            },
            error: function () {
                $("chartDiv").html("<h4 class='noChart'>No Chart Available for - " + stockName + "</h4>");
            }
        });

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

    function validateSellQuantity(quantity, currentQuantity) {
        console.log("quantity = " + quantity);
        console.log("current quantity = " + currentQuantity);
        var pattern = /^\d+$/i;

        if (quantity.length > 0 && parseInt(quantity) > 0 && quantity.match(pattern) && currentQuantity >= quantity) {
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
                rate : price
            },
            type: "post",
            success: function () {
                loadMyStocks();
            }
        });
    }

    function sellOffStock(symbol, name, price, quantity) {
        price = price.replace("$", "-");
        $.ajax({
            url: '/Stocks/SaveBuyTransaction',
            data: {
                stockName: name,
                stockTicker: symbol,
                quantity: quantity,
                rate : price
            },
            type: "post",
            success: function () {
                loadMyStocks();
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
                result += "<tr><td>Volume</td><td>$" + data.query.results.quote.Volume + "</td></tr>";
                result += "<tr><td>Last Trade Price</td><td>$" + data.query.results.quote.LastTradePriceOnly + "</td></tr>";
                result += "<tr><td>Year High</td><td>$" + data.query.results.quote.YearHigh + "</td></tr>";
                result += "<tr><td>Year Low</td><td>$" + data.query.results.quote.YearLow + "</td></tr></table>";

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
                $("#stockChartDiv").html("");
            }
        });

    }

   


    function loadTopFiveStocks() {
        $.ajax({
            url: '/Stocks/GetTopFiveStocks',
            dataType: "json",
            type: "post",
            success: function (data) {
                console.log(data);
                for (var key in data) {
                    $("#topStockBody").append("<tr><td>" + key + "</td><td>fillerprice</td><td>fillerchange</td><td>" + data[key] + "</td></tr>");
                }
            }
        });
    }