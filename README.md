# Savage Worlds: Edycja Przygodowa (SWEP) — Generator & Karta Postaci

Kompletna, w 100% samodzielna aplikacja webowa do tworzenia, edycji, zarządzania i drukowania kart postaci do systemu **Savage Worlds: Edycja Przygodowa** (SWADE / SWEP) w języku polskim.

---

## 🚀 Jak uruchomić aplikację?

1. Wystarczy kliknąć dwukrotnie plik **`index.html`** w tym katalogu.
2. Aplikacja otworzy się natychmiast w Twojej domyślnej przeglądarce internetowej (Google Chrome, Microsoft Edge, Firefox, Opera, Safari itp.).
3. Działa w **100% offline**, nie wymaga połączenia z internetem ani instalowania żadnych serwerów czy zależności.

---

## 🌟 Główne funkcje aplikacji

### 1. 🧙 Kreator Postaci (Tryb Krok po Kroku z walidacją zasad)
Kreator prowadzi gracza przez 8 intuicyjnych kroków zgodnie z oficjalnym podręcznikiem zasad:
- **Krok 1: Koncepcja i Rasa** — wybór oficjalnych ras z podręcznika (*Człowiek, Elf, Krasnolud, Niziołek, Półelf, Półork, Aslanoid, Zaur, Android, Własna rasa*) z automatycznym naliczaniem bonusów rasowych (np. darmowa Przewaga dla Człowieka, baza Zręczność k6 dla Elfa, baza Wigor k6 i mniejsze tempo dla Krasnoluda).
- **Krok 2: Zawady** — katalog 50 Zawad (Drobne i Poważne) z opisami. Panel wymiany punktów z Zawad (do 4 punktów) na:
  - +1 kostkę Atrybutu (koszt: 2 pkt)
  - +1 dodatkową Przewagę (koszt: 2 pkt)
  - +1 punkt Umiejętności (koszt: 1 pkt)
  - +$500 dodatkowych funduszy (koszt: 1 pkt)
- **Krok 3: Cechy Główne (Atrybuty)** — Zręczność, Spryt, Duch, Siła, Wigor. Pula 5 punktów startowych, intuicyjny wybór kości (k4, k6, k8, k10, k12).
- **Krok 4: Umiejętności** — 5 umiejętności podstawowych (*Wysportowanie, Wiedza ogólna, Spostrzegawczość, Przekonywanie, Skradanie*) startuje od **k4 za darmo**. Pula 12 punktów z automatycznym pilnowaniem kosztu (1 pkt do poziomu cechy powiązanej, 2 pkt powyżej cechy!). Możliwość dodawania własnych umiejętności.
- **Krok 5: Przewagi** — baza ponad 50 Przewag (Wrodzone, Bojowe, Przywódcze, Nadprzyrodzone, Zawodowe, Społeczne, Niesamowite, Legendarne) z filtrami i wymaganiami rangowymi.
- **Krok 6: Ekwipunek i Pieniądze** — katalog broni białej, broni dystansowej, pancerzy, tarcz i sprzętu obozowego. Kalkulator udźwigu ($5 \times \text{Siła}$) z ostrzeżeniem o przeciążeniu.
- **Krok 7: Moce (Zdolności Nadprzyrodzone)** — aktywuje się po wybraniu Przewagi ZN, zawiera katalog mocy z kosztem PM, zasięgiem i opisem.
- **Krok 8: Podsumowanie** — zestawienie wszystkich cech i wyliczonych statystyk przed przejściem do karty.

---

### 2. 📜 Oficjalna Karta Postaci (Arkusz wzorowany na `SWEP_karta3.pdf`)
- Stylizowany układ inspirowany oficjalną kartą z podręcznika:
  - Kartki w stylu notatek z taśmą klejącą.
  - Wybór i podświetlenie kości `< 4 | 6 | 8 | 10 | 12 >`.
  - Duże plakietki okręgów na statystyki pochodne: **Obrona (Parowanie)**, **Wytrzymałość (z Pancerzem)**, **Tempo (z Kością Biegania)**.
  - Tabela broni i ataków (Zasięg, Obrażenia, PP, SzS, Waga, Uwagi).
  - **Dwa Tory Zdrowia**:
    - **Tor Zdrowia Fizycznego**: Rany (-1, -2, -3, K.O.) oraz Zmęczenie (Zm -1, Zm -2).
    - **Tor Poczytalności (Zdrowie Psychiczne)**: Poczytalność (-1, -2, -3, Obłęd) wraz z dedykowanym polem na *Fobie / Urazy psychiczne*.
  - Interaktywny pasek amunicji (1–30) do odznaczania wystrzelonych pocisków.
  - **Strona 2**: Karta notatek, historii bohatera i celów sesyjnych (papier w kratkę ze spinaczami).

---

### 3. 📈 Moduł Awansów (Advancement System — SWADE str. 55)
- **Pełna, interaktywna mechanika rozwoju postaci**:
  - Przycisk **`⚡ Dodaj Awans`** (lub kliknięcie kolejnego kamienia milowego w tabeli `N1..L4`) otwiera dedykowany modal wyboru.
  - 4 oficjalne opcje rozwoju zgodnie z podręcznikiem SWADE:
    1. **Nowa Przewaga**: inteligentny wybór spośród bazy Przewag (z uwzględnieniem aktywnego modułu Horror/Fantasy) z filtrowaniem wg aktualnej Rangi postaci (np. blokada Przewag Weterana dla Nowicjusza) i wyszukiwarką. Automatycznie dodaje Przewagę na kartę i aktywuje Zdolności Nadprzyrodzone, jeśli wybrano ZN.
    2. **Podniesienie Atrybutu**: wybór jednej z 5 cech (Zręczność, Spryt, Duch, Siła, Wigor) i podniesienie o 1 rodzaj kości (np. k6 ➔ k8). System pilnuje zasady SWADE (maksymalnie 1 podniesienie atrybutu na Rangę) i ostrzega w przypadku próby ponownego podniesienia.
    3. **Rozwój Umiejętności**: wybór pomiędzy podniesieniem **dwóch umiejętności** niższych od cech (lub zakupem nowej od k4) albo **jednej umiejętności** równej/wyższej od cechy powiązanej.
    4. **Usunięcie lub Zmniejszenie Zawady**: usunięcie Drobnej Zawady lub zmniejszenie Poważnej do Drobnej.
  - **Historia Rozwinięć na karcie postaci**: czytelna lista wszystkich zdobytych awansów z numerem, rangą (np. `[#1 N]`) i opisem.
  - **Przycisk `↩ Cofnij ostatni`**: możliwość natychmiastowego cofnięcia ostatniego awansu, który w pełni przywraca poprzedni stan atrybutów, umiejętności, przewag czy zawad.
  - **Pasek kamieni milowych z rangami**:
    - **Nowicjusz (N)**: 0–3 awanse (N1, N2, N3)
    - **Doświadczony (D)**: 4–7 awansów (D1, D2, D3, D4)
    - **Weteran (W)**: 8–11 awansów (W1, W2, W3, W4)
    - **Bohater (H)**: 12–15 awansów (H1, H2, H3, H4)
    - **Legenda (L)**: 16+ awansów (L1, L2, L3, L4...)
  - **Zsynchronizowany Kreator**: postać rozwinięta w kreatorze nie traci spójności punktowej — punkty i przewagi z awansów są prawidłowo uwzględniane w limitach.

---

### 4. 👥 Menedżer Postaci & Eksport/Import JSON
- Zapisywanie wielu bohaterów w lokalnej pamięci przeglądarki (`LocalStorage`).
- Pobieranie postaci do pojedynczego pliku `.json` (np. `SWADE_goran_zelaznoreki.json`) do dzielenia się z Mistrzem Gry lub znajomymi.
- Wczytywanie plików `.json` z dysku jednym kliknięciem.

---

### 5. 🖨️ Zoptymalizowany Druk i PDF (`@media print`)
- Przycisk **Drukuj / PDF** przygotowuje idealnie sformatowaną kartę w formacie A4 bez uciętych ramek, ukrywając zbędne elementy nawigacyjne.
- Przełącznik motywu:
  - **Stylowy Pergamin SWEP** — nastrojowy, klasyczny wygląd podręcznikowy.
  - **Druk B&W / Oszczędny** — czarno-biały motyw o wysokim kontraście, idealny dla domowych i biurowych drukarek laserowych.

---

### 6. 🎭 Gotowe Archetypy Startowe
Aplikacja zawiera 4 gotowe, w pełni wyposażone postacie:
1. **Goran Żelaznoręki** — Człowiek, Najemnik / Wojownik tarczownik.
2. **Elara Cichy Krok** — Elf, Leśna zwiadowczyni / Wyborowy strzelec z łukiem.
3. **Mistrz Varian z Wieży** — Człowiek, Uczony mag bitewny ze zwojami i czarami.
4. **Perykles „As” Podkowiec** — Niziołek, Szuler, rewolwerowiec i awanturnik z 6 Fuksami.

---

### 7. 🦇 & 🐉 Dodatki: Horror Companion & Fantasy Companion (W pełni przetłumaczone na język polski!)
Aplikacja została rozszerzona o pełną integrację zasad i katalogów z dwóch oficjalnych dodatków SWADE:
- **Pasek aktywnych dodatków (Globalne filtrowanie)**:
  - W nagłówku kreatora możesz w dowolnej chwili włączać i wyłączać dodatki:
    - 📘 **SWEP (Podręcznik Główny)** — zawsze aktywny fundament systemu.
    - 🦇 **Horror Companion** — Potworni Bohaterowie, nowe Zawady, Przewagi Grozy, Alchemia, ZN (Egzorcysta, Alchemik, Medium, Demonolog itp.), nowe moce i sprzęt przeciwko potworom.
    - 🐉 **Fantasy Companion** — 25+ fantastycznych ras, nowe Zawady, Przewagi klasowe (Rycerz, Trubadur, Mag bitewny), ZN (Bard, Kleryk, Druid, Diabolista, Nekromanta itp.), potężne czary i rynsztunek rycerski.
  - **Lokalne filtry w krokach**: w zakładkach Ras, Zawad, Przewag, Ekwipunku i Mocy możesz błyskawicznie przefiltrować listę tylko do interesującego Cię źródła lub wyświetlić wszystko naraz.
  - Wszystkie elementy z dodatków posiadają czytelne etykiety źródłowe: `[📘 SWEP]`, `[🦇 Horror]`, `[🐉 Fantasy]`.
  - Nowa umiejętność: **Alchemia (Spryt)** z dodatku Horror Companion, w pełni zintegrowana z kalkulatorem punktów umiejętności.
  - Dwa tory zdrowia: **Fizyczny** (Rany i Zmęczenie) oraz **Psychiczny / Poczytalność** (ze statystyką Poczytalności i notatkami traum/szaleństwa).

---

## 📁 Struktura plików projektu:
- `index.html` — Główny plik aplikacji (otwórz go w przeglądarce).
- `styles.css` — Arkusz stylów CSS z układem SWEP, motywami, modułami i stylami do druku A4.
- `app.js` — Główny silnik aplikacji, walidacja zasad SWEP, obsługa modułów, kalkulacje statystyk, zapis JSON/LocalStorage.
- `data.js` — Baza danych Podręcznika Głównego SWEP w języku polskim.
- `data_horror.js` — Baza danych dodatku **Horror Companion** (SWADE) przetłumaczona na język polski.
- `data_fantasy.js` — Baza danych dodatku **Fantasy Companion** (SWADE) przetłumaczona na język polski.
- `Savage_Worlds_Edycja_Przygodowa.pdf` — Oficjalny podręcznik podstawowy SWEP.
- `horror-companion-swade.pdf` — Podręcznik źródłowy Horror Companion.
- `fantasy-companion-swade.pdf` — Podręcznik źródłowy Fantasy Companion.
- `SWEP_karta3.pdf` — Oficjalny formularz karty postaci.
