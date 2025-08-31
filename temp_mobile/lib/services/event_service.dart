import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class EventService {
  static const String baseUrl = 'http://localhost:3000/api/events'; // URL de la gateway
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Future<String?> getToken() async {
    return await _storage.read(key: 'jwt');
  }

    Future<http.Response> createEvent({required String name, required String date, required String creatorId, required String password}) async {
    final token = await getToken();
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      },
      body: jsonEncode({
        'name': name,
        'date': date,
        'creatorId': creatorId,
        'password': password,
      }),
    );
    return response;
  }

  Future<http.Response> joinEvent({required String name, required String password, required String userId}) async {
    final token = await getToken();
    final response = await http.post(
      Uri.parse('$baseUrl/join'),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      },
      body: jsonEncode({
        'name': name,
        'password': password,
        'userId': userId,
      }),
    );
    return response;
  }

  Future<http.Response> getEventsForUser(String userId) async {
    final token = await getToken();
    final response = await http.get(
      Uri.parse('$baseUrl/user/$userId'),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      },
    );
    return response;
  }
}
