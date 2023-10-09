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
  public class PurchasesController : ControllerBase
  {
    private readonly ILogger<PurchasesController> _logger;
    private readonly TreasureHunterService _treasureHunterService;

    public PurchasesController(
        ILogger<PurchasesController> logger,
        TreasureHunterService treasureHunterService)
    {
      _logger = logger ?? throw new ArgumentNullException(nameof(logger));
      _treasureHunterService = treasureHunterService ?? throw new ArgumentNullException(nameof(treasureHunterService));
    }

    [HttpPost()]
    public IActionResult CreatePurchase([FromBody] PurchaseRequest request)
    {
      try
      {
        _treasureHunterService.Purchase(request.EquipmentIds);
        var response = new PurchaseResponse()
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
      catch (InsufficientFundsException)
      {
        return BadRequest(new
        {
          Message = "Insufficient funds."
        });
      }
    }
  }
}
