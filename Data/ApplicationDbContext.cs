using Microsoft.EntityFrameworkCore;
using FileUploadApp.Models;

namespace FileUploadApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Arquivo> Arquivos { get; set; } //Representa a tabela de arquivos no banco de dados.
    }
}
