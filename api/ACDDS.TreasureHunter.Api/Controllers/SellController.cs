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
  public class SellController : ControllerBase
  {
    private readonly ILogger<SellController> _logger;
    private readonly TreasureHunterService _treasureHunterService;

    public SellController(
        ILogger<SellController> logger,
        TreasureHunterService treasureHunterService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _treasureHunterService = treasureHunterService ?? throw new ArgumentNullException(nameof(treasureHunterService));
    }

    [HttpPost()]
    public IActionResult CreateSell([FromBody] SellRequest request)
    {
      try
      {
        _treasureHunterService.Sell(request.EquipmentIds);
        var response = new SellResponse()
        {
          EquipmentIds = request.EquipmentIds
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
