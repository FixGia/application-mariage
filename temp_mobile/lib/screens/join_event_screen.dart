import 'package:flutter/material.dart';
import 'join_event_form.dart';

class JoinEventScreen extends StatelessWidget {
  const JoinEventScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Rejoindre un évènement'),
      ),
      body: const Center(
        child: SingleChildScrollView(
          child: JoinEventForm(),
        ),
      ),
    );
  }
}
