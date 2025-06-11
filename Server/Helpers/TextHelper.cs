using System.Diagnostics;
using System.Globalization;
using System.Text;
using F23.StringSimilarity;
using F23.StringSimilarity.Interfaces;

namespace eCommerce.Services;

public static class TextHelper
{
	private const double THRESHOLD = 0.80;

	//private readonly INormalizedStringSimilarity _stringSimilarityComparer;

	//public TextHelper()
	//{
	//	_stringSimilarityComparer = new JaroWinkler();
	//}

	private static readonly JaroWinkler _stringSimilarityComparer = new();

	public static IEnumerable<T> SearchFilter<T>(IEnumerable<T> elementList, string search, Func<T, string> stringSelector)
	{
		Debug.WriteLine(search);
		List<T> listaFiltrada = [];

		if (!string.IsNullOrWhiteSpace(search))
		{
			string[] searchTokens = GetTokens(ClearText(search));

			foreach (T element in elementList)
			{
				string targetText = stringSelector(element) ?? string.Empty;
				string[] elementNameTokens = GetTokens(ClearText(targetText));

				if (IsMatch(searchTokens, elementNameTokens))
				{
					listaFiltrada.Add(element);
				}
			}

			return listaFiltrada;
		}
		return elementList;
	}

	private static bool IsMatch(string[] queryKeys, string[] itemKeys)
	{
		bool isMatch = false;

		for (int i = 0; !isMatch && i < itemKeys.Length; i++)
		{
			string itemKey = itemKeys[i];

			for (int j = 0; !isMatch && j < queryKeys.Length; j++)
			{
				string queryKey = queryKeys[j];

				isMatch = IsMatch(itemKey, queryKey);
			}
		}

		return isMatch;
	}
	private static bool IsMatch(string itemKey, string queryKey)
	{
		return itemKey == queryKey
				|| itemKey.Contains(queryKey)
				|| _stringSimilarityComparer.Similarity(itemKey, queryKey) >= THRESHOLD;
	}

	private static string[] GetTokens(string query)
	{
		return query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
	}

	private static string ClearText(string text)
	{
		return RemoveDiacritics(text.ToLower());
	}

	private static string RemoveDiacritics(string text)
	{
		string normalizedString = text.Normalize(NormalizationForm.FormD);
		StringBuilder stringBuilder = new StringBuilder(normalizedString.Length);

		for (int i = 0; i < normalizedString.Length; i++)
		{
			char c = normalizedString[i];
			UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
			if (unicodeCategory != UnicodeCategory.NonSpacingMark)
			{
				stringBuilder.Append(c);
			}
		}

		return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
	}
}