using System.ComponentModel.DataAnnotations;

namespace TaskApplication2.Models
{
    public class SeverityModel
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int Severity { get; set; }
    }
}