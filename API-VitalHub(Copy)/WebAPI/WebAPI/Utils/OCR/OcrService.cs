using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "f034f9d7fe0e4f2aa3132c0c7b3de1e9";

        private readonly string _endpoint = "https://cvvitalhubg13.cognitiveservices.azure.com/";

        //metodo para reconhecer o caracter(texto) a partir de uma imagem
        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {

                //cria um cliente para API de Computer Vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //Faz a chamada para a API
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //Processa o resultado e retorna o texto
                return ProcessRecognitionResult(ocrResult);

            }
            catch (Exception ex)
            {

                return "Erro ao reconhecer o texto" + ex.Message;
            }
        }


        public static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            //percorre todas as regioes
            foreach (var region in result.Regions)
            {
                //para cada regiao, percorre as linhas
                foreach (var line in region.Lines)
                {
                    //para cada linha percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //adicona cada palavra ao texto, separando com espaco
                        recognizedText += word.Text + " ";
                    }

                    //quebra de linha ao final de cada linha
                    recognizedText += "\n";
                }
            }

            //retorna o texto
            return recognizedText;
        }
    }
}
