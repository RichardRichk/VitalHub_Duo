using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.ViewModels
{
    public class UsuarioViewModel
    {
        [NotMapped]
        [JsonIgnore]
        public IFormFile? Arquivo { get; set; }
        public string? Foto { get; set; }
    }
}
