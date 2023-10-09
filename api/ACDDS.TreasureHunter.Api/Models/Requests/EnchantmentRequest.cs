using System.ComponentModel.DataAnnotations;

namespace ACDDS.TreasureHunter.Api.Models.Requests
{
  public class EnchantmentRequest
  {
    [Required]
    public string[] EquipmentIds { get; set; }
  }
}
