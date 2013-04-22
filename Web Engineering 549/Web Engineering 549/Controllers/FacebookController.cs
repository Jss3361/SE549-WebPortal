using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Web_Engineering_549.Models;
using Web_Engineering_549.ControllerAttributes;

namespace Web_Engineering_549.Controllers
{
    public class FacebookController : Controller
    {

        [Authenticate]
        [HttpGet]
        public ActionResult Index()
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

        [Authenticate]
        [HttpPost]
        public ActionResult PhotoUpload(HttpPostedFileBase file)
        {      
            var fileName = Path.GetFileName(file.FileName);             
            var path = Path.Combine(Server.MapPath("~/images/"), fileName);
            string filepathToSave = "images/" + fileName;
            file.SaveAs(path);
            return RedirectToAction("Index");
        }
    }
}

