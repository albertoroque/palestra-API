using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fatec.Models
{
    public class Produto
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public decimal Preco { get; set; }
    }
}