using BackendRetoSophos;
using BackendRetoSophos.Controllers;
using BackendRetoSophos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<DbContext, EmpresaRandomDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BackendRetoSophos.Models.EmpresaRandomDbContext>(options => options.UseSqlServer("Server=PSOFKA01070\\SQLEXPRESS;Database=empresa_random_db;Trusted_Connection=True;Encrypt=False"));
var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services); // calling ConfigureServices method
var app = builder.Build();
startup.Configure(app, builder.Environment); // calling Configure method
