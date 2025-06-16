﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Server.Helpers;
using Server.Models.DTOs.Auth;
using Server.Database;
using Server.Database.Entities;

namespace Server.Services;

public class AuthService
{
	private readonly UnitOfWork _unitOfWork;
	private readonly TokenValidationParameters _tokenParameters;

	public AuthService(UnitOfWork unitOfWork, IOptionsMonitor<JwtBearerOptions> jwtOptions)
	{
		_unitOfWork = unitOfWork;
		_tokenParameters = jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;
	}

	public async Task<LoginResult> Register(RegisterRequest userData)
	{
		if (await _unitOfWork.UserRepository.GetByMailOrUsername(userData.Mail) != null) throw new Exception("El usuario ya se encuentra registrado");

		User newUser = new User
		{
			DisplayName = userData.DisplayName ?? userData.Username,
			Username = userData.Username,
			Mail = userData.Mail.ToLowerInvariant(),
			Password = HashHelper.Hash(userData.Password),
			Avatar = await FileHelper.SaveAvatar(userData.Avatar, userData.Username),
		};

	User registeredUser = await _unitOfWork.UserRepository.InsertAsync(newUser) ?? throw new Exception("Error al registrar el usuario");
		await _unitOfWork.SaveAsync();
		return Login(registeredUser);
	}

	public async Task<LoginResult> ProceedWithLogin(LoginRequest model)
	{
		User loggedUser = await _unitOfWork.UserRepository.GetByMailOrUsername(model.Identifier) ?? throw new UnauthorizedAccessException("El usuario introducido no existe");

		if (loggedUser.Password != HashHelper.Hash(model.Password)) throw new UnauthorizedAccessException("Usuario o contraseña incorrectos");
		if (loggedUser.IsBanned) throw new UnauthorizedAccessException("El usuario especificado tiene restringido el acceso");

		return Login(loggedUser);
	}

	private LoginResult Login(User user)
	{
		SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
		{
			Claims = new Dictionary<string, object>
			{
				{ "id", user.Id },
				{ ClaimTypes.Name, user.Username},
				{ "displayName", user.DisplayName },
				{ ClaimTypes.Email, user.Mail },
				{ ClaimTypes.Role, user.Role.ToString()},
				{ "avatar", user.Avatar }
			},

			Expires = DateTime.UtcNow.AddHours(1),

			SigningCredentials = new SigningCredentials(_tokenParameters.IssuerSigningKey, SecurityAlgorithms.HmacSha256Signature)
		};

		JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
		SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
		string stringToken = tokenHandler.WriteToken(token);

		return new LoginResult { AccessToken = stringToken };
	}
}
