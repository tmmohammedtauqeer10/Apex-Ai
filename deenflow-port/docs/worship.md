# Darood Sharif, Ruhani Ilaj, Duas and Azkar

DeenFlow now includes four source-linked libraries. Each wording stays in its own section.

| Section | Texts | What it holds |
| --- | --- | --- |
| Darood Sharif | 12 | Qur'an 33:56, Durood Ibrahim in both sahih wordings, salawat upon his wives and descendants, and the virtues in sound hadith. Durood Tunajjina is labeled Composed. |
| Ruhani Ilaj | 25 | Ruqyah from the Qur'an and Sunnah. The cure is asked from Allah. Illness still needs a doctor. |
| Duas | 54 | Supplications from the Qur'an and the duas the Prophet ﷺ taught. |
| Azkar | 38 | Morning, evening, after salah, sleep, waking, and the daily dhikr, with the reported count where a count exists. |

Grades are `Qur'an`, `Sahih`, `Hasan`, `Reported`, or `Composed`. A composed salawat is not presented as his wording. This catalog is a reminder, not a fatwa and not medical advice.

Ruhani Ilaj means ruqyah: recitation, a light breath, and dua. The catalog leaves out talismans, number squares, jinn invocation, and fortune-telling.

## Connect to the Flutter app

This repository contains the feed and the screen. It has no `main.dart`. The host app adds the navigation entry.

1. Include `lib/worship_screen.dart`.
2. The screen uses the same packages as Tasawwuf: `http`, `shared_preferences`, and `url_launcher`.
3. Import the screen and add a navigation entry, for example from the Du'a & Adhkar library category:

```dart
import 'worship_screen.dart';

ListTile(
  leading: const Icon(Icons.front_hand_outlined),
  title: const Text('Darood, Duas & Azkar'),
  onTap: () => Navigator.of(context).push(
    MaterialPageRoute(builder: (_) => const WorshipScreen()),
  ),
)
```

4. For offline access before the first download, add the catalog to the host assets:

```yaml
flutter:
  assets:
    - worship_api.json
```

The screen fetches `https://raw.githubusercontent.com/tmmohammedtauqeer10/Deenflow/main/worship_api.json`. If the network fails, it uses the cached catalog and then the bundled asset. `library_api.json` points at this feed from `cat_adhkar` through `learning_path`. Older library readers can ignore that field. The Hisn al-Muslim book entry stays on the category.

## Content contract

`worship_api.json` is a versioned object with `section_id` `worship`, `api_version` `1.0`, four `sections`, and `items`.

- Each item has one `section_id`, a unique `id`, a grade, Arabic, transliteration, meaning, when, virtue, and reference.
- `source_url` is either null or an `https` link.
- `count` is either null or the repetition reported for that wording.
- `categories` on an item must exist on its section.
- `editorial_status` is `source_linked_reminder`.

Run:

```sh
python -m unittest discover -s tests -p 'test_worship_catalog.py'
```

## Local data

Saved item IDs, today's recital marks, and the counter live in SharedPreferences. The counter and recital marks reset on the next calendar day. Saved texts stay. Nothing here is encrypted, and nothing is sent to an account.

## Host verification checklist

- Open each of the four tabs on a phone and with large text.
- Search for Yunus and confirm the dua card remains.
- Count a thirty-three tasbih, leave the screen, and confirm the count remains the same day.
- Save a text, restart, and remove it.
- Open a source link.
- Load once online, then open without a network.
- Clear local practice and confirm the marks reset while the catalog remains.
