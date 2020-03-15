using System.Linq;
using TaskApplication2.Models;
using System.Collections.Generic;
using TaskApplication2.DBConnector;

namespace TaskApplication2.DAL
{
    public class SeverityDal
    {
        public List<SeverityModel> GetAll()
        {
            using (DbContextApp db = new DbContextApp())
            {
                return db.Severities.ToList();
            }
        }

        public void Add(SeverityModel model)
        {
            using (DbContextApp db = new DbContextApp())
            {
                db.Severities.Add(model);
                db.SaveChanges();
            }
        }

        public void Delete(SeverityModel model)
        {
            using (DbContextApp db = new DbContextApp())
            {
                var modelToDelete = db.Severities.Single(m => m.ID == model.ID);
                db.Severities.Remove(modelToDelete);
                db.SaveChanges();
            }
        }

        public void Edit(SeverityModel model)
        {
            using (DbContextApp db = new DbContextApp())
            {
                var modelToUpdate = db.Severities.Single(m => m.ID == model.ID);
                db.Entry(modelToUpdate).CurrentValues.SetValues(model);
                db.SaveChanges();
            }
        }
    }
}