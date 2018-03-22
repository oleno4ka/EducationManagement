using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using EducationManagement.Database;
using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;
using EducationSystem.Dal.Concreteness;
using EducationSystem.Models;
using EducationSystem.Models.BindingModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace EducationSystem.API
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }
        private const string TOKEN = "token";

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppConnectionStrings>(Configuration.GetSection("ConnectionStrings"));
            services.Configure<JWTOptions>(Configuration.GetSection("Tokens"));

            services.AddMvc();

            services.AddDbContext<EducationManagementContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TestingConnectionString")));

            //services.AddIdentity<User, IdentityRole>()
            //    .AddEntityFrameworkStores<EducationManagementContext>()
            //    .AddDefaultTokenProviders();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            // Add framework services.
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddScoped<EducationManagementContext, EducationManagementContext>();
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<EducationManagementContext>()
                .AddDefaultTokenProviders()
                .AddRoleValidator<RoleValidator<Role>>()
                .AddRoleManager<RoleManager<Role>>()
                .AddSignInManager<SignInManager<User>>();
            //services.AddAutoMapper();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                //options.Password.RequiredUniqueChars = 6;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            //JWT
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = Configuration["Tokens:Issuer"],
                    ValidAudience = Configuration["Tokens:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = (MessageReceivedContext context) =>
                    {
                        if (/*context.HttpContext.WebSockets.IsWebSocketRequest &&*/ context.Request.Query.ContainsKey(TOKEN))
                        {
                            // pull the bearer token out of the QueryString for WebSocket connections
                            //_logger.LogInformation($"{nameof(OnMessageReceived)} processing websocket querystring authentication");
                            context.Token = context.Request.Query[TOKEN];
                        }
                        return System.Threading.Tasks.Task.CompletedTask;
                    }
                };
            });

            var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("DefaultPolicy", policy);
                options.DefaultPolicy = policy;
            });

            services.AddMvc(config =>
            {
                config.Filters.Add(new AuthorizeFilter(policy));
            });

            ///Default JSON Serializer settings to handle looping references
            ///

            services.AddMvcCore().AddFormatterMappings().AddJsonFormatters()
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                options.SerializerSettings.DateParseHandling = DateParseHandling.DateTimeOffset;
                options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;

            });
            // Add Database Initializer
            // services.AddScoped<IDataBaseInitializer, DataBaseInitializer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseCors("CorsPolicy");

            app.UseExceptionHandler(
            options =>
            {
                options.Run(
                async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "text/html";
                    var ex = context.Features.Get<IExceptionHandlerFeature>();
                    if (ex != null)
                    {
                        var err = "{ Error:" + $"{ ex.Error.Message}, ErrorTrace: {ex.Error.StackTrace }" + "}";
                        await context.Response.WriteAsync(err).ConfigureAwait(false);
                    }
                });
            });

            app.UseAuthentication();
            app.UseMvc();

            //Generate EF Core Seed Data
            //((DataBaseInitializer)dbInitializer).Initialize().Wait();
        }
    }
}
