using Server.Models.Enums;

namespace Server.Models.DTOs;

public class BasicElement
{
	public long Id { get; set; }
	public string Name { get; set; }
	public string Image {  get; set; }
	public ElementType Type { get; set; }
	public IEnumerable<BasicElement> SubElements { get; set; }
}
