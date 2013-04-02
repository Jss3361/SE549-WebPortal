using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Engineering_549.Models
{
    public class LoginModel
    {
        public long userID { get; set; }
        public long expiresIn { get; set; }
        public string accessToken { get; set; }
        public string signedRequest { get; set; }
    }
}