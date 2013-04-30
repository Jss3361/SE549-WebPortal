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
        rate.appendChild(document.createTextNode("$" + transPrice));

        var finalPrice = (parseFloat(transPrice) * parseFloat(data[i].Quantity)).toFixed(2);

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
