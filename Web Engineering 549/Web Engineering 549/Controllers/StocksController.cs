using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Services;
using Web_Engineering_549.Models;

namespace Web_Engineering_549.Controllers
{
    public class StocksController : Controller
    {

        StockService stockService = new StockService();

        //
        // GET: /Stocks/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Stocks()
        {
            return View();
        }

        public ActionResult SaveBuyTransaction(String stockName, String stockTicker, int quantity, double rate)
        {
            StockTransaction trans = new StockTransaction();
            trans.stockName = stockName;
            trans.tickerSymbol = stockTicker;
            trans.quantity = quantity;
            trans.rate = rate;
            trans.timeStamp = DateTime.Now;


            stockService.BuyStock(trans);
            return new EmptyResult();
        }

    }
}
