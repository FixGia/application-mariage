import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import 'home_screen.dart';

class ConsentScreen extends StatefulWidget {
  const ConsentScreen({super.key});

  @override
  State<ConsentScreen> createState() => _ConsentScreenState();
}

class _ConsentScreenState extends State<ConsentScreen> {
  final AuthService _authService = AuthService();
  bool _isLoading = false;
  String? _errorMessage;

  Future<void> _acceptConsent() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    final response = await _authService.giveConsent();

    setState(() {
      _isLoading = false;
    });

    if (response.statusCode == 200) {
      // Consentement accepté, on va vers l'accueil
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const HomeScreen()),
      );
    } else {
      setState(() {
        _errorMessage = 'Erreur : ${response.body}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Consentement RGPD')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              "Pour utiliser l'application, vous devez accepter la politique de confidentialité et le traitement de vos données conformément au RGPD.",
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 24),
            if (_errorMessage != null)
              Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
            ElevatedButton(
              onPressed: _isLoading ? null : _acceptConsent,
              child: _isLoading
                  ? const CircularProgressIndicator()
                  : const Text('J\'accepte'),
            ),
          ],
        ),
      ),
    );
  }
}