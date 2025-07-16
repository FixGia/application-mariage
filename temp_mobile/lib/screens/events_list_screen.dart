import 'package:flutter/material.dart';
import 'upload_photo_screen.dart';

class EventsListScreen extends StatelessWidget {
  const EventsListScreen({super.key});

  // Dummy data for demo
  final List<Map<String, String>> events = const [
    {'name': 'Mariage Alice & Bob', 'date': '12/08/2025'},
    {'name': 'Anniversaire Clara', 'date': '01/09/2025'},
    {'name': 'Fiançailles Emma & Hugo', 'date': '15/09/2025'},
  ];

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
      body: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
        itemCount: events.length,
        separatorBuilder: (context, i) => const SizedBox(height: 20),
        itemBuilder: (context, i) {
          final event = events[i];
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
      ),
    );
  }
}
