using System.Drawing;
using ACDDS.TreasureHunter.Api.Models.Response;
using ACDDS.TreasureHunter.Core.Models;

namespace ACDDS.TreasureHunter.Api.Extensions
{

  public static class ColorExtensions
  {
    public static string ToHexString(this Color c) => $"#{c.R:X2}{c.G:X2}{c.B:X2}";

    public static string ToRgbString(this Color c) => $"RGB({c.R}, {c.G}, {c.B})";
  }
}
