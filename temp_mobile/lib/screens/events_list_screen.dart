import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../services/event_service.dart';
import 'upload_photo_screen.dart';
import 'join_event_screen.dart';

class EventsListScreen extends StatefulWidget {
  const EventsListScreen({super.key});

  @override
  State<EventsListScreen> createState() => _EventsListScreenState();
}

class _EventsListScreenState extends State<EventsListScreen> {
  List<dynamic> _events = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    try {
      final eventService = EventService();
      const storage = FlutterSecureStorage();
      final userId = await storage.read(key: 'userId');

      if (userId == null) {
        setState(() {
          _error = "Impossible de récupérer l'identifiant utilisateur.";
          _isLoading = false;
        });
        return;
      }

      final response = await eventService.getEventsForUser(userId);

      if (response.statusCode == 200) {
        setState(() {
          _events = jsonDecode(response.body);
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Erreur pour récupérer les évènements: ${response.body}';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Une erreur est survenue: $e';
        _isLoading = false;
      });
    }
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(child: Text(_error!));
    }

    if (_events.isEmpty) {
      return const Center(child: Text('Aucun évènement pour le moment.'));
    }

    return ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
        itemCount: _events.length,
        separatorBuilder: (context, i) => const SizedBox(height: 20),
        itemBuilder: (context, i) {
          final event = _events[i];
          return Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 7,
                  offset: Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  event['name']!,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2D2D2D),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  event['date']!,
                  style: const TextStyle(
                    color: Color(0xFF8A8A8A),
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 18),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    ElevatedButton.icon(
                      onPressed: () {
                        // TODO: Naviguer vers la page affichage photos de l'évènement
                      },
                      icon: const Icon(Icons.photo_library_outlined, size: 20),
                      label: const Text('Voir photos'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFFE6CBA8),
                        foregroundColor: Color(0xFF2D2D2D),
                        elevation: 1,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        textStyle: const TextStyle(fontWeight: FontWeight.w500),
                      ),
                    ),
                    const SizedBox(width: 14),
                    ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => UploadPhotoScreen(eventName: event['name']!),
                          ),
                        );
                      },
                      icon: const Icon(Icons.upload_outlined, size: 20),
                      label: const Text('Uploader'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFFE6CBA8),
                        foregroundColor: Color(0xFF2D2D2D),
                        elevation: 1,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                        textStyle: const TextStyle(fontWeight: FontWeight.w500),
                      ),
                    ),
                  ],
                )
              ],
            ),
          );
        },
      );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF7F2),
      appBar: AppBar(
        backgroundColor: const Color(0xFFFAF7F2),
        elevation: 0,
        title: const Text(
          'Mes évènements',
          style: TextStyle(
            color: Color(0xFF2D2D2D),
            fontWeight: FontWeight.bold,
            fontSize: 24,
            letterSpacing: 1.2,
          ),
        ),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Color(0xFF2D2D2D)),
      ),
      body: _buildBody(),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const JoinEventScreen()),
          );
        },
        label: const Text('Rejoindre un évènement'),
        icon: const Icon(Icons.group_add),
        backgroundColor: const Color(0xFFE6CBA8),
        foregroundColor: const Color(0xFF2D2D2D),
      ),
    );
  }
}
