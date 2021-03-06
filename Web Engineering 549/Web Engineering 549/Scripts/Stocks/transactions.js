﻿function loadStockTransactions() {
    $.ajax({
        url: '/Stocks/GetAllTransactions',
        dataType: "json",
        type: "post",
        success: function (data) {
            if (data.length > 0) {
                displayTransactions(data);
            }
            else {
                $("#stockTransactionsDiv").html("<table id='stockTransactionsTable' class='table'><tr><th style='text-align:center'>No Transactions Currently Saved</th></tr></table>");
            }
        }
    });
}

function displayTransactions(data) {
    console.log(data);

    var table = document.createElement("table");
    table.setAttribute("id", "stockTransactionsTable");
    table.setAttribute("class", "table");

    var headerRow = document.createElement("tr");

    var transactionType = document.createElement("th");
    transactionType.appendChild(document.createTextNode("Transaction Type"));

    var stockName = document.createElement("th");
    stockName.appendChild(document.createTextNode("Stock Name"));

    var stockSymbol = document.createElement("th");
    stockSymbol.appendChild(document.createTextNode("Ticker Symbol"));

    var quantityOwned = document.createElement("th");
    quantityOwned.appendChild(document.createTextNode("Quantity"));

    var price = document.createElement("th");
    price.appendChild(document.createTextNode("Price Per Stock"));

    var totalPrice = document.createElement("th");
    totalPrice.appendChild(document.createTextNode("Transaction Cost"));

    var transactionDate = document.createElement("th");
    transactionDate.appendChild(document.createTextNode("Date"));

    var transactionTime = document.createElement("th");
    transactionTime.appendChild(document.createTextNode("Time"));

    headerRow.appendChild(transactionType);
    headerRow.appendChild(stockName);
    headerRow.appendChild(stockSymbol);
    headerRow.appendChild(quantityOwned);
    headerRow.appendChild(price);
    headerRow.appendChild(totalPrice);
    headerRow.appendChild(transactionDate);
    headerRow.appendChild(transactionTime);


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

        var transPrice = data[i].Rate + "";

        if (transPrice.indexOf("-") == -1){
            var type = document.createElement("td");
            type.appendChild(document.createTextNode("Buy"));
        }
        else{
            var type = document.createElement("td");
            type.appendChild(document.createTextNode("Sell"));
        }

        transPrice = transPrice.replace("-","");
            
        var rate = document.createElement("td");
        rate.appendChild(document.createTextNode("$" + commaSeparateNumber(parseFloat(transPrice).toFixed(2))));

        var finalPrice = commaSeparateNumber((parseFloat(transPrice) * parseFloat(data[i].Quantity)).toFixed(2));

        var totalForTrans = document.createElement("td");
        totalForTrans.appendChild(document.createTextNode("$" + finalPrice));

        var timeString = data[i].Timestamp.substring(data[i].Timestamp.indexOf("(") + 1, data[i].Timestamp.indexOf(")"));
        var time = new Date(parseInt(timeString));

        var date = document.createElement("td");
        date.appendChild(document.createTextNode(time.toLocaleDateString()));

        var transTime = document.createElement("td");
        transTime.appendChild(document.createTextNode(time.toLocaleTimeString()));

        currentRow.appendChild(type);
        currentRow.appendChild(name);
        currentRow.appendChild(symbol);
        currentRow.appendChild(quantity);
        currentRow.appendChild(rate);
        currentRow.appendChild(totalForTrans);
        currentRow.appendChild(date);
        currentRow.appendChild(transTime);

        table.appendChild(currentRow);
    }
    $("#stockTransactionsDiv").html("");
    document.getElementById("stockTransactionsDiv").appendChild(table);
}


function loadMyStocks() {
    $.ajax({
        url: '/Stocks/GetMyStocks',
        dataType: "json",
        type: "post",
        success: function (data) {
            if (data.length > 0) {
                // displayMyStocks(data);
                getGainAndLoss(data);
            }
            else {
                
                $("#stockTransactionsDiv").html("<table id='stockTransactionsTable' class='table'><tr><th style='text-align:center'>No Stocks Currently Owned</th></tr></table>");
            }
        }
    });
}

function getGainAndLoss(data) {
    var gains = new Array();

    // get all of the ticker symbols
    for (i = 0; i < data.length; i++) {
        var singleGain = new Object();
        singleGain.Symbol = data[i].Ticker_Symbol;
        singleGain.MyPrice = data[i].Rate;

        gains.push(singleGain);
    }

    var waitCounter = 0;
    var url = "http://dev.markitondemand.com/Api/Quote/jsonp/";
    for (i = 0; i < gains.length; i++) {
        $.ajax({
            url: url,
            dataType: "jsonp",
            data: {
                symbol: gains[i].Symbol
            },
            success: function (returnData) {
                var lastPrice = parseFloat(returnData.Data.LastPrice).toFixed(2);

                for (j = 0; j < data.length; j++) {
                    if (returnData.Data.Symbol == data[j].Ticker_Symbol) {
                        var rate = data[j].Rate;
                    }
                }

                console.log("lastPrice = " + lastPrice);
                console.log("rate = " + rate);

                var gainLoss = new Object();

                if (parseFloat(lastPrice) > parseFloat(rate)) {
                    var loss = parseFloat(parseFloat(lastPrice) - parseFloat(rate)).toFixed(2);

                    gainLoss.Loss = loss;
                    gainLoss.Gain = "none";
                    gainLoss.Equal = "none";
                }
                else if (parseFloat(lastPrice) < parseFloat(rate)) {
                    var gain = parseFloat(parseFloat(rate) - parseFloat(lastPrice)).toFixed(2);

                    gainLoss.Gain = gain;
                    gainLoss.Loss = "none";
                    gainLoss.Equal = "none";
                }
                else if (parseFloat(lastPrice) == parseFloat(rate)) {
                    gainLoss.Equal = parseFloat(0).toFixed(2);
                    gainLoss.Gain = "none";
                    gainLoss.Loss = "none";
                }

               

                for (j = 0; j < data.length; j++) {
                    if (data[j].Ticker_Symbol == returnData.Data.Symbol) {
                        data[j].GainLoss = new Object();
                        data[j].GainLoss.Gain = gainLoss.Gain;
                        data[j].GainLoss.Loss = gainLoss.Loss;
                        data[j].GainLoss.Equal = gainLoss.Equal;
                        data[j].CurrentPrice = returnData.Data.LastPrice;
                    }
                }

                


                waitCounter++;

                if (waitCounter == data.length) {
                    displayMyStocks(data);
                }
            }
        });
    }
}


function displayMyStocks(data) {
   
    var table = document.createElement("table");
    table.setAttribute("id", "stockTransactionsTable");
    table.setAttribute("class", "table");

    var headerRow = document.createElement("tr");

    var stockName = document.createElement("th");
    stockName.appendChild(document.createTextNode("Stock Name"));

    var stockSymbol = document.createElement("th");
    stockSymbol.appendChild(document.createTextNode("Ticker Symbol"));

    var quantityOwned = document.createElement("th");
    quantityOwned.appendChild(document.createTextNode("Quantity Owned"));

    var currentPriceHeader = document.createElement("th");
    currentPriceHeader.appendChild(document.createTextNode("Current Price"));

    var price = document.createElement("th");
    price.appendChild(document.createTextNode("Average Price"));

    var gainLossHeader = document.createElement("th");
    gainLossHeader.appendChild(document.createTextNode("Gain/Loss"));

    var buyHeader = document.createElement("th");
    var sellHeader = document.createElement("th");

    headerRow.appendChild(stockName);
    headerRow.appendChild(stockSymbol);
    headerRow.appendChild(quantityOwned);
    headerRow.appendChild(currentPriceHeader);
    headerRow.appendChild(price);
    headerRow.appendChild(gainLossHeader);
    headerRow.appendChild(buyHeader);
    headerRow.appendChild(sellHeader);


    table.appendChild(headerRow);

    var total = 0;

    for (var i = 0; i < data.length; i++) {
        

        var currentRow = document.createElement("tr");

        var name = document.createElement("td");
        name.appendChild(document.createTextNode(data[i].Stock_Name));

        var symbol = document.createElement("td");
        symbol.appendChild(document.createTextNode(data[i].Ticker_Symbol));

        var quantity = document.createElement("td");
        quantity.appendChild(document.createTextNode(data[i].Quantity));

        var currentPrice = document.createElement("td");
        currentPrice.appendChild(document.createTextNode("$" + data[i].CurrentPrice));

        var transPrice = data[i].Rate;

        var rate = document.createElement("td");
        rate.appendChild(document.createTextNode("$" + parseFloat(transPrice).toFixed(2)));

        var gainLoss = document.createElement("td");
        gainLoss.style.textAlign = "right";

        if (data[i].GainLoss.Gain != "none") {
            gainLoss.style.color = "green";
            var gain = parseFloat(parseFloat(data[i].GainLoss.Gain) * parseInt(data[i].Quantity)).toFixed(2);

            total = parseFloat(parseFloat(total) + parseFloat(gain)).toFixed(2);

            gainLoss.appendChild(document.createTextNode("+ $" + gain));
        }
        else if (data[i].GainLoss.Loss != "none") {
            gainLoss.style.color = "red";
            var loss = parseFloat(parseFloat(data[i].GainLoss.Loss) * parseInt(data[i].Quantity)).toFixed(2);

            total = parseFloat(parseFloat(total) - parseFloat(loss)).toFixed(2);

            gainLoss.appendChild(document.createTextNode("- $" + loss));
        }
        else if (data[i].GainLoss.Equal != "none") {
            gainLoss.appendChild(document.createTextNode("$" + data[i].GainLoss.Equal));
        }
        

        var buy = document.createElement("a");
        buy.setAttribute("onclick", "buyStock(" + (i + 2) + ")");
        buy.setAttribute("href", "#");
        buy.appendChild(document.createTextNode("Buy"));

        var sell = document.createElement("a");
        sell.setAttribute("onclick", "sellStock(" + (i + 2) + ")");
        sell.setAttribute("href", "#");
        sell.appendChild(document.createTextNode("Sell"));

        var buyCell = document.createElement("td");
        buyCell.appendChild(buy);

        var sellCell = document.createElement("td");
        sellCell.appendChild(sell);

        currentRow.appendChild(name);
        currentRow.appendChild(symbol);
        currentRow.appendChild(quantity);
        currentRow.appendChild(currentPrice);
        currentRow.appendChild(rate);
        currentRow.appendChild(gainLoss);
        currentRow.appendChild(buyCell);
        currentRow.appendChild(sellCell);

        table.appendChild(currentRow);
    }

    var lastRow = document.createElement("tr");
    var dummy1 = document.createElement("td");
    var dummy2 = document.createElement("td");
    var dummy3 = document.createElement("td");
    var dummy4 = document.createElement("td");

    var totalHeader = document.createElement("td");
    totalHeader.style.textAlign = "right";
    totalHeader.appendChild(document.createTextNode("Total: "));

    var totalValue = document.createElement("td");

    totalValue.style.textAlign = "right";

    if (parseFloat(total) < 0) {
        totalValue.style.color = "red";

        total = total + "";
        total = total.replace('-','');

        totalValue.appendChild(document.createTextNode("- $" + total));
    }
    else if (parseFloat(total) == 0) {
        totalValue.appendChild(document.createTextNode("$" + total));
    }
    else if (parseFloat(total) > 0) {
        totalValue.style.color = "green";
        totalValue.appendChild(document.createTextNode("+ $" + total));
    }

    var dummy5 = document.createElement("td");
    var dummy6 = document.createElement("td");

    lastRow.appendChild(dummy1);
    lastRow.appendChild(dummy2);
    lastRow.appendChild(dummy3);
    lastRow.appendChild(dummy4);
    lastRow.appendChild(totalHeader);
    lastRow.appendChild(totalValue);
    lastRow.appendChild(dummy5);
    lastRow.appendChild(dummy6);

    table.appendChild(lastRow);

    $("#stockTransactionsDiv").html("");
    document.getElementById("stockTransactionsDiv").appendChild(table);
}

function buyStock(stock) {
    console.log("stock = " + stock);
    console.log("type of = " + typeof stock);

    if (typeof stock == 'undefined') {
        var symbol = document.getElementById("tickerSymbol").textContent;
        var name = document.getElementById("stockName").textContent;
        var price = document.getElementById("currentPrice").textContent;
    }
    else {
        var tableRow = $("#stockTransactionsTable").find("tr").eq(stock - 1);
        var data = tableRow[0].childNodes;

        var symbol = data[1].textContent;
        var name = data[0].textContent;
        var price = data[3].textContent;
    }

    $("#buyStockForm").css("display", "inline");
    $("#validateTips").css("display", "inline");

    $("#nameOfStock").attr("value", name).attr("readonly", true);
    $("#ticker").attr("value", symbol).attr("readonly", true);
    $("#stockPrice").attr("value", price).attr("readonly", true);

    $("#stockTrans").dialog({
        resizable: false,
        width: 250,
        modal: true,
        open: function (event, ui) { $(".ui-dialog-titlebar-close .ui-button-text").hide(); },
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
                    alert("Invalid Quantity.  Must be a positive value that is less than a billion. Please try again.");
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

    if (quantity.length > 0 && parseInt(quantity) > 0 && quantity.match(pattern) && parseInt(quantity) < 1000000000) {
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
            loadMyStocks();
        }
    });
}

function sellStock(stock) {
    console.log("row number = " + stock);

    var tableRow = $("#stockTransactionsTable").find("tr").eq(stock - 1);
    console.log(tableRow);
    var data = tableRow[0].childNodes;

    var name = data[0].textContent;
    var symbol = data[1].textContent;
    var price = data[3].textContent;
    var currentQuantity = data[2].textContent;

    console.log("currentQuantity = " + currentQuantity);

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
                if (validateSellQuantity($("#quantityToBuy").val(), currentQuantity)) {
                    var quantity = $("#quantityToBuy").val();
                    $(this).dialog("close");
                    sellOffStock(symbol, name, price, quantity);
                    $("#quantityToBuy").val("");
                    document.getElementsByTagName("body")[0].removeChild(document.getElementById("stockTrans"));
                }
                else {
                    alert("Invalid quantity or you are trying to sell more stock than you own.");
                }


            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
}

function validateSellQuantity(quantity, currentQuantity) {
    console.log("quantity = " + quantity);
    console.log("current quantity = " + currentQuantity);
    var pattern = /^\d+$/i;

    if (quantity.length > 0 && parseInt(quantity) > 0 && quantity.match(pattern) && parseInt(currentQuantity) >= parseInt(quantity)) {
        return true;
    }
    else {
        return false;
    }
}

function sellOffStock(symbol, name, price, quantity) {
    price = price.replace("$", "-");
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
            loadMyStocks();
        }
    });
}

function clearStockHistory() {
    $.ajax({
        url: '/Stocks/DeleteTransactionHistory',
        type: "post",
        success: function () {
            loadStockTransactions();
        }
    });
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}
