import 'package:flutter/material.dart';
import 'home_card.dart';
import 'event_creation.dart';
import 'event_delete_screen.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';


class EventManageScreen extends StatelessWidget {
  const EventManageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF7F2),
      appBar: AppBar(
        backgroundColor: const Color(0xFFFAF7F2),
        elevation: 0,
        title: const Text(
          'Gérer mon évènement',
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
      body: LayoutBuilder(
        builder: (context, constraints) {
          final double height = constraints.maxHeight;
          final double whiteBoxHeight = height * 0.5;
          final double cardHeight = (height - whiteBoxHeight - 64) / 2; // 64 for spacing
          return SingleChildScrollView(
            child: Column(
              children: [
                // Card large
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 28.0),
                  child: SizedBox(
                    height: cardHeight,
                    width: double.infinity,
                    child: HomeCard(
                      icon: Icons.add_circle_outline,
                      label: 'Créer son évènement',
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (_) => const EventCreationScreen()),
                        );
                      },
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                // Deux cards côte à côte
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 28.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: cardHeight,
                          child: HomeCard(
                            icon: Icons.edit_calendar_outlined,
                            label: 'Modifier mon évènement',
                            onTap: () {
                              // Naviguer vers un écran de modification (à personnaliser)
                            },
                          ),
                        ),
                      ),
                      const SizedBox(width: 18),
                      Expanded(
                        child: SizedBox(
                          height: cardHeight,
                          child: HomeCard(
                            icon: Icons.delete_outline,
                            label: 'Supprimer l\'évènement',
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (_) => const EventDeleteScreen()),
                              );
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
