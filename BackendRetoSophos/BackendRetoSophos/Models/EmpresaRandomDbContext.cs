using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackendRetoSophos.Models;

public partial class EmpresaRandomDbContext : DbContext
{
    public EmpresaRandomDbContext()
    {
    }

    public EmpresaRandomDbContext(DbContextOptions<EmpresaRandomDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PriceDatum> PriceData { get; set; }

    public virtual DbSet<RentalDatum> RentalData { get; set; }

    public virtual DbSet<UsersDatum> UsersData { get; set; }

    public virtual DbSet<VideoGameDatum> VideoGameData { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=PSOFKA01070\\SQLEXPRESS;Database=empresa_random_db;Trusted_Connection=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PriceDatum>(entity =>
        {
            entity.HasKey(e => e.IdPrice).HasName("PK__price_da__D8A23E836CA62DF3");

            entity.ToTable("price_data");

            entity.Property(e => e.IdPrice)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_price");
            entity.Property(e => e.IdVideoGames)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_video_games");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.PricePenalty)
                .HasColumnType("decimal(6, 2)")
                .HasColumnName("Price_penalty");

            entity.HasOne(d => d.IdVideoGamesNavigation).WithMany(p => p.PriceData)
                .HasForeignKey(d => d.IdVideoGames)
                .HasConstraintName("fk_video_game");
        });

        modelBuilder.Entity<RentalDatum>(entity =>
        {
            entity.HasKey(e => e.IdRent).HasName("PK__rental_d__0F4BF3B0E8DAAD5F");

            entity.ToTable("rental_data");

            entity.Property(e => e.IdRent)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_rent");
            entity.Property(e => e.IdUserRental)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_user_rental");
            entity.Property(e => e.IdVideoGamesRental)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_video_games_rental");
            entity.Property(e => e.RentalEndDate)
                .HasColumnType("date")
                .HasColumnName("rental_end_date");
            entity.Property(e => e.RetalDate)
                .HasColumnType("date")
                .HasColumnName("retal_date");

            entity.HasOne(d => d.IdUserRentalNavigation).WithMany(p => p.RentalData)
                .HasForeignKey(d => d.IdUserRental)
                .HasConstraintName("fk_usesr_rental");

            entity.HasOne(d => d.IdVideoGamesRentalNavigation).WithMany(p => p.RentalData)
                .HasForeignKey(d => d.IdVideoGamesRental)
                .HasConstraintName("fk_video_games_rental");
        });

        modelBuilder.Entity<UsersDatum>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PK__users_da__D2D14637734108DF");

            entity.ToTable("users_data");

            entity.Property(e => e.IdUser)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_user");
            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("city");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("full_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("gender");
            entity.Property(e => e.Identification)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("identification");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("postal_code");
        });

        modelBuilder.Entity<VideoGameDatum>(entity =>
        {
            entity.HasKey(e => e.IdGame).HasName("PK__video_ga__0E819B2C2A86159C");

            entity.ToTable("video_game_data");

            entity.Property(e => e.IdGame)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("id_game");
            entity.Property(e => e.Brand)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("brand");
            entity.Property(e => e.CoverPage)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cover_page");
            entity.Property(e => e.Director)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("director");
            entity.Property(e => e.MainCharacter)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("main_character");
            entity.Property(e => e.NameGame)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name_game");
            entity.Property(e => e.Platforms)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("platforms");
            entity.Property(e => e.Producer)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("producer");
            entity.Property(e => e.ReleaseDate)
                .HasColumnType("date")
                .HasColumnName("release_date");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
