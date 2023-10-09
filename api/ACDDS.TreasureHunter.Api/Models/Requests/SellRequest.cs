using System.ComponentModel.DataAnnotations;

namespace ACDDS.TreasureHunter.Api.Models.Requests
{
    public class SellRequest
    {
        [Required]
        public string[] EquipmentIds { get; set; }
    }
}
