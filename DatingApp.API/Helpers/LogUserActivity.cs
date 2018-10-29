using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context">This is used if we want to do something while the action is executed</param>
        /// <param name="next">This allows us to run some code after the action has been executed. </param>
        /// <returns></returns>
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Inside this resultContext would be a type of 'ActionExecutedContext'
            // and this will give us access to things like HttpContext for the action
            // that has been executed
            var resultContext = await next();

            // We will get the userId from the token
            var userId = int.Parse(resultContext.HttpContext.User
                .FindFirst(ClaimTypes.NameIdentifier).Value);

            // We will get an instance of our repo
            // We are using RequestServices in this case because the IDatingRepository
            // is provided as a service in our dependency injection container 
            // inside our Startup class
            var repo = resultContext.HttpContext.RequestServices
                .GetService<IDatingRepository>();

            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}
