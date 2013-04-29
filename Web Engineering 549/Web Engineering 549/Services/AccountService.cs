using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;
using Web_Engineering_549.Database;

namespace Web_Engineering_549.Services
{
    public class AccountService
    {
        public bool Login(Account account)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var user = context.Account.SingleOrDefault(x => x.userID == account.userID);
                    if (user != null)
                    {
                        user.sessionExpiresAt = account.sessionExpiresAt;
                        user.sessionID = account.sessionID;
                    }
                    else
                    {
                        context.Account.Add(account);
                    }
                    context.SaveChanges();

                    return true;
                }
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public void Logout(Guid sessionId)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var user = context.Account.SingleOrDefault(x => x.sessionID == sessionId);
                    if (user != null)
                    {
                        user.sessionID = null;
                        user.sessionExpiresAt = null;
                    }
                }
            }
            catch(Exception ex)
            {
            }
        }

        public bool ValidateSession(Guid sessionId)
        {
            return true;
        }

        public long getUserID(Guid sessionId)
        {
            long userid = 0;
            try
            {
                using (var context = new EntityContext())
                {
                    var user = context.Account.SingleOrDefault(x => x.sessionID == sessionId);
                    if (user != null)
                    {
                        userid = user.userID;
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return userid;
        }
    }
}