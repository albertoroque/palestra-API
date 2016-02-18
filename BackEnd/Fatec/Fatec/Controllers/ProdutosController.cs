using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Fatec.Models;

namespace Fatec.Controllers
{

    [RoutePrefix("api/produtos")]
    public class ProdutosController : ApiController
    {
        Produto[] produtos = new Produto[] 
        { 
            new Produto { Id = 1, Nome = "Manga", Categoria = "Alimentos", Preco = 1 }, 
            new Produto { Id = 2, Nome = "Feijão", Categoria = "Alimentos", Preco = 15 }, 
            new Produto { Id = 3, Nome = "Arroz", Categoria = "Alimentos", Preco = 10 }, 
            new Produto { Id = 4, Nome = "iPhone", Categoria = "Eletrônicos", Preco = 3000 }, 
            new Produto { Id = 5, Nome = "Teclado", Categoria = "Eletrônicos", Preco = 35 }, 
        };

        [HttpGet]
        [Route("")]
        public IEnumerable<Produto> ObterTodos()
        {
            return produtos;
        }

        [HttpGet]
        [Route("{texto}")]
        public IEnumerable<Produto> ObterPorTexto(string texto)
        {
            return produtos.Where(model => model.Nome.ToLower().Contains(texto.ToLower()));
        }

        [HttpGet]
        [Route("{id:long}", Name = "GetProdutoById")]
        public IHttpActionResult ObterPorId(long id)
        {
            var produto = produtos.FirstOrDefault((p) => p.Id == id);
            if (produto == null)
            {
                return NotFound();
            }
            return Ok(produto);
        }


        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(Produto produto)
        {
            try
            {
                //Faz a validação dos dados
                if (!ModelState.IsValid)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.PreconditionFailed, ModelState);
                }

                //Faça a chamada da persistência aqui...

                //Monta a resposta HTTP
                var response = Request.CreateResponse(HttpStatusCode.Created, produto);

                //Gera um link para o novo produto e define o header da localização na resposta HTTP
                string uri = Url.Link("GetProdutoById", new { id = produto.Id });
                response.Headers.Location = new Uri(uri);
                return response;
            }
            catch (Exception ex)
            {

                //Salva o erro no log... 

                //Envia a resposta com a mensagem de erro amigável
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { Message = "Algo deu errado!" });
            }
        }


        [HttpPut]
        [Route("{id}")]
        public HttpResponseMessage Put(long id, Produto produto)
        {
            try
            {
                //Faz a validação dos dados
                if (!ModelState.IsValid)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.PreconditionFailed, ModelState);
                }

                //Faça a chamada da persistência aqui...

                //Monta a resposta HTTP
                var response = Request.CreateResponse(HttpStatusCode.OK, produto);

                //Gera um link para o novo produto e define o header da localização na resposta HTTP
                string uri = Url.Link("GetProdutoById", new { id = produto.Id });
                response.Headers.Location = new Uri(uri);
                return response;
            }
            catch (Exception ex)
            {

                //Salva o erro no log... 

                //Envia a resposta com a mensagem de erro amigável
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { Message = "Algo deu errado!" });
            }
        }


        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage Delete(long id)
        {
            try
            {
                var produto = produtos.FirstOrDefault((p) => p.Id == id);
                if (produto == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                //Faça a chamada da persistência aqui...

                //Envia a resposta com a mensagem de sucesso
                return Request.CreateResponse(HttpStatusCode.OK, new { Message = "Produto excluido com sucesso!" });
            }
            catch (Exception ex)
            {

                //Salva o erro no log... 

                //Envia a resposta com a mensagem de erro amigável
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { Message = "Algo deu errado!" });
            }
        }        

    }
}
