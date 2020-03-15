using System;
using System.Web.Http;
using TaskApplication2.DAL;
using TaskApplication2.Logic;
using TaskApplication2.Models;

namespace TaskApplication2.Controllers
{
    [RoutePrefix("time")]
    public class TimeController : ApiController
    {
        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAll()
        {
            try
            {
                TimeDal timeDal = new TimeDal();
                return Ok(timeDal.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult Add(TimeModel model)
        {
            try
            {
                if (!TasksBL.IsTimeModelValid(model))
                    throw new ArgumentException("Please try again, some of your fields were invalid " +
                        "(Be aware that you must insert Title and Description, also, Start date can not be greater than End Date).");

                TimeDal timeDal = new TimeDal();
                timeDal.Add(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete(TimeModel model)
        {
            try
            {
                TimeDal timeDal = new TimeDal();
                timeDal.Delete(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("update")]
        public IHttpActionResult Edit(TimeModel model)
        {
            try
            {
                if (!TasksBL.IsTimeModelValid(model))
                    throw new ArgumentException("Please try again, some of your fields were invalid " +
                        "(Be aware that you must insert Title and Description, also, Start date can not be greater than End Date).");

                TimeDal timeDal = new TimeDal();
                timeDal.Edit(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
