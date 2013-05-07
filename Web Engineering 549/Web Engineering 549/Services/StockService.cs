using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;
using Web_Engineering_549.Database;

namespace Web_Engineering_549.Services
{
    public class StockService
    {
        public bool BuyStock(StockTransaction trans)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    context.StockTransaction.Add(trans);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SellStock(StockTransaction trans)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    context.StockTransaction.Add(trans);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<StockTransaction> GetAllTransactions(long userid)
        {
            List<StockTransaction> transactions = new List<StockTransaction>();

            try
            {
                using (var context = new EntityContext())
                {
                    transactions = context.StockTransaction.Where(p => p.User_ID == userid).Select(p => p).ToList();
                }
            }
            catch (Exception ex)
            {

            }

            return transactions;
        }

        public bool ClearTransactionHistory(long userid)
        {
            List<StockTransaction> transactions = new List<StockTransaction>();
            try
            {
                using (var context = new EntityContext())
                {
                    transactions = context.StockTransaction.Where(p => p.User_ID == userid).Select(p => p).ToList();
                    foreach (StockTransaction trans in transactions)
                    {
                        context.StockTransaction.Remove(trans);
                    }
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SaveComment(StockComment comment)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    context.StockComment.Add(comment);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }



        public Dictionary<string, int> GetTopFiveStocks(long userid)
        {
            List<StockTransaction> transactions = new List<StockTransaction>();
            Dictionary<string, int> topFiveStocks = new Dictionary<string, int>();

            try
            {
                using (var context = new EntityContext())
                {
                    transactions = context.StockTransaction.ToList();
                    var grouped = (from s in transactions
                                   where s.User_ID == userid
                                   group s by s.Ticker_Symbol into g
                                   select new { TickerSymbol = g.Key, TotalCount = g.Sum(s => s.Quantity) }).OrderByDescending(i => i.TotalCount).Take(5);
                    foreach(var ele in grouped)
                    {
                        topFiveStocks.Add(ele.TickerSymbol, ele.TotalCount);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return topFiveStocks;
        }

        public string GetComment(long userId, string symbol)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var comment = context.StockComment.SingleOrDefault(x => x.User_ID == userId && x.Stock == symbol);
                    return comment != null ? comment.Comment : "";
                }
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public bool SaveComment(long userId, string symbol, String comment)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var _comment = context.StockComment.SingleOrDefault(x => x.User_ID == userId && x.Stock == symbol);
                    if (_comment != null)
                    {
                        _comment.Comment = comment;
                    }
                    else
                    {
                        _comment = new StockComment
                        {
                            Comment = comment,
                            User_ID = userId,
                            Timestamp = DateTime.Now,
                            Stock = symbol
                        };
                        context.StockComment.Add(_comment);
                    }

                    context.SaveChanges();
                    return true;

                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}