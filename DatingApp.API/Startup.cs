using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
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
        // This configuration service is now used in production mode since we already
        // specify another configuration service for development which is the ConfigureDevelopmentServices
        public void ConfigureServices(IServiceCollection services)
        {
            // We can now change this to the data provider we want for production
            // We can have Sqlite for development and MySQL for production
            // We also added a configuration to ignore warnings in production
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
                // Added a configuration to ignore warnings in the console
                .ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.IncludeIgnoredWarning)));

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

            // Coming from Sqlite in development, we will create a new migration using 
            // Sql Server inside Azure
            // By using Database.Migrate(), this applies any pending migrations for the
            // context to the database.  This will create the database if it does not
            // already exists.
            services.BuildServiceProvider().GetService<DataContext>().Database.Migrate();

            // CORS - Cross-Origin Resource Sharing.  It is a security measure which allows which
            // client to access our API.
            // Our Angular app domain is http://localhost:4200/ and our API domain is http://localhost:5000/
            // Initially, when running the Angular app, we will have a console error:
            // No 'Access-Control-Allow-Origin' header is present on the requested resource.
            // We will add a little bit loose cross-origin resource sharing policy to our API
            services.AddCors();

            // We will be strongly-typing the CloudinarySettings found in appsettings.json
            // We will be registering a confguration instance which will be bind against
            // and in our case, we want to bind "CloudinarySettings" section from appsettings.json
            // to the properties we defined in the class "CloudinarySettings"
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

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

            // Add the AutoMapper services
            services.AddAutoMapper();

            // We want to create LogUserActivity per request so we will
            // be using AddScoped
            services.AddScoped<LogUserActivity>();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // This is the configuration services that will be called when in development mode
        // This is very helpful if we want to use Sqlite for development and then use another
        // DB for production.
        // ASP.NET provides a 'convention way' of doing so that is why we added the word 'Development'
        // in the method name
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            // This the configuration for Identity.  There are lots of configurations
            // for Identity but we are making the configurations now as simple as possible
            // AddIdentity --- is the complete .net core identity system and if you are 
            // creating a .net core mvc project, then this would be a good one to use. But
            // this one also includes cookie-based authentication and it automatically includes
            // methods to redirect the user back to a default log-in page and this is all
            // based on the razor views in mvc.
            // AddIdentityCore --- since we are using Angular and not razor view, then we will
            // use this which is only the shell for identity and we are just going to add
            // the individual pieces we are using for identity which means we are going to
            // avoid using cookie-based authentication and stick with our JWT token-bearer
            // system that we are using up to now.
            var builder = services.AddIdentityCore<User>(options =>
            {
                // We are configuring this just for development to allow
                // weak passwords we are currently using.  In production,
                // we need to make this strict
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });

            // NOTE: The 'builder' code below is not necessary if we are using AddIdentity
            // and not AddIdentityCore.
            // We need to add a configuration which is based on the facts that we need to 
            // query a user and pull back all of its role at the same time.  This kind of
            // information is almost hard to come-by since Microsoft's documentation around
            // this is not that great.
            // We are now creating a new instance of the IdentityBuilder with parameters
            // in which builder.UserType is coming from the builder we just configured above,
            // the Role type, and the builder.Services which is the IServiceCollection that
            // we want to attach to.
            // And in this builder, we want to add the entity framework classes that's gonna provide
            // the functionality that we are going to use for Identity
            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            // We are telling Identity that we want to use entity framework as our store
            // And, if we add a new migration, you will see tables created for identity
            builder.AddEntityFrameworkStores<DataContext>();
            // A service that checks the roles
            builder.AddRoleValidator<RoleValidator<Role>>();
            // A service that creates and remove roles
            builder.AddRoleManager<RoleManager<Role>>();
            // A service that allows the user to log-in
            builder.AddSignInManager<SignInManager<Role>>();

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

            // Inside MVC, we are adding options which is an authorization filter
            // so that every request is automatically authenticated or we require
            // authentication for every requests rather than using the [Authorized]
            // attribute in each of the controllers
            services.AddMvc(options => {
                var policy = new AuthorizationPolicyBuilder()
                    // This is going to require authentication globally
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));

            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                // The below option fixes issues like the below
                // fail: Microsoft.AspNetCore.Server.Kestrel[13]
                // Connection id "0HLH7GM9OPUNC", Request id "0HLH7GM9OPUNC:00000001": An unhandled exception was thrown by the application.
                // Newtonsoft.Json.JsonSerializationException: Self referencing loop detected for property 'user' with type 'DatingApp.API.Models.User'.Path '[0].photos[0]'.
                // This error in Postman is only shown as ==> Expected ',' instead of ''
                .AddJsonOptions(options =>
                {
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

            // We will be strongly-typing the CloudinarySettings found in appsettings.json
            // We will be registering a confguration instance which will be bind against
            // and in our case, we want to bind "CloudinarySettings" section from appsettings.json
            // to the properties we defined in the class "CloudinarySettings"
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

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

            // Add the AutoMapper services
            services.AddAutoMapper();

            // We want to create LogUserActivity per request so we will
            // be using AddScoped
            services.AddScoped<LogUserActivity>();
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
            seeder.SeedUsers();

            // We need to call this before we will be calling UseMvc()
            // This is very loose policy and is suitable only when developing
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // We can now tell our application about the authentication we have setup
            app.UseAuthentication();

            // If we ran localhost:5000 without adding /api/xxxx/, we will get a 
            // page can't be found error.  So, we need to configure our Kestrel
            // server and tell it that we want to serve static files from the
            // wwwroot folder.  
            // By adding UseDefaultFiles(), we are telling our Kestrel server to
            // serve index.html, or index.aspx, or index.htm or any default files
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // If we refresh a page, for example localhost:5000/members, we will get
            // a page can't be found error.  This is because our API has no idea
            // what it should do if it has a route called /members since this is never
            // defined in any of the controllers.  These are routes that are being 
            // handled by Angular and not the API.
            // So, what we are going to do is to tell our API which routes should be
            // handled by Angular since it the API already know which routes are being
            // handled by itself.
            app.UseMvc(routes => {
                // Configures a route that is automatically bypassed if the requested
                // URL appears to be for a static file
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Fallback", action = "Index" }
                );
            });
        }
    }
}
