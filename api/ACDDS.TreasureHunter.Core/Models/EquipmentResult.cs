
using System.Collections.Generic;

namespace ACDDS.TreasureHunter.Core.Models
{
  public class EquipmentResult
  {
    public EquipmentResult()
    {
      Success = new List<string>();
      Failure = new List<string>();
    }

    public List<string> Success { get; set; }
    public List<string> Failure { get; set; }
  }

}
