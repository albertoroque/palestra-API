using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Fatec
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Suporte ao CORS
            EnableCorsAttribute CorsAttribute = new EnableCorsAttribute("*", "*", "GET, POST, PUT, DELETE");
            config.EnableCors(CorsAttribute);
            
            //Rotas da Web API
            config.MapHttpAttributeRoutes();

            //Rotas convencionais
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}



