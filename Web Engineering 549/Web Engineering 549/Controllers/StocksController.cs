using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Services;
using Web_Engineering_549.Models;
using Web_Engineering_549.ViewModels;

namespace Web_Engineering_549.Controllers
{
    public class StocksController : Controller
    {
        
        StockService stockService = new StockService();
        AccountService accountService = new AccountService();
        //
        // GET: /Stocks/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Stocks(string stockTicker)
        {
            var model = new StockIndexViewModel()
            {
                stockTicker = stockTicker ?? null
            };
            return View(model);
        }

        [HttpGet]
        public ActionResult Transactions()
        {
            return View();
        }

        public ActionResult SaveBuyTransaction(String stockName, String stockTicker, int quantity, double rate)
        {
            StockTransaction trans = new StockTransaction();
            trans.Stock_Name = stockName;
            trans.Ticker_Symbol = stockTicker;
            trans.Quantity = quantity;
            trans.Rate = (Decimal)rate;
            trans.Timestamp = DateTime.Now;
            // trans.transID = ;
            // need to figure out how to get userid
            HttpCookie cookie = Request.Cookies["SESSION_ID"];
            trans.User_ID = accountService.getUserID(new Guid(cookie.Value));


            stockService.BuyStock(trans);
            return new EmptyResult();
        }


        public List<StockTransaction> combineSameStockTransactions(List<StockTransaction> trans)
        {
            List<StockTransaction> result = new List<StockTransaction>();

            for (int i = 0; i < trans.Count; i++)
            {
                for (int j = i + 1; j < trans.Count; j++)
                {
                    if (trans.ElementAt(i).Stock_Name == trans.ElementAt(j).Stock_Name)
                    {
                        StockTransaction trans1 = trans.ElementAt(i);
                        StockTransaction trans2 = trans.ElementAt(j);

                        StockTransaction combined = new StockTransaction();
                        combined.Stock_Name = trans1.Stock_Name;
                        combined.Ticker_Symbol = trans1.Ticker_Symbol;
                        combined.Quantity = trans1.Quantity + trans2.Quantity;
                        combined.Rate = trans1.Rate;
                    }
                }
            }

            return result;
        }

        public ActionResult GetAllTransactions()
        {
            HttpCookie cookie = Request.Cookies["SESSION_ID"];
            List<StockTransaction> transactions = stockService.GetAllTransactions(accountService.getUserID(new Guid(cookie.Value)));

            
           

            JsonResult result = new JsonResult();
            result.Data = transactions;

            // To Do : finish this method
            return result;
        }

        public ActionResult GetOwnedStocks()
        {
            // To Do: finish this method
            return new EmptyResult();
        }

        public ActionResult GetSoldStocks()
        {
            // To Do : finish this method
            return new EmptyResult();
        }

        public ActionResult SaveComment()
        {
            // To Do : finish this metho
            return new EmptyResult();
        }

        public ActionResult GetComment()
        {
            return new EmptyResult();
        }

        public ActionResult SellStock()
        {
            return new EmptyResult();
        }

    }
}
