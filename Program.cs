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

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Inverness" },
    new City { Id = 2, Name = "Stornoway" },
    new City { Id = 3, Name = "Kirkwall" },
    new City { Id = 4, Name = "Lerwick" },
    new City { Id = 5, Name = "Thurso" }
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 3, Name = "Nikolai" },
    new Walker { Id = 5, Name = "Anastasia" },
    new Walker { Id = 4, Name = "Svetlana" },
    new Walker { Id = 1, Name = "Vladimir" },
    new Walker { Id = 2, Name = "Yuri" }
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 4, Name = "Nikita", CityId = 4, WalkerId = 4 },
    new Dog { Id = 1, Name = "Boris", CityId = 1, WalkerId = 1 },
    new Dog { Id = 3, Name = "Sasha", CityId = 3, WalkerId = 3 },
    new Dog { Id = 5, Name = "Dmitri", CityId = 5, WalkerId = 5 },
    new Dog { Id = 2, Name = "Ivan", CityId = 2, WalkerId = 2 }
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
    foreach (Dog dog in dogs)
    {
        dog.Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
        dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);
    }

    return dogs.Select(d => new DogDTO
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
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);

    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);
    
    return new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        Walker = walker == null ? new Walker { Id = 0, Name = "Unassigned" } : walker,
        CityId = dog.CityId,
        City = dog.City
    };
});

app.MapPost("/api/dogs", (Dog dog) =>
{
    dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);

    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);

    return Results.Created($"/dogs/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        City = dog.City
    });
});

app.Run();
