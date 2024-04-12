using Azure.Storage.Blobs;
using System.Reflection.Metadata;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
                //Verifica se existe o "arquivo"
                if (arquivo != null)
                {
                    //retorna a uri com imagem salva
                    //Gerar um nome unico para a imagem
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);
                    //                   ID sem o -                           +        .Extensao


                    //Cria uma instancia do BlobServiceClient passando a string de conexao com o blob da azure
                    var blobServiceClient = new BlobServiceClient(stringConexao);


                    //obtem dados do Container Client
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);


                    //obtem um blobClient usando o blobName
                    var blobClient = blobContainerClient.GetBlobClient(blobName);


                    //Abre o fluxo de entrada do arquivo (foto)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        await blobClient.UploadAsync(stream, true);

                    }

                    return blobClient.Uri.ToString();
                }
                else
                {
                    //retorna uri padrao
                    return "https://blobvitalhubg13.blob.core.windows.net/blobvitalcontainerg13/ben-sweet-2LowviVHZ-E-unsplash.jpg";
                }
            }
			catch (Exception)
			{

				throw;
			}
        }
    }
}
