namespace deshawnsdogwalking.Models.DTOs;

public class WalkerCityDTO
{
    public int Id { get; set; }
    public int WalkerId { get; set; }
    public Walkers Walker { get; set; }
    public int CityId { get; set; }
    public Cities City { get; set; }
}