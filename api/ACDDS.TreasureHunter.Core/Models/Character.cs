using System;
using Bogus;

namespace ACDDS.TreasureHunter.Core.Models
{
  public class Character
  {
    private Faker _faker = new Faker();

    public Character(int HitPoints, int Luck, int Wealth)
    {
      Id = Guid.NewGuid().GetHashCode();
      Name = _faker.Name.FullName();
      this.HitPoints = HitPoints;
      this.Luck = Luck;
      this.Wealth = Wealth;
      this.StartingWealth = Wealth;
    }


    public int Id { get; }
    public string Name { get; }
    public int HitPoints { get; set; }
    public int Luck { get; set; }
    public int Wealth { get; set; }
    public int StartingWealth { get; }
  }
}
