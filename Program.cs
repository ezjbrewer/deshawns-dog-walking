using deshawnsdogwalking.Models;
using deshawnsdogwalking.Models.DTOs;

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

// Endpoints below this line

app.MapGet("/api/dogs", () => {
    foreach (Dogs dog in dogs)
    {
        dog.Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
        dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);
    }

    return dogs.Select(d => new DogsDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        Walker = d.Walker,
        CityId = d.CityId,
        City = d.City
    }).ToList();
});

app.MapGet("/api/cities", () =>
{
    return cities.Select(c => new CitiesDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dogs dog = dogs.FirstOrDefault(d => d.Id == id);

    Walkers walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    Cities city = cities.FirstOrDefault(c => c.Id == dog.CityId);
    
    return new DogsDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        Walker = walker == null ? new Walkers { Id = 0, Name = "Unassigned" } : walker,
        CityId = dog.CityId,
        City = dog.City
    };
});

app.MapPost("/api/dogs", (Dogs dog) =>
{
    dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);

    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);

    return Results.Created($"/dogs/{dog.Id}", new DogsDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        City = dog.City
    });
});

app.Run();
