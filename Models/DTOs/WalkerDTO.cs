namespace deshawnsdogwalking.Models.DTOs;

public class WalkerDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<WalkerCityDTO> WalkerCities { get; set; } 
};