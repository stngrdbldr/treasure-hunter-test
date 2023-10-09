using System.ComponentModel.DataAnnotations;

namespace ACDDS.TreasureHunter.Api.Models.Requests
{
    public class PurchaseRequest
    {
        [Required]
        public string[] EquipmentIds { get; set; }
    }
}
