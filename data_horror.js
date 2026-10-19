// Savage Worlds: Horror Companion (SWADE)
const HORROR_DATA = {
  "source": "horror",
  "sourceName": "Horror Companion",
  "sourceIcon": "🦇",
  "skills": [
    {
      "name": "Alchemia",
      "attr": "spryt",
      "isCore": false,
      "source": "horror",
      "isArcane": true,
      "arcaneType": "Alchemia",
      "desc": "Tworzenie i warzenie mikstur, eliksirów, olejów, kwasów i preparatów nasyconych magiczną mocą."
    }
  ],
  "races": [
    {
      "id": "angel",
      "name": "Anioł (Potworny Bohater)",
      "source": "horror",
      "desc": "Niebiańska istota zesłana na ziemię w śmiertelnej powłoce, aby walczyć ze złem w mrocznych zakamarkach świata.",
      "traits": [
        {
          "title": "Skrzydła",
          "desc": "Tempo lotu 12, Przyspieszenie 6 (k8 w biegu). Wymaga otwartej przestrzeni do lotu."
        },
        {
          "title": "Święty blask",
          "desc": "Emituje święte światło na żądanie (zasięg Szablonu Dużego Wybuchu)."
        },
        {
          "title": "Odporność na trucizny i choroby",
          "desc": "+4 do testów przeciw truciznom i chorobom."
        },
        {
          "title": "Święty wróg",
          "desc": "Złośliwe byty, demony i nieumarli wyczuwają świętą obecność i atakują anioła w pierwszej kolejności."
        },
        {
          "title": "Ślubowanie (Większa)",
          "desc": "Związany boską misją ochrony niewinnych i walki z mrokiem."
        }
      ],
      "attribute_bonuses": {
        "duch": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "demon_hero",
      "name": "Demon (Potworny Bohater)",
      "source": "horror",
      "desc": "Piekielna istota lub bies, który zbuntował się przeciw swojemu panu albo został uwięziony w ciele śmiertelnika.",
      "traits": [
        {
          "title": "Piekielny ogień",
          "desc": "Odporność na naturalny i magiczny ogień."
        },
        {
          "title": "Pazury/Rogi",
          "desc": "Obrażenia Si+k6, Przebicie 2."
        },
        {
          "title": "Mroczne widzenie",
          "desc": "Ignoruje kary za ciemność (widzenie w podczerwieni)."
        },
        {
          "title": "Święta słabość",
          "desc": "Odnosi +4 dodatkowe obrażenia od świętej broni i wody święconej."
        },
        {
          "title": "Wrogość otoczenia",
          "desc": "Zwierzęta wpadają w panikę w obecności demona (-2 do Jeździectwa/Tresury), śmiertelnicy reagują nieufnością (-2 do Przekonywania)."
        }
      ],
      "attribute_bonuses": {
        "sila": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "mummy",
      "name": "Mumia (Potworny Bohater)",
      "source": "horror",
      "desc": "Ożywiony balsamowany zwłok z pradawnego grobowca, złączony pradawną magią i zdeterminowany by wypełnić swoje przeznaczenie.",
      "traits": [
        {
          "title": "Nieumarły",
          "desc": "+2 do Wytrzymałości, +2 do testów wychodzenia z Szoku, ignoruje kary za Rany (poza ograniczeniami tempa), nie oddycha i jest odporny na trucizny i choroby."
        },
        {
          "title": "Potężna siła",
          "desc": "Kość Siły zwiększona o 1 krok (k6 początkowa, maks. k12+1)."
        },
        {
          "title": "Odporność na przebicie",
          "desc": "Pociski i broń kłująca zadają połowę obrażeń."
        },
        {
          "title": "Podatność na ogień",
          "desc": "Ogień zadaje +4 dodatkowe obrażenia, a próby gaszenia są o 2 trudniejsze."
        },
        {
          "title": "Powolny",
          "desc": "Tempo 5, kość biegu k4."
        }
      ],
      "attribute_bonuses": {
        "sila": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "patchwork_monster",
      "name": "Zszywaniec (Monstrum Frankensteina)",
      "source": "horror",
      "desc": "Istota zszyta z ciał wielu zmarłych i ożywiona za pomocą elektryczności, szalonej nauki lub nekromancji.",
      "traits": [
        {
          "title": "Konstrukt biologiczny",
          "desc": "+2 do testów wychodzenia z Szoku, brak dodatkowych obrażeń z trafień w organy witalne, odporność na trucizny i choroby."
        },
        {
          "title": "Niezwykła tężyzna",
          "desc": "Początkowa Siła i Wigor wynoszą k6."
        },
        {
          "title": "Odporność na prąd",
          "desc": "Obrażenia od elektryczności nie ranią, a wręcz mogą usunąć Szok."
        },
        {
          "title": "Obcy (Większa)",
          "desc": "Wygląd budzi odrazę i przerażenie, kara -2 do Przekonywania wśród ludzi."
        },
        {
          "title": "Nietypowy rozmiar",
          "desc": "Rozmiar +1 (+1 Wytrzymałość)."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "phantom",
      "name": "Widmo / Upiór (Potworny Bohater)",
      "source": "horror",
      "desc": "Duch zmarłego uwięziony między światami, zdolny do czasowej manifestacji materialnej powłoki.",
      "traits": [
        {
          "title": "Niematerialność (Częściowa)",
          "desc": "Może jako akcję ograniczoną przejść w stan niematerialny (przenikanie przez ściany, odporność na zwykłą broń fizyczną)."
        },
        {
          "title": "Eteryczny dotyk",
          "desc": "Atak dotykowy omijający niemagiczny pancerz (test Walki vs Obrona, obrażenia k4 Duch)."
        },
        {
          "title": "Nieumarły duch",
          "desc": "Odporność na trucizny, choroby, duszenie i rany śmiertelne ciała."
        },
        {
          "title": "Uwiązanie do reliktu",
          "desc": "Musi pozostać w pobliżu kotwicy (lub nosić relikt ze sobą), zniszczenie kotwicy osłabia go (-2 do wszystkich cech)."
        },
        {
          "title": "Wrażliwość na sól i magię",
          "desc": "Nie może przekraczać linii z soli; broń magiczna zadaje normalne obrażenia."
        }
      ],
      "attribute_bonuses": {
        "duch": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "revenant",
      "name": "Mściciel / Ożywieniec (Potworny Bohater)",
      "source": "horror",
      "desc": "Śmiertelnik, który powrócił z grobu napędzany czystą siłą woli i pragnieniem zemsty lub sprawiedliwości.",
      "traits": [
        {
          "title": "Napędzany zemstą",
          "desc": "Ignoruje 1 punkt kar za Rany."
        },
        {
          "title": "Ciało grobowe",
          "desc": "+2 do Wytrzymałości, odporność na trucizny, choroby i hipotermię."
        },
        {
          "title": "Zmysł oprawcy",
          "desc": "Wyczuwa obecność osób odpowiedzialnych za jego śmierć lub pokrewnych potworów w promieniu 1 km."
        },
        {
          "title": "Rozkładająca się powłoka",
          "desc": "Co tydzień musi zdać test Wigoru, by powstrzymać proces gnicia lub stosować zabiegi konserwujące."
        },
        {
          "title": "Wróg (Większa)",
          "desc": "Mordercy lub sekta, która doprowadziła do jego upadku, wciąż na niego polują."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    },
    {
      "id": "vampire",
      "name": "Wampir (Potworny Bohater)",
      "source": "horror",
      "desc": "Nieśmiertelny drapieżnik nocy, obdarzony nadludzkimi mocami, lecz przeklęty wiecznym głodem krwi.",
      "traits": [
        {
          "title": "Wampirzy nieumarły",
          "desc": "+2 do Wytrzymałości, +2 do testów wychodzenia z Szoku, odporność na trucizny i choroby."
        },
        {
          "title": "Kły i pazury",
          "desc": "Obrażenia Si+k4, Przebicie 1. Wysysanie krwi leczy Zmęczenie i Rany przy unieruchomionej ofierze."
        },
        {
          "title": "Mroczny urok",
          "desc": "Startuje z darmową przewagą Atrakcyjny lub Charyzmatyczny."
        },
        {
          "title": "Słabość na słońce",
          "desc": "Bezpośrednie światło słoneczne zadaje 2k10 obrażeń na rundę i paraliżuje wampira."
        },
        {
          "title": "Słabość na kołek i sacrum",
          "desc": "Drewniany kołek w serce obezwładnia wampira; symbole wiary trzymane przez osobę o mocnej wierze paraliżują go na dystans."
        }
      ],
      "attribute_bonuses": {
        "zrecznosc": "k6"
      },
      "free_edges": 1,
      "free_hindrances": 0
    },
    {
      "id": "werewolf",
      "name": "Wilkołak (Potworny Bohater)",
      "source": "horror",
      "desc": "Dotknięty likantropią człowiek, który posiadł zdolność transformacji w potężną, drapieżną bestię.",
      "traits": [
        {
          "title": "Transformacja",
          "desc": "Akcja ograniczona pozwala na zmianę formy w likantropa i z powrotem. W czasie pełni zmiana jest przymusowa od zmierzchu do świtu."
        },
        {
          "title": "Wściekłość i siła (W postaci wilka)",
          "desc": "Zręczność, Siła i Wigor wzrastają o 2 kroki kości! Kły i pazury zadają Si+k6, AP 2."
        },
        {
          "title": "Szybkość drapieżnika (W postaci wilka)",
          "desc": "Tempo +2, kość biegu k8, widzenie w ciemności (Infrawizja)."
        },
        {
          "title": "Słabość na srebro",
          "desc": "Srebrna broń zadaje wilkołakowi +4 dodatkowe obrażenia i uniemożliwia regenerację naturalną."
        },
        {
          "title": "Niemota w wilczej formie",
          "desc": "W postaci wilka nie potrafi mówić ludzkim głosem (nie może rzucać zaklęć bez Cichego Zaklinacza)."
        }
      ],
      "attribute_bonuses": {
        "wigor": "k6"
      },
      "free_edges": 0,
      "free_hindrances": 0
    }
  ],
  "hindrances": [
    {
      "name": "Kochliwy",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Bohater łatwo ulega urokowi pięknych osób. Otrzymuje karę -2 do przeciwstawiania się testom i sztuczkom postaci z Przewagą Atrakcyjny lub Bardzo atrakcyjny."
    },
    {
      "name": "Krwotok",
      "type": "Większa",
      "source": "horror",
      "desc": "Rany postaci krwawią obficie. Gdy bohater odniesie Ranę, musi zdawać test Wigoru co rundę; porażka oznacza otrzymanie poziomu Zmęczenia z upływu krwi aż do opatrzenia (Leczenie)."
    },
    {
      "name": "Magnes na kule",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Pociski i odłamki zdają się szukać tego nieszczęśnika. W przypadku chybienia celu w walce zasięgowej w zasięgu walki, zbłąkane pociski zawsze trafiają w tę postać."
    },
    {
      "name": "Prześladowca / Tyran",
      "type": "Mniejsza/Większa",
      "source": "horror",
      "desc": "Postać wyżywa się na słabszych i bezbronnych. Jako Mniejsza: budzi antypatię (-1 do Przekonywania). Jako Większa: bezlitosny sadysta, -2 do Przekonywania i ryzyko zemsty ofiar."
    },
    {
      "name": "Splugawienie",
      "type": "Większa",
      "source": "horror",
      "desc": "Wymaga Pochodzenia Niesamowitego. Magia bohatera czerpie z mrocznego, plugawego źródła. Krytyczna porażka w teście magii dodaje nową Mniejszą Zawadę (lub zwiększa posiadaną do Większej) odzwierciedlającą spaczenie umysłu i ciała."
    },
    {
      "name": "Przeklęty",
      "type": "Większa",
      "source": "horror",
      "desc": "Czarodzieje i sojusznicy rzucający korzystną magię na przeklętego bohatera odejmują 2 od swoich testów umiejętności niesamowitej. Klątwa odpycha pomoc."
    },
    {
      "name": "Przeznaczony na zgubę",
      "type": "Większa",
      "source": "horror",
      "desc": "Cień śmierci wisi nad bohaterem. Odejmuje 2 od wszystkich testów Przyjmowania Ran (Soak rolls) za Fuks."
    },
    {
      "name": "Trwoga",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Bohater panicznie boi się mroku, samotności lub potworów. Odejmuje 1 od testów Strachu i testów przeciw Zastraszaniu."
    },
    {
      "name": "Ciężki sen",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Gdy zaśnie, trudno go dobudzić nawet w obliczu śmiertelnego niebezpieczeństwa. Kara -4 do testów Spostrzegawczości podczas snu, a po obudzeniu w szoku jest Wstrząśnięty."
    },
    {
      "name": "Nerwowy / Płochliwy",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Każdy szelest sprawia, że skacze ze strachu. Odejmuje 2 od testów Strachu wywołanych nagłymi zdarzeniami i zasadzkami."
    },
    {
      "name": "Komponenty materialne",
      "type": "Większa",
      "source": "horror",
      "desc": "Wymaga Pochodzenia Niesamowitego. Rzucanie zaklęć wymaga rzadkich proszków, ziół, świec i kości. Krytyczna porażka w teście magii niszczy zapas komponentów: -4 do czarowania do czasu uzupełnienia."
    },
    {
      "name": "Koszmary nocne",
      "type": "Większa",
      "source": "horror",
      "desc": "Upiorne wizje dręczą bohatera każdej nocy. Aby wypocząć, musi zdać test Ducha; porażka oznacza brak regeneracji Zmęczenia lub brak Fuksa na sesję."
    },
    {
      "name": "Krzykacz",
      "type": "Mniejsza/Większa",
      "source": "horror",
      "desc": "W obliczu zagrożenia bohater wrzeszczy w niebogłosy. Zdradza pozycję drużyny (kara do Skradania dla wszystkich) i uniemożliwia zaskoczenie wroga."
    },
    {
      "name": "Przesądny",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Bohater święcie wierzy w przesądy, znaki zodiaku, rozsypaną sól i czarne koty. Jeśli spotka zły znak, odejmuje 1 od kolejnego testu cechy."
    },
    {
      "name": "Nienaturalny apetyt",
      "type": "Mniejsza",
      "source": "horror",
      "desc": "Postać pożąda czegoś dziwnego: surowego mięsa, popiołu, robaków, krwi lub ziemi cmentarnej. Brak zaspokojenia apetytu wywołuje Zmęczenie."
    },
    {
      "name": "Urodzona ofiara",
      "type": "Większa",
      "source": "horror",
      "desc": "Potwory, mordercy i drapieżniki instynktownie wybierają tego bohatera na swój pierwszy cel w zasadzkach i walkach."
    }
  ],
  "edges": [
    {
      "name": "Pochodzenie Niesamowite (Czarnoksiężnik / Wiedźma)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Tradycyjne sabaty, złe oko, klątwy i ziołolecznictwo (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Wuduista)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Wiara",
      "desc": "Rytuały Loa, laleczki wudu, klątwy i ochrona duchowa (10 Punktów Mocy, 2 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Śledczy parapsychologiczny)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Psionika",
      "desc": "Zdolności mentalne: telepatia, telekineza i psychometria do rozwiązywania zagadek (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Kapłan / Egzorcysta)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Wiara",
      "desc": "Święte sakramenty, modlitwy i relikwie odpędzające moce zła (15 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Okultysta)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Badacz sekretnych rytuałów, mitów i zakazanych praw natury (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Medium)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Komunikacja ze zmarłymi i zjawami, egzorcyzmy i odpędzanie duchów (10 Punktów Mocy, 2 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Wróżbiarz)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Odczytywanie znaków losu, kart tarota, gwiazd i wróżb (10 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Demonolog)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Rzucanie czarów",
      "desc": "Zakazana wiedza grymuarów i pakty z biesami (10 Punktów Mocy, 5 mocy startowych).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Skażony)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Duch k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Skupienie",
      "desc": "Moc czerpana z wewnętrznego skażenia, klątwy krwi lub kontaktu z Otchłanią (10 Punktów Mocy, 2 moce startowe).",
      "requirements": "Nowicjusz, Duch k6+"
    },
    {
      "name": "Pochodzenie Niesamowite (Alchemik)",
      "category": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Spryt k6+",
      "isArcaneBackground": true,
      "arcaneSkill": "Alchemia",
      "desc": "Warzy eliksiry, trucizny, preparaty i mikstury aktywowane w chwili użycia (15 Punktów Mocy, 3 moce startowe).",
      "requirements": "Nowicjusz, Spryt k6+"
    },
    {
      "name": "Wisielczy humor",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Wyśmiewanie k6+",
      "desc": "Bohater potrafi rozładować grozę makabrycznym dowcipem. Może użyć Wyśmiewania zamiast Ducha w teście Strachu, a sukces daje sojusznikom w zasięgu dowodzenia +1 do ich testów Strachu.",
      "category": "Tła",
      "requirements": "Nowicjusz, Wyśmiewanie k6+"
    },
    {
      "name": "Nieugięty",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Duch k8+",
      "desc": "Niewzruszona determinacja. Otrzymuje darmowy przerzut nieudanego testu Strachu lub testu przeciw Zastraszaniu.",
      "category": "Tła",
      "requirements": "Nowicjusz, Duch k8+"
    },
    {
      "name": "Weteran mrocznego świata",
      "type": "Tła",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Okultyzm k6+",
      "desc": "Bohater widział zbyt wiele koszmarów. Rozpoczyna grę z dodatkowym Rozwinięciem, lecz losuje lub wybiera trwałą traumę / Zawadę psychiczną.",
      "category": "Tła",
      "requirements": "Nowicjusz, Okultyzm k6+"
    },
    {
      "name": "Odwaga dowódcy",
      "type": "Przywódcze",
      "rank": "Doświadczony",
      "source": "horror",
      "req": "Doświadczony, Dowodzenie, Przekonywanie k8+",
      "desc": "Spokój i hart ducha lidera inspirują drużynę w obliczu potworności. Każdy sojusznik w Zasięgu Dowodzenia otrzymuje darmowy przerzut nieudanego testu Strachu.",
      "category": "Przywódcze",
      "requirements": "Doświadczony, Dowodzenie, Przekonywanie k8+"
    },
    {
      "name": "Ulubiona moc",
      "type": "Mocy",
      "rank": "Doświadczony",
      "source": "horror",
      "req": "Doświadczony, Pochodzenie Niesamowite, umiejętność niesamowita k8+",
      "desc": "Bohater doprowadził jedną ze swoich mocy do perfekcji. Ignoruje do 2 punktów kar (za Wieloakcję, Rany, Zmęczenie) przy aktywowaniu wybranej mocy.",
      "category": "Mocy",
      "requirements": "Doświadczony, Pochodzenie Niesamowite, umiejętność niesamowita k8+"
    },
    {
      "name": "Cichy zaklinacz",
      "type": "Mocy",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Pochodzenie Niesamowite, Okultyzm k8+",
      "desc": "Umiejętność rzucania zaklęć bez wypowiadania inkantacji na głos. Pozwala czarować pod wodą, w próżni, po zakneblowaniu lub w obszarze ciszy.",
      "category": "Mocy",
      "requirements": "Nowicjusz, Pochodzenie Niesamowite, Okultyzm k8+"
    },
    {
      "name": "Łowca potworów",
      "type": "Profesjonalne",
      "rank": "Doświadczony",
      "source": "horror",
      "req": "Doświadczony, Duch k6+",
      "desc": "Całkowita odporność na testy Strachu wywoływane przez jeden wybrany typ potworów (np. wampiry, duchy, zombie, wilkołaki). Można brać wielokrotnie dla różnych typów.",
      "category": "Profesjonalne",
      "requirements": "Doświadczony, Duch k6+"
    },
    {
      "name": "Królowa / Król krzyku",
      "type": "Profesjonalne",
      "rank": "Weteran",
      "source": "horror",
      "req": "Weteran",
      "desc": "Przeżył najgorsze koszmary horroru. Gdy musi rzucać w Tabeli Efektów Strachu, może przerzucić wynik, lecz musi zaakceptować drugi rezultat!",
      "category": "Profesjonalne",
      "requirements": "Weteran"
    },
    {
      "name": "Ostatnia ocalała / Ostatni ocalały",
      "type": "Społeczne",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, nienaganna postawa moralna",
      "desc": "Uosobienie niewinności i czystości serca w slasherze. Raz na starcie może wydać Fuks, by zyskać 5 Żetonów Inspiracji, które może natychmiast przekazywać sojusznikom na przerzuty cech lub obrażeń.",
      "category": "Społeczne",
      "requirements": "Nowicjusz, nienaganna postawa moralna"
    },
    {
      "name": "Wizje",
      "type": "Dziwne",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz",
      "desc": "Mroczne sny i przerażające przebłyski przyszłości. Raz na sesję MG udziela bohaterowi proroczej wskazówki, ostrzeżenia przed potworem lub wizji nadchodzącej zguby.",
      "category": "Dziwne",
      "requirements": "Nowicjusz"
    },
    {
      "name": "Dotkliwe obrażenia (Potwory)",
      "type": "Potworne",
      "rank": "Doświadczony",
      "source": "horror",
      "req": "Doświadczony, Potworny Bohater",
      "desc": "Ataki kłami, pazurami lub piekielną mocą ranią byty nadnaturalne ignorując ich Niewrażliwość, a wrogowie z Regeneracją odejmują 4 od testu uleczenia tych Ran.",
      "category": "Potworne",
      "requirements": "Doświadczony, Potworny Bohater"
    },
    {
      "name": "Groza (-2)",
      "type": "Potworne",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Duch k8+, Potworny Bohater",
      "desc": "Prawdziwe oblicze potwora budzi paraliżujący lęk. Śmiertelnicy wykonują test Strachu na widok bohatera z karą -2.",
      "category": "Potworne",
      "requirements": "Nowicjusz, Duch k8+, Potworny Bohater"
    },
    {
      "name": "Starożytny",
      "type": "Potworne",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Potworny Bohater",
      "desc": "Istota żyjąca od stuleci lub tysiącleci. Otrzymuje premię +2 do wszystkich testów Sprytu i Wiedzy Ogólnej.",
      "category": "Potworne",
      "requirements": "Nowicjusz, Potworny Bohater"
    },
    {
      "name": "Zdziczenie",
      "type": "Potworne",
      "rank": "Doświadczony",
      "source": "horror",
      "req": "Doświadczony, Siła k10+, Potworny Bohater",
      "desc": "Potworna furia: Dziki Atak (Wild Attack) dodaje +4 do obrażeń zamiast zwykłego +2.",
      "category": "Potworne",
      "requirements": "Doświadczony, Siła k10+, Potworny Bohater"
    },
    {
      "name": "Chodzenie po ścianach",
      "type": "Potworne",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Wampir lub Wilkołak",
      "desc": "Możliwość wspinania się i biegania po pionowych ścianach i sufitach z połową zwykłego Tempa.",
      "category": "Potworne",
      "requirements": "Nowicjusz, Wampir lub Wilkołak"
    },
    {
      "name": "Sfora Alfa",
      "type": "Potworne",
      "rank": "Nowicjusz",
      "source": "horror",
      "req": "Nowicjusz, Wilkołak",
      "desc": "Wilkołak może zdominować naturalne wilki i psy udanym testem Zastraszania przeciwko Duchowi zwierzęcia, zyskując ich posłuch.",
      "category": "Potworne",
      "requirements": "Nowicjusz, Wilkołak"
    },
    {
      "name": "Wampirzy Sługa",
      "type": "Potworne",
      "rank": "Doświadczony",
      "source": "horror",
      "req": "Doświadczony, Wampir",
      "desc": "Wampir zyskuje oddanego śmiertelnego sługę (Poplecznika o Rangę niższego), który odda za niego życie i wykonuje rozkazy.",
      "category": "Potworne",
      "requirements": "Doświadczony, Wampir"
    }
  ],
  "arcaneBackgrounds": [
    {
      "name": "Alchemik (Horror)",
      "skill": "Alchemia",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 15,
      "source": "horror",
      "desc": "Warzy mikstury, maści, bomby i eliksiry, aktywowane w chwili wypicia lub rzucenia."
    },
    {
      "name": "Skażony",
      "skill": "Skupienie",
      "attr": "duch",
      "startingPowers": 2,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Moc pochodzi z mrocznej klątwy krwi lub kontaktu ze spaczeniem. Potężna, lecz niszcząca ciało i zmysły."
    },
    {
      "name": "Demonolog",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 5,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Czerpie wiedzę z zakazanych grymuarów, paktując z piekielnymi siłami i przyzywając byty z otchłani."
    },
    {
      "name": "Wróżbiarz",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Czyta z kart tarota, fusów, gwiazd i wnętrzności, przewidując przyszłość i manipulując losem."
    },
    {
      "name": "Medium",
      "skill": "Rzucanie czarów",
      "attr": "duch",
      "startingPowers": 2,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Most między światem żywych i umarłych. Rozmawia z duchami i odpędza niespokojne zjawy."
    },
    {
      "name": "Okultysta",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Badacz ezoteryki, antycznych rytuałów i zakazanej wiedzy kosmicznej."
    },
    {
      "name": "Kapłan / Egzorcysta",
      "skill": "Wiara",
      "attr": "duch",
      "startingPowers": 3,
      "powerPoints": 15,
      "source": "horror",
      "desc": "Wojownik wiary, uzbrojony w modlitwę, relikwie i sakramenty, by przeganiać demony."
    },
    {
      "name": "Śledczy parapsychologiczny",
      "skill": "Psionika",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Umysł wyszkolony w telepatii, psychometrii i telekinezie do rozwiązywania tajemnic zbrodni."
    },
    {
      "name": "Wuduista",
      "skill": "Wiara",
      "attr": "duch",
      "startingPowers": 2,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Kult Loa, laleczki wudu, klątwy i trans rytualny łączący z bóstwami."
    },
    {
      "name": "Czarnoksiężnik / Wiedźma",
      "skill": "Rzucanie czarów",
      "attr": "spryt",
      "startingPowers": 3,
      "powerPoints": 10,
      "source": "horror",
      "desc": "Starożytna czarna magia sabatów, uroków, uwiązań i ziół."
    }
  ],
  "powers": [
    {
      "name": "Poświęcenie ziemi",
      "rank": "Doświadczony",
      "pp": 4,
      "range": "Dotyk",
      "duration": "1 godzina",
      "source": "horror",
      "desc": "Nasyca obszar Szablonu Dużego Wybuchu świętą mocą. Istoty zła i nieumarli otrzymują karę -2 do wszystkich testów i obrażenia wchodząc na poświęconą ziemię.",
      "pm": 4
    },
    {
      "name": "Zmysł zwłok",
      "rank": "Nowicjusz",
      "pp": 1,
      "range": "Spryt x2",
      "duration": "Chwilowy",
      "source": "horror",
      "desc": "Wykrywa obecność ciał, grobów, kości i nieumarłych w pobliżu, określając ich przybliżony stan i przyczynę zgonu.",
      "pm": 1
    },
    {
      "name": "Klątwa",
      "rank": "Doświadczony",
      "pp": 5,
      "range": "Dotyk",
      "duration": "Trwały (do zdjęcia)",
      "source": "horror",
      "desc": "Rzuca niszczycielską klątwę na cel. Cel otrzymuje trwałą karę -2 do wybranej cechy lub zyskuje Mniejszą Zawadę do momentu przełamania klątwy.",
      "pm": 5
    },
    {
      "name": "Egzorcyzm",
      "rank": "Weteran",
      "pp": 10,
      "range": "Spryt",
      "duration": "Natychmiastowy",
      "source": "horror",
      "desc": "Potężny rytuał wygnania bytu opętującego śmiertelnika lub odesłania demona z powrotem do piekła.",
      "pm": 10
    },
    {
      "name": "Całun grobowy",
      "rank": "Nowicjusz",
      "pp": 2,
      "range": "Dotyk",
      "duration": "5 rund",
      "source": "horror",
      "desc": "Otacza cel eteryczną mgłą grobową, dając pancerz +2 i sprawiając, że bezmyślni nieumarli ignorują nosiciela.",
      "pm": 2
    },
    {
      "name": "Koszmary",
      "rank": "Doświadczony",
      "pp": 3,
      "range": "Wzrok",
      "duration": "Specjalny",
      "source": "horror",
      "desc": "Zsyła na śpiącą ofiarę koszmary senne wywołujące Zmęczenie i uniemożliwiające odzyskanie sił.",
      "pm": 3
    },
    {
      "name": "Azyl",
      "rank": "Doświadczony",
      "pp": 4,
      "range": "Dotyk",
      "duration": "1 godzina",
      "source": "horror",
      "desc": "Tworzy bezpieczną barierę ochronną, przez którą potwory i byty nadnaturalne nie mogą przejść bez przezwyciężenia testu woli.",
      "pm": 4
    },
    {
      "name": "Jasnowidzenie / Wróżenie",
      "rank": "Doświadczony",
      "pp": 4,
      "range": "Specjalny",
      "duration": "Koncentracja",
      "source": "horror",
      "desc": "Pozwala widzieć i słyszeć odległe miejsca przez kryształową kulę, lustro lub wodę.",
      "pm": 4
    },
    {
      "name": "Seans spirytystyczny",
      "rank": "Nowicjusz",
      "pp": 3,
      "range": "Dotyk",
      "duration": "10 minut",
      "source": "horror",
      "desc": "Nawiązuje kontakt z duchem zmarłego w miejscu jego spoczynku lub śmierci, zadając mu do trzech pytań.",
      "pm": 3
    },
    {
      "name": "Przyzwanie demona",
      "rank": "Weteran",
      "pp": 6,
      "range": "Spryt",
      "duration": "5 rund",
      "source": "horror",
      "desc": "Otwiera wrota piekieł i przyzywa biesa do walki lub wykonania określonego zadania za cenę ofiary.",
      "pm": 6
    },
    {
      "name": "Powstrzymanie transformacji",
      "rank": "Doświadczony",
      "pp": 2,
      "range": "Dotyk",
      "duration": "1 godzina",
      "source": "horror",
      "desc": "Tłumi klątwę likantropii lub wampiryzmu, uniemożliwiając ofierze przemianę w bestię pod wpływem księżyca.",
      "pm": 2
    }
  ],
  "equipment": [
    {
      "name": "Drewniany kołek (Osikowy)",
      "category": "weapons_melee",
      "weight": 0.5,
      "cost": 5,
      "source": "horror",
      "notes": "Obrażenia Si+k4. Trafienie w serce obezwładnia wampira."
    },
    {
      "name": "Woda święcona (Flakon)",
      "category": "gear",
      "weight": 0.5,
      "cost": 25,
      "source": "horror",
      "notes": "2k6 obrażeń przeciw nieumarłym i demonom, ign. pancerz."
    },
    {
      "name": "Kreda ochronna (Glicerynowa)",
      "category": "gear",
      "weight": 0.2,
      "cost": 15,
      "source": "horror",
      "notes": "Do rysowania kręgów ochronnych i pieczęci solnych."
    },
    {
      "name": "Srebrny sztylet",
      "category": "weapons_melee",
      "weight": 0.5,
      "cost": 200,
      "source": "horror",
      "notes": "Obrażenia Si+k4, srebro (omija odporności wilkołaków)."
    },
    {
      "name": "Srebrne kule (10 szt.)",
      "category": "gear",
      "weight": 0.5,
      "cost": 150,
      "source": "horror",
      "notes": "Do rewolweru/strzelby, zadaje +4 obr. likantropom."
    },
    {
      "name": "Lampa naftowa szturmowa",
      "category": "gear",
      "weight": 1.5,
      "cost": 30,
      "source": "horror",
      "notes": "Odporna na wiatr, oświetla promień 8 metrów przez 6h."
    },
    {
      "name": "Worek soli kamiennej (2 kg)",
      "category": "gear",
      "weight": 2.0,
      "cost": 10,
      "source": "horror",
      "notes": "Bariera przeciw duchom i zjawom."
    },
    {
      "name": "Aparat fotograficzny z lampą magnezową",
      "category": "gear",
      "weight": 3.0,
      "cost": 120,
      "source": "horror",
      "notes": "Rejestruje zjawy niewidoczne dla oka, błysk oślepia wrogów."
    }
  ]
};
