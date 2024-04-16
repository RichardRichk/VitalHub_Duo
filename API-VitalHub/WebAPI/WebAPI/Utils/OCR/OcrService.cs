using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "eded0f0451eb4488ad4511a7498eef1e";

        private readonly string _endpoint = "https://cvvitalhubg13m.cognitiveservices.azure.com/";

        public async Task <string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                //Cria um client para Api de Computer Vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //Faz a chamada para Api
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //processa o resultado e retorna o texto reconhecido
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception ex)
            {
                return "Erro ao reconhecer o texto" + ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";

            //percorre todas as regioes 
            foreach (var region in result.Regions)
            {
                //para cada regiao, percorre as linhas
                foreach(var line in region.Lines)
                {
                    //para cada linha, percorre as palavras
                    foreach(var word in line.Words)
                    {
                        //adiciona cada palavra ao texto, separando com espaco
                        recognizedText += word.Text + "";
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
