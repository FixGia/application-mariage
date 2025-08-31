import 'package:flutter/material.dart';

class EventDeleteScreen extends StatelessWidget {
  const EventDeleteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFAF7F2),
      appBar: AppBar(
        backgroundColor: const Color(0xFFFAF7F2),
        elevation: 0,
        title: const Text(
          'Supprimer mon évènement',
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
      body: const Center(
        child: Text(
          'Ici, vous pourrez supprimer votre évènement.',
          style: TextStyle(fontSize: 18, color: Color(0xFF2D2D2D)),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
