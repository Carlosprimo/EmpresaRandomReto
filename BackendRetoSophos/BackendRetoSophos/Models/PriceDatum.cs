using System;
using System.Collections.Generic;

namespace BackendRetoSophos.Models;

public partial class PriceDatum
{
    public string IdPrice { get; set; } = null!;

    public string? IdVideoGames { get; set; }

    public decimal? Price { get; set; }

    public decimal? PricePenalty { get; set; }

    public virtual VideoGameDatum? IdVideoGamesNavigation { get; set; }
}
