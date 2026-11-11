"""Run from repository root: python -m unittest discover -s tests -p 'test_worship_catalog.py'."""
import json
from pathlib import Path
import unittest
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
GRADES = {"Qur'an", "Sahih", "Hasan", "Reported", "Composed"}

class WorshipCatalogTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((ROOT / "worship_api.json").read_text(encoding="utf-8"))

    def test_four_sections_and_counts(self):
        d = self.data
        self.assertEqual(d["api_version"], "1.0")
        self.assertEqual(d["section_id"], "worship")
        self.assertEqual(d["editorial_status"], "source_linked_reminder")
        sections = {s["id"]: s for s in d["sections"]}
        self.assertEqual(list(sections), ["darood", "ruhani", "duas", "azkar"])
        counts = {}
        for item in d["items"]:
            counts[item["section_id"]] = counts.get(item["section_id"], 0) + 1
        self.assertEqual(counts, {"darood": 12, "ruhani": 25, "duas": 54, "azkar": 38})
        for section in sections.values():
            self.assertTrue(section["title"].strip())
            self.assertTrue(section["arabic_title"].strip())
            self.assertTrue(section["summary"].strip())
            self.assertGreaterEqual(len(section["intro"]), 2)
            self.assertTrue(section["categories"])

    def test_items_are_complete_and_stay_in_their_section(self):
        sections = {s["id"]: s for s in self.data["sections"]}
        ids = []
        for item in self.data["items"]:
            ids.append(item["id"])
            self.assertIn(item["section_id"], sections)
            allowed = {c["id"] for c in sections[item["section_id"]]["categories"]}
            self.assertTrue(item["categories"])
            self.assertTrue(set(item["categories"]) <= allowed, item["id"])
            self.assertIn(item["grade"], GRADES)
            for field in ("title", "arabic", "transliteration", "meaning", "when", "virtue", "reference"):
                self.assertTrue(str(item[field]).strip(), (item["id"], field))
            self.assertTrue(any("\u0600" <= ch <= "\u06ff" for ch in item["arabic"]), item["id"])
            if item["source_url"] is not None:
                uri = urlparse(item["source_url"])
                self.assertEqual(uri.scheme, "https", item["id"])
                self.assertTrue(uri.netloc, item["id"])
            if item["count"] is not None:
                self.assertIsInstance(item["count"], int)
                self.assertGreater(item["count"], 0)
            if item["note"] is not None:
                self.assertTrue(item["note"].strip())
        self.assertEqual(len(ids), len(set(ids)))

    def test_ruhani_states_its_limits(self):
        ruhani = next(s for s in self.data["sections"] if s["id"] == "ruhani")
        intro = " ".join(ruhani["intro"]).casefold()
        self.assertIn("ruqyah", intro)
        self.assertIn("doctor", self.data["review_note"].casefold())
        titles = {item["title"].casefold() for item in self.data["items"] if item["section_id"] == "ruhani"}
        self.assertTrue(any("fortune" in title for title in titles))
        self.assertTrue(any("talisman" in title for title in titles))
        self.assertTrue(any("jinn" in title for title in titles))

    def test_composed_salawat_is_labeled(self):
        composed = [item for item in self.data["items"] if item["grade"] == "Composed"]
        self.assertEqual(len(composed), 1)
        self.assertEqual(composed[0]["section_id"], "darood")
        self.assertIn("composed", composed[0]["categories"])

    def test_library_points_at_this_catalog(self):
        library = json.loads((ROOT / "library_api.json").read_text(encoding="utf-8"))
        cat = next(c for c in library["categories"] if c["category_id"] == "cat_adhkar")
        path = cat["learning_path"]
        self.assertEqual(path["section_id"], "worship")
        self.assertEqual(path["screen"], "WorshipScreen")
        self.assertTrue(path["api_url"].endswith("/worship_api.json"))
        self.assertTrue(any(book["id"] == "bk_fortress_muslim" for book in cat["books"]))
