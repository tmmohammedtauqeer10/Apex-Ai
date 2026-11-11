import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

const _catalogUrl = 'https://raw.githubusercontent.com/tmmohammedtauqeer10/Deenflow/main/worship_api.json';
const _cacheKey = 'worship_catalog_v1';
const _savedKey = 'worship_saved_v1';
const _dayKey = 'worship_day_v1';
const _countsKey = 'worship_counts_v1';
const _readsKey = 'worship_reads_v1';
const _background = Color(0xFF0B132B);
const _surface = Color(0xFF152243);
const _gold = Color(0xFFD4AF37);

typedef Record = Map<String, dynamic>;
List<Record> _records(dynamic value) =>
    (value as List).map((e) => Map<String, dynamic>.from(e as Map)).toList();

String _today() {
  final now = DateTime.now();
  final month = now.month.toString().padLeft(2, '0');
  final day = now.day.toString().padLeft(2, '0');
  return '${now.year}-$month-$day';
}

Record _decodeCatalog(String text) {
  final data = Map<String, dynamic>.from(jsonDecode(text) as Map);
  if (data['api_version'] != '1.0' || data['section_id'] != 'worship') {
    throw const FormatException('Unsupported worship catalog');
  }
  final sections = _records(data['sections']);
  final items = _records(data['items']);
  if (sections.length != 4 || items.isEmpty) {
    throw const FormatException('Worship catalog is incomplete');
  }
  const grades = {'Qur\'an', 'Sahih', 'Hasan', 'Reported', 'Composed'};
  final sectionIds = sections.map((s) => s['id'] as String).toSet();
  if (sectionIds.length != 4) throw const FormatException('Duplicate section');
  final seen = <String>{};
  for (final item in items) {
    final id = item['id'] as String;
    if (!seen.add(id)) throw FormatException('Duplicate item $id');
    if (!sectionIds.contains(item['section_id'])) throw FormatException('Unknown section on $id');
    if (!grades.contains(item['grade'])) throw FormatException('Unknown grade on $id');
    for (final key in ['title', 'arabic', 'transliteration', 'meaning', 'when', 'reference']) {
      if ((item[key] as String).trim().isEmpty) throw FormatException('Missing $key on $id');
    }
  }
  return data;
}

Future<void> _openLink(BuildContext context, String value) async {
  try {
    final uri = Uri.parse(value);
    if (uri.scheme != 'https' || uri.host.isEmpty ||
        !await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw const FormatException('Link cannot be opened');
    }
  } catch (_) {
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Could not open this link. Please try again.')),
      );
    }
  }
}

/// Add this screen to the host navigator. See docs/worship.md.
class WorshipScreen extends StatefulWidget {
  const WorshipScreen({super.key});
  @override
  State<WorshipScreen> createState() => _WorshipScreenState();
}

class _WorshipScreenState extends State<WorshipScreen> {
  Record? _data;
  SharedPreferences? _prefs;
  Set<String> _saved = {};
  Map<String, int> _counts = {};
  Set<String> _reads = {};
  bool _loading = true;
  bool _offline = false;
  String? _error;
  final _client = http.Client();
  final _search = TextEditingController();
  String _query = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _client.close();
    _search.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    SharedPreferences? prefs;
    Record? data;
    var offline = false;
    try {
      prefs = await SharedPreferences.getInstance();
      final res = await _client.get(Uri.parse(_catalogUrl)).timeout(const Duration(seconds: 15));
      if (res.statusCode != 200) throw Exception('HTTP ${res.statusCode}');
      final text = utf8.decode(res.bodyBytes);
      data = _decodeCatalog(text);
      try { await prefs.setString(_cacheKey, text); } catch (_) { /* Read-only mode. */ }
    } catch (_) {
      offline = true;
      try {
        final cached = prefs?.getString(_cacheKey);
        if (cached != null) data = _decodeCatalog(cached);
      } catch (_) { /* Try the optional bundled asset next. */ }
      if (data == null) {
        try { data = _decodeCatalog(await rootBundle.loadString('worship_api.json')); }
        catch (_) { /* The host may not have configured the optional asset. */ }
      }
    }
    if (!mounted) return;
    var counts = <String, int>{};
    var reads = <String>{};
    if (prefs != null) {
      if (prefs.getString(_dayKey) == _today()) {
        final raw = prefs.getString(_countsKey);
        if (raw != null) {
          final decoded = jsonDecode(raw);
          if (decoded is Map) {
            counts = decoded.map((key, value) => MapEntry(key.toString(), (value as num).toInt()));
          }
        }
        reads = (prefs.getStringList(_readsKey) ?? []).toSet();
      } else {
        await prefs.setString(_dayKey, _today());
        await prefs.remove(_countsKey);
        await prefs.remove(_readsKey);
      }
    }
    setState(() {
      _prefs = prefs;
      _data = data;
      _offline = offline;
      _saved = (prefs?.getStringList(_savedKey) ?? []).toSet();
      _counts = counts;
      _reads = reads;
      _loading = false;
      _error = data == null ? 'Could not load Darood, Duas and Azkar. Connect and retry, or add the bundled catalog asset.' : null;
    });
  }

  Future<void> _writeDay() async {
    final prefs = _prefs;
    if (prefs == null) return;
    await prefs.setString(_dayKey, _today());
    await prefs.setString(_countsKey, jsonEncode(_counts));
    await prefs.setStringList(_readsKey, _reads.toList());
  }

  bool _done(Record item) {
    if (_reads.contains(item['id'])) return true;
    final target = item['count'];
    if (target is int && (_counts[item['id']] ?? 0) >= target) return true;
    return false;
  }

  Future<void> _toggleSaved(String id) async {
    final next = _saved.contains(id) ? (_saved.toSet()..remove(id)) : (_saved.toSet()..add(id));
    final prefs = _prefs;
    if (prefs == null || !await prefs.setStringList(_savedKey, next.toList())) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Could not save on this device.')));
      }
      return;
    }
    if (mounted) setState(() => _saved = next);
  }

  Future<void> _toggleRead(Record item) async {
    final id = item['id'] as String;
    if (_reads.contains(id)) {
      _reads = _reads.toSet()..remove(id);
    } else {
      _reads = _reads.toSet()..add(id);
    }
    await _writeDay();
    if (mounted) setState(() {});
  }

  Future<void> _changeCount(Record item, int delta) async {
    final target = item['count'];
    if (target is! int) return;
    final id = item['id'] as String;
    final next = ((_counts[id] ?? 0) + delta).clamp(0, target);
    _counts = {..._counts, id: next};
    if (next >= target) {
      _reads = _reads.toSet()..add(id);
    } else {
      _reads = _reads.toSet()..remove(id);
    }
    await _writeDay();
    if (mounted) setState(() {});
  }

  Future<void> _reset() async {
    final confirm = await showDialog<bool>(context: context, builder: (ctx) => AlertDialog(
      title: const Text('Clear today\'s practice?'),
      content: const Text('This clears saved texts, today\'s marks, and the counter on this device. The downloaded catalog stays.'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
        TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Clear')),
      ],
    ));
    if (confirm != true || !mounted) return;
    final prefs = _prefs;
    if (prefs == null) return;
    await prefs.remove(_savedKey);
    await prefs.setString(_dayKey, _today());
    await prefs.remove(_countsKey);
    await prefs.remove(_readsKey);
    if (mounted) setState(() { _saved = {}; _counts = {}; _reads = {}; });
  }

  @override
  Widget build(BuildContext context) {
    final sections = _data == null ? const <Record>[] : _records(_data!['sections']);
    return Theme(data: ThemeData.dark().copyWith(
      scaffoldBackgroundColor: _background,
      colorScheme: const ColorScheme.dark(primary: _gold, surface: _surface),
    ), child: DefaultTabController(length: sections.isEmpty ? 1 : sections.length, child: Scaffold(
      appBar: AppBar(
        backgroundColor: _surface,
        title: const Text('Darood, Duas & Azkar'),
        actions: [
          IconButton(tooltip: 'Refresh content', onPressed: _loading ? null : _load, icon: const Icon(Icons.refresh)),
          IconButton(tooltip: 'Clear local practice', onPressed: _loading ? null : _reset, icon: const Icon(Icons.delete_outline)),
        ],
        bottom: sections.isEmpty ? null : TabBar(isScrollable: true, tabs: [
          for (final section in sections) Tab(text: section['title'] as String),
        ]),
      ),
      body: _loading ? const Center(child: CircularProgressIndicator()) : _error != null ? Center(child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Text(_error!, textAlign: TextAlign.center),
          const SizedBox(height: 16),
          ElevatedButton(onPressed: _load, child: const Text('Retry')),
        ]),
      )) : Column(children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
          child: TextField(
            controller: _search,
            onChanged: (value) => setState(() => _query = value.trim().toLowerCase()),
            decoration: const InputDecoration(
              hintText: 'Search a wording, a time of day, or a source',
              prefixIcon: Icon(Icons.search),
              filled: true,
            ),
          ),
        ),
        if (_offline) const Padding(
          padding: EdgeInsets.fromLTRB(16, 8, 16, 0),
          child: Text('Offline copy · Refresh when connected', style: TextStyle(color: _gold)),
        ),
        Expanded(child: TabBarView(children: [
          for (final section in sections) _section(section),
        ])),
      ]),
    )));
  }

  Widget _section(Record section) {
    final items = _records(_data!['items']).where((item) => item['section_id'] == section['id']).toList();
    final q = _query;
    final visible = items.where((item) {
      if (q.isEmpty) return true;
      final haystack = [
        item['title'], item['arabic'], item['transliteration'], item['meaning'],
        item['when'], item['virtue'], item['reference'], item['grade'], item['note'],
      ].join(' ').toLowerCase();
      return haystack.contains(q);
    }).toList();
    final done = visible.where(_done).length;
    return ListView(padding: const EdgeInsets.all(16), children: [
      Text(section['arabic_title'] as String, textDirection: TextDirection.rtl, style: const TextStyle(color: _gold, fontSize: 18)),
      const SizedBox(height: 6),
      Text(section['summary'] as String),
      const SizedBox(height: 10),
      for (final line in (section['intro'] as List)) Padding(
        padding: const EdgeInsets.only(bottom: 8),
        child: Text(line as String, style: const TextStyle(color: Colors.white70, height: 1.45)),
      ),
      Text('$done of ${visible.length} in this view recited today', style: const TextStyle(color: _gold)),
      const SizedBox(height: 12),
      for (final item in visible) _card(item),
      if (visible.isEmpty) const Text('Nothing in this section matches that search.'),
    ]);
  }

  Widget _card(Record item) {
    final id = item['id'] as String;
    final target = item['count'];
    final count = _counts[id] ?? 0;
    final done = _done(item);
    final saved = _saved.contains(id);
    return Card(color: _surface, margin: const EdgeInsets.only(bottom: 12), child: Padding(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(item['grade'] as String, style: const TextStyle(color: _gold, fontSize: 12, fontWeight: FontWeight.bold)),
        const SizedBox(height: 4),
        Text(item['title'] as String, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(color: Colors.black26, borderRadius: BorderRadius.circular(8)),
          child: Text(item['arabic'] as String, textDirection: TextDirection.rtl, style: const TextStyle(fontSize: 22, height: 1.8)),
        ),
        const SizedBox(height: 8),
        Text(item['transliteration'] as String, style: const TextStyle(color: Colors.white70)),
        const SizedBox(height: 8),
        Text(item['meaning'] as String),
        const SizedBox(height: 8),
        Text('When', style: const TextStyle(color: _gold, fontSize: 12)),
        Text(item['when'] as String),
        if ((item['virtue'] as String).isNotEmpty) ...[
          const SizedBox(height: 8),
          const Text('What is reported', style: TextStyle(color: _gold, fontSize: 12)),
          Text(item['virtue'] as String),
        ],
        const SizedBox(height: 8),
        Text(item['reference'] as String, style: const TextStyle(color: Colors.white60)),
        if (item['note'] != null) Padding(
          padding: const EdgeInsets.only(top: 8),
          child: Text(item['note'] as String, style: const TextStyle(color: Colors.white60)),
        ),
        Wrap(spacing: 8, runSpacing: 4, crossAxisAlignment: WrapCrossAlignment.center, children: [
          if (target is int) ...[
            IconButton(tooltip: 'Count one less', onPressed: () => _changeCount(item, -1), icon: const Icon(Icons.remove_circle_outline)),
            Text('$count / $target', style: const TextStyle(fontWeight: FontWeight.bold)),
            IconButton(tooltip: 'I recited this once', onPressed: () => _changeCount(item, 1), icon: const Icon(Icons.add_circle_outline)),
          ],
          TextButton(onPressed: () => _toggleRead(item), child: Text(done ? 'Recited today' : 'Mark recited today')),
          TextButton(onPressed: () => _toggleSaved(id), child: Text(saved ? 'Saved' : 'Save')),
          if (item['source_url'] != null) TextButton(
            onPressed: () => _openLink(context, item['source_url'] as String),
            child: const Text('Open the source'),
          ),
        ]),
      ]),
    ));
  }
}
