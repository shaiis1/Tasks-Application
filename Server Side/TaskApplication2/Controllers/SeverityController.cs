using System;
using System.Web.Http;
using TaskApplication2.DAL;
using TaskApplication2.Logic;
using TaskApplication2.Models;

namespace TaskApplication2.Controllers
{
    [RoutePrefix("severity")]
    public class SeverityController : ApiController
    {
        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAll()
        {
            try
            {
                SeverityDal severityDal = new SeverityDal();
                return Ok(severityDal.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult Add(SeverityModel model)
        {
            try
            {
                if (!TasksBL.IsSeverityModelValid(model))
                    throw new ArgumentException("Please try again, some of your fields were invalid " +
                        "(Be aware that you must insert Title and Description");

                SeverityDal severityDal = new SeverityDal();
                severityDal.Add(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(SeverityModel model)
        {
            try
            {
                SeverityDal severityDal = new SeverityDal();
                severityDal.Delete(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("update")]
        public IHttpActionResult Edit(SeverityModel model)
        {
            try
            {
                if (!TasksBL.IsSeverityModelValid(model))
                    throw new ArgumentException("Please try again, some of your fields were invalid " +
                        "(Be aware that you must insert Title and Description");
                SeverityDal severityDal = new SeverityDal();
                severityDal.Edit(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
