export const darood = {
  id: "darood",
  title: "Darood Sharif",
  arabicTitle: "الصلاة على النبي ﷺ",
  summary:
    "Salawat upon the Prophet Muhammad ﷺ in the wordings taught in the Qur'an and sound hadith, plus one composed salawat that is clearly labeled.",
  keywords: ["darood", "durood", "durood sharif", "salawat", "darood sharif"],
  intro: [
    "Allah commanded the believers to send salah and salam upon the Prophet ﷺ. The Companions asked him how to do it, and he taught them the words. Those words are the heart of this section.",
    "A reward narrated for salawat belongs to salawat upon him, not to a private formula. Composed salawat can be a humble dua, and this library marks them so they are never mistaken for his wording.",
    "Schools differ on whether the Ibrahimic salawat inside the tashahhud is a pillar, an obligation, or an emphasized sunnah. This page does not settle that. Follow the teacher whose fiqh you pray behind.",
  ],
  categories: [
    { id: "quran", label: "Qur'an" },
    { id: "salah", label: "In the prayer" },
    { id: "virtue", label: "Virtues" },
    { id: "daily", label: "Daily practice" },
    { id: "composed", label: "Composed, labeled" },
  ],
  items: [
    {
      id: "darood-command",
      title: "The command to send salah and salam",
      categories: ["quran"],
      grade: "Qur'an",
      arabic: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا",
      transliteration:
        "Inna Allaha wa mala'ikatahu yusalluna alan-nabi. Ya ayyuhalladhina amanu sallu alayhi wa sallimu taslima.",
      meaning:
        "Indeed, Allah and His angels send salah upon the Prophet. O you who believe, send salah upon him and greet him with a complete salam.",
      when: "This is the verse the practice rests on. Recite it, then send salawat in the words he taught.",
      virtue:
        "Scholars explain salah from Allah as praise and mercy, salah from the angels as dua, and salah from the believers as the supplication he taught.",
      reference: "Qur'an 33:56, Surah al-Ahzab",
      sourceUrl: "https://quran.com/33/56",
    },
    {
      id: "darood-ibrahim",
      title: "Durood Ibrahim, the fuller wording",
      categories: ["salah", "daily"],
      grade: "Sahih",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala Ibrahima wa ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik ala Muhammadin wa ala ali Muhammad, kama barakta ala Ibrahima wa ala ali Ibrahim, innaka Hamidun Majid.",
      meaning:
        "O Allah, send salah upon Muhammad and the family of Muhammad as You sent salah upon Ibrahim and the family of Ibrahim. You are Praiseworthy, Glorious. O Allah, send blessing upon Muhammad and the family of Muhammad as You sent blessing upon Ibrahim and the family of Ibrahim. You are Praiseworthy, Glorious.",
      when: "In the tashahhud of the prayer, and whenever a person wants the salawat he himself taught. Ka'b ibn Ujrah reported that the Companions asked, after they already knew the salam, how they should send salah.",
      virtue: "This is the gift Ka'b ibn Ujrah passed on. Both this fuller wording and the next shorter one are in Sahih al-Bukhari.",
      reference: "Sahih al-Bukhari 3370; also Sahih Muslim, from Ka'b ibn Ujrah",
      sourceUrl: "https://sunnah.com/bukhari:3370",
    },
    {
      id: "darood-ibrahim-short",
      title: "Durood Ibrahim, the shorter wording",
      categories: ["salah"],
      grade: "Sahih",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik ala Muhammadin wa ala ali Muhammad, kama barakta ala ali Ibrahim, innaka Hamidun Majid.",
      meaning:
        "O Allah, send salah upon Muhammad and the family of Muhammad as You sent salah upon the family of Ibrahim. You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed the family of Ibrahim. You are Praiseworthy, Glorious.",
      when: "A second authentic wording of the same teaching. Either wording he taught is sound to say in the tashahhud.",
      virtue: "The Prophet ﷺ called this the answer when they asked how to send salah upon him.",
      reference: "Sahih al-Bukhari 6357",
      sourceUrl: "https://sunnah.com/bukhari:6357",
    },
    {
      id: "darood-family",
      title: "Salawat upon him, his wives, and his descendants",
      categories: ["salah", "daily"],
      grade: "Sahih",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ كَمَا صَلَّيْتَ عَلَى آلِ إِبْرَاهِيمَ، وَبَارِكْ عَلَى مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ كَمَا بَارَكْتَ عَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli ala Muhammadin wa azwajihi wa dhurriyyatihi kama sallayta ala ali Ibrahim, wa barik ala Muhammadin wa azwajihi wa dhurriyyatihi kama barakta ala ali Ibrahim, innaka Hamidun Majid.",
      meaning:
        "O Allah, send salah upon Muhammad, his wives, and his descendants as You sent salah upon the family of Ibrahim, and bless Muhammad, his wives, and his descendants as You blessed the family of Ibrahim. You are Praiseworthy, Glorious.",
      when: "Taught when the Companions asked again how to send salah. It is recited as salawat, including by people who use it in the prayer.",
      virtue: "It names the wives and the descendants inside the family he loved.",
      reference: "Sahih al-Bukhari 6360; Sahih Muslim 407",
      sourceUrl: "https://sunnah.com/bukhari:6360",
    },
    {
      id: "darood-ten",
      title: "One salawat, and Allah sends ten",
      categories: ["virtue", "daily"],
      grade: "Sahih",
      count: 10,
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      transliteration: "Allahumma salli ala Muhammadin wa ala ali Muhammad.",
      meaning: "O Allah, send salah upon Muhammad and upon the family of Muhammad.",
      when: "A short salawat in the meaning of the command. The ten-count here is only a small daily practice, not a number he fixed for this short sentence.",
      virtue:
        "When you hear the mu'adhdhin, repeat what he says, then send salah upon the Prophet ﷺ. Whoever sends one salah upon him, Allah sends salah upon that person ten times. Then ask Allah for al-Wasilah for him.",
      reference: "Sahih Muslim 384",
      sourceUrl: "https://sunnah.com/muslim:384",
    },
    {
      id: "darood-friday",
      title: "Increase salawat on Friday",
      categories: ["virtue", "daily"],
      grade: "Sahih",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala Ibrahima wa ala ali Ibrahim, innaka Hamidun Majid.",
      meaning:
        "O Allah, send salah upon Muhammad and the family of Muhammad as You sent salah upon Ibrahim and the family of Ibrahim. You are Praiseworthy, Glorious.",
      when: "Friday, and the night that precedes it. Use the same salawat he taught. The day is not tied to a secret number.",
      virtue:
        "Aws ibn Aws reported: the best of your days is Friday, so send more salah upon me that day, for your salah is presented to me. The Companions asked how, after his death. He said Allah has forbidden the earth to consume the bodies of the prophets.",
      reference: "Sunan Abi Dawud 1047, hadith of Aws ibn Aws",
      sourceUrl: "https://sunnah.com/abudawud:1047",
    },
    {
      id: "darood-closest",
      title: "The people closest to him on the Last Day",
      categories: ["virtue"],
      grade: "Hasan",
      arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
      transliteration: "Allahumma salli wa sallim ala nabiyyina Muhammad.",
      meaning: "O Allah, send salah and salam upon our Prophet Muhammad.",
      when: "Any time of the day. This short sentence is a respectful salawat. The hadith does not fix these exact syllables, and it does not fix a magic count.",
      virtue:
        "The Messenger of Allah ﷺ said the people closest to him on the Day of Resurrection are those who sent the most salah upon him.",
      reference: "Jami' at-Tirmidhi 484. At-Tirmidhi graded it hasan.",
      sourceUrl: "https://sunnah.com/tirmidhi:484",
    },
    {
      id: "darood-angels",
      title: "Angels carry the salawat of the Ummah",
      categories: ["virtue"],
      grade: "Sahih",
      arabic: "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
      transliteration: "Sallallahu alayhi wa sallam.",
      meaning: "May Allah send salah and salam upon him.",
      when: "Whenever his name is mentioned, and whenever you write it.",
      virtue:
        "Allah has angels who travel the earth and convey to the Prophet ﷺ the salam of his Ummah. A separate hadith calls the person who hears him mentioned and does not send salah a miser.",
      reference:
        "Musnad Ahmad and Sunan an-Nasa'i, the roaming angels; Jami' at-Tirmidhi 3546 on the miser, graded hasan",
      sourceUrl: "https://sunnah.com/tirmidhi:3546",
    },
    {
      id: "darood-suffice",
      title: "When the whole dua is salawat",
      categories: ["virtue", "daily"],
      grade: "Hasan",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      transliteration:
        "Allahumma salli ala Muhammadin wa ala ali Muhammad, kama sallayta ala Ibrahima wa ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik ala Muhammadin wa ala ali Muhammad, kama barakta ala Ibrahima wa ala ali Ibrahim, innaka Hamidun Majid.",
      meaning: "The Ibrahimic salawat, in full.",
      when: "Ubayy ibn Ka'b asked how much of his personal dua should be salawat. The Prophet ﷺ said: as much as you wish. Ubayy offered a quarter, then a half, then two thirds, then all of it.",
      virtue:
        "He said: then your needs will be sufficed, and your sins will be forgiven. Filling a dua with salawat does not cancel asking Allah for lawful needs. It teaches the rank of salawat.",
      reference: "Jami' at-Tirmidhi 2457; Musnad Ahmad, from Ubayy ibn Ka'b",
      sourceUrl: "https://sunnah.com/tirmidhi:2457",
    },
    {
      id: "darood-before-asking",
      title: "Praise Allah, then salawat, then ask",
      categories: ["daily", "virtue"],
      grade: "Sahih",
      arabic:
        "الْحَمْدُ لِلَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      transliteration:
        "Alhamdu lillah, wassalatu wassalamu ala Rasulillah. Allahumma salli ala Muhammadin wa ala ali Muhammad.",
      meaning:
        "Praise belongs to Allah, and salah and salam upon the Messenger of Allah. O Allah, send salah upon Muhammad and the family of Muhammad.",
      when: "Begin a personal dua this way, then ask for what you need. The first line is the order he described. The salawat sentence is the short form of what he taught.",
      virtue:
        "He heard a man make dua without praising Allah and without salawat, and he said the man was hasty. Then he taught: praise Allah, send salah upon the Prophet ﷺ, then ask.",
      reference: "Sunan Abi Dawud 1481; Jami' at-Tirmidhi 3477, from Fudalah ibn Ubayd",
      sourceUrl: "https://sunnah.com/abudawud:1481",
    },
    {
      id: "darood-adhan",
      title: "Salawat when the adhan is called",
      categories: ["daily"],
      grade: "Sahih",
      arabic:
        "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى مُحَمَّدٍ، اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
      transliteration:
        "Allahumma salli wa sallim ala Muhammad. Allahumma Rabba hadhihid-da'watit-tammah wassalatil-qa'imah, ati Muhammadanil-wasilata wal-fadilah, wab'athhu maqaman mahmuda nilladhi wa'adtah.",
      meaning:
        "O Allah, send salah and salam upon Muhammad. O Allah, Lord of this complete call and of the prayer that is about to be established, give Muhammad the Wasilah and excellence, and raise him to the praised station You promised him.",
      when: "After repeating the adhan. Send salawat first, then ask for al-Wasilah. The Wasilah sentence is the wording in Sahih al-Bukhari. Some later reports add 'You do not break Your promise.'",
      virtue:
        "Whoever asks the Wasilah for him after the adhan receives the promise of his intercession, as in Sahih Muslim 384.",
      reference: "Sahih Muslim 384 for the order; Sahih al-Bukhari 614 for the Wasilah dua",
      sourceUrl: "https://sunnah.com/bukhari:614",
    },
    {
      id: "darood-tunajjina",
      title: "Durood Tunajjina, a composed salawat",
      categories: ["composed"],
      grade: "Composed",
      arabic:
        "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ وَالْآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ، وَتَرْفَعُنَا بِهَا أَعْلَى الدَّرَجَاتِ، وَتُبَلِّغُنَا بِهَا أَقْصَى الْغَايَاتِ مِنْ جَمِيعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ",
      transliteration:
        "Allahumma salli ala sayyidina Muhammad, salatan tunajjina biha min jami'il-ahwali wal-afat, wa taqdi lana biha jami'al-hajat, wa tutahhiruna biha min jami'is-sayyi'at, wa tarfa'una biha a'lad-darajat, wa tuballighuna biha aqsal-ghayati min jami'il-khayrati fil-hayati wa ba'dal-mamati.",
      meaning:
        "O Allah, send salah upon our master Muhammad, a salah by which You save us from every terror and harm, fulfill for us every need, purify us from every sin, raise us to the highest degrees, and carry us to the furthest goals of every good in life and after death.",
      when: "A personal salawat many Muslims recite. It is not a wording reported from the Prophet ﷺ, and it is not said inside the tashahhud in place of the Ibrahimic salawat.",
      virtue:
        "Sending salah upon him in respectful words is allowed. Do not attach a specific hadith reward, a fixed count such as a lakh, or a guaranteed outcome to this composition. The virtues above belong to the authentic reports.",
      reference:
        "Composed salawat, widely recited. Not in the Sahih collections as his wording. Kept here so it is not confused with Durood Ibrahim.",
      note: "Tasawwuf in this library means adab and sincerity. It does not turn a composed poem into a hadith.",
    },
  ],
};
