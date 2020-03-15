using System.Linq;
using TaskApplication2.Models;
using System.Collections.Generic;
using TaskApplication2.DBConnector;
using System;

namespace TaskApplication2.DAL
{
    public class TimeDal
    {
        public List<TimeModel> GetAll()
        {
            using (DbContextApp db = new DbContextApp())
            {
                return db.Times.ToList();
            }
        }

        public void Add(TimeModel model)
        {
            using (DbContextApp db = new DbContextApp())
            {
                db.Times.Add(model);
                db.SaveChanges();
            }
        }

        public void Delete(TimeModel model)
        {
            using (DbContextApp db = new DbContextApp())
            {
                var modelToDelete = db.Times.Single(m => m.ID == model.ID);
                db.Times.Remove(modelToDelete);
                db.SaveChanges();
            }
        }

        public void Edit(TimeModel model)
        {
            using (DbContextApp db = new DbContextApp())
            {
                var modelToUpdate = db.Times.Single(m => m.ID == model.ID);
                db.Entry(modelToUpdate).CurrentValues.SetValues(model);
                db.SaveChanges();
            }
        }
    }
}