using System.Text;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.Filters;

using Server.Database;
using Server.Database.Repositories;
using Server.Websocket;
using Server.Services;
using Server.Models.Mappers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder.AllowAnyOrigin()
		.AllowAnyHeader()
		.AllowAnyMethod();
	});
});
builder.Services.AddAuthentication().AddJwtBearer(options =>
{
	string key = Environment.GetEnvironmentVariable("JWT_KEY");

	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = false,
		ValidateAudience = false,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
	};
});
builder.Services.AddSwaggerGen(options =>
{
	options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
	{
		BearerFormat = "JWT",
		Name = "Authorization",
		Description = "Introduce el sistema de autenticaci�n de token en la cabecera de las peticiones http",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.Http,
		Scheme = JwtBearerDefaults.AuthenticationScheme
	});
	options.OperationFilter<SecurityRequirementsOperationFilter>(true, JwtBearerDefaults.AuthenticationScheme);
});

/* WEBSOCKET */
builder.Services.AddTransient<MyWebSocketMiddleware>();
builder.Services.AddSingleton<WebSocketNetwork>();
/* DATABASE */
builder.Services.AddScoped<DataContext>();
builder.Services.AddScoped<UnitOfWork>();
/* REPOSITORIES */
builder.Services.AddScoped<GenreRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<MusicRepository>();
builder.Services.AddScoped<SongRepository>();
builder.Services.AddScoped<CollectionRepository>();
builder.Services.AddScoped<FollowRepository>();
/* MAPPERS */
builder.Services.AddScoped<GenreMapper>();
builder.Services.AddScoped<CollaborationMapper>();
builder.Services.AddScoped<CollectionMapper>();
builder.Services.AddScoped<SongMapper>();
builder.Services.AddScoped<ArtistMapper>();
builder.Services.AddScoped<BasicElementMapper>();
builder.Services.AddScoped<FollowMapper>();
/* SERVICES */
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<MusicService>();
builder.Services.AddScoped<UserService>();

var app = builder.Build();

SeedDatabase(app.Services);

app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"))
});

app.UseWebSockets();
app.UseMiddleware<MyWebSocketMiddleware>();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.Run();

/* ---------- */
static void SeedDatabase(IServiceProvider serviceProvider)
{
	using IServiceScope scope = serviceProvider.CreateScope();
	using DataContext dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();

	if (dbContext.Database.EnsureCreated())
	{
		Seeder seeder = new Seeder(dbContext);
		seeder.SeedAll();
	}
}