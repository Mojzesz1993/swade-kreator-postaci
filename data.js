// Savage Worlds: Edycja Przygodowa (SWADE) - Baza danych i reguły
// Wygenerowano na podstawie oficjalnego polskiego podręcznika zasad

const SW_DATA = {
    rules: {
        title: "Savage Worlds: Edycja Przygodowa (SWEP / SWADE)",
        attributePoints: 5,
        skillPoints: 12,
        startingFunds: 500,
        maxHindrancePoints: 4,
        coreSkills: ["Wysportowanie", "Wiedza ogólna", "Spostrzegawczość", "Przekonywanie", "Skradanie"],
        diceSteps: ["k4", "k6", "k8", "k10", "k12", "k12+1", "k12+2"],
        ranks: [
            { name: "Nowicjusz", minAdvances: 0, maxAdvances: 3, label: "N" },
            { name: "Doświadczony", minAdvances: 4, maxAdvances: 7, label: "D" },
            { name: "Weteran", minAdvances: 8, maxAdvances: 11, label: "W" },
            { name: "Bohater", minAdvances: 12, maxAdvances: 15, label: "H" },
            { name: "Legenda", minAdvances: 16, maxAdvances: 999, label: "L" }
        ]
    },

    attributes: [
        { id: "zrecznosc", name: "Zręczność", short: "Zr", desc: "Koordynacja, zwinność i gracja ruchów." },
        { id: "spryt", name: "Spryt", short: "Sp", desc: "Inteligencja, bystrość umysłu i kojarzenie faktów." },
        { id: "duch", name: "Duch", short: "Du", desc: "Siła woli, odwaga, determinacja i charakter." },
        { id: "sila", name: "Siła", short: "Si", desc: "Czysta tężyzna fizyczna i siła mięśni." },
        { id: "wigor", name: "Wigor", short: "Wi", desc: "Zdrowie, odporność, wytrzymałość na rany i trucizny." }
    ],

    skills: [
        { name: "Wysportowanie", attr: "zrecznosc", isCore: true, desc: "Koordynacja, wspinanie, skakanie, pływanie, rzucanie i walka zapaśnicza." },
        { name: "Wiedza ogólna", attr: "spryt", isCore: true, desc: "Wiedza o świecie, kulturze, bieżących wydarzeniach i prawach natury." },
        { name: "Spostrzegawczość", attr: "spryt", isCore: true, desc: "Czujność, wyszukiwanie zagrożeń, spostrzeganie szczegółów." },
        { name: "Przekonywanie", attr: "duch", isCore: true, desc: "Dyplomacja, negocjacje, urok osobisty i skłanianie innych do swoich racji." },
        { name: "Skradanie", attr: "zrecznosc", isCore: true, desc: "Ciche poruszanie się, kamuflowanie, ukrywanie w cieniu." },
        { name: "Walka", attr: "zrecznosc", isCore: false, desc: "Walka wręcz i bronią białą. Kluczowa dla wyliczania Obrony (Parowania)." },
        { name: "Strzelanie", attr: "zrecznosc", isCore: false, desc: "Obsługa łuków, kusz, pistoletów, karabinów i wszelkiej broni dystansowej." },
        { name: "Leczenie", attr: "spryt", isCore: false, desc: "Pierwsza pomoc, opatrywanie ran w Złotej Godzinie, leczenie chorób." },
        { name: "Jeździectwo", attr: "zrecznosc", isCore: false, desc: "Jazda wierzchem, panowanie nad zwierzęciem i walka z siodła." },
        { name: "Przetrwanie", attr: "spryt", isCore: false, desc: "Tropienie, rozbijanie obozowiska, znajdowanie pożywienia i wody w dziczy." },
        { name: "Reperowanie", attr: "spryt", isCore: false, desc: "Naprawa maszyn, zamków, pojazdów, broni i urządzeń mechanicznych." },
        { name: "Zastraszanie", attr: "duch", isCore: false, desc: "Wymuszenia, groźby, budzenie strachu i testy woli w walce." },
        { name: "Wyśmiewanie", attr: "spryt", isCore: false, desc: "Docinki, prowokacje i dekoncentrowanie wrogów w walce i dyskusji." },
        { name: "Dowodzenie", attr: "spryt", isCore: false, desc: "Wydawanie rozkazów podkomendnym, taktyka i koordynacja w Bitwach." },
        { name: "Prowadzenie", attr: "zrecznosc", isCore: false, desc: "Kierowanie pojazdami naziemnymi (wozy, motocykle, samochody, czołgi)." },
        { name: "Pilotowanie", attr: "zrecznosc", isCore: false, desc: "Kierowanie statkami powietrznymi (samoloty, śmigłowce, statki)." },
        { name: "Wyszukiwanie", attr: "spryt", isCore: false, desc: "Znajdowanie informacji w księgach, archiwach, bibliotekach i sieci." },
        { name: "Wykształcenie", attr: "spryt", isCore: false, desc: "Nauki humanistyczne, historia, literatura, prawo i sztuka." },
        { name: "Nauka", attr: "spryt", isCore: false, desc: "Fizyka, chemia, biologia, geologia, matematyka i inżynieria." },
        { name: "Okultyzm", attr: "spryt", isCore: false, desc: "Wiedza o demonach, magii, starożytnych rytuałach i istotach nie z tego świata." },
        { name: "Hakowanie", attr: "spryt", isCore: false, desc: "Łamanie zabezpieczeń systemów komputerowych i programowanie." },
        { name: "Elektronika", attr: "spryt", isCore: false, desc: "Obsługa, konfiguracja i diagnoza układów elektronicznych." },
        { name: "Hazard", attr: "spryt", isCore: false, desc: "Gry losowe, blefowanie przy kartach i ocena szans." },
        { name: "Występowanie", attr: "duch", isCore: false, desc: "Muzyka, aktorstwo, taniec, oracja i przemowy publiczne." },
        { name: "Język obcy", attr: "spryt", isCore: false, desc: "Biegłość w konkretnym języku obcym." },
        { name: "Złodziejstwo", attr: "zrecznosc", isCore: false, desc: "Otwieranie zamków, kradzież kieszonkowa, zastawianie i rozbrajanie pułapek." },
        { name: "Żeglowanie", attr: "zrecznosc", isCore: false, desc: "Obsługa i manewrowanie łodziami oraz statkami wodnymi." },
        { name: "Rzucanie czarów", attr: "spryt", isCore: false, isArcane: true, arcaneType: "Magia", desc: "Umiejętność rzucania zaklęć dla magów i czarodziejów." },
        { name: "Wiara", attr: "duch", isCore: false, isArcane: true, arcaneType: "Cuda", desc: "Umiejętność cudów dla kapłanów, paladynów i świętych mężów." },
        { name: "Psionika", attr: "spryt", isCore: false, isArcane: true, arcaneType: "Psionika", desc: "Umiejętność manifestacji mocy psionicznych i mentalnych." },
        { name: "Skupienie", attr: "duch", isCore: false, isArcane: true, arcaneType: "Talent", desc: "Umiejętność wewnętrznego skupienia dla mnichów i mistyków." },
        { name: "Niesamowita nauka", attr: "spryt", isCore: false, isArcane: true, arcaneType: "Nies. nauka", desc: "Umiejętność szalonej techniki i tworzenia gadżetów." }
    ],

    races: [
        {
                "id": "czlowiek",
                "name": "Człowiek",
                "desc": "Wszechstronni i zdeterminowani ludzie dominują w większości światów Savage Worlds.",
                "traits": [
                        {
                                "title": "Wszechstronny",
                                "desc": "Ludzie zaczynają z jedną darmową Przewagą rangi Nowicjusz, na którą spełniają wymagania."
                        }
                ],
                "attribute_bonuses": {},
                "free_edges": 1,
                "free_hindrances": 0
        },
        {
                "id": "elf",
                "name": "Elf",
                "desc": "Wysmukli, długowieczni i zwinni mieszkańcy lasów i starożytnych grodów.",
                "traits": [
                        {
                                "title": "Zwinny",
                                "desc": "Elfy zaczynają ze Zręcznością k6 zamiast k4. Maksimum tego atrybutu wynosi k12+1."
                        },
                        {
                                "title": "Widzenie w mroku",
                                "desc": "Elfy ignorują kary za Półmrok i Mrok."
                        },
                        {
                                "title": "Wszystko co naturalne",
                                "desc": "Elfy czują awersję do skomplikowanej technologii i żelaza: -2 do Reperowania, Nauki i Elektroniki."
                        }
                ],
                "attribute_bonuses": {
                        "zrecznosc": "k6"
                },
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "krasnolud",
                "name": "Krasnolud",
                "desc": "Niscy, krzepcy i nieustępliwi mistrzowie rzemiosła z podziemnych twierdz.",
                "traits": [
                        {
                                "title": "Krzepki",
                                "desc": "Krasnoludy zaczynają z Wigorem na k6 zamiast k4. Maksimum tego atrybutu wynosi k12+1."
                        },
                        {
                                "title": "Widzenie w mroku",
                                "desc": "Krasnoludy ignorują kary za Półmrok i Mrok."
                        },
                        {
                                "title": "Powolny",
                                "desc": "Tempo krasnoluda wynosi 5, a jego kość biegania to k4."
                        },
                        {
                                "title": "Zmniejszone obładowanie",
                                "desc": "Podczas wyliczania obciążenia i minimalnej Siły do pancerza Siłę traktuje się jak o 1 rodzaj wyższą."
                        }
                ],
                "attribute_bonuses": {
                        "wigor": "k6"
                },
                "pace": 5,
                "running_die": "k4",
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "niziolek",
                "name": "Niziołek",
                "desc": "Mali, pogodni i niezwykle zwinni wędrowcy o wielkich sercach i niewyczerpanym szczęściu.",
                "traits": [
                        {
                                "title": "Zwinny",
                                "desc": "Niziołki zaczynają ze Zręcznością k6. Maksimum wynosi k12+1."
                        },
                        {
                                "title": "Szczęściarz",
                                "desc": "Niziołek zaczyna z darmową Przewagą Szczęściarz (+1 Fuks na początku każdej sesji)."
                        },
                        {
                                "title": "Dzielny",
                                "desc": "Niziołki otrzymują +2 do testów Strachu i wychodzenia ze stanu Szoku."
                        },
                        {
                                "title": "Mały",
                                "desc": "Rozmiar -1, co zmniejsza Wytrzymałość o 1."
                        },
                        {
                                "title": "Krótkie nóżki",
                                "desc": "Tempo 5, kość biegania k4."
                        }
                ],
                "attribute_bonuses": {
                        "zrecznosc": "k6"
                },
                "size": -1,
                "toughness_mod": -1,
                "pace": 5,
                "running_die": "k4",
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "polelf",
                "name": "Półelf",
                "desc": "Potomkowie ludzi i elfów, łączący najlepsze cechy obu ras, choć nigdzie nie czujący się w pełni u siebie.",
                "traits": [
                        {
                                "title": "Dziedzictwo",
                                "desc": "Półelf wybiera na starcie: Zręczność k6 ALBO jedną darmową Przewagę Nowicjusza."
                        },
                        {
                                "title": "Widzenie w mroku",
                                "desc": "Ignoruje kary za Półmrok i Mrok."
                        },
                        {
                                "title": "Obcy",
                                "desc": "-2 do testów Przekonywania podczas kontaktów z kimkolwiek poza ludźmi i elfami."
                        }
                ],
                "attribute_bonuses": {
                        "zrecznosc": "k6"
                },
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "polork",
                "name": "Półork",
                "desc": "Silni, szorstcy i groźni wojownicy budzący respekt i strach u wątłych ras cywilizowanych.",
                "traits": [
                        {
                                "title": "Silny",
                                "desc": "Półorki zaczynają z Siłą k6. Maksimum wynosi k12+1."
                        },
                        {
                                "title": "Widzenie w mroku",
                                "desc": "Ignorują kary za Półmrok i Mrok."
                        },
                        {
                                "title": "Krew wojownika",
                                "desc": "Półorki zaczynają z darmową Przewagą Dzielny (+2 do Strachu)."
                        },
                        {
                                "title": "Obcy",
                                "desc": "-2 do testów Przekonywania wobec większości cywilizowanych społeczności."
                        }
                ],
                "attribute_bonuses": {
                        "sila": "k6"
                },
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "aslanoid",
                "name": "Aslanoid (Kotołak)",
                "desc": "Humanoidalne koty o zwinnych ciałach, ostrych szponach i kocim sprycie.",
                "traits": [
                        {
                                "title": "Zwinny",
                                "desc": "Zręczność k6 na start (maks. k12+1)."
                        },
                        {
                                "title": "Kły i pazury",
                                "desc": "Broń naturalna zadająca Si+k4 obrażeń."
                        },
                        {
                                "title": "Widzenie w mroku",
                                "desc": "Ignorują kary za Półmrok i Mrok."
                        },
                        {
                                "title": "Na dno!",
                                "desc": "-2 do testów Wysportowania (pływanie), koszt 3 Tempa za cal w wodzie."
                        }
                ],
                "attribute_bonuses": {
                        "zrecznosc": "k6"
                },
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "zaur",
                "name": "Zaur (Jaszczuroczłek)",
                "desc": "Pustynni i bagienni wojownicy o twardych łuskach i zimnej krwi.",
                "traits": [
                        {
                                "title": "Pancerz łuskowy",
                                "desc": "+2 do Pancerza naturalnego (i Wytrzymałości)."
                        },
                        {
                                "title": "Szpony",
                                "desc": "Broń naturalna zadająca Si+k4 obrażeń."
                        },
                        {
                                "title": "Zmiennocieplny",
                                "desc": "-2 do testów opierania się ekstremalnemu zimnu."
                        }
                ],
                "armor_mod": 2,
                "attribute_bonuses": {},
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "android",
                "name": "Android (Syntetyk)",
                "desc": "Sztuczne, mechaniczno-biologiczne istoty wyposażone w zaawansowaną sieć neuronową.",
                "traits": [
                        {
                                "title": "Konstrukt",
                                "desc": "+2 do rzutów na wyjście z Szoku, nie oddycha, odporny na trucizny i choroby, ignoruje 1 poziom ran. Naprawa wymaga Reperowania."
                        },
                        {
                                "title": "Odszczepieniec",
                                "desc": "-2 do Przekonywania z istotami organicznymi."
                        },
                        {
                                "title": "Protokół / Przysięga",
                                "desc": "Zaprogramowana wierność stwórcy lub prawo pacyfizmu."
                        }
                ],
                "attribute_bonuses": {},
                "free_edges": 0,
                "free_hindrances": 0
        },
        {
                "id": "custom",
                "name": "Własna rasa (Custom)",
                "desc": "Dowolna rasa stworzona według reguł Mistrza Gry i podręcznika (+2 punkty rasowe).",
                "traits": [
                        {
                                "title": "Elastyczne właściwości",
                                "desc": "Samodzielnie ustal premie do atrybutów, zdolności i ograniczenia rasowe."
                        }
                ],
                "attribute_bonuses": {},
                "free_edges": 0,
                "free_hindrances": 0
        }
],
    hindrances: [
        {
                "name": "Analfabeta",
                "severity": "Drobna",
                "points": 1,
                "desc": "Nie umiesz czytać ani pisać."
        },
        {
                "name": "Arogancki",
                "severity": "Poważna",
                "points": 2,
                "desc": "Lubisz górować nad przeciwnikiem, zawsze atakujesz najpotężniejszego wroga."
        },
        {
                "name": "Bezwzględny",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Bez wahania zrobisz, co trzeba, i nikt ci nie przeszkodzi."
        },
        {
                "name": "Biedak",
                "severity": "Drobna",
                "points": 1,
                "desc": "Połowa startowych funduszy, nigdy się nie dorobisz."
        },
        {
                "name": "Bohaterski",
                "severity": "Poważna",
                "points": 2,
                "desc": "Zawsze pomagasz potrzebującym."
        },
        {
                "name": "Brzydal",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "−1 (Drobna) lub −2 (Poważna) do testów Przekonywania ze względu na odpychający wygląd."
        },
        {
                "name": "Chciwy",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Obsesyjnie pragniesz bogactwa i dóbr doczesnych."
        },
        {
                "name": "Chojrak",
                "severity": "Poważna",
                "points": 2,
                "desc": "Wierzysz, że wszystko ci się uda."
        },
        {
                "name": "Chuchro",
                "severity": "Drobna",
                "points": 1,
                "desc": "−2 do Wigoru, gdy próbujesz uniknąć Zmęczenia."
        },
        {
                "name": "Ciekawski",
                "severity": "Poważna",
                "points": 2,
                "desc": "Chcesz wiedzieć wszystko o wszystkim."
        },
        {
                "name": "Długi język",
                "severity": "Drobna",
                "points": 1,
                "desc": "Nie umiesz zachować tajemnicy i ciągle zdradzasz sekrety."
        },
        {
                "name": "Dzieciak",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Drobna (12–15 lat): 4 pkt na atrybuty, 10 pkt na umiejętności, +1 Fuks na sesję. Poważna (8–11 lat): 3 pkt na atrybuty, 10 pkt na umiejętności, Zawada Konus (Rozmiar −1, Wytrzymałość −1) i +2 Fuksy na sesję."
        },
        {
                "name": "Dziwactwo",
                "severity": "Drobna",
                "points": 1,
                "desc": "Drobne, powracające natręctwo, które drażni innych."
        },
        {
                "name": "Fobia",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "−1/−2 do testów Cech, gdy w pobliżu jest rzecz, której się boisz."
        },
        {
                "name": "Gapa",
                "severity": "Poważna",
                "points": 2,
                "desc": "−1 do Wiedzy ogólnej i Spostrzegawczości."
        },
        {
                "name": "Grubas",
                "severity": "Drobna",
                "points": 1,
                "desc": "Rozmiar +1, Tempo −1, kość biegania to k4."
        },
        {
                "name": "Honorowy",
                "severity": "Poważna",
                "points": 2,
                "desc": "Zawsze dotrzymujesz słowa i zachowujesz się z klasą."
        },
        {
                "name": "Jednooki",
                "severity": "Poważna",
                "points": 2,
                "desc": "−2 jeżeli działasz na coś dalszego niż 5\" (10 metrów)."
        },
        {
                "name": "Jednoręki",
                "severity": "Poważna",
                "points": 2,
                "desc": "−4 do zadań wymagających dwóch rąk (np. Wysportowania)."
        },
        {
                "name": "Kiepski wzrok",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "−1 do testów Cech wymagających wzroku, −2 przy Poważnej Zawadzie."
        },
        {
                "name": "Konus",
                "severity": "Drobna",
                "points": 1,
                "desc": "Rozmiar i Wytrzymałość mniejsze o 1. Rozmiar nie może spaść poniżej −1."
        },
        {
                "name": "Krwiożerczy",
                "severity": "Poważna",
                "points": 2,
                "desc": "Nigdy nie bierzesz jeńców."
        },
        {
                "name": "Lojalny",
                "severity": "Drobna",
                "points": 1,
                "desc": "Nie porzucisz przyjaciół."
        },
        {
                "name": "Mętny",
                "severity": "Poważna",
                "points": 2,
                "desc": "−1 do Zastraszania, Przekonywania i Wyśmiewania, bo nie sposób zrozumieć, o co ci chodzi."
        },
        {
                "name": "Mściwy",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Pragniesz wyrównać rachunki. Drobna: szukasz zemsty w granicach prawa. Poważna: nie cofniesz się przed niczym, by dopełnić zemsty."
        },
        {
                "name": "Na dno!",
                "severity": "Drobna",
                "points": 1,
                "desc": "−2 do testów Wysportowania (pływanie), każdy cal ruchu w wodzie kosztuje 3\" Tempa."
        },
        {
                "name": "Nawyk",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Musisz przyjmować jakąś substancję, by uniknąć Zmęczenia."
        },
        {
                "name": "Niedowiarek",
                "severity": "Drobna",
                "points": 1,
                "desc": "Nie wierzysz w rzeczy nadprzyrodzone i często niepotrzebnie przez to ryzykujesz."
        },
        {
                "name": "Niemy",
                "severity": "Poważna",
                "points": 2,
                "desc": "Nie możesz mówić."
        },
        {
                "name": "Niezdecydowany",
                "severity": "Drobna",
                "points": 1,
                "desc": "Ciągniesz dwie Karty Akcji i zatrzymujesz niższą (chyba że wyciągniesz Jokera). Nie możesz posiadać Przewag Błyskawiczny refleks i Opanowany."
        },
        {
                "name": "Obowiązki",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Musisz przepracować 20 (Drobna) lub 40 (Poważna) godzin tygodniowo."
        },
        {
                "name": "Obrażalski",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Łatwo cię urazić."
        },
        {
                "name": "Obsesja",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Twoje działania służą wyższemu celowi lub przekonaniu."
        },
        {
                "name": "Odszczepieniec",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Nie pasujesz do społeczności."
        },
        {
                "name": "Oferma",
                "severity": "Poważna",
                "points": 2,
                "desc": "−2 do Wysportowania i Skradania."
        },
        {
                "name": "Ostrożny",
                "severity": "Drobna",
                "points": 1,
                "desc": "Wszystko drobiazgowo planujesz i unikasz ryzyka."
        },
        {
                "name": "Pacyfista",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Walczysz tylko w samoobronie (Drobna) albo nigdy (Poważna)."
        },
        {
                "name": "Pech",
                "severity": "Poważna",
                "points": 2,
                "desc": "Dostajesz o jednego Fuksa mniej na początku sesji."
        },
        {
                "name": "Podejrzliwy",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Jesteś paranoikiem i nikomu nie ufasz. Poważna: sojusznicy mają −2 do testów Wsparcia dla ciebie."
        },
        {
                "name": "Porywczy",
                "severity": "Poważna",
                "points": 2,
                "desc": "Działasz, zanim pomyślisz."
        },
        {
                "name": "Poszukiwany",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Poszukują cię władze."
        },
        {
                "name": "Potulny",
                "severity": "Drobna",
                "points": 1,
                "desc": "−2 do Zastraszania."
        },
        {
                "name": "Powolny",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Drobna: Tempo −1, kość biegania mniejsza o rodzaj (min. k4). Poważna: Tempo −2, kość biegania −2, −2 do Wysportowania i opierania się Wysportowaniu. Nie można łączyć z Przewagą Chyży."
        },
        {
                "name": "Przygłuchy",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "−4 do testów Spostrzegawczości związanych z nasłuchiwaniem (w tym budzenia się). Poważna: jesteś całkowicie głuchy i automatycznie oblewasz testy nasłuchiwania."
        },
        {
                "name": "Przysięga",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Wiąże cię złożona komuś przysięga."
        },
        {
                "name": "Psuj",
                "severity": "Drobna",
                "points": 1,
                "desc": "−2 do używania urządzeń mechanicznych i elektrycznych."
        },
        {
                "name": "Ramol",
                "severity": "Poważna",
                "points": 2,
                "desc": "−1 do Tempa, biegania, Zręczności, Siły i Wigoru. 5 dodatkowych punktów umiejętności."
        },
        {
                "name": "Straceniec",
                "severity": "Drobna",
                "points": 1,
                "desc": "Pragniesz umrzeć po spełnieniu lub w trakcie wykonywania wielkiej misji."
        },
        {
                "name": "Ślepiec",
                "severity": "Poważna",
                "points": 2,
                "desc": "−6 do każdego działania wymagającego widzenia (ale wybierz darmową Przewagę)."
        },
        {
                "name": "Świr",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Masz dziwaczne przekonania, które powodują kłopoty."
        },
        {
                "name": "Tajemnica",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Masz jakiś mroczny sekret."
        },
        {
                "name": "Tchórz",
                "severity": "Poważna",
                "points": 2,
                "desc": "−2 do testów Strachu i opierania się Zastraszaniu."
        },
        {
                "name": "Uparciuch",
                "severity": "Drobna",
                "points": 1,
                "desc": "Chcesz, żeby zawsze było po twojemu, i nigdy nie przyznajesz się do błędów."
        },
        {
                "name": "Wredny",
                "severity": "Drobna",
                "points": 1,
                "desc": "−1 do Przekonywania."
        },
        {
                "name": "Wróg",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Masz powracającego wroga."
        },
        {
                "name": "Zawistny",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Zazdrościsz innym."
        },
        {
                "name": "Zhańbiony",
                "severity": "Drobna/Poważna",
                "points": "1 lub 2",
                "desc": "Prześladuje cię przeszłość."
        }
],
    edges: [
        {
                "category": "Wrodzone",
                "name": "Bogaty",
                "requirements": "N",
                "desc": "Zaczynasz grę, mając trzykrotnie więcej pieniędzy, zarabiasz 150K $ rocznie."
        },
        {
                "category": "Wrodzone",
                "name": "Krezus",
                "requirements": "N, Bogaty",
                "desc": "Zaczynasz grę, mając pięciokrotnie więcej pieniędzy, zara-biasz 500K $ rocznie."
        },
        {
                "category": "Wrodzone",
                "name": "Czujny",
                "requirements": "N",
                "desc": "+2 do testów Spostrzegawczości."
        },
        {
                "category": "Wrodzone",
                "name": "Śliczny",
                "requirements": "N, Ładny",
                "desc": "+2 do testów Przekonywania i Występowania"
        },
        {
                "category": "Wrodzone",
                "name": "Rozgłos",
                "requirements": "N",
                "desc": "+1 do testów Przekonywania, gdy ktoś cię rozpozna (Wiedza ogólna), dwa razy większe zarobki podczas Występowania."
        },
        {
                "category": "Wrodzone",
                "name": "Szczęściarz",
                "requirements": "N",
                "desc": "+1 Fuks na początku każdej sesji."
        },
        {
                "category": "Wrodzone",
                "name": "Cholerny szczęściarz",
                "requirements": "N, Szczęściarz",
                "desc": "+2 Fuksy na początku każdej sesji."
        },
        {
                "category": "Wrodzone",
                "name": "Szycha",
                "requirements": "N",
                "desc": "+2 do Wiedzy ogólnej i Wypytywania klas wyższych."
        },
        {
                "category": "Bojowe",
                "name": "Bez przebaczenia",
                "requirements": "D",
                "desc": "+2 do obrażeń, gdy wydajesz Fuksa, by je przerzucić."
        },
        {
                "category": "Bojowe",
                "name": "Instynkt wojownika",
                "requirements": "D",
                "desc": "Darmowy przerzut testu podczas Triku, który inicjujesz."
        },
        {
                "category": "Bojowe",
                "name": "Nerwy z tytanu",
                "requirements": "N, Nerwy ze stali",
                "desc": "Ignorujesz dwa poziomy kar za Rany."
        },
        {
                "category": "Bojowe",
                "name": "Bokser",
                "requirements": "D, Pięściarz",
                "desc": "+2 do Wytrzymałości, zwiększ obrażenia gołymi rękami o jeden rodzaj kostki obrażeń."
        },
        {
                "category": "Bojowe",
                "name": "Błyskawiczny cios",
                "requirements": "H, Szybki cios",
                "desc": "Trzy darmowe ataki na rundę, gdy wróg zbliża się na Odległość broni."
        },
        {
                "category": "Bojowe",
                "name": "Sztuka walki",
                "requirements": "D, Technika walki",
                "desc": "+2 do testów Walki bez broni, kostka obrażeń wzrasta o rodzaj."
        },
        {
                "category": "Bojowe",
                "name": "Ukochana broń",
                "requirements": "D, Ulubiona broń",
                "desc": "Premia do ataku i Obrony wzrasta do +2."
        },
        {
                "category": "Bojowe",
                "name": "Błyskawiczny unik",
                "requirements": "D, Unik",
                "desc": "+2 do rzutów podczas Odskoku."
        },
        {
                "category": "Bojowe",
                "name": "Zabójca olbrzymów",
                "requirements": "W",
                "desc": "+1k6 do obrażeń przeciw istotom większym o trzy i więcej Rozmiarów."
        },
        {
                "category": "Bojowe",
                "name": "Zabójczy strzał",
                "requirements": "Fig, N, Strzelanie lub",
                "desc": "Wysportowanie k8 Raz na turę, jeżeli masz jokera, podwajasz obrażenia od Strzela-nia albo Wysportowania (rzucanie)."
        },
        {
                "category": "Przywódcze",
                "name": "Autorytet",
                "requirements": "D, Baczność!",
                "desc": "Twój Zasięg Dowodzenia wzrasta do 10” (20 metrów)."
        },
        {
                "category": "Przywódcze",
                "name": "Mistrz taktyki",
                "requirements": "W, Ta k t y k",
                "desc": "W każdej turze ciągniesz i przekazujesz dwie Karty Akcji."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Czarodziej",
                "requirements": "D, ZN (Magia),",
                "desc": "Rzucanie czarów k6 Za 1 dodatkowy Punkt Mocy zmieniasz Wariant czaru."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Jedność z mocą",
                "requirements": "D, ZN",
                "desc": "Przebicie w teście aktywacji mocy zmniejsza jej koszt o 1."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Koncentracja",
                "requirements": "D, ZN",
                "desc": "Podwaja Czas Trwania mocy, które nie działają Natychmiast."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Konstruktor",
                "requirements": "D, ZN",
                "desc": "Pozwala tworzyć Artefakty."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Mentalista",
                "requirements": "D, ZN (Psionika),",
                "desc": "Psionika k6 +2 do przeciwstawnych testów Psioniki."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Mobilizacja",
                "requirements": "D, ZN (Talent),",
                "desc": "Skupienie k6 +1 do testu Koncentracji za 1 Punkt Mocy, +2 za 3 Punkty Mocy."
        },
        {
                "category": "Nadprzyrodzone",
                "name": "Nowe moce",
                "requirements": "N, ZN",
                "desc": "Otrzymujesz dwie nowe moce."
        },
        {
                "category": "Społeczne",
                "name": "Żelazny charakter",
                "requirements": "N, Charakterny,",
                "desc": "Dzielny Doliczasz premię z Charakternego, gdy opierasz się mocom."
        },
        {
                "category": "Społeczne",
                "name": "Uskrzydlający",
                "requirements": "D, Inspirujący",
                "desc": "Jak wyżej, ale dwa razy na turę."
        },
        {
                "category": "Społeczne",
                "name": "Koneksje",
                "requirements": "N",
                "desc": "Raz na sesję kontakt może zapewnić ci pomoc albo inną przysługę."
        },
        {
                "category": "Społeczne",
                "name": "Złowrogi",
                "requirements": "N, Patrz tekst",
                "desc": "+2 do Zastraszania."
        },
        {
                "category": "Niesamowite",
                "name": "Przyjaciel zwierząt",
                "requirements": "N",
                "desc": "Możesz wydawać Fuksy dla zwierząt pod twoją kontrolą."
        },
        {
                "category": "Niesamowite",
                "name": "Szósty zmysł",
                "requirements": "N",
                "desc": "Testujesz Spostrzegawczość +2, by wykryć zasadzkę albo podobne zagrożenie."
        },
        {
                "category": "Niesamowite",
                "name": "Zbieracz",
                "requirements": "N, Szczęściarz",
                "desc": "Raz na spotkanie możesz znaleźć przy sobie potrzebny przedmiot."
        },
        {
                "category": "Legendarne",
                "name": "Arcyfechmistrz",
                "requirements": "L, Fechmistrz",
                "desc": "Twoja Obrona wzrasta o +1, a przebicie w teście Walki powo-duje, że zadajesz dodatkowo k10 obrażeń."
        },
        {
                "category": "Legendarne",
                "name": "Podwładni",
                "requirements": "Fig, L",
                "desc": "Posiadasz pięciu podwładnych."
        },
        {
                "category": "Legendarne",
                "name": "Pomagier",
                "requirements": "Fig, L",
                "desc": "Posiadasz pomocnika będącego Figurą."
        },
        {
                "category": "Legendarne",
                "name": "Twardy jak diament",
                "requirements": "L, Twardy jak skała,",
                "desc": "Wi k12 Możesz otrzymać pięć Ran przed Eliminacją."
        },
        {
                "category": "Legendarne",
                "name": "Ekspert",
                "requirements": "L, Zawodowiec w",
                "desc": "Cesze Twoja Cecha i jej limit wzrastają o kolejny poziom."
        },
        {
                "category": "Legendarne",
                "name": "Mistrz",
                "requirements": "WC, L, Ekspert w",
                "desc": "Cesze Gdy testujesz wybraną Cechę, twoja Kość Figury to k10."
        },
        {
                "category": "Wrodzone",
                "name": "Zdolności nadprzyrodzone",
                "requirements": "N",
                "desc": "Daje dostęp do magii, cudów, psioniki, talentów lub niesamowitej nauki. Zapewnia um. nadprzyrodzoną na k4, 10 Punktów Mocy i 3 Moce."
        },
        {
                "category": "Przywódcze",
                "name": "Dowódca",
                "requirements": "N, Sp k6",
                "desc": "Zwiększa Zasięg Dowodzenia do 10 metrów (5\"), pozwala wydawać rozkazy i koordynować sojuszników."
        },
        {
                "category": "Przywódcze",
                "name": "Przywódca naturalny",
                "requirements": "N, Dowódca, Du k8",
                "desc": "Możesz przekazywać swoje Fuksy dowodzonym sojusznikom (Blotkom i Figurom)."
        },
        {
                "category": "Przywódcze",
                "name": "Inspirujący okrzyk",
                "requirements": "D, Dowódca",
                "desc": "+1 do testów wychodzenia z Szoku dla sojuszników w Zasięgu Dowodzenia."
        },
        {
                "category": "Przywódcze",
                "name": "Taktyk",
                "requirements": "D, Sp k8, Dowódca, Bitwa k6",
                "desc": "Ciągniesz dodatkową Kartę Akcji na początku walki, którą możesz przekazać sojusznikowi."
        },
        {
                "category": "Zawodowe",
                "name": "As",
                "requirements": "N, Zr k8",
                "desc": "Darmowy przerzut testów Prowadzenia, Pilotowania i Pływania. Możesz wydawać Fuksy na Wyparowanie obrażeń pojazdu."
        },
        {
                "category": "Zawodowe",
                "name": "Badacz",
                "requirements": "N, Sp k8, Wyszukiwanie k8",
                "desc": "+2 do Wyszukiwania oraz Wiedzy ogólnej. Znajdujesz informacje w połowie normalnego czasu."
        },
        {
                "category": "Zawodowe",
                "name": "Uczony",
                "requirements": "N, Sp k8",
                "desc": "+2 do dwóch wybranych umiejętności opartych na Sprycie (Nauka, Okultyzm, Leczenie, Elektronika itp.)."
        },
        {
                "category": "Zawodowe",
                "name": "Złodziej",
                "requirements": "N, Zr k8, Skradanie k6, Wyszukiwanie k6",
                "desc": "+1 do Skradania, Wyszukiwania i zwinności przy unikaniu pułapek i kradzieży."
        },
        {
                "category": "Zawodowe",
                "name": "Szuler",
                "requirements": "N, Sp k6, Hazard k6",
                "desc": "Przerzut testów Hazardu, zyskujesz dodatkowe dochody i łatwiej oszukujesz w grach."
        },
        {
                "category": "Niesamowite",
                "name": "Zwierzak",
                "requirements": "N",
                "desc": "Wierny kompan zwierzęcy (pies, wilk, sokół itp.), który podróżuje z tobą i walczy w twojej obronie."
        },
        {
                "category": "Legendarne",
                "name": "Wybraniec losu",
                "requirements": "L",
                "desc": "Zyskujesz +1 Fuksa na początku każdej sesji, darmowy przerzut jednego testu na sesję."
        },
        {
                "category": "Legendarne",
                "name": "Mistrz broni",
                "requirements": "L, Walka k12",
                "desc": "Twoja Obrona wzrasta o +1, a ataki wręcz ignorują 2 punkty Pancerza przeciwnika."
        }
],
    powers: [
        {
                "name": "Aura bólu",
                "rank": "D",
                "pm": "4",
                "range": "Sp",
                "duration": "5",
                "desc": "Tworzy aurę zadającą 2k4 obrażeń."
        },
        {
                "name": "Bariera",
                "rank": "D",
                "pm": "2",
                "range": "Sp",
                "duration": "5",
                "desc": "Tworzy barierę o Twardości 10, długą na 5″ (10 metrów), wysoką na 1″ (2 metry)."
        },
        {
                "name": "Czyszczenie umysłu",
                "rank": "W",
                "pm": "3",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Usuwa lub zmienia wspomnienia."
        },
        {
                "name": "Czytanie w myślach",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Test przeciwstawny do Sprytu pozwala czytać  w myślach."
        },
        {
                "name": "Dar języków",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "10 m",
                "desc": "Pozwala mówić i rozumieć języki."
        },
        {
                "name": "Dematerializacja",
                "rank": "H",
                "pm": "5",
                "range": "Sp",
                "duration": "5",
                "desc": "Czyni bezcielesnym."
        },
        {
                "name": "Grom",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "5",
                "desc": "Zwiększa obrażenia broni o +2/+4."
        },
        {
                "name": "Iluzja",
                "rank": "N",
                "pm": "3",
                "range": "Sp",
                "duration": "5",
                "desc": "Tworzy złudne wizerunki."
        },
        {
                "name": "Kret",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "5",
                "desc": "Pozwala poruszać się pod ziemią."
        },
        {
                "name": "Latanie",
                "rank": "W",
                "pm": "3",
                "range": "Sp",
                "duration": "5",
                "desc": "Pozwala latać w Tempie 12\"."
        },
        {
                "name": "Leczenie",
                "rank": "N",
                "pm": "3",
                "range": "Dotyk",
                "duration": "Natych",
                "desc": "Usuwa Rany."
        },
        {
                "name": "Manipulacja żywiołem",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "5",
                "desc": "Umożliwia drobną manipulację jednym z czterech żywiołów."
        },
        {
                "name": "Niewidzialność",
                "rank": "D",
                "pm": "5",
                "range": "Sp",
                "duration": "5",
                "desc": "Czyni niewidzialnym (-4/-6, by dostrzec)."
        },
        {
                "name": "Ochrona",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "5",
                "desc": "Zapewnia +2/+4 Pancerza."
        },
        {
                "name": "Ochrona przed mocą",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "5",
                "desc": "Wrogowie odejmują -2/-4 od mocy używanych przeciw postaci oraz od nadprzyrodzonych obrażeń."
        },
        {
                "name": "Odbicie",
                "rank": "N",
                "pm": "3",
                "range": "Sp",
                "duration": "5",
                "desc": "−2/–4 do bycia trafionym."
        },
        {
                "name": "Oplątanie",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Pozwala Pochwycić i Unieruchomić wrogów."
        },
        {
                "name": "Orzeźwienie",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Usuwa Zmęczenie i Szok, przy przebiciu – Porażenie."
        },
        {
                "name": "Oślepienie",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Powoduje u ofiar karę -2/-4."
        },
        {
                "name": "Pocisk",
                "rank": "N",
                "pm": "1",
                "range": "Sp×2",
                "duration": "Natych",
                "desc": "Atak dystansowy zadający 2k6 obrażeń."
        },
        {
                "name": "Porażenie",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Powoduje Porażenie celu."
        },
        {
                "name": "Przerażenie",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Wymusza test Strachu."
        },
        {
                "name": "Rozproszenie",
                "rank": "D",
                "pm": "1",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Usuwa działanie mocy."
        },
        {
                "name": "Seans",
                "rank": "H",
                "pm": "5",
                "range": "Na siebie",
                "duration": "5",
                "desc": "min Pozwala zadać pytanie istocie nie z tego świata."
        },
        {
                "name": "Sokoli wzrok",
                "rank": "D",
                "pm": "2",
                "range": "Sp",
                "duration": "5",
                "desc": "Bardzo wyostrza wzrok, przy przebiciu zmniejsza  o połowę kary za Zasięg."
        },
        {
                "name": "Sowi wzrok",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "1 h",
                "desc": "Pozwala zignorować 4/6 punktów kary za Oświetlenie."
        },
        {
                "name": "Ścianołaz",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "5",
                "desc": "Pozwala chodzić po ścianach i sufitach z połową Tempa (pełnym przy przebiciu)."
        },
        {
                "name": "Talent bojowy",
                "rank": "D",
                "pm": "4",
                "range": "Sp",
                "duration": "5",
                "desc": "Daje Przewagę Bojową."
        },
        {
                "name": "Telekineza",
                "rank": "D",
                "pm": "5",
                "range": "Sp×2",
                "duration": "5",
                "desc": "Przesuwa przedmioty z Siłą k10 (k12 przy przebiciu)."
        },
        {
                "name": "Telepatia",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "30 min",
                "desc": "Połączenie mentalne na odległość 1,5 km (7 przy przebiciu)."
        },
        {
                "name": "Teleportacja",
                "rank": "D",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Przenosi cel na odległość do 12\"."
        },
        {
                "name": "Uśpienie",
                "rank": "D",
                "pm": "2",
                "range": "Sp",
                "duration": "1 h",
                "desc": "Usypia ofiary."
        },
        {
                "name": "Wir mocy",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Cele pod ŚWW lub Zionięciem są Zmylone i być może odrzucone."
        },
        {
                "name": "Władca marionetek",
                "rank": "W",
                "pm": "3",
                "range": "Sp",
                "duration": "5",
                "desc": "Test przeciwstawny do Ducha pozwala kontrolować cel."
        },
        {
                "name": "Wskrzeszenie",
                "rank": "H",
                "pm": "30",
                "range": "Dotyk",
                "duration": "Natych",
                "desc": "Przywraca zmarłych do życia."
        },
        {
                "name": "Wybuch",
                "rank": "D",
                "pm": "3",
                "range": "Sp×2",
                "duration": "Natych",
                "desc": "2k6 obrażeń pod Średnim Wzornikiem Wybuchu."
        },
        {
                "name": "Wygnanie",
                "rank": "W",
                "pm": "3",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Test przeciwstawny do Ducha przepędza istotę nie z tego świata."
        },
        {
                "name": "Wyssanie magii",
                "rank": "W",
                "pm": "2",
                "range": "Sp",
                "duration": "Natych",
                "desc": "Po udanym teście przeciwstawnym wysysa k6 PM z przeciwnika."
        },
        {
                "name": "Zombie",
                "rank": "W",
                "pm": "3",
                "range": "Sp",
                "duration": "1 h",
                "desc": "Pozwala tworzyć i kontrolować żywe trupy."
        },
        {
                "name": "Tarcza",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "5 rund",
                "desc": "Tworzy magiczną tarczę dającą +2 do Obrony i chroniącą przed atakami dystansowymi."
        },
        {
                "name": "Wzmocnienie/Osłabienie cechy",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "5 rund",
                "desc": "Podnosi lub obniża wybraną Cechę o jeden rodzaj kostki (o dwa przy przebiciu)."
        },
        {
                "name": "Wykrywanie/Ukrywanie magii",
                "rank": "N",
                "pm": "2",
                "range": "Sp",
                "duration": "5 rund",
                "desc": "Wykrywa obecność zjawisk nadprzyrodzonych lub maskuje aurę magiczną."
        },
        {
                "name": "Oświetlenie/Ciemność",
                "rank": "N",
                "pm": "1",
                "range": "Sp",
                "duration": "10 min",
                "desc": "Rozświetla obszar lub spowija go głęboką ciemnością."
        }
],
    equipment: {
        "weapons_melee": [
                {
                        "name": "Sztylet / Nóż",
                        "damage": "Si+k4",
                        "min_str": "k4",
                        "weight": 1,
                        "cost": 25,
                        "notes": "PP —"
                },
                {
                        "name": "Miecz krótki",
                        "damage": "Si+k6",
                        "min_str": "k6",
                        "weight": 2,
                        "cost": 100,
                        "notes": "W tym szable kawaleryjskie"
                },
                {
                        "name": "Miecz długi",
                        "damage": "Si+k8",
                        "min_str": "k8",
                        "weight": 3,
                        "cost": 300,
                        "notes": "Typowe miecze i bułaty"
                },
                {
                        "name": "Miecz dwuręczny",
                        "damage": "Si+k10",
                        "min_str": "k10",
                        "weight": 6,
                        "cost": 400,
                        "notes": "Dwuręczny, Obrona -1"
                },
                {
                        "name": "Topór bojowy",
                        "damage": "Si+k8",
                        "min_str": "k8",
                        "weight": 4,
                        "cost": 300,
                        "notes": "PP 1"
                },
                {
                        "name": "Wielki topór",
                        "damage": "Si+k10",
                        "min_str": "k10",
                        "weight": 7,
                        "cost": 500,
                        "notes": "Dwuręczny, PP 2"
                },
                {
                        "name": "Młot bojowy",
                        "damage": "Si+k6",
                        "min_str": "k6",
                        "weight": 3,
                        "cost": 250,
                        "notes": "PP 1 przeciwko sztywnym pancerzom"
                },
                {
                        "name": "Włócznia",
                        "damage": "Si+k6",
                        "min_str": "k6",
                        "weight": 3,
                        "cost": 100,
                        "notes": "Obrona +1 przy chwycie oburącz, Zasięg 1\""
                },
                {
                        "name": "Kij / Pałka",
                        "damage": "Si+k4",
                        "min_str": "k4",
                        "weight": 2,
                        "cost": 10,
                        "notes": "Obrażenia obłaskawiające"
                }
        ],
        "weapons_ranged": [
                {
                        "name": "Łuk",
                        "range": "12/24/48",
                        "damage": "2k6",
                        "ap": 0,
                        "rof": 1,
                        "min_str": "k6",
                        "weight": 3,
                        "cost": 250,
                        "notes": "Wymaga dwóch rąk"
                },
                {
                        "name": "Łuk długi",
                        "range": "15/30/60",
                        "damage": "2k6",
                        "ap": 1,
                        "rof": 1,
                        "min_str": "k8",
                        "weight": 3,
                        "cost": 300,
                        "notes": "Wymaga dwóch rąk"
                },
                {
                        "name": "Kusza",
                        "range": "15/30/60",
                        "damage": "2k6",
                        "ap": 2,
                        "rof": 1,
                        "min_str": "k6",
                        "weight": 7,
                        "cost": 300,
                        "notes": "1 akcja na przeładowanie"
                },
                {
                        "name": "Kusza ciężka",
                        "range": "15/30/60",
                        "damage": "2k8",
                        "ap": 2,
                        "rof": 1,
                        "min_str": "k6",
                        "weight": 8,
                        "cost": 400,
                        "notes": "1 akcja na przeładowanie"
                },
                {
                        "name": "Pistolet skałkowy",
                        "range": "5/10/20",
                        "damage": "2k6+1",
                        "ap": 0,
                        "rof": 1,
                        "min_str": "k4",
                        "weight": 3,
                        "cost": 150,
                        "notes": "2 akcje przeładowania"
                },
                {
                        "name": "Rewolwer (.38)",
                        "range": "12/24/48",
                        "damage": "2k6",
                        "ap": 1,
                        "rof": 1,
                        "min_str": "k4",
                        "weight": 2,
                        "cost": 200,
                        "notes": "Pojemność 6"
                },
                {
                        "name": "Rewolwer (.45)",
                        "range": "12/24/48",
                        "damage": "2k6+1",
                        "ap": 1,
                        "rof": 1,
                        "min_str": "k4",
                        "weight": 2,
                        "cost": 250,
                        "notes": "Pojemność 6"
                },
                {
                        "name": "Pistolet 9mm",
                        "range": "12/24/48",
                        "damage": "2k6",
                        "ap": 1,
                        "rof": 1,
                        "min_str": "k4",
                        "weight": 2,
                        "cost": 200,
                        "notes": "Pojemność 15, Samopowtarzalny"
                },
                {
                        "name": "Strzelba (12G)",
                        "range": "12/24/48",
                        "damage": "1-3k6",
                        "ap": 0,
                        "rof": 1,
                        "min_str": "k6",
                        "weight": 8,
                        "cost": 150,
                        "notes": "Pojemność 2, Śrut: +2 do trafienia"
                },
                {
                        "name": "Karabin powtarzalny",
                        "range": "24/48/96",
                        "damage": "2k8",
                        "ap": 2,
                        "rof": 1,
                        "min_str": "k6",
                        "weight": 8,
                        "cost": 300,
                        "notes": "Pojemność 5"
                }
        ],
        "armor": [
                {
                        "name": "Skórzana kurtka",
                        "armor": 1,
                        "min_str": "k4",
                        "weight": 5,
                        "cost": 50,
                        "covers": "Korpus, Ramiona",
                        "notes": "Lekki pancerz"
                },
                {
                        "name": "Gruba zbroja skórzana",
                        "armor": 2,
                        "min_str": "k6",
                        "weight": 10,
                        "cost": 100,
                        "covers": "Korpus, Ramiona, Nogi",
                        "notes": "Ćwiekowana skóra"
                },
                {
                        "name": "Koszula kolcza (Kolczuga)",
                        "armor": 3,
                        "min_str": "k8",
                        "weight": 20,
                        "cost": 300,
                        "covers": "Korpus, Ramiona",
                        "notes": "Odporność na cięcia"
                },
                {
                        "name": "Zbroja płytowa",
                        "armor": 4,
                        "min_str": "k10",
                        "weight": 30,
                        "cost": 800,
                        "covers": "Całe ciało",
                        "notes": "Ciężki pancerz rycerski"
                },
                {
                        "name": "Hełm skórzany",
                        "armor": 1,
                        "min_str": "k4",
                        "weight": 1,
                        "cost": 20,
                        "covers": "Głowa",
                        "notes": "—"
                },
                {
                        "name": "Hełm garnczkowy / stalowy",
                        "armor": 3,
                        "min_str": "k6",
                        "weight": 4,
                        "cost": 150,
                        "covers": "Głowa",
                        "notes": "—"
                },
                {
                        "name": "Kamizelka kuloodporna (Kevlar)",
                        "armor": 2,
                        "min_str": "k4",
                        "weight": 5,
                        "cost": 250,
                        "covers": "Korpus",
                        "notes": "+4 vs kule"
                }
        ],
        "shields": [
                {
                        "name": "Puklerz (mała tarcza)",
                        "parry": 1,
                        "cover": 0,
                        "min_str": "k4",
                        "weight": 2,
                        "cost": 25,
                        "notes": "+1 do Obrony"
                },
                {
                        "name": "Średnia tarcza",
                        "parry": 2,
                        "cover": -2,
                        "min_str": "k6",
                        "weight": 4,
                        "cost": 50,
                        "notes": "+2 do Obrony, -2 do trafienia z dystansu"
                },
                {
                        "name": "Pawęż (duża tarcza)",
                        "parry": 2,
                        "cover": -4,
                        "min_str": "k8",
                        "weight": 8,
                        "cost": 100,
                        "notes": "+2 do Obrony, -4 do trafienia z dystansu"
                }
        ],
        "gear": [
                {
                        "name": "Plecak podróżny",
                        "weight": 2,
                        "cost": 50,
                        "notes": "Mieści do 20 kg ekwipunku"
                },
                {
                        "name": "Śpiwór i koc",
                        "weight": 4,
                        "cost": 25,
                        "notes": "Do odpoczynku w dziczy"
                },
                {
                        "name": "Lina konopna (15 m)",
                        "weight": 5,
                        "cost": 10,
                        "notes": "Do wspinaczki i wiązania"
                },
                {
                        "name": "Latarnia oliwna",
                        "weight": 3,
                        "cost": 25,
                        "notes": "Działa 4 godziny na 0.5 l oliwy"
                },
                {
                        "name": "Oliwa (0.5 l)",
                        "weight": 1,
                        "cost": 5,
                        "notes": "Paliwo do latarni"
                },
                {
                        "name": "Hubka i krzesiwo",
                        "weight": 0.5,
                        "cost": 10,
                        "notes": "Do rozpalania ognia"
                },
                {
                        "name": "Pochodnie (5 szt.)",
                        "weight": 5,
                        "cost": 5,
                        "notes": "1 godzina światła każda"
                },
                {
                        "name": "Manierka z wodą",
                        "weight": 2,
                        "cost": 5,
                        "notes": "1 litr wody"
                },
                {
                        "name": "Racje podróżne (5 dni)",
                        "weight": 5,
                        "cost": 25,
                        "notes": "Trwałe jedzenie"
                },
                {
                        "name": "Apteczka polowa",
                        "weight": 2,
                        "cost": 50,
                        "notes": "+1 do testów Leczenia, 3 użycia"
                },
                {
                        "name": "Wytrychy",
                        "weight": 1,
                        "cost": 50,
                        "notes": "Wymagane do otwierania zamków"
                },
                {
                        "name": "Szpadel / Łopatka",
                        "weight": 3,
                        "cost": 15,
                        "notes": "Narzędzie obozowe"
                },
                {
                        "name": "Zestaw do pisania",
                        "weight": 1,
                        "cost": 20,
                        "notes": "Papier, inkaust, pióra"
                },
                {
                        "name": "Kołczan (20 strzał)",
                        "weight": 3,
                        "cost": 25,
                        "notes": "Amunicja do łuku"
                }
        ]
},
    archetypes: [
        {
                "id": "wojownik",
                "name": "Goran Żelaznoręki",
                "concept": "Najemnik / Wojownik tarczownik",
                "raceId": "czlowiek",
                "raceName": "Człowiek",
                "rank": "Nowicjusz",
                "advancesCount": 0,
                "advancesList": [],
                "attributes": {
                        "zrecznosc": "k8",
                        "spryt": "k6",
                        "duch": "k6",
                        "sila": "k8",
                        "wigor": "k6"
                },
                "skills": [
                        {
                                "name": "Walka",
                                "die": "k8",
                                "attr": "zrecznosc",
                                "isCore": false
                        },
                        {
                                "name": "Wysportowanie",
                                "die": "k6",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Spostrzegawczość",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Przekonywanie",
                                "die": "k4",
                                "attr": "duch",
                                "isCore": true
                        },
                        {
                                "name": "Skradanie",
                                "die": "k4",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Wiedza ogólna",
                                "die": "k4",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Zastraszanie",
                                "die": "k6",
                                "attr": "duch",
                                "isCore": false
                        }
                ],
                "hindrances": [
                        {
                                "name": "Bohaterski",
                                "severity": "Poważna",
                                "points": 2,
                                "desc": "Nigdy nie odmawia pomocy potrzebującym."
                        },
                        {
                                "name": "Lojalny",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Oddany towarzyszom broni, nigdy ich nie zdradzi."
                        },
                        {
                                "name": "Uparciuch",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Rzadko ustępuje, zawsze chce postawić na swoim."
                        }
                ],
                "hindranceSpend": {
                        "attr": 1,
                        "edge": 1,
                        "skill": 0,
                        "funds": 0
                },
                "edges": [
                        {
                                "name": "Garda",
                                "category": "Bojowe",
                                "desc": "+1 do Obrony, ignoruje 1 punkt przewagi liczebnej wroga."
                        },
                        {
                                "name": "Krzepki",
                                "category": "Wrodzone",
                                "desc": "+1 do Wytrzymałości i Rozmiaru, wyższy udźwig."
                        },
                        {
                                "name": "Szybki cios",
                                "category": "Bojowe",
                                "desc": "Darmowy atak wręcz na zbliżającego się przeciwnika."
                        }
                ],
                "weapons": [
                        {
                                "name": "Miecz długi",
                                "range": "Wręcz",
                                "damage": "Si+k8",
                                "ap": 0,
                                "rof": 1,
                                "weight": 3,
                                "cost": 300,
                                "notes": "Podstawowy oręż"
                        },
                        {
                                "name": "Sztylet",
                                "range": "3/6/12",
                                "damage": "Si+k4",
                                "ap": 0,
                                "rof": 1,
                                "weight": 1,
                                "cost": 25,
                                "notes": "W bucie"
                        }
                ],
                "armorItems": [
                        {
                                "name": "Gruba zbroja skórzana",
                                "armor": 2,
                                "weight": 10,
                                "cost": 100,
                                "notes": "Korpus i ramiona"
                        },
                        {
                                "name": "Średnia tarcza",
                                "parry": 2,
                                "cover": -2,
                                "armor": 0,
                                "weight": 4,
                                "cost": 50,
                                "notes": "+2 Obrona, -2 do ostrzału"
                        }
                ],
                "gear": [
                        {
                                "name": "Plecak podróżny",
                                "weight": 2,
                                "cost": 50,
                                "notes": "Podstawowy ekwipunek"
                        },
                        {
                                "name": "Racje podróżne (5 dni)",
                                "weight": 5,
                                "cost": 25,
                                "notes": "Żywność"
                        },
                        {
                                "name": "Manierka z wodą",
                                "weight": 2,
                                "cost": 5,
                                "notes": "1 litr"
                        },
                        {
                                "name": "Lina konopna (15 m)",
                                "weight": 5,
                                "cost": 10,
                                "notes": "Do wspinaczki"
                        },
                        {
                                "name": "Pochodnie (3 szt.)",
                                "weight": 3,
                                "cost": 3,
                                "notes": "Światło"
                        }
                ],
                "powers": [],
                "funds": 75,
                "powerPoints": 0,
                "wounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "fatigue": {
                        "1": false,
                        "2": false
                },
                "sanityWounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "sanityNotes": "",
                "ammoUsed": [],
                "notes": "Weteran wojen pogranicza, szuka uczciwego zarobku i wiernych towarzyszy."
        },
        {
                "id": "zwiadowca",
                "name": "Elara Cichy Krok",
                "concept": "Leśna Zwiadowczyni / Wyborowy Strzelec",
                "raceId": "elf",
                "raceName": "Elf",
                "rank": "Nowicjusz",
                "advancesCount": 0,
                "advancesList": [],
                "attributes": {
                        "zrecznosc": "k8",
                        "spryt": "k6",
                        "duch": "k6",
                        "sila": "k6",
                        "wigor": "k6"
                },
                "skills": [
                        {
                                "name": "Strzelanie",
                                "die": "k8",
                                "attr": "zrecznosc",
                                "isCore": false
                        },
                        {
                                "name": "Skradanie",
                                "die": "k8",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Spostrzegawczość",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Przetrwanie",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": false
                        },
                        {
                                "name": "Wysportowanie",
                                "die": "k6",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Walka",
                                "die": "k6",
                                "attr": "zrecznosc",
                                "isCore": false
                        },
                        {
                                "name": "Wiedza ogólna",
                                "die": "k4",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Przekonywanie",
                                "die": "k4",
                                "attr": "duch",
                                "isCore": true
                        }
                ],
                "hindrances": [
                        {
                                "name": "Ostrożny",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Dokładnie planuje każdy krok, unika ryzyka."
                        },
                        {
                                "name": "Ciekawski",
                                "severity": "Poważna",
                                "points": 2,
                                "desc": "Pragnie zbadać każdą starożytną ruinę i tajemnicę."
                        },
                        {
                                "name": "Wróg",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Ściga ją gang kłusowników."
                        }
                ],
                "hindranceSpend": {
                        "attr": 1,
                        "edge": 1,
                        "skill": 0,
                        "funds": 0
                },
                "edges": [
                        {
                                "name": "Czujny",
                                "category": "Wrodzone",
                                "desc": "+2 do testów Spostrzegawczości."
                        },
                        {
                                "name": "Chyży",
                                "category": "Wrodzone",
                                "desc": "+2 do Tempa (Tempo 8, kość biegania k8)."
                        }
                ],
                "weapons": [
                        {
                                "name": "Łuk długi",
                                "range": "15/30/60",
                                "damage": "2k6",
                                "ap": 1,
                                "rof": 1,
                                "weight": 3,
                                "cost": 300,
                                "notes": "Kołczan (20 strzał)"
                        },
                        {
                                "name": "Miecz krótki",
                                "range": "Wręcz",
                                "damage": "Si+k6",
                                "ap": 0,
                                "rof": 1,
                                "weight": 2,
                                "cost": 100,
                                "notes": "Broń boczna"
                        }
                ],
                "armorItems": [
                        {
                                "name": "Skórzana kurtka",
                                "armor": 1,
                                "weight": 5,
                                "cost": 50,
                                "notes": "Lekka, nie krępuje ruchów"
                        }
                ],
                "gear": [
                        {
                                "name": "Plecak podróżny",
                                "weight": 2,
                                "cost": 50,
                                "notes": "Ekwipunek"
                        },
                        {
                                "name": "Śpiwór i koc",
                                "weight": 4,
                                "cost": 25,
                                "notes": "Noclegi"
                        },
                        {
                                "name": "Lina konopna (15 m)",
                                "weight": 5,
                                "cost": 10,
                                "notes": "Do wspinaczki"
                        },
                        {
                                "name": "Hubka i krzesiwo",
                                "weight": 0.5,
                                "cost": 10,
                                "notes": "Ogień"
                        },
                        {
                                "name": "Racje podróżne (5 dni)",
                                "weight": 5,
                                "cost": 25,
                                "notes": "Żywność"
                        }
                ],
                "powers": [],
                "funds": 45,
                "powerPoints": 0,
                "wounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "fatigue": {
                        "1": false,
                        "2": false
                },
                "sanityWounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "sanityNotes": "",
                "ammoUsed": [],
                "notes": "Zna każdy trakt i leśną ścieżkę. Niezrównana w tropieniu bestii."
        },
        {
                "id": "czarownik",
                "name": "Mistrz Varian z Wieży",
                "concept": "Uczony Mag Bitewny",
                "raceId": "czlowiek",
                "raceName": "Człowiek",
                "rank": "Nowicjusz",
                "advancesCount": 0,
                "advancesList": [],
                "attributes": {
                        "zrecznosc": "k6",
                        "spryt": "k8",
                        "duch": "k8",
                        "sila": "k4",
                        "wigor": "k6"
                },
                "skills": [
                        {
                                "name": "Rzucanie czarów",
                                "die": "k8",
                                "attr": "spryt",
                                "isCore": false,
                                "isArcane": true
                        },
                        {
                                "name": "Okultyzm",
                                "die": "k8",
                                "attr": "spryt",
                                "isCore": false
                        },
                        {
                                "name": "Nauka",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": false
                        },
                        {
                                "name": "Wiedza ogólna",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Spostrzegawczość",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Przekonywanie",
                                "die": "k4",
                                "attr": "duch",
                                "isCore": true
                        },
                        {
                                "name": "Skradanie",
                                "die": "k4",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Wysportowanie",
                                "die": "k4",
                                "attr": "zrecznosc",
                                "isCore": true
                        }
                ],
                "hindrances": [
                        {
                                "name": "Chuchro",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "-2 do Wigoru przy znoszeniu zmęczenia."
                        },
                        {
                                "name": "Ciekawski",
                                "severity": "Poważna",
                                "points": 2,
                                "desc": "Za wszelką cenę musi poznać sekrety magii."
                        },
                        {
                                "name": "Przysięga",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Lojalny wobec kapituły czarodziejów."
                        }
                ],
                "hindranceSpend": {
                        "attr": 1,
                        "edge": 1,
                        "skill": 0,
                        "funds": 0
                },
                "edges": [
                        {
                                "name": "Zdolności nadprzyrodzone",
                                "category": "Nadprzyrodzone",
                                "desc": "10 PM, 3 moce startowe, um. Rzucanie czarów."
                        },
                        {
                                "name": "Czarodziej",
                                "category": "Nadprzyrodzone",
                                "desc": "Zmiana wariantów czaru za 1 dodatkowy PM."
                        },
                        {
                                "name": "Nowe moce",
                                "category": "Nadprzyrodzone",
                                "desc": "2 dodatkowe znane zaklęcia."
                        }
                ],
                "powers": [
                        {
                                "name": "Pocisk",
                                "pm": "1-3",
                                "range": "Sp×2",
                                "duration": "Natych.",
                                "desc": "1-3 magiczne pociski po 2k6 obrażeń."
                        },
                        {
                                "name": "Tarcza",
                                "pm": "2",
                                "range": "Sp",
                                "duration": "5 rund",
                                "desc": "+2 do Obrony, ochrona przed strzałami."
                        },
                        {
                                "name": "Wykrywanie/Ukrywanie magii",
                                "pm": "2",
                                "range": "Sp",
                                "duration": "5 rund",
                                "desc": "Widzi aurę magiczną i iluzje."
                        },
                        {
                                "name": "Oświetlenie/Ciemność",
                                "pm": "1",
                                "range": "Sp",
                                "duration": "10 min",
                                "desc": "Rozprasza mrok świetlistym blaskiem."
                        },
                        {
                                "name": "Rozproszenie",
                                "pm": "1",
                                "range": "Sp",
                                "duration": "Natych.",
                                "desc": "Niweluje działanie obcych mocy."
                        }
                ],
                "weapons": [
                        {
                                "name": "Kostur bojowy",
                                "range": "Wręcz",
                                "damage": "Si+k4",
                                "ap": 0,
                                "rof": 1,
                                "weight": 3,
                                "cost": 20,
                                "notes": "Obrona +1 przy chwycie oburącz"
                        },
                        {
                                "name": "Sztylet",
                                "range": "3/6/12",
                                "damage": "Si+k4",
                                "ap": 0,
                                "rof": 1,
                                "weight": 1,
                                "cost": 25,
                                "notes": "Srebrny"
                        }
                ],
                "armorItems": [
                        {
                                "name": "Skórzana kurtka",
                                "armor": 1,
                                "weight": 5,
                                "cost": 50,
                                "notes": "Runa ochronna"
                        }
                ],
                "gear": [
                        {
                                "name": "Zestaw do pisania",
                                "weight": 1,
                                "cost": 20,
                                "notes": "Inkaust i pióra"
                        },
                        {
                                "name": "Latarnia oliwna",
                                "weight": 3,
                                "cost": 25,
                                "notes": "Światło"
                        },
                        {
                                "name": "Manierka z wodą",
                                "weight": 2,
                                "cost": 5,
                                "notes": "Woda"
                        },
                        {
                                "name": "Plecak podróżny",
                                "weight": 2,
                                "cost": 50,
                                "notes": "Ekwipunek"
                        }
                ],
                "funds": 60,
                "powerPoints": 10,
                "wounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "fatigue": {
                        "1": false,
                        "2": false
                },
                "sanityWounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "sanityNotes": "",
                "ammoUsed": [],
                "notes": "Badacz zapomnianych arkanów magii, potrafi obrócić losy każdej bitwy."
        },
        {
                "id": "szuler",
                "name": "Perykles „As” Podkowiec",
                "concept": "Awanturnik, Szuler i Złodziejaszek",
                "raceId": "niziolek",
                "raceName": "Niziołek",
                "rank": "Nowicjusz",
                "advancesCount": 0,
                "advancesList": [],
                "attributes": {
                        "zrecznosc": "k8",
                        "spryt": "k8",
                        "duch": "k6",
                        "sila": "k4",
                        "wigor": "k6"
                },
                "skills": [
                        {
                                "name": "Hazard",
                                "die": "k8",
                                "attr": "spryt",
                                "isCore": false
                        },
                        {
                                "name": "Wyśmiewanie",
                                "die": "k8",
                                "attr": "spryt",
                                "isCore": false
                        },
                        {
                                "name": "Przekonywanie",
                                "die": "k6",
                                "attr": "duch",
                                "isCore": true
                        },
                        {
                                "name": "Strzelanie",
                                "die": "k6",
                                "attr": "zrecznosc",
                                "isCore": false
                        },
                        {
                                "name": "Skradanie",
                                "die": "k8",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Spostrzegawczość",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": true
                        },
                        {
                                "name": "Wysportowanie",
                                "die": "k6",
                                "attr": "zrecznosc",
                                "isCore": true
                        },
                        {
                                "name": "Wiedza ogólna",
                                "die": "k6",
                                "attr": "spryt",
                                "isCore": true
                        }
                ],
                "hindrances": [
                        {
                                "name": "Chciwy",
                                "severity": "Poważna",
                                "points": 2,
                                "desc": "Kocha złoto i hazard ponad wszystko."
                        },
                        {
                                "name": "Długi język",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Często mówi za dużo w najmniej odpowiedniej chwili."
                        },
                        {
                                "name": "Wróg",
                                "severity": "Drobna",
                                "points": 1,
                                "desc": "Szef lokalnego gangu, którego ograł w kości."
                        }
                ],
                "hindranceSpend": {
                        "attr": 1,
                        "edge": 1,
                        "skill": 0,
                        "funds": 0
                },
                "edges": [
                        {
                                "name": "Szczęściarz",
                                "category": "Wrodzone",
                                "desc": "+1 Fuks na początku sesji (z rasy Niziołek)."
                        },
                        {
                                "name": "Cholerny szczęściarz",
                                "category": "Wrodzone",
                                "desc": "Dodatkowe +2 Fuksy (łącznie 6 Fuksów na sesję!)."
                        },
                        {
                                "name": "Szuler",
                                "category": "Zawodowe",
                                "desc": "Darmowy przerzut Hazardu, zarobki z gier."
                        }
                ],
                "weapons": [
                        {
                                "name": "Rewolwer (.38)",
                                "range": "12/24/48",
                                "damage": "2k6",
                                "ap": 1,
                                "rof": 1,
                                "weight": 2,
                                "cost": 200,
                                "notes": "Pojemność 6"
                        },
                        {
                                "name": "Sztylet / Nóż",
                                "range": "3/6/12",
                                "damage": "Si+k4",
                                "ap": 0,
                                "rof": 1,
                                "weight": 1,
                                "cost": 25,
                                "notes": "Ukryty w rękawie"
                        }
                ],
                "armorItems": [
                        {
                                "name": "Skórzana kurtka",
                                "armor": 1,
                                "weight": 5,
                                "cost": 50,
                                "notes": "Elegancka kamizelka podbita skórą"
                        }
                ],
                "gear": [
                        {
                                "name": "Wytrychy",
                                "weight": 1,
                                "cost": 50,
                                "notes": "Do zamków"
                        },
                        {
                                "name": "Plecak podróżny",
                                "weight": 2,
                                "cost": 50,
                                "notes": "Ekwipunek"
                        }
                ],
                "powers": [],
                "funds": 180,
                "powerPoints": 0,
                "wounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "fatigue": {
                        "1": false,
                        "2": false
                },
                "sanityWounds": {
                        "1": false,
                        "2": false,
                        "3": false,
                        "ko": false
                },
                "sanityNotes": "",
                "ammoUsed": [],
                "notes": "Szybki w rękach, jeszcze szybszy w gębie. Nigdy nie gra w uczciwe kości, chyba że musi."
        }
]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SW_DATA;
}
