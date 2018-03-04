using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using EducationManagement.Database;
using EducationManagement.Database.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace EducationSystem.API
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

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
            //services.Configure<AppConnectionStrings>(Configuration.GetSection("ConnectionStrings"));
            services.AddMvc();

            var connection = @"Server=DESKTOP-DC8DPTO;Database=EducationManagement;user id=sa;password=12345;Trusted_Connection=True;";
            services.AddDbContext<EducationManagementContext>(options => options.UseSqlServer(connection));
            //services.AddDbContext<EducationManagementContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<EducationManagementContext>()
            //    .AddDefaultTokenProviders();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder

                    .WithOrigins("http://localhost:3000")

                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            // Add framework services.
            //services.AddTransient<IUnitOfWork, UnitOfWork>();

            //services.AddAutoMapper();

            services.AddMvc();

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


            app.UseMvc();

            //Generate EF Core Seed Data
            //((DataBaseInitializer)dbInitializer).Initialize().Wait();
        }
    }
}
