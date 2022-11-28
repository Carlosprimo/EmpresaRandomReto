using System;
using System.Collections.Generic;
using BackendRetoSophos.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendRetoSophos.Models;

public partial class UsersDatum
{
    public string IdUser { get; set; } = null!;

    public string? FullName { get; set; }

    public string? Identification { get; set; }

    public string? Email { get; set; }

    public string? Gender { get; set; }

    public string? City { get; set; }

    public string? Address { get; set; }

    public int? Age { get; set; }

    public string? PostalCode { get; set; }

    public virtual ICollection<RentalDatum> RentalData { get; } = new List<RentalDatum>();
}
