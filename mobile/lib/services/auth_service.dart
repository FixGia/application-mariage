import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  // URL de ta Gateway (à adapter si besoin)
  static const String baseUrl = 'http://localhost:3000/auth';

  // Stockage sécurisé (clé-valeur)
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  // Sauvegarde le JWT et le refreshToken
  Future<void> saveTokens(String token, String refreshToken) async {
    await _storage.write(key: 'jwt', value: token);
    await _storage.write(key: 'refreshToken', value: refreshToken);
  }

  // Récupère le JWT
  Future<String?> getToken() async {
    return await _storage.read(key: 'jwt');
  }

  // Récupère le refreshToken
  Future<String?> getRefreshToken() async {
    return await _storage.read(key: 'refreshToken');
  }

  // Efface les tokens (logout)
  Future<void> clearTokens() async {
    await _storage.delete(key: 'jwt');
    await _storage.delete(key: 'refreshToken');
  }

  // Inscription
  Future<http.Response> register(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    return response;
  }

  // Connexion
  Future<http.Response> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    // Si succès, stocke les tokens
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      await saveTokens(data['token'], data['refreshToken']);
    }
    return response;
  }

  // Consentement RGPD
  Future<http.Response> giveConsent() async {
    final token = await getToken();
    final response = await http.post(
      Uri.parse('$baseUrl/consent'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    return response;
  }

  // Export des données personnelles
  Future<http.Response> exportData() async {
    final token = await getToken();
    final response = await http.get(
      Uri.parse('$baseUrl/me/export'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    return response;
  }

  // Suppression du compte
  Future<http.Response> deleteAccount() async {
    final token = await getToken();
    final response = await http.delete(
      Uri.parse('$baseUrl/me'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    // Si succès, efface les tokens
    if (response.statusCode == 200) {
      await clearTokens();
    }
    return response;
  }
}