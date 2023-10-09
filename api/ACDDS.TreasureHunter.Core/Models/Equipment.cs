
using System;
using System.Drawing;
using Bogus;

namespace ACDDS.TreasureHunter.Core.Models
{
  public class Equipment
  {
    private static Random rnd = new Random();

    private Faker faker = new Faker();

    public static Equipment From(Character character)
    {
      return new Equipment(rnd.Next(1, Math.Max(10, character.Wealth * 2)));
    }

    public Equipment(int price)
    {

      // get order of magnitude of price
      var orderOfMagnitude = (int)Math.Log10(price);
      var min = 10 + price / (orderOfMagnitude + 1);
      var max = 20 + price / (orderOfMagnitude + 1);

      Id = Guid.NewGuid().ToString();
      Name = faker.Name.FullName();
      Type = faker.PickRandom<EquipmentType>();
      // hp modifier should be better the more expensive the item is
      HpModifier = rnd.Next(min, max);
      LuckModifier = rnd.Next(min, max);
      Value = price;
      Color = Color.FromArgb(rnd.Next(256), rnd.Next(256), rnd.Next(256));
      Enchantment = 0;
    }

    public string Id { get; }
    public string Name { get; }
    public EquipmentType Type { get; }
    public int HpModifier { get; set; }
    public int LuckModifier { get; set; }
    public int Value { get; set; }
    public int Enchantment { get; set; }
    public Color Color { get; }

  }
}
