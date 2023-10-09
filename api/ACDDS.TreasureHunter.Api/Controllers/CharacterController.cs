using System;
using System.Linq;
using ACDDS.TreasureHunter.Api.Extensions;
using ACDDS.TreasureHunter.Api.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ACDDS.TreasureHunter.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CharacterController : ControllerBase
  {
    private readonly ILogger<CharacterController> _logger;
    private readonly TreasureHunterService _treasureHunterService;

    public CharacterController(
        ILogger<CharacterController> logger,
        TreasureHunterService treasureHunterService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _treasureHunterService = treasureHunterService ?? throw new ArgumentNullException(nameof(treasureHunterService));
    }

    [HttpGet()]
    public CharacterResponse GetCharacter()
    {
      var character = _treasureHunterService.GetCharacter();
      var characterEquipment = _treasureHunterService
          .GetCharacterEquipment()
          .Select(ModelConversions.ToEquipmentResponseModel)
          .ToList();
      return new CharacterResponse
      {
        Name = character.Name,
        HitPoints = character.HitPoints,
        Luck = character.Luck,
        Wealth = character.Wealth,
        Equipment = characterEquipment,
        StartingWealth = character.StartingWealth
      };
    }
  }
}
