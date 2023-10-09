using System;

namespace ACDDS.TreasureHunter.Core.Exceptions
{
    public class EquipmentNotFoundException : Exception
    {
        public EquipmentNotFoundException(string equipmentId)
            : base($"Could not find equipment with id '{equipmentId}' in the shop.")
        {

        }
    }
}
