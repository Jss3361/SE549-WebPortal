using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;

namespace Web_Engineering_549.Services
{
    public class AccountService
    {
        public bool Login(Account account)
        {
            return true;
        }

        public Boolean ValidateSession(Guid sessionId)
        {
            return true;
        }

        public Guid GetAccountId(Guid sessionId)
        {
            return Guid.Empty;
        }
    }
}