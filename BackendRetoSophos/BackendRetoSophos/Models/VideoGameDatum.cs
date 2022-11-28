using System;
using System.Collections.Generic;

namespace BackendRetoSophos.Models;

public partial class VideoGameDatum
{
    public string IdGame { get; set; } = null!;

    public string? NameGame { get; set; }

    public string? Director { get; set; }

    public string? MainCharacter { get; set; }

    public string? Producer { get; set; }

    public string? Brand { get; set; }

    public DateTime? ReleaseDate { get; set; }

    public string? CoverPage { get; set; }

    public string? Platforms { get; set; }

    public virtual ICollection<PriceDatum> PriceData { get; } = new List<PriceDatum>();

    public virtual ICollection<RentalDatum> RentalData { get; } = new List<RentalDatum>();
}
