using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            // Customize the headers returned to the client (ex Angular client) when 
            // the ASP.NET CORE API throws an error and return to the client 
            // the error message.  This will also eliminate the below error
            // message thrown in the Dev console (F12): 

            // Failed to load http://localhost:5000/api/auth/login: 
            // No 'Access-Control-Allow-Origin' header is present on the requested resource. 
            // Origin 'http://localhost:4200' is therefore not allowed access. 
            // The response had HTTP status code 500.

            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}
