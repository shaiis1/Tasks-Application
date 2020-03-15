using TaskApplication2.Models;

namespace TaskApplication2.Logic
{
    public class TasksBL
    {
        public static bool IsTimeModelValid(TimeModel model)
        {
            if (model == null
                || string.IsNullOrWhiteSpace(model.Title)
                || string.IsNullOrWhiteSpace(model.Description)
                || model.StartDate > model.EndDate)
                return false;
            else
                return true;
        }

        public static bool IsSeverityModelValid(SeverityModel model)
        {
            if (model == null
                || string.IsNullOrWhiteSpace(model.Title)
                || string.IsNullOrWhiteSpace(model.Description)
                || model.Severity < 0 ||
                model.Severity > 4)
                return false;
            else
                return true;
        }
    }
}