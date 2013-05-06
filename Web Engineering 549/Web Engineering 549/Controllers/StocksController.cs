﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Services;
using Web_Engineering_549.Models;
using Web_Engineering_549.ViewModels;
using Web_Engineering_549.ControllerAttributes;

namespace Web_Engineering_549.Controllers
{
    public class StocksController : BaseController
    {
        
        StockService stockService = new StockService();
        AccountService accountService = new AccountService();
        //
        // GET: /Stocks/

        [Authenticate]
        public ActionResult Index()
        {
            return View();
        }

        [Authenticate]
        [HttpGet]
        public ActionResult Stocks()
        {
            return View();
        }

        [Authenticate]
        [HttpGet]
        public ActionResult Transactions()
        {
            return View();
        }

        [Authenticate]
        [HttpGet]
        public ActionResult StockInfo(string symbol)
        {
            var model = new StockIndexViewModel()
            {
                symbol = symbol.ToUpper() ?? null,
                comment =  stockService.GetComment(accountService.getUserID(base.GetSession()), symbol)
            };
            return View(model);
        }

        [Authenticate]
        [HttpGet]
        public ActionResult StocksOwned()
        {
            return View();
        }

        [Authenticate]
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

        [Authenticate]
        public List<StockTransaction> combineSameStockTransactions(List<StockTransaction> trans)
        {
            List<StockTransaction> result = new List<StockTransaction>();

            HashSet<StockTransaction> allSymbols = new HashSet<StockTransaction>();
            foreach (StockTransaction s in trans)
            {
                allSymbols.Add(s);
            }

            foreach (StockTransaction s in allSymbols)
            {
                StockTransaction combined = new StockTransaction();
                combined.Stock_Name = s.Stock_Name;
                combined.Ticker_Symbol = s.Ticker_Symbol;

                int combinedQuantity = 0;
                int count = 0;
                decimal sum = 0;

                foreach (StockTransaction t in trans)
                {
                    if (s.Ticker_Symbol == t.Ticker_Symbol)
                    {
                        

                        if (t.Rate.ToString().Contains('-'))
                        {
                            combinedQuantity = combinedQuantity - t.Quantity;
                            
                        }
                        else
                        {
                            combinedQuantity = combinedQuantity + t.Quantity;
                            count++;
                            sum = sum + t.Rate;
                        }
                    }
                }

                combined.Quantity = combinedQuantity;
                combined.Rate = sum / count;

                Boolean inList = false;
                foreach (StockTransaction sTrans in result)
                {
                    if (sTrans.Stock_Name == combined.Stock_Name)
                    {
                        inList = true;
                    }
                }

                if (inList == false && combined.Quantity > 0)
                {
                    result.Add(combined);
                }
                

            }

            return result;
        }

        [Authenticate]
        public ActionResult GetAllTransactions()
        {
            HttpCookie cookie = Request.Cookies["SESSION_ID"];
            List<StockTransaction> transactions = stockService.GetAllTransactions(accountService.getUserID(new Guid(cookie.Value)));

            JsonResult result = new JsonResult();
            result.Data = transactions;

            // To Do : finish this method
            return result;
        }

        [Authenticate]
        public ActionResult GetMyStocks()
        {
            HttpCookie cookie = Request.Cookies["SESSION_ID"];
            List<StockTransaction> transactions = stockService.GetAllTransactions(accountService.getUserID(new Guid(cookie.Value)));

            transactions = combineSameStockTransactions(transactions);

            JsonResult result = new JsonResult();
            result.Data = transactions;

            // To Do: finish this method
            return result;
        }

        [Authenticate]
        public ActionResult GetSoldStocks()
        {
            // To Do : finish this method
            return new EmptyResult();
        }

        [Authenticate]
        public ActionResult SaveComment(String comment, String symbol)
        {
            stockService.SaveComment(accountService.getUserID(base.GetSession()), symbol, comment);
            return RedirectToAction("StockInfo", new { symbol });
        }

        [Authenticate]
        public ActionResult SellStock()
        {
            return new EmptyResult();
        }

        [Authenticate]
        public ActionResult GetTopFiveStocks()
        {
            HttpCookie cookie = Request.Cookies["SESSION_ID"];
            Dictionary<string, int> topFiveStocks = stockService.GetTopFiveStocks(accountService.getUserID(new Guid(cookie.Value)));

            JsonResult result = new JsonResult();
            result.Data = topFiveStocks;

            // To Do : finish this method
            return result;
        }

    }
}
