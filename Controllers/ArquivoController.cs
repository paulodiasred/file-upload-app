using FileUploadApp.Data;
using FileUploadApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace FileUploadApp.Controllers
{
    public class ArquivoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ArquivoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Upload()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Upload(List<IFormFile> arquivos)
        {
            if (arquivos == null || arquivos.Count == 0)
            {
                return Json(new { success = false, message = "Nenhum arquivo foi enviado." });
            }

            foreach (var arquivo in arquivos)
            {
                if (arquivo.Length > 0)
                {
                    // Defina o caminho onde o arquivo será salvo
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", arquivo.FileName);

                    // Salva o arquivo na pasta uploads
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await arquivo.CopyToAsync(stream);
                    }
                    // Salva os metadados no banco de dados
                    var novoArquivo = new Arquivo
                    {
                        NomeArquivo = arquivo.FileName,
                        CaminhoArquivo = "/uploads/" + arquivo.FileName,
                        DataEnvio = DateTime.Now
                    };

                    _context.Arquivos.Add(novoArquivo);
                }
            }
            await _context.SaveChangesAsync();
            return Json(new { success = true, message = "Arquivos enviados com sucesso!" });
        }

        public IActionResult Lista()
        {
            var arquivos = _context.Arquivos.ToList();
            return View(arquivos);
        }
    }
}
