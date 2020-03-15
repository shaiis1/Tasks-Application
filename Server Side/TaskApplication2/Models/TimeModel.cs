using System;
using System.ComponentModel.DataAnnotations;

namespace TaskApplication2.Models
{
    public class TimeModel
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}