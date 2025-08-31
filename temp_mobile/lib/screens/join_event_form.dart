import 'package:flutter/material.dart';
import '../services/event_service.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class JoinEventForm extends StatefulWidget {
  const JoinEventForm({super.key});

  @override
  State<JoinEventForm> createState() => _JoinEventFormState();
}

class _JoinEventFormState extends State<JoinEventForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _error;
  String? _success;

  Future<void> _submit() async {
    setState(() {
      _isLoading = true;
      _error = null;
      _success = null;
    });

    final name = _nameController.text.trim();
    final password = _passwordController.text.trim();

    if (name.isEmpty || password.isEmpty) {
      setState(() {
        _isLoading = false;
        _error = 'Veuillez remplir tous les champs.';
      });
      return;
    }

    try {
      final eventService = EventService();
      final storage = FlutterSecureStorage();
      final userId = await storage.read(key: 'userId');

      if (userId == null) {
        setState(() {
          _error = "Impossible de récupérer l'identifiant utilisateur.";
        });
        return;
      }

      final response = await eventService.joinEvent(name: name, password: password, userId: userId);

      if (response.statusCode == 201 || response.statusCode == 200) {
        setState(() {
          _success = 'Évènement rejoint avec succès !';
          _error = null;
        });
        _formKey.currentState?.reset();
        _nameController.clear();
        _passwordController.clear();
      } else {
        setState(() {
          _error = 'Erreur pour rejoindre l\'évènement : ${response.body}';
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Une erreur est survenue: $e';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 28.0, vertical: 32.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Nom de l\'évènement',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 22),
            TextFormField(
              controller: _passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Mot de passe de l\'évènement',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 28),
            if (_error != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: Text(_error!, style: const TextStyle(color: Colors.red)),
              ),
            if (_success != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: Text(_success!, style: const TextStyle(color: Colors.green)),
              ),
            ElevatedButton(
              onPressed: _isLoading ? null : _submit,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFE6CBA8),
                foregroundColor: const Color(0xFF2D2D2D),
                padding: const EdgeInsets.symmetric(horizontal: 36, vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                ),
                textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
              ),
              child: _isLoading
                  ? const SizedBox(height: 22, width: 22, child: CircularProgressIndicator(strokeWidth: 2))
                  : const Text('Rejoindre l\'évènement'),
            ),
          ],
        ),
      ),
    );
  }
}
