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
    }
}