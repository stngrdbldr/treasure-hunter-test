using System;
using System.Collections.Generic;
using System.Linq;
using ACDDS.TreasureHunter.Core.Exceptions;
using ACDDS.TreasureHunter.Core.Models;
using Microsoft.Extensions.Logging;

public class TreasureHunterService
{
  private readonly ILogger<TreasureHunterService> _logger;

  private readonly Character _character;


  private readonly IList<Equipment> _characterEquipment;

  private readonly IList<Equipment> _shopEquipment;

  public TreasureHunterService(ILogger<TreasureHunterService> logger)
  {
    var numberOfRandomItems = 50;
    var faker = new Bogus.Faker();

    _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    _character = new Character(faker.Random.Int(1, 20), faker.Random.Int(1, 10), faker.Random.Int(200, 500));

    _characterEquipment = new List<Equipment>();
    _shopEquipment = new List<Equipment>();




    for (int i = 0; i < numberOfRandomItems; i++)
    {
      _shopEquipment.Add(Equipment.From(_character));
    }

  }

  public Character GetCharacter()
  {
    return _character;
  }

  public IEnumerable<Equipment> GetCharacterEquipment()
  {
    return _characterEquipment;
  }

  public IEnumerable<Equipment> GetShopEquipment()
  {
    return _shopEquipment;
  }

  public void Purchase(string[] equipmentIds)
  {

    var equipments = _shopEquipment.Where(e => equipmentIds.Contains(e.Id)).ToList();

    if (equipments.Count() != equipmentIds.Length)
    {
      throw new EquipmentNotFoundException("One or more equipment IDs were not found.");
    }

    var totalValue = equipments.Sum(e => e.Value);

    if (_character.Wealth < totalValue)
    {
      throw new InsufficientFundsException("Equipment value exceeds the character's wealth.");
    }

    foreach (var equipment in equipments)
    {
      _character.Wealth -= equipment.Value;
      _shopEquipment.Remove(equipment);
      _characterEquipment.Add(equipment);
    }

  }

  public void Sell(string[] equipmentIds)
  {

    var equipments = _characterEquipment.Where(e => equipmentIds.Contains(e.Id)).ToList();

    if (equipments.Count() != equipmentIds.Length)
    {
      throw new EquipmentNotFoundException("One or more equipment IDs were not found.");
    }

    foreach (var equipment in equipments)
    {
      _character.Wealth += equipment.Value;
      _shopEquipment.Add(equipment);
      _characterEquipment.Remove(equipment);
    }

  }

  public EquipmentResult Enchant(string[] equipmentId)
  {
    var result = new EquipmentResult();

    foreach (var id in equipmentId)
    {

      var equipment = _characterEquipment.SingleOrDefault(e => e.Id == id);
      if (equipment == null)
        throw new EquipmentNotFoundException(id);


      double enhancementChance = 0.9 / Math.Pow(1.1, equipment.Enchantment);

      if (new Random().NextDouble() < enhancementChance)
      {
        equipment.Enchantment++;
        equipment.LuckModifier *= equipment.Enchantment;
        equipment.HpModifier *= equipment.Enchantment;
        equipment.Value *= equipment.Enchantment;
        result.Success.Add(equipment.Id);
      }
      else
      {
        equipment.Enchantment = 0;
        _shopEquipment.Remove(equipment);
        _characterEquipment.Remove(equipment);
        _shopEquipment.Add(Equipment.From(_character));
        result.Failure.Add(equipment.Id);
      }
    }

    return result;
  }
}
