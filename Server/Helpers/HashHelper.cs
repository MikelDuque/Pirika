﻿using System.Security.Cryptography;
using System.Text;

namespace Server.Helpers;

public class HashHelper
{
	public static string Hash(string password)
	{
		byte[] inputBytes = Encoding.UTF8.GetBytes(password);
		byte[] inputHash = SHA256.HashData(inputBytes);
		return Encoding.UTF8.GetString(inputHash);
	}
}
