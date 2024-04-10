using WebAPI.Contexts;
using WebAPI.Domains;

namespace WebAPI.Repositories
{
    public class ExameRepository
    {
        public VitalContext ctx = new VitalContext();

        public List<Exame> BuscarPorIdConsulta(Guid idConsulta)
        {
            try
            {
                return ctx.Exames
                    .Where(x => x.ConsultaId == idConsulta)
                    .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Exame exame)
        {
            try
            {
                ctx.Exames.Add(exame);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
