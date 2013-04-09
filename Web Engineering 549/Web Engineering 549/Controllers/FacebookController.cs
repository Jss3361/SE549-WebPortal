using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Web_Engineering_549.Models;

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
            var files = Directory.GetFiles(Server.MapPath("~/images/"));
            var array = new List<string>();
            foreach(var _file in files) 
            {
                var index = _file.IndexOf("images");
                var str = _file.Substring(index);
                var file = Request.Url.GetLeftPart(UriPartial.Authority) + "/" + str.Replace("\\", "/");
                array.Add(file);
            }
            var model = new Images()
            {
                images = array.ToArray()
            };
            return View(model);
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
            return RedirectToAction("Facebook");
        }
    }
}

