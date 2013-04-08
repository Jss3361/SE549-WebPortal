using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace Web_Engineering_549.Controllers
{
    public class FacebookController : Controller
    {
        //
        // GET: /Facebook/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Facebook()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Facebook(HttpPostedFileBase file)
        {
            // extract only the fielname             
            var fileName = Path.GetFileName(file.FileName);
            // store the file inside ~/images/User-Image folder             
            var path = Path.Combine(Server.MapPath("~/images/"), fileName);
            // this is the string you have to save in your DB
            string filepathToSave = "images/" + fileName;
            file.SaveAs(path);
            //--------------------------------------------

            // Code to save file in DB by passing the file path

            //----------------------------------------------
            return View();
        }
    }
}

