using System;
using ACDDS.TreasureHunter.Api.Models.Requests;
using ACDDS.TreasureHunter.Api.Models.Response;
using ACDDS.TreasureHunter.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ACDDS.TreasureHunter.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EnchantmentController : ControllerBase
  {
    private readonly ILogger<EnchantmentController> _logger;
    private readonly TreasureHunterService _treasureHunterService;

    public EnchantmentController(
        ILogger<EnchantmentController> logger,
        TreasureHunterService treasureHunterService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _treasureHunterService = treasureHunterService ?? throw new ArgumentNullException(nameof(treasureHunterService));
    }

    [HttpPost()]
    public IActionResult CreateEnchantment([FromBody] EnchantmentRequest request)
    {
      try
      {
        var result = _treasureHunterService.Enchant(request.EquipmentIds);
        var response = new EnchantmentResponse()
        {
          Success = result.Success.ToArray(),
          Failure = result.Failure.ToArray()
        };
        return Ok(response);
      }
      catch (EquipmentNotFoundException)
      {
        return NotFound(new
        {
          Message = "Equipment not found."
        });
      }

    }
  }
}
