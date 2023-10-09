using System.Collections.Generic;

namespace ACDDS.TreasureHunter.Api.Models.Response
{
    public class CharacterResponse
    {
        public string Name { get; set; }
        public int HitPoints { get; set; }
        public int Luck { get; set; }
        public int Wealth { get; set; }
        public int StartingWealth { get; set; }
        public IList<EquipmentResponse> Equipment { get; set; }
    }
}
