namespace deshawnsdogwalking.Models;

public class Walker
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<City> AssignedCities { get; set; }
}