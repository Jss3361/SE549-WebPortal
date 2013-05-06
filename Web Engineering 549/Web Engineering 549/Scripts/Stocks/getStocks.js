google.load('visualization', '1.0', { 'packages': ['corechart'] });

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

    function goToStockInfoPage() {
        var symbol = $("#stockSearchField").val();
        console.log("symbol = " + symbol);

        document.cookie = "ticker_symbol=" + symbol;
        window.location.href = "/Stocks/StockInfo";
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
        var symbol = $("#homeStockSearchField").val();
        console.log("symbol = " + symbol);

        document.cookie = "ticker_symbol=" + symbol;
        window.location.href = "/Stocks/StockInfo";
    }

    function loadTopFiveStockRow(symbol, quantity) {
        console.log("HI: " + symbol);
        var url = "http://dev.markitondemand.com/Api/Quote/jsonp/";
        $.ajax({
            url: url,
            async: false,
            dataType: "jsonp",
            data: {
                symbol: symbol
            },
            success: function (data) {
                var row_id = "#" + symbol;
                $(row_id).html("<td>" + symbol + "</td><td>" + data.Data.LastPrice + "</td><td>" + data.Data.ChangePercent + "</td><td>" + quantity + "</td>");
            }
        });
    }