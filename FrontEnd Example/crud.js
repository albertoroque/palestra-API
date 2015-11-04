 // GET PRODUTOS
 var btn1 = document.getElementById("get-produto");
 btn1.onclick = function() 
 {
	 $.ajax
	 ({
		 method: "GET",
		 url: "http://localhost:55130/api/produtos",
		 dataType: "json"
	 }).then(function(response) 	 	
	 	{
	 	  var produtos = response;
		  for ( var i in produtos ) 
		  {	
		  	//LIMPA A LISTA
		  	$("#lista-produtos-texto").empty();	
		  	//ANEXA NA LISTA COM O NOME "lista-produtos"  	
		 	$("#lista-produtos").append("<li>" + produtos[i].Nome + "</li><br>");
	 	  };
	 	});
 };


 // GET PRODUTOS BY TEXT
 var btn2 = document.getElementById("get-produto-texto"); 
 btn2.onclick = function() 
 {
 	 var texto = $('#produto-texto').val();

	 $.ajax
	 ({
		 method: "GET",
		 url: "http://localhost:55130/api/produtos/" + texto,		 		
		 dataType: "json"
	 }) 
	    .success(function(response) 	 	
	 	{
	 	  var produtos = response;
	 	  //CONSOLE.LOG mostra dados da requisição na Aba de Desenvolvedor do Navegador
	 	  console.log(produtos);
	 	  if(produtos.length)
	 	  {
	 	  	console.log("entrou no not null");
	 	  	  for ( var i in produtos ) 
			  {	
			  	$("#lista-produtos-texto").empty();  	
			 	$("#lista-produtos-texto").append("<li>" + produtos[i].Nome + "</li><br>");
		 	  };
	 	  }
	 	  else
	 	  {
	 	  	console.log("entrou no null");
	 	  	var mensagem = "A pesquisa não obteve resultados!";
	 	  	$("#lista-produtos-texto").empty(); 
	 	  	$("#lista-produtos-texto").append("<li>"+ mensagem + "</li>");	    	
	 	  }		  
	 	})

	    .error(function(){
	    	$("#lista-produtos-texto").append("<li> Erro na requisição GET PROD BY TEXT </li>");	    	
	    });
 };

 // GET PRODUTOS BY ID
 // nesse método o request do C# devolve um único Object, logo não necessitamos usar o FOR 
 var btn3 = document.getElementById("get-produto-id"); 
 btn3.onclick = function() 
 {
 	 var id = $('#produto-id').val();
 	 console.log(id);
	 $.ajax
	 ({
		 method: "GET",
		 url: "http://localhost:55130/api/produtos/" + id,				
		 dataType: "json"
	 }) 
	    .success(function(response) 	 	
	 	{
	 	  var produtos = response;	 	  
	 	  if(produtos != null)
	 	  {	 		 	  	    	 	  	  
			 $("#lista-produtos-id").empty();  	
			 $("#lista-produtos-id").append("<li> Nome:" + produtos.Nome + " | Preço:" + produtos.Preco +"</li><br>");		 	 
	 	  }
	 	  else
	 	  {	 
	 	  	//O ELSE NUNCA VAI ENTRAR AQUI, POIS O C# MANDA UM HTTP ERROR (404) CASO O OBJECT SEJA NULO.	  
	 	  	var mensagem = "A pesquisa não obteve resultados!";
	 	  	$("#lista-produtos-id").empty(); 
	 	  	$("#lista-produtos-id").append("<li>"+ mensagem + "</li>");	    	
	 	  }		  
	 	})

	    .error(function(){
	    	$("#lista-produtos-id").empty();
	    	$("#lista-produtos-id").append("<li> Erro na requisição GET PROD BY ID </li>");	    	
	    });
 };

 // POST PRODUTO   
 var btn4 = document.getElementById("post-produto"); 
 btn4.onclick = function() 
 { 	 
 	 var nome = $('#produto-nome').val(); 	 
 	 var categoria =  $('#produto-categoria').val();
 	 var preco =  $('#produto-preco').val(); 
 	 
	 $.ajax
	 ({
		 method: "POST",
		 url: "http://localhost:55130/api/produtos",
		 //valr do tipo no C# : calor capturado no formulário
		 data: {Nome : nome, Categoria : categoria, Preco : preco},			
		 dataType: "json"
	 }) 
	    .success(function(response) 	 	
	 	{	 	 	 	 
	 	  if(response != null)
	 	  {	 		 	  	    	 	  	  
			 $("#post-response").empty();  				 
			 $("#post-response").append("<p> Nome:" + response.Nome + "</p>");
			 $("#post-response").append("<p> Categoria:" + response.Categoria + "</p>");
			 $("#post-response").append("<p> Preço:" + response.Preco +"</p><br>");		 	 
	 	  }
	 	  else
	 	  {	 	 	  		 
	 	  	var mensagem = "Erro ao enviar dados!";
	 	  	$("#post-response").empty(); 
	 	  	$("#post-response").append("<li>"+ mensagem + "</li>");	    	
	 	  }		  
	 	})

	    .error(function(responseText)
	    {	    		    	    
	    	var msg = responseText.responseText;
	    	var obj = JSON.parse(msg);	
	    	$("#post-response").empty();
	    	$("#post-response").append("<br>"+ obj.Message);						
	    	var validation = obj.ModelState;
	    	console.log(validation);	    		    		    	  	    	   
	    	$("#post-response").append(validation.produto.Preco[0]);  	    
	    });
 };


// PESQUISA PRODUTO PARA EDIÇÃO
var btnP = document.getElementById("put-produto-pesquisa"); 
btnP.onclick = function()
{
	 var id = $('#produto-id').val();
 	 console.log(id);
	 $.ajax
	 ({
		 method: "GET",
		 url: "http://localhost:55130/api/produtos/" + id,				
		 dataType: "json"
	 }) 
	    .success(function(response) 	 	
	 	{
	 	  var produtos = response;	 	  
	 	  if(produtos != null)
	 	  {	 		 	  	    	 	  	  
			 $("#lista-produtos-id").empty();  	
			 $("#lista-produtos-id").append("<li> Nome:" + produtos.Nome + " | Preço:" + produtos.Preco +"</li><br>");		 	 
	 	  }
	 	  else
	 	  {	 
	 	  	//O ELSE NUNCA VAI ENTRAR AQUI, POIS O C# MANDA UM HTTP ERROR (404) CASO O OBJECT SEJA NULO.	  
	 	  	var mensagem = "A pesquisa não obteve resultados!";
	 	  	$("#lista-produtos-id").empty(); 
	 	  	$("#lista-produtos-id").append("<li>"+ mensagem + "</li>");	    	
	 	  }		  
	 	})

	    .error(function(){
	    	$("#lista-produtos-id").empty();
	    	$("#lista-produtos-id").append("<li> Erro na requisição GET PROD BY ID </li>");	    	
	    });
};

 // PUT PRODUTO   
 var btn5 = document.getElementById("post-produto"); 
 btn5.onclick = function() 
 { 	  	 
	 $.ajax
	 ({

		 method: "PUT",
		 url: "http://localhost:55130/api/produtos",
		 //valr do tipo no C# : calor capturado no formulário
		 data: {Nome : nome, Categoria : categoria, Preco : preco},			
		 dataType: "json"
	 }) 
	    .success(function(response) 	 	
	 	{	 	 	 	 
	 	  if(response != null)
	 	  {	 		 	  	    	 	  	  
			 $("#post-response").empty();  				 
			 $("#post-response").append("<p> Nome:" + response.Nome + "</p>");
			 $("#post-response").append("<p> Categoria:" + response.Categoria + "</p>");
			 $("#post-response").append("<p> Preço:" + response.Preco +"</p><br>");		 	 
	 	  }
	 	  else
	 	  {	 	 	  		 
	 	  	var mensagem = "Erro ao enviar dados!";
	 	  	$("#post-response").empty(); 
	 	  	$("#post-response").append("<li>"+ mensagem + "</li>");	    	
	 	  }		  
	 	})

	    .error(function(responseText)
	    {	    		    	    
	    	var msg = responseText.responseText;
	    	var obj = JSON.parse(msg);	
	    	$("#post-response").empty();
	    	$("#post-response").append("<br>"+ obj.Message);						
	    	var validation = obj.ModelState;
	    	console.log(validation);	    		    		    	  	    	   
	    	$("#post-response").append(validation.produto.Preco[0]);  	    
	    });
 };


 // DELETE PRODUTO   
 var btn6 = document.getElementById("delete-produto"); 
 btn6.onclick = function() 
 { 	  	
 	var id = $('#produto-id-del').val();  	 
	 $.ajax
	 ({
		 method: "DELETE",
		 url: "http://localhost:55130/api/produtos/" + id,		 
		 dataType: "json"
	 }) 
	    .success(function(response) 	 	
	 	{

	 	  console.log(response);

	 	  if(response != null)
	 	  {	 		 	  	    	 	  	  
			 $("#delete-response").empty();  				 
			 $("#delete-response").append("<br>" + response.Message);				 	
	 	  }
	 	  else
	 	  {	 	 	  		 
	 	  	var mensagem = "Erro ao enviar dados!";
	 	  	$("#delete-response").empty(); 
	 	  	$("#delete-response").append("<br><li>"+ mensagem + "</li>");	    	
	 	  }		  
	 	})

	    .error(function(responseText)
	    {	    		    	    
	    	 var mensagem = "Erro ao enviar dados!";
	 	  	$("#delete-response").empty(); 
	 	  	$("#delete-response").append("<br><li>"+ mensagem + "</li>"); 	    
	    });
 };