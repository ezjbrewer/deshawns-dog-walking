using deshawnsdogwalking.Models;

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 3, WalkerId = 3, CityId = 3 },
    new WalkerCity { Id = 5, WalkerId = 5, CityId = 5 },
    new WalkerCity { Id = 4, WalkerId = 4, CityId = 4 },
    new WalkerCity { Id = 1, WalkerId = 1, CityId = 1 },
    new WalkerCity { Id = 2, WalkerId = 2, CityId = 2 }
};

List<Cities> cities = new List<Cities>
{
    new Cities { Id = 1, Name = "Inverness" },
    new Cities { Id = 2, Name = "Stornoway" },
    new Cities { Id = 3, Name = "Kirkwall" },
    new Cities { Id = 4, Name = "Lerwick" },
    new Cities { Id = 5, Name = "Thurso" }
};

List<Walkers> walkers = new List<Walkers>
{
    new Walkers { Id = 3, Name = "Nikolai" },
    new Walkers { Id = 5, Name = "Anastasia" },
    new Walkers { Id = 4, Name = "Svetlana" },
    new Walkers { Id = 1, Name = "Vladimir" },
    new Walkers { Id = 2, Name = "Yuri" }
};

List<Dogs> dogs = new List<Dogs>
{
    new Dogs { Id = 4, Name = "Nikita", CityId = 4, WalkerId = 4 },
    new Dogs { Id = 1, Name = "Boris", CityId = 1, WalkerId = 1 },
    new Dogs { Id = 3, Name = "Sasha", CityId = 3, WalkerId = 3 },
    new Dogs { Id = 5, Name = "Dmitri", CityId = 5, WalkerId = 5 },
    new Dogs { Id = 2, Name = "Ivan", CityId = 2, WalkerId = 2 }
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.Run();
