// Savage Worlds: Fantasy Companion (SWADE)
const FANTASY_DATA = {
  "source": "fantasy",
  "sourceName": "Fantasy Companion",
  "sourceIcon": "🐉",
  "races": [
    {
      "id": "aquarian",
      "name": "Wodniak (Akwarian)",
      "source": "fantasy",
      "desc": "Płetwiaste humanoidalne istoty doskonale przystosowane do życia w głębinach oceanów i rzek.",
      "traits": [
        {
          "title": "Płetwy i skrzela",
          "desc": "Oddychanie pod wodą, Tempo pływania równe kości Wysportowania."
        },
        {
          "title": "Podwodny wzrok",
          "desc": "Ignoruje kary za ciemność i zniekształcenia pod wodą."
        },
        {
          "title": "Zależność od wody",
          "desc": "Musi zanurzyć się w wodzie na co najmniej godzinę dziennie, inaczej otrzymuje poziom Zmęczenia."
        },
        {
          "title": "Niska odporność na odwodnienie",
          "desc": "Otrzymuje +4 obrażenia od ataków opartych na wysuszeniu i odwodnieniu."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "avion",
      "name": "Awion (Ptakoczłek)",
      "source": "fantasy",
      "desc": "Skrzydlate istoty gór i przestworzy o lekkim kośćcu i sokolim wzroku.",
      "traits": [
        {
          "title": "Skrzydła",
          "desc": "Tempo lotu 12, Przyspieszenie 6 (k8 w biegu). Wymaga otwartej przestrzeni."
        },
        {
          "title": "Sokoli wzrok",
          "desc": "+2 do testów Spostrzegawczości opartych na wzroku."
        },
        {
          "title": "Kruche kości",
          "desc": "-1 do Wytrzymałości ze względu na lekki kościec umożliwiający lot."
        },
        {
          "title": "Klaustrofobia (Mniejsza)",
          "desc": "Źle znosi zamknięte podziemia i wąskie korytarze (-1 do cech w ciasnych lochach)."
        }
      ],
      "attribute_bonuses": {
        "zrecznosc": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "celestial",
      "name": "Niebianin (Celestial)",
      "source": "fantasy",
      "desc": "Istota w żyłach której płynie krew aniołów lub mieszkańców wyższych sfer niebios.",
      "traits": [
        {
          "title": "Niebiańska krew",
          "desc": "+2 do testów Ducha przeciwko magii zła i opętaniu."
        },
        {
          "title": "Święty blask",
          "desc": "Emituje światło o zasięgu Szablonu Średniego Wybuchu."
        },
        {
          "title": "Pochodzenie Niesamowite",
          "desc": "Pochodzenie Niesamowite (Cuda) lub darmowa Przewaga Duchowa."
        },
        {
          "title": "Ślubowanie dobra (Większa)",
          "desc": "Poczucie obowiązku walki ze złem i ochrony słabych."
        }
      ],
      "attribute_bonuses": {
        "duch": "k6"
      },
      "free_edges": 1,
      "free_hindrances": 0
    },
    {
      "id": "centaur",
      "name": "Centaur",
      "source": "fantasy",
      "desc": "Dumny leśny wojownik o ciele konia i torsie człowieka.",
      "traits": [
        {
          "title": "Ciało wierzchowca",
          "desc": "Tempo 8, kość biegu k8, Rozmiar +2 (+2 Wytrzymałość)."
        },
        {
          "title": "Kopyta",
          "desc": "Si+k6 w walce wręcz."
        },
        {
          "title": "Nietypowa anatomia",
          "desc": "Nie może nosić ludzkich zbroi (pancerz na zad kosztuje podwójnie), nie potrafi wspinać się po drabinach."
        },
        {
          "title": "Trudny teren w budynkach",
          "desc": "Kary w ciasnych korytarzach i na schodach."
        }
      ],
      "attribute_bonuses": {
        "sila": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "dragonfolk",
      "name": "Smokoludź (Dragonfolk)",
      "source": "fantasy",
      "desc": "Potężni potomkowie smoków pokryci grubą łuską, władający oddechem żywiołów.",
      "traits": [
        {
          "title": "Smocze łuski",
          "desc": "Pancerz +2 na całe ciało."
        },
        {
          "title": "Zionięcie żywiołem",
          "desc": "Akcja ograniczona pozwala zionąć ogniem w Szablonie Stożka (obrażenia 2k6)."
        },
        {
          "title": "Pazury",
          "desc": "Si+k4 w walce wręcz."
        },
        {
          "title": "Zimnokrwisty",
          "desc": "Podatność na zimno (-2 do testów przeciw hipotermii i magii lodu)."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "elemental_scion",
      "name": "Dziecię Żywiołów (Genasi / Scion)",
      "source": "fantasy",
      "desc": "Istota obdarzona esencją jednego z czterech pierwotnych żywiołów: Ognia, Wody, Ziemi lub Powietrza.",
      "traits": [
        {
          "title": "Pokrewieństwo z żywiołem",
          "desc": "Odporność na swój żywioł (+4 do testów i odporność na obrażenia żywiołowe)."
        },
        {
          "title": "Inherentna moc",
          "desc": "Zna 1 moc odpowiadającą żywiołowi (np. Podmuch, Płomień, Kamienna skóra) rzucaną z Ducha."
        },
        {
          "title": "Podatność na żywioł przeciwny",
          "desc": "Otrzymuje +4 obrażenia od żywiołu przeciwstawnego."
        },
        {
          "title": "Gwałtowna natura",
          "desc": "Skrajny temperament odzwierciedlający wybrany żywioł."
        }
      ],
      "attribute_bonuses": {
        "duch": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "fairy",
      "name": "Wróżka / Duszek (Fairy)",
      "source": "fantasy",
      "desc": "Niewielka, kapryśna istota ze świata Fey o opalizujących skrzydełkach i wrodzonej magii.",
      "traits": [
        {
          "title": "Skrzydełka",
          "desc": "Tempo lotu 10, kość biegu k6."
        },
        {
          "title": "Mały rozmiar (Rozmiar -2)",
          "desc": "Wytrzymałość -2, wrogowie odejmują 2 od trafienia wróżki."
        },
        {
          "title": "Wrodzona magia",
          "desc": "Posiada moc Niewidzialność lub Iluzja aktywowaną testem Ducha."
        },
        {
          "title": "Wrażliwość na zimne żelazo",
          "desc": "Dotyk zwykłego żelaza parzy wróżkę i zadaje dodatkowe obrażenia."
        },
        {
          "title": "Krucha siła",
          "desc": "Maksymalna Siła ograniczona do k6."
        }
      ],
      "attribute_bonuses": {
        "zrecznosc": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "gnome_fantasy",
      "name": "Gnom (Fantasy)",
      "source": "fantasy",
      "desc": "Bystrzy, pomysłowi rzemieślnicy i iluzjoniści o głębokiej ciekawości świata.",
      "traits": [
        {
          "title": "Bystry umysł",
          "desc": "Spryt zaczyna się od k6 (maks. k12+1)."
        },
        {
          "title": "Mały rozmiar",
          "desc": "Rozmiar -1 (-1 Wytrzymałość)."
        },
        {
          "title": "Znajomość iluzji i mechaniki",
          "desc": "+1 do Sprytu przy Reperowaniu i przeciwstawianiu się iluzjom."
        },
        {
          "title": "Zmniejszone tempo",
          "desc": "Tempo 5, kość biegu k4."
        }
      ],
      "attribute_bonuses": {
        "spryt": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "goblin_hero",
      "name": "Goblin (Bohater)",
      "source": "fantasy",
      "desc": "Sprytny, zwinny i przetrwalnikowy mały humanoid, często niedoceniany przez wyższe rasy.",
      "traits": [
        {
          "title": "Zwinny i czujny",
          "desc": "Zręczność zaczyna się od k6."
        },
        {
          "title": "Widzenie w ciemności",
          "desc": "Ignoruje kary za brak oświetlenia (ciemność)."
        },
        {
          "title": "Mały",
          "desc": "Rozmiar -1 (-1 Wytrzymałość)."
        },
        {
          "title": "Zła reputacja",
          "desc": "Obcy (Mniejsza) w większości miast ludzi i krasnoludów (-1 do Przekonywania)."
        }
      ],
      "attribute_bonuses": {
        "zrecznosc": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "golem_playable",
      "name": "Golem (Ożywiony Konstrukt)",
      "source": "fantasy",
      "desc": "Sztuczna istota stworzona z kamienia, metalu lub gliny, ożywiona potężną magią pradawnych mistrzów.",
      "traits": [
        {
          "title": "Konstrukt",
          "desc": "+2 do testów wyjścia z Szoku, nie odnosi dodatkowych obrażeń z trafień w organy, odporny na trucizny, choroby i duszenie."
        },
        {
          "title": "Kamienne ciało",
          "desc": "Pancerz naturalny +3, Wytrzymałość +1."
        },
        {
          "title": "Potężna masa",
          "desc": "Siła zaczyna się od k8 (maks. k12+2)."
        },
        {
          "title": "Brak naturalnego leczenia",
          "desc": "Nie leczy się naturalnie ani magią leczenia życia (naprawa wymaga Reperowania i materiałów)."
        },
        {
          "title": "Ciężki i powolny",
          "desc": "Tempo 5, kość biegu k4, nie potrafi pływać (tonie jak kamień)."
        }
      ],
      "attribute_bonuses": {
        "sila": "k8"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "graveborn",
      "name": "Groborodzony (Graveborn)",
      "source": "fantasy",
      "desc": "Istota urodzona na granicy życia i śmierci lub wskrzeszona niepełnym rytuałem o bladej cerze i zimnym dotyku.",
      "traits": [
        {
          "title": "Dotyk grobu",
          "desc": "Odporność na efekty wysysania energii i odporność na choroby nieumarłych."
        },
        {
          "title": "Ciemnowidzenie",
          "desc": "Ignoruje kary za ciemność."
        },
        {
          "title": "Pomiędzy światami",
          "desc": "Zwykłe leczenie przywraca rany z karą -2, lecz leczenie nekromantyczne działa bez przeszkód."
        },
        {
          "title": "Upiorny wygląd",
          "desc": "Budzi niepokój (-1 do Przekonywania wśród zwykłych ludzi)."
        }
      ],
      "attribute_bonuses": {
        "duch": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "half_giant",
      "name": "Półolbrzym (Half-Giant)",
      "source": "fantasy",
      "desc": "Potężny kolos przewyższający zwykłych ludzi o głowę i dysponujący siłą taranu.",
      "traits": [
        {
          "title": "Wielki rozmiar (Rozmiar +1)",
          "desc": "+1 do Wytrzymałości."
        },
        {
          "title": "Kolosalna siła",
          "desc": "Siła zaczyna się od k8 (maksymalna wartość k12+2)."
        },
        {
          "title": "Duży cel",
          "desc": "Przeciwnicy zyskują +1 do trafienia półolbrzyma."
        },
        {
          "title": "Wielkie potrzeby",
          "desc": "Potrzebuje podwójnych racji żywnościowych i ubrań na miarę."
        }
      ],
      "attribute_bonuses": {
        "sila": "k8"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "infernal_scion",
      "name": "Piekielny / Diabelstwo (Infernal)",
      "source": "fantasy",
      "desc": "Humanoid noszący piętno biesiego rodowodu: małe rogi, spiczaste zęby lub ogon.",
      "traits": [
        {
          "title": "Odporność na ogień",
          "desc": "Otrzymuje o 4 mniej obrażeń od ognia."
        },
        {
          "title": "Ognisty spryt",
          "desc": "Spryt zaczyna się od k6."
        },
        {
          "title": "Ciemnowidzenie",
          "desc": "Widzi w mroku."
        },
        {
          "title": "Piętno potępienia",
          "desc": "Obcy (Mniejsza) w społecznościach religijnych i świątyniach."
        }
      ],
      "attribute_bonuses": {
        "spryt": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "insectoid",
      "name": "Owadoludź (Insektoid)",
      "source": "fantasy",
      "desc": "Człekokształtna istota o chitynowym pancerzu, czułkach i złożonych oczach.",
      "traits": [
        {
          "title": "Chitynowy pancerz",
          "desc": "Pancerz +2 na całe ciało."
        },
        {
          "title": "Złożone oczy",
          "desc": "Spostrzegawczość 360 stopni, brak możliwości oskrzydlenia przez wrogów."
        },
        {
          "title": "Dodatkowe odnóża",
          "desc": "+2 do testów Wspinaczki i chwytania."
        },
        {
          "title": "Obca psychika",
          "desc": "Trudności w komunikacji z ssakami (-2 do Przekonywania)."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "minotaur",
      "name": "Minotaur",
      "source": "fantasy",
      "desc": "Potężny rogaty wojownik o głowie byka i ciele gladiatora, mistrz labiryntów.",
      "traits": [
        {
          "title": "Rogi",
          "desc": "Si+k6 obrażeń wręcz. W szarży zadaje dodatkowe +4 obrażenia."
        },
        {
          "title": "Potężna budowa",
          "desc": "Siła k8 na start (maks. k12+2), Rozmiar +1 (+1 Wytrzymałość)."
        },
        {
          "title": "Instynkt labiryntu",
          "desc": "Zawsze zna właściwy kierunek pod ziemią, nie gubi się."
        },
        {
          "title": "Porywczy charakter",
          "desc": "Zawada Narwany lub Żądza Krwi (Mniejsza)."
        }
      ],
      "attribute_bonuses": {
        "sila": "k8"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "mouseling",
      "name": "Myszołak / Mysiarka (Mouseling)",
      "source": "fantasy",
      "desc": "Drobny, futrzasty humanoid o mysich uszach, niesamowitym słuchu i cichych krokach.",
      "traits": [
        {
          "title": "Drobny i cichy",
          "desc": "Zręczność k6 na start, +2 do Skradania."
        },
        {
          "title": "Ostry słuch",
          "desc": "+2 do testów Spostrzegawczości opartych na słuchu."
        },
        {
          "title": "Bardzo mały (Rozmiar -2)",
          "desc": "Wytrzymałość -2, trudny do trafienia (-2 dla strzelców)."
        },
        {
          "title": "Zmniejszona Siła",
          "desc": "Siła ograniczona do maks. k6."
        }
      ],
      "attribute_bonuses": {
        "zrecznosc": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "ogre_hero",
      "name": "Ogr (Bohater)",
      "source": "fantasy",
      "desc": "Wielka, zwalista i przeraźliwie silna istota o grubiej skórze i prostym usposobieniu.",
      "traits": [
        {
          "title": "Olbrzymia masa (Rozmiar +2)",
          "desc": "+2 Wytrzymałość, Siła zaczyna się od k8 (maks. k12+2)."
        },
        {
          "title": "Gruba skóra",
          "desc": "Pancerz +1."
        },
        {
          "title": "Ograniczony intelekt",
          "desc": "Koszt podnoszenia Sprytu jest podwojony podczas tworzenia postaci."
        },
        {
          "title": "Wielki cel",
          "desc": "+1 do trafienia dla wrogów."
        }
      ],
      "attribute_bonuses": {
        "sila": "k8"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "orc_fantasy",
      "name": "Ork (Fantasy)",
      "source": "fantasy",
      "desc": "Wojowniczy humanoid o zielonej lub szarej skórze, wydatnych kłach i niezłomnej sile woli.",
      "traits": [
        {
          "title": "Wojenna tężyzna",
          "desc": "Siła k6 na start (maks. k12+1)."
        },
        {
          "title": "Widzenie w słabym świetle",
          "desc": "Ignoruje kary za słabe światło."
        },
        {
          "title": "Twardziel",
          "desc": "Darmowa przewaga Krzepki lub Odporny na ból."
        },
        {
          "title": "Obcy (Mniejsza)",
          "desc": "Trudna historia z ludźmi i elfami (-1 do Przekonywania)."
        }
      ],
      "attribute_bonuses": {
        "sila": "k6"
      },
      "free_edges": 1,
      "free_hindrances": 0
    },
    {
      "id": "rakashan",
      "name": "Rakaszanie (Kotoludzie)",
      "source": "fantasy",
      "desc": "Zwinne, dumne kocie humanoidy o ostrych pazurach i wyśmienitym zmyśle równowagi.",
      "traits": [
        {
          "title": "Kocia zwinność",
          "desc": "Zręczność k6 na start (maks. k12+1)."
        },
        {
          "title": "Wysuwane pazury",
          "desc": "Si+k4 w walce wręcz."
        },
        {
          "title": "Koci wzrok",
          "desc": "Widzenie w słabym świetle."
        },
        {
          "title": "Kocia ciekawość",
          "desc": "Zawada Wścibski (Mniejsza)."
        }
      ],
      "attribute_bonuses": {
        "zrecznosc": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "ratling",
      "name": "Szczuroludź (Ratling)",
      "source": "fantasy",
      "desc": "Sprytny, odporny mieszkaniec kanałów i ruin, nawykły do przetrwania w najgorszych warunkach.",
      "traits": [
        {
          "title": "Żołądek ze stali",
          "desc": "Odporność na zepsute jedzenie, brudną wodę i choroby (+4 do testów Wigoru)."
        },
        {
          "title": "Węch drapieżnika",
          "desc": "+2 do Spostrzegawczości przy użyciu węchu."
        },
        {
          "title": "Zwinne przemykanie",
          "desc": "Zręczność k6, kość biegu k8."
        },
        {
          "title": "Podejrzliwość",
          "desc": "Niska reputacja w miastach (-1 do Przekonywania)."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "saurian",
      "name": "Jaszczuroludź (Saurian)",
      "source": "fantasy",
      "desc": "Gadzi wojownik bagien i dżungli o twardych łuskach i potężnym ogonie.",
      "traits": [
        {
          "title": "Twarde łuski",
          "desc": "Pancerz naturalny +2."
        },
        {
          "title": "Ogon i pazury",
          "desc": "Si+k4 w walce wręcz."
        },
        {
          "title": "Półwodny",
          "desc": "Potrafi wstrzymać oddech na 15 minut."
        },
        {
          "title": "Zimnokrwisty",
          "desc": "Cierpi w niskich temperaturach (-2 do Wigoru w chłodzie)."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "serpentfolk",
      "name": "Wężoczłek (Serpentfolk)",
      "source": "fantasy",
      "desc": "Hipnotyzujący humanoid o wężowym spojrzeniu, jadowitych kłach i gibkim ciele.",
      "traits": [
        {
          "title": "Jadowite kły",
          "desc": "Ugryzienie w walce wręcz (Si+k4) wstrzykuje paraliżujący jad (test Wigoru lub Szok)."
        },
        {
          "title": "Zmysł ciepła",
          "desc": "Wykrywa żywe istoty w ciemności."
        },
        {
          "title": "Hipnotyczny wzrok",
          "desc": "+2 do testów Przekonywania i Zastraszania przy kontakcie wzrokowym."
        },
        {
          "title": "Zimnokrwisty",
          "desc": "Wrażliwość na mróz i nagłe spadki temperatury."
        }
      ],
      "attribute_bonuses": {
        "spryt": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "shapeshifter",
      "name": "Zmiennokształtny (Shapeshifter)",
      "source": "fantasy",
      "desc": "Niezwykła istota zdolna do zmiany rysów twarzy, głosu i sylwetki, by upodobnić się do każdego humanoida.",
      "traits": [
        {
          "title": "Kameleon społeczny",
          "desc": "Akcja ograniczona pozwala na zmianę wyglądu zewnętrznego na dowolną inną osobę."
        },
        {
          "title": "Wrodzony czar",
          "desc": "Darmowa przewaga Charyzmatyczny."
        },
        {
          "title": "Tajemnica (Większa)",
          "desc": "Prawdziwe oblicze zmiennokształtnego jest tajemnicą, zdemaskowanie grozi polowaniem."
        },
        {
          "title": "Brak stałej tożsamości",
          "desc": "Trudność w nawiązywaniu trwałych więzi emocjonalnych."
        }
      ],
      "attribute_bonuses": {
        "duch": "k6"
      },
      "free_edges": 1,
      "free_hindrances": 0
    }
  ],
  "hindrances": [
    {
      "name": "Podatność na magię",
      "severity": "Drobna/Poważna",
      "type": "Drobna/Poważna",
      "points": "1 lub 2",
      "source": "fantasy",
      "desc": "Ciało bohatera łatwiej ulega mistycznym siłom. Drobna: −2 do opierania się wrogim mocom i ich efektom. Poważna: −4 do obrony przed magią."
    },
    {
      "name": "Krępowanie przez pancerz",
      "severity": "Drobna/Poważna",
      "type": "Drobna/Poważna",
      "points": "1 lub 2",
      "source": "fantasy",
      "desc": "Wymaga Zdolności nadprzyrodzonych. Drobna: noszenie średniego lub ciężkiego pancerza daje −4 do testów umiejętności nadprzyrodzonej. Poważna: dotyczy również lekkiego pancerza."
    },
    {
      "name": "Patałach",
      "severity": "Poważna",
      "type": "Poważna",
      "points": 2,
      "source": "fantasy",
      "desc": "Gdy w wybranej kluczowej umiejętności wyrzuci 1 na kości umiejętności, ponosi Krytyczną Porażkę nawet wtedy, gdy na Kości Figury wypadło więcej niż 1."
    },
    {
      "name": "Ponurak",
      "severity": "Drobna",
      "type": "Drobna",
      "points": 1,
      "source": "fantasy",
      "desc": "Melancholijny i wiecznie posępny bohater. Ma trudności z okazywaniem entuzjazmu i nawiązywaniem ciepłych relacji."
    },
    {
      "name": "Idealista",
      "severity": "Drobna",
      "type": "Drobna",
      "points": 1,
      "source": "fantasy",
      "desc": "Widzi świat w czarno-białych barwach. Wierzy w wyższe ideały i nie akceptuje moralnie wątpliwych kompromisów."
    },
    {
      "name": "Szowinista",
      "severity": "Drobna/Poważna",
      "type": "Drobna/Poważna",
      "points": "1 lub 2",
      "source": "fantasy",
      "desc": "Uważa inną kulturę, region lub grupę za gorszą. Drobna: −2 do Przekonywania wobec tej grupy. Poważna: −4 do Przekonywania, a członkowie grupy nie korzystają z jego Przewag Zdolności przywódczych."
    },
    {
      "name": "Talizman",
      "severity": "Drobna/Poważna",
      "type": "Drobna/Poważna",
      "points": "1 lub 2",
      "source": "fantasy",
      "desc": "Wymaga Zdolności nadprzyrodzonych. Bohater skupia magię przez przedmiot. Bez talizmanu otrzymuje karę −2 (Drobna) lub −4 (Poważna) do testów umiejętności nadprzyrodzonej."
    },
    {
      "name": "Bezinteresowny",
      "severity": "Drobna/Poważna",
      "type": "Drobna/Poważna",
      "points": "1 lub 2",
      "source": "fantasy",
      "desc": "Bohater przedkłada potrzeby innych nad własne (Drobna: wobec przyjaciół i bliskich; Poważna: wobec każdego potrzebującego)."
    },
    {
      "name": "Kochliwy",
      "severity": "Drobna",
      "type": "Drobna",
      "points": 1,
      "source": "fantasy",
      "desc": "Bohater łatwo ulega urokowi pięknych osób. Otrzymuje karę −2 do przeciwstawiania się testom postaci z Przewagą Atrakcyjny lub Bardzo atrakcyjny."
    },
    {
      "name": "Splugawienie",
      "severity": "Poważna",
      "type": "Poważna",
      "points": 2,
      "source": "fantasy",
      "desc": "Wymaga Zdolności nadprzyrodzonych. Krytyczna porażka w teście magii dodaje nową Drobną Zawadę (lub zwiększa posiadaną do Poważnej) do końca sesji."
    },
    {
      "name": "Przeklęty",
      "severity": "Poważna",
      "type": "Poważna",
      "points": 2,
      "source": "fantasy",
      "desc": "Sojusznicy rzucający korzystną magię na przeklętego bohatera odejmują 2 od swoich testów umiejętności nadprzyrodzonej."
    },
    {
      "name": "Przeznaczony na zgubę",
      "severity": "Poważna",
      "type": "Poważna",
      "points": 2,
      "source": "fantasy",
      "desc": "Cień śmierci wisi nad bohaterem. Odejmuje 2 od wszystkich testów Wyparowania (Soak rolls)."
    },
    {
      "name": "Komponenty materialne",
      "severity": "Poważna",
      "type": "Poważna",
      "points": 2,
      "source": "fantasy",
      "desc": "Wymaga Zdolności nadprzyrodzonych. Bez komponentów −4 do testów mocy. Krytyczna porażka w teście magii niszczy zapas komponentów."
    }
  ],
  "edges": [
    {
      "name": "Pochodzenie Niesamowite (Mag / Czarodziej)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Uczony mag badający księgi zaklęć, rytuały i formuły (10 Punktów Mocy, 6 mocy startowych).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Wiedźma / Czarnoksiężnik)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Tradycyjne czary sabatowe, kociołek, uroki i wiązanie klątw (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Majsterkowicz)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Reperowanie",
      "desc": "Mechaniczne automaty, gadżety parowe i magiczne urządzenia (15 Punktów Mocy, 2 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Przyzywacz)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Mistrz przywoływania istot z innych wymiarów i lojalnych sług (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Czarownik)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Wrodzona magia we krwi, spontaniczne rzucanie zaklęć bez ksiąg (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Szaman)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Wiara",
      "desc": "Łącznik ze światem duchów przodków i totemów natury (10 Punktów Mocy, 5 mocy startowych).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Nekromanta)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Władca nieumarłych, grobowej energii i wysysania sił witalnych (10 Punktów Mocy, 5 mocy startowych).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Iluzjonista)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Twórca miraży, złudzeń zmysłowych, światła i ciemności (10 Punktów Mocy, 5 mocy startowych).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Elementalista)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Władca czterech pierwotnych żywiołów: ognia, wody, ziemi i powietrza (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Druid)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Wiara",
      "desc": "Strażnik pierwotnej natury, mowa zwierząt, zmiana kształtu i pogoda (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Diabolista)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Paktuje z bytami piekielnymi, władając ogniem piekieł i cieniami (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Kleryk)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Wiara",
      "desc": "Święty sługa bóstwa niosący leczenie, błogosławieństwa i karzącą moc (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Bard)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Występowanie",
      "desc": "Splata magię z pieśniami i muzyką, inspirując drużynę i osłabiając wrogów (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Alchemik)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Alchemia",
      "desc": "Warzy mikstury, oleje i bomby, które mogą być przekazywane sojusznikom (15 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Naznaczony / Wybraniec",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Karta z Motywem",
      "desc": "Gdy Wybraniec wyda Fuks na Przełamanie (Conviction), efekt trwa do końca starcia bez potrzeby podtrzymywania! Posiada jednak Zawadę Wróg (Większa) i mistyczne znamię.",
      "category": "Tła",
      "requirements": "Nowicjusz, Karta z Motywem"
    },
    {
      "name": "Krew fae",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz",
      "desc": "Darmowy przerzut testu cechy podczas opierania się wrogim mocom i czarom.",
      "category": "Tła",
      "requirements": "Nowicjusz"
    },
    {
      "name": "Ulubiony wróg",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Walka k6+",
      "desc": "Specjalizacja w walce z konkretnym gatunkiem wrogów (np. orkowie, nieumarli, giganci, demony): darmowy przerzut nietrafionych ataków i tropienia (Przetrwanie).",
      "category": "Tła",
      "requirements": "Nowicjusz, Walka k6+"
    },
    {
      "name": "Ulubiony teren",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Przetrwanie k6+",
      "desc": "Bohater dobiera dodatkową Kartę Inicjatywy podczas walki w swoim rodzimym terenie (lasy, góry, bagna, pustynia, podziemia).",
      "category": "Tła",
      "requirements": "Nowicjusz, Przetrwanie k6+"
    },
    {
      "name": "Pamiątka rodowa",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz",
      "desc": "Bohater rozpoczyna z unikalnym magicznym przedmiotem rodowym (miecz, tarcza, pierścień) o wartości do 10 000 sztuk złota.",
      "category": "Tła",
      "requirements": "Nowicjusz"
    },
    {
      "name": "Szarża",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Walka k8+",
      "desc": "Gdy przebiegnie co najmniej 5 cali (10 m) w linii prostej do wroga, otrzymuje +2 do obrażeń pierwszego ataku Walką wręcz.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Walka k8+"
    },
    {
      "name": "Walka w zwarciu",
      "type": "Bojowe",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Zręczność k8+, Walka k8+",
      "desc": "W walce sztyletem lub małą bronią przeciw wrogowi z dłuższą bronią zyskuje Zasięg +1 i Obronę +1 przeciw temu celowi.",
      "category": "Bojowe",
      "requirements": "Nowicjusz, Zręczność k8+, Walka k8+"
    },
    {
      "name": "Mistrzowska walka w zwarciu",
      "type": "Bojowe",
      "rank": "Weteran",
      "source": "fantasy",
      "req": "Weteran, Walka w zwarciu",
      "desc": "Premia do Zasięgu wzrasta do +2, a Obrona do +2 w zwarciu ze sztyletem.",
      "category": "Bojowe",
      "requirements": "Weteran, Walka w zwarciu"
    },
    {
      "name": "Obrońca",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Walka k6+",
      "desc": "Wojownik z tarczą może podzielić się premią do Obrony i osłony tarczy z jednym przylegającym sojusznikiem.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Walka k6+"
    },
    {
      "name": "Brudny wojownik",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony",
      "desc": "Bohater nie waha się sypnąć piaskiem w oczy ani uderzyć poniżej pasa: +2 do testów Sztuczek Walki wręcz.",
      "category": "Bojowe",
      "requirements": "Doświadczony"
    },
    {
      "name": "Bardzo brudny wojownik",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Brudny wojownik",
      "desc": "Przebicie w teście Sztuczki Walką natychmiast daje Przewagę Pozycyjną (The Drop) przeciwko wrogowi.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Brudny wojownik"
    },
    {
      "name": "Podwójny strzał",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Strzelanie k8+",
      "desc": "Może wystrzelić dodatkową kość Strzelania lub Rzucania raz na rundę bez kary za Wieloakcję.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Strzelanie k8+"
    },
    {
      "name": "Przyjęcie ciosu",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Stalowe nerwy, Wigor k10+",
      "desc": "Darmowy przerzut testu Wigoru przy Przyjmowaniu Ran (Soak) lub opieraniu się ogłuszeniu.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Stalowe nerwy, Wigor k10+"
    },
    {
      "name": "Walka w szyku",
      "type": "Bojowe",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Walka k8+",
      "desc": "Wojownik dodaje +2 zamiast zwykłego +1 do premii za Przewagę Liczebną (Gang Up).",
      "category": "Bojowe",
      "requirements": "Nowicjusz, Walka k8+"
    },
    {
      "name": "Ściana tarcz",
      "type": "Bojowe",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Walka w szyku, Walka k8+",
      "desc": "Wojownik z tarczą stojący ramię w ramię z sojusznikiem z tą samą przewagą dodaje mu +1 do Obrony.",
      "category": "Bojowe",
      "requirements": "Nowicjusz, Walka w szyku, Walka k8+"
    },
    {
      "name": "Elastyczność bojowa",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Walka k8+",
      "desc": "Raz na starcie może na 5 rund zyskać korzyści dowolnej Przewagi Bojowej, do której spełnia wymagania.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Walka k8+"
    },
    {
      "name": "Odbijanie pocisków",
      "type": "Bojowe",
      "rank": "Bohater",
      "source": "fantasy",
      "req": "Bohater, Walka k10+",
      "desc": "Strzelcy muszą pokonać Obronę bohatera zamiast standardowego ST 4, aby trafić go pociskiem!",
      "category": "Bojowe",
      "requirements": "Bohater, Walka k10+"
    },
    {
      "name": "Oportunista",
      "type": "Bojowe",
      "rank": "Weteran",
      "source": "fantasy",
      "req": "Weteran",
      "desc": "Dżoker w inicjatywie daje bohaterowi premię +4 do wszystkich testów cech i obrażeń zamiast zwykłego +2!",
      "category": "Bojowe",
      "requirements": "Weteran"
    },
    {
      "name": "Ryk wojenny",
      "type": "Bojowe",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Duch k8+",
      "desc": "Wykonuje test Zastraszania w Szablonie Stożka obejmując wszystkich wrogów przed sobą.",
      "category": "Bojowe",
      "requirements": "Doświadczony, Duch k8+"
    },
    {
      "name": "Druzgotanie",
      "type": "Bojowe",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Siła k8+",
      "desc": "Dodaje +k6 do obrażeń przy próbie zniszczenia broni wroga, tarczy lub przeszkody fizycznej.",
      "category": "Bojowe",
      "requirements": "Nowicjusz, Siła k8+"
    },
    {
      "name": "Rzemieślnik artefaktów",
      "type": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Pochodzenie Niesamowite",
      "desc": "Umożliwia zaklinanie i tworzenie trwałych przedmiotów magicznych, mikstur, zwojów i run.",
      "category": "Mocy",
      "requirements": "Doświadczony, Pochodzenie Niesamowite"
    },
    {
      "name": "Magia bitewna",
      "type": "Mocy",
      "rank": "Weteran",
      "source": "fantasy",
      "req": "Weteran, Pochodzenie Niesamowite, umiejętność niesamowita k10+",
      "desc": "Umożliwia rzucanie czarów o skali pola bitwy wspierających setki sojuszników w Masowej Walce.",
      "category": "Mocy",
      "requirements": "Weteran, Pochodzenie Niesamowite, umiejętność niesamowita k10+"
    },
    {
      "name": "Magia krwi",
      "type": "Mocy",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Pochodzenie Niesamowite",
      "desc": "Czarodziej odzyskuje k6 Punktów Mocy, gdy zada Ranę rozumnej istocie w walce wręcz.",
      "category": "Mocy",
      "requirements": "Nowicjusz, Pochodzenie Niesamowite"
    },
    {
      "name": "Chowaniec",
      "type": "Mocy",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Pochodzenie Niesamowite",
      "desc": "Mag zyskuje zwierzęcego chowańca (kruk, kot, wąż), który daje mu dodatkowe 5 Punktów Mocy i zmysłową łączność.",
      "category": "Mocy",
      "requirements": "Nowicjusz, Pochodzenie Niesamowite"
    },
    {
      "name": "Zrodzony w siodle",
      "type": "Profesjonalne",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Zręczność k8+, Jeździectwo k6+",
      "desc": "Darmowy przerzut testów Jeździectwa, Tempo wierzchowca wzrasta o 2, a kość biegu konia o 1 krok.",
      "category": "Profesjonalne",
      "requirements": "Nowicjusz, Zręczność k8+, Jeździectwo k6+"
    },
    {
      "name": "Rycerz",
      "type": "Profesjonalne",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Siła k8+, Wigor k8+, Walka k8+, Jeździectwo k6+, Ślubowanie (Większa)",
      "desc": "Szlachecki tytuł i autorytet (+1 do Zastraszania i Przekonywania), koń bojowy, lanca, długi miecz, pełna zbroja płytowa i tarcza.",
      "category": "Profesjonalne",
      "requirements": "Nowicjusz, Siła k8+, Wigor k8+, Walka k8+, Jeździectwo k6+, Ślubowanie (Większa)"
    },
    {
      "name": "Zwiadowca",
      "type": "Profesjonalne",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Przetrwanie k6+",
      "desc": "Zawsze czujny wobec Skradania wroga, test Spostrzegawczości z karą -2 do wykrywania zasadzek w podróży, +2 do Wiedzy Ogólnej o przebytych krainach.",
      "category": "Profesjonalne",
      "requirements": "Doświadczony, Przetrwanie k6+"
    },
    {
      "name": "Kamienna mądrość",
      "type": "Profesjonalne",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Reperowanie k6+",
      "desc": "+2 do Spostrzegawczości przy wykrywaniu pułapek, ukrytych przejść i konstrukcji z kamienia.",
      "category": "Profesjonalne",
      "requirements": "Nowicjusz, Reperowanie k6+"
    },
    {
      "name": "Trubadur",
      "type": "Profesjonalne",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, Wiedza ogólna k6+, Występowanie k6+",
      "desc": "+2 do Wiedzy ogólnej; może używać Występowania zamiast Bitwy w Przewagach Przywódczych.",
      "category": "Profesjonalne",
      "requirements": "Doświadczony, Wiedza ogólna k6+, Występowanie k6+"
    },
    {
      "name": "Mowa zwierząt",
      "type": "Dziwne",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz",
      "desc": "Bohater potrafi naturalnie rozmawiać ze wszystkimi dzikimi i domowymi zwierzętami.",
      "category": "Dziwne",
      "requirements": "Nowicjusz"
    },
    {
      "name": "Aura odwagi",
      "type": "Dziwne",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, Duch k8+",
      "desc": "Sojusznicy w promieniu 10 cali (20 m) dodają +1 do testów Strachu i odejmują 1 od rzutów w Tabeli Strachu.",
      "category": "Dziwne",
      "requirements": "Nowicjusz, Duch k8+"
    },
    {
      "name": "Ziemia ojczysta",
      "type": "Legendarne",
      "rank": "Legenda",
      "source": "fantasy",
      "req": "Legenda, Duch k8+, Pochodzenie Niesamowite",
      "desc": "Na swojej ziemi ojczystej może raz na starcie wydać Fuks, by natychmiast odzyskać WSZYSTKIE Punkty Mocy.",
      "category": "Legendarne",
      "requirements": "Legenda, Duch k8+, Pochodzenie Niesamowite"
    },
    {
      "name": "Niepowstrzymany",
      "type": "Legendarne",
      "rank": "Legenda",
      "source": "fantasy",
      "req": "Legenda, Wigor k10+, Twardziel, Stalowe nerwy",
      "desc": "Bohater nigdy nie może odnieść więcej niż jedną Ranę z pojedynczego źródła obrażeń!",
      "category": "Legendarne",
      "requirements": "Legenda, Wigor k10+, Twardziel, Stalowe nerwy"
    },
    {
      "name": "Mistrz Alchemii",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Alchemik)",
      "desc": "Alchemik warzy mikstury w połowie normalnego czasu i może nasycać eliksiry dwoma mocami jednocześnie.",
      "requirements": "Doświadczony, PN (Alchemik)"
    },
    {
      "name": "Pieśń Bohaterstwa (Bard)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Bard)",
      "desc": "Sojusznicy słyszący pieśń barda otrzymują darmowy przerzut pierwszego nieudanego ataku w starciu.",
      "requirements": "Doświadczony, PN (Bard)"
    },
    {
      "name": "Zniszczenie Nieumarłych (Kleryk)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Kleryk), Wiara k8+",
      "desc": "Kleryk unosi święty symbol: wszyscy nieumarli w Szablonie Średniego Wybuchu otrzymują 2k6 obrażeń ignorujących niemagiczny pancerz.",
      "requirements": "Doświadczony, PN (Kleryk), Wiara k8+"
    },
    {
      "name": "Laska z Serca Puszczy (Druid)",
      "category": "Mocy",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, PN (Druid)",
      "desc": "Druid tworzy z żywego drzewa świętą laskę, która redukuje koszt podtrzymywania mocy natury o 1 PM i służy jako potężna broń (Si+k6, Obrona +1).",
      "requirements": "Nowicjusz, PN (Druid)"
    },
    {
      "name": "Władca Żywiołów (Elementalista)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Elementalista)",
      "desc": "Gdy żywiołak jest w pobliżu swojego elementu, ignoruje 1 punkt kar za Wieloakcję i rany przy rzucaniu czarów.",
      "requirements": "Doświadczony, PN (Elementalista)"
    },
    {
      "name": "Śmiertelna Iluzja (Iluzjonista)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Iluzjonista)",
      "desc": "Iluzje czarodzieja stają się tak przekonujące, że potrafią zadać ofiarom realne obrażenia psychiczne.",
      "requirements": "Doświadczony, PN (Iluzjonista)"
    },
    {
      "name": "Nieumarły Chowaniec (Nekromanta)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Nekromanta)",
      "desc": "Nekromanta animuje szkieletowego kruka, kota lub małego chowańca, zyskując +5 Punktów Mocy i zmysły sługi.",
      "requirements": "Doświadczony, PN (Nekromanta)"
    },
    {
      "name": "Święty Fetysz (Szaman)",
      "category": "Mocy",
      "rank": "Nowicjusz",
      "source": "fantasy",
      "req": "Nowicjusz, PN (Szaman), Wiara k8+",
      "desc": "Święty przedmiot duchowy dający +1 do wszystkich testów Wiary przy rzucaniu mocy totemowych.",
      "requirements": "Nowicjusz, PN (Szaman), Wiara k8+"
    },
    {
      "name": "Fenomenalna Potęga (Czarownik)",
      "category": "Mocy",
      "rank": "Bohater",
      "source": "fantasy",
      "req": "Bohater, PN (Czarownik)",
      "desc": "Czarownik może czerpać moc bezpośrednio ze swojej esencji: raz na starcie rzuca moc bez zużycia Punktów Mocy udanym testem Wigoru.",
      "requirements": "Bohater, PN (Czarownik)"
    },
    {
      "name": "Zaciekłe Przyzwanie (Przyzywacz)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Przyzywacz)",
      "desc": "Wszystkie bestie i sojusznicy przywołani przez maga otrzymują +2 do obrażeń i +1 do Wytrzymałości.",
      "requirements": "Doświadczony, PN (Przyzywacz)"
    },
    {
      "name": "Pancerz Majsterkowicza",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Majsterkowicz)",
      "desc": "Majsterkowicz buduje parowo-mechaniczny pancerz wspomagany, dający mu Siłę wyższą o 1 stopień kości i Pancerz +2.",
      "requirements": "Doświadczony, PN (Majsterkowicz)"
    },
    {
      "name": "Złe Oko (Wiedźma)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Wiedźma)",
      "desc": "Spojrzenie wiedźmy paraliżuje wolę: cel w odległości wzroku musi zdać test Ducha z karą -2 lub nie może wydać Fuksa do końca starcia.",
      "requirements": "Doświadczony, PN (Wiedźma)"
    },
    {
      "name": "Księga Czarów (Mag)",
      "category": "Mocy",
      "rank": "Doświadczony",
      "source": "fantasy",
      "req": "Doświadczony, PN (Mag)",
      "desc": "Grymuar maga zawiera obszerne formuły: mag może zapisać i przygotowywać dowolną liczbę zaklęć ze zwojów i ksiąg.",
      "requirements": "Doświadczony, PN (Mag)"
    }
  ],
  "arcaneBackgrounds": [
    {
      "name": "Alchemik (Fantasy)",
      "skill": "Alchemia",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 15,
      "source": "fantasy",
      "desc": "Warzy mikstury, oleje i bomby, które mogą być przekazywane sojusznikom do użycia."
    },
    {
      "name": "Bard",
      "skill": "Występowanie",
      "attr": "duch",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Splata magię z pieśniami, muzyką i poezją, inspirując sojuszników i mącąc umysły wrogów."
    },
    {
      "name": "Kleryk (Kapłan)",
      "skill": "Wiara",
      "attr": "duch",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Służy bóstwu, czerpiąc świętą moc do leczenia, błogosławieństw i walki z nieumarłymi."
    },
    {
      "name": "Diabolista",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Paktuje z bytami piekieł, władając piekielnym ogniem i mrocznymi urokami."
    },
    {
      "name": "Druid",
      "skill": "Wiara",
      "attr": "duch",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Strażnik natury, rozmawiający ze zwierzętami, władający pogodą i zmieniający kształt w bestie."
    },
    {
      "name": "Elementalista",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Włada czterema żywiołami: ogniem, wodą, ziemią i powietrzem."
    },
    {
      "name": "Iluzjonista",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 5,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Mistrz miraży, omamów zmysłowych, światła i cienia oszukujący umysły wrogów."
    },
    {
      "name": "Nekromanta",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 5,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Włada mrocznymi energiami śmierci, ożywiając szkielety i zombie oraz wysysając siły życiowe."
    },
    {
      "name": "Szaman",
      "skill": "Wiara",
      "attr": "duch",
      "startingPowers": 5,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Łącznik z duchami przodków i totemami natury, używający świętych fetyszy."
    },
    {
      "name": "Czarownik (Sorcerer)",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Moc wypływa z samej krwi i wrodzonego magicznego talentu, bez potrzeby żmudnych studiów."
    },
    {
      "name": "Przyzywacz",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Mistrz przywoływania potworów, bestii i sferycznych sług do walki po swojej stronie."
    },
    {
      "name": "Majsterkowicz / Rzemieślnik",
      "skill": "Reperowanie",
      "attr": "spryt",
      "startingPowers": 2,
      "powerPoints": 15,
      "source": "fantasy",
      "desc": "Twórca mechanicznych automatów, parowych gadżetów i alchemicznych pancerzy."
    },
    {
      "name": "Wiedźma / Czarnoksiężnik",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Rzuca uroki, przygotowuje wywary w kociołku, rzuca Złe Oko i wiąże pakty."
    },
    {
      "name": "Mag / Czarodziej (Wizard)",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 6,
      "powerPoints": 10,
      "source": "fantasy",
      "desc": "Uczony mag czerpiący potęgę z ksiąg czarów i drobiazgowych formuł mistycznych."
    }
  ],
  "powers": [
    {
      "name": "Błogosławieństwo",
      "rank": "Nowicjusz",
      "pp": 2,
      "range": "Spryt",
      "duration": "5 rund",
      "source": "fantasy",
      "desc": "Dodaje +1 (+2 z podbiciem) do wszystkich testów Cech dla wybranego sojusznika.",
      "pm": 2
    },
    {
      "name": "Przyzwanie przedmiotu",
      "rank": "Nowicjusz",
      "pp": 1,
      "range": "Dotyk",
      "duration": "10 minut",
      "source": "fantasy",
      "desc": "Materializuje z eteru prosty, niemagiczny przedmiot (pochodnię, linę, miecz, młotek).",
      "pm": 1
    },
    {
      "name": "Pole obrażeń",
      "rank": "Doświadczony",
      "pp": 4,
      "range": "Dotyk (Wokół rzucającego)",
      "duration": "5 rund",
      "source": "fantasy",
      "desc": "Otacza czarownika wirem ognia, lodu lub cierni zadającym 2k4 obrażeń każdemu, kto zbliży się na odległość walki wręcz.",
      "pm": 4
    },
    {
      "name": "Widzenie w ciemności",
      "rank": "Nowicjusz",
      "pp": 1,
      "range": "Dotyk",
      "duration": "1 godzina",
      "source": "fantasy",
      "desc": "Pozwala celowi widzieć w całkowitej ciemności bez żadnych kar.",
      "pm": 1
    },
    {
      "name": "Mistyczna interwencja",
      "rank": "Bohater",
      "pp": 10,
      "range": "Wzrok",
      "duration": "Natychmiastowy",
      "source": "fantasy",
      "desc": "Bezpośrednie wezwanie boskiej pomocy odwracającej losy beznadziejnej bitwy lub kataklizmu.",
      "pm": 10
    },
    {
      "name": "Spętanie sferyczne",
      "rank": "Weteran",
      "pp": 8,
      "range": "Spryt",
      "duration": "Specjalny",
      "source": "fantasy",
      "desc": "Więzi istotę pozawymiarową lub demona w magicznym kręgu i zmusza do wykonania jednej usługi.",
      "pm": 8
    },
    {
      "name": "Przejście między sferami",
      "rank": "Weteran",
      "pp": 8,
      "range": "Dotyk",
      "duration": "1 godzina",
      "source": "fantasy",
      "desc": "Otwiera portal do innych sfer egzystencji (Sfera Ognia, Otchłań, Kraina Fey, Kraina Cieni).",
      "pm": 8
    },
    {
      "name": "Wskrzeszenie",
      "rank": "Bohater",
      "pp": 15,
      "range": "Dotyk",
      "duration": "Trwały",
      "source": "fantasy",
      "desc": "Przywraca duszę zmarłego do jego ciała, jeśli śmierć nastąpiła w ciągu ostatnich kilku dni.",
      "pm": 15
    },
    {
      "name": "Dźwięk / Cisza",
      "rank": "Nowicjusz",
      "pp": 1,
      "range": "Spryt x2",
      "duration": "5 rund",
      "source": "fantasy",
      "desc": "Tworzy złudzenie dźwiękowe (ryk bestii, kroki) lub strefę całkowitej ciszy tłumiącej hałasy i zaklęcia.",
      "pm": 1
    },
    {
      "name": "Wezwanie zwierzęcia",
      "rank": "Nowicjusz",
      "pp": 2,
      "range": "Spryt",
      "duration": "5 rund",
      "source": "fantasy",
      "desc": "Przywołuje naturalne zwierzę (wilka, orła, psa bojowego, niedźwiedzia) do pomocy w walce.",
      "pm": 2
    },
    {
      "name": "Wezwanie potwora",
      "rank": "Doświadczony",
      "pp": 4,
      "range": "Spryt",
      "duration": "5 rund",
      "source": "fantasy",
      "desc": "Przywołuje fantastyczną bestię (gryfa, bazyliszka, żywiołaka) podległą rozkazom rzucającego.",
      "pm": 4
    },
    {
      "name": "Wezwanie nieumarłego",
      "rank": "Nowicjusz",
      "pp": 3,
      "range": "Spryt",
      "duration": "5 rund",
      "source": "fantasy",
      "desc": "Podnosi szkielety lub zombie z ziemi do walki po stronie nekromanty.",
      "pm": 3
    },
    {
      "name": "Zatrzymanie czasu",
      "rank": "Legenda",
      "pp": 10,
      "range": "Na siebie",
      "duration": "1 runda",
      "source": "fantasy",
      "desc": "Zatrzymuje upływ czasu dla wszystkich poza czarodziejem, dając mu dodatkową pełną turę działań.",
      "pm": 10
    },
    {
      "name": "Życzenie",
      "rank": "Legenda",
      "pp": 20,
      "range": "Specjalny",
      "duration": "Trwały",
      "source": "fantasy",
      "desc": "Najpotężniejsze zaklęcie rzeczywistości zakrzywiające prawa kosmosu i spełniające najgłębsze pragnienie.",
      "pm": 20
    }
  ],
  "equipment": [
    {
      "name": "Miecz dwuręczny (Bastard / Półtorak)",
      "category": "weapons_melee",
      "weight": 3.0,
      "cost": 400,
      "source": "fantasy",
      "damage": "Si+k8",
      "notes": "Wymaga Si k8, Obrona -1, Przebicie 1, wymaga 2 rąk."
    },
    {
      "name": "Glewia / Halabarda",
      "category": "weapons_melee",
      "weight": 3.5,
      "cost": 250,
      "source": "fantasy",
      "damage": "Si+k8",
      "notes": "Zasięg 1, wymaga 2 rąk, zatrzymuje szarżę."
    },
    {
      "name": "Morgensztern (Gwiazda poranna)",
      "category": "weapons_melee",
      "weight": 2.5,
      "cost": 200,
      "source": "fantasy",
      "damage": "Si+k6",
      "notes": "Przebicie 1, ignoruje 1 pkt Obrony z tarczy."
    },
    {
      "name": "Rapier fechmistrza",
      "category": "weapons_melee",
      "weight": 1.0,
      "cost": 150,
      "source": "fantasy",
      "damage": "Si+k4",
      "notes": "Obrona +1, lekki, precyzyjny."
    },
    {
      "name": "Ciężka kusza (Arbalet)",
      "category": "weapons_ranged",
      "weight": 4.5,
      "cost": 350,
      "source": "fantasy",
      "damage": "2k8",
      "range": "15/30/60",
      "notes": "AP 2, Przeładowanie 1 akcja."
    },
    {
      "name": "Pełna zbroja płytowa (Rycerska)",
      "category": "armor",
      "weight": 25.0,
      "cost": 1500,
      "source": "fantasy",
      "armor": 4,
      "notes": "Pancerz +4, chroni całe ciało, Min. Siła k10."
    },
    {
      "name": "Brygantyna (Pancerz wzmacniany)",
      "category": "armor",
      "weight": 12.0,
      "cost": 400,
      "source": "fantasy",
      "armor": 3,
      "notes": "Pancerz +3 na tors i ramiona, Min. Siła k8."
    },
    {
      "name": "Pawęż (Tarcza wieżowa)",
      "category": "armor",
      "weight": 7.0,
      "cost": 100,
      "source": "fantasy",
      "parry": 2,
      "notes": "Obrona +2, Osłona +4 przed atakami dystansowymi, Tempo -1."
    },
    {
      "name": "Puklerz szermierczy",
      "category": "armor",
      "weight": 1.0,
      "cost": 40,
      "source": "fantasy",
      "parry": 1,
      "notes": "Obrona +1 w walce wręcz, lekki i poręczny."
    },
    {
      "name": "Mikstura leczenia ran (Eliksir)",
      "category": "gear",
      "weight": 0.5,
      "cost": 150,
      "source": "fantasy",
      "notes": "Wypicie leczy 1 Ranę i usuwa Szok, natychmiastowe działanie."
    },
    {
      "name": "Flakon z kwasem alchemicznym",
      "category": "gear",
      "weight": 0.5,
      "cost": 50,
      "source": "fantasy",
      "notes": "Broń rzucana, 2k6 obrażeń, topi pancerze i metal."
    },
    {
      "name": "Jedwabna lina wspinaczkowa (15 m)",
      "category": "gear",
      "weight": 1.0,
      "cost": 60,
      "source": "fantasy",
      "notes": "+1 do testów Wysportowania przy wspinaniu, wytrzymuje 300 kg."
    }
  ]
};
