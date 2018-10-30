using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;

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

        public static void AddPagination(this HttpResponse response, int currentPage, 
            int itemsPerPage, int totalItems, int totalPages)
        {
            // This deals with what we are sending 'back' to the client

            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage,
                totalItems, totalPages);

            // This will return in the header in the TitleCase something like
            // Pagination →{"CurrenPage":1,"ItemsPerPage":10,"TotalItems":14,"TotalPages":2}
            // But, since we will be consuming these headers on Angular, then we
            // will change the formatting into camelCase
            var camelCaseFormatter = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, 
                camelCaseFormatter));

            // We need to add Access-Control-Expose-Headers so that we will not get
            // a CORS error
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }

        public static int CalculateAge(this DateTime birthDate)
        {
            var age = DateTime.Today.Year - birthDate.Year;

            // If adding years to birthDate property makes it greater
            // than today's date, then it means the user is not
            // celebrating his birthday yet this year
            if (birthDate.AddYears(age) > DateTime.Today)
            {
                age--;
            }

            return age;
        }
    }
}
