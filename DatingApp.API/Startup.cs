using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                // The below option fixes issues like the below
                // fail: Microsoft.AspNetCore.Server.Kestrel[13]
                // Connection id "0HLH7GM9OPUNC", Request id "0HLH7GM9OPUNC:00000001": An unhandled exception was thrown by the application.
                // Newtonsoft.Json.JsonSerializationException: Self referencing loop detected for property 'user' with type 'DatingApp.API.Models.User'.Path '[0].photos[0]'.
                // This error in Postman is only shown as ==> Expected ',' instead of ''
                .AddJsonOptions(options => {
                    options.SerializerSettings.ReferenceLoopHandling = 
                    Newtonsoft.Json.ReferenceLoopHandling.Ignore;                    
                });

            // CORS - Cross-Origin Resource Sharing.  It is a security measure which allows which
            // client to access our API.
            // Our Angular app domain is http://localhost:4200/ and our API domain is http://localhost:5000/
            // Initially, when running the Angular app, we will have a console error:
            // No 'Access-Control-Allow-Origin' header is present on the requested resource.
            // We will add a little bit loose cross-origin resource sharing policy to our API
            services.AddCors();

            // Register AuthRepository and make it available for dependency injection
            // throughout the app.  
            // AddSingleton -- which means we will create a single instance of our Repository 
            // throughout the application but this will create some issues with concurrent 
            // http request
            // AddTransient -- useful for lightweight stateless services because these are
            // created each time they are requested
            // AddScoped -- which means the service is created per request within the scope
            // of the same http request.  Equivalent to AddSingleton but in the current scope
            // itself.  It creates one instance for each different http request but uses the same
            // instance in other codes within the same work request.  Suitable for the Repository
            // that we are creating.
            // In order to use AddScoped, we will specify the interface and the 
            // concrete implementation of the interface
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDatingRepository, DatingRepository>();

            // Add the Seed class
            services.AddTransient<Seed>();

            // We need to add authentication middleware as a service and we need to tell ASP.NET Core
            // what type of authentication we are using
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("SecuritySettings:Token").Value)),
                        // Our issuer and audience is localhost so we don't need to validate
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, 
            Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // If we are not in development, then we will use a global exception
                // handler and this exception handler adds middleware to our pipeline
                // that will catch exceptions, log them, and re-execute the request in an
                // alternate pipeline.
                app.UseExceptionHandler(builder => {
                    // Adds a terminal middleware delegate to the application
                    // request pipeline
                    // The Run() method can access the http request/response context
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();

                        if (error != null)
                        {
                            // We are going to extend context.Response so that we can add our
                            // own custom error response headers
                            context.Response.AddApplicationError(error.Error.Message);

                            await context.Response.WriteAsync(error.Error.Message);                            
                        }
                    });
                });
            }

            // Seed the users
            // Just uncomment this if we ever we need to seed our database
            //seeder.SeedUsers();

            // We need to call this before we will be calling UseMvc()
            // This is very loose policy and is suitable only when developing
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // We can now tell our applicatin about the authentication we have setup
            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
