using System;
using System.Collections.Generic;

namespace BackendRetoSophos.Models;

public partial class RentalDatum
{
    public string IdRent { get; set; } = null!;

    public string? IdUserRental { get; set; }

    public string? IdVideoGamesRental { get; set; }

    public DateTime? RetalDate { get; set; }

    public DateTime? RentalEndDate { get; set; }

    public virtual UsersDatum? IdUserRentalNavigation { get; set; }

    public virtual VideoGameDatum? IdVideoGamesRentalNavigation { get; set; }
}
