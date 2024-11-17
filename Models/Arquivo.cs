namespace FileUploadApp.Models
{
    public class Arquivo
    {
        public int Id { get; set; } // Um indetificador unico para cada arquivo
        public string NomeArquivo { get; set; } // O nome original do arquivo
        public string CaminhoArquivo { get; set; } // O caminho onde o arquivo está salvo
        public DateTime DataEnvio { get; set; } // A data em que o arquivo foi enviado
    }
}
