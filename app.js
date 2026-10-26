/**
 * SAVAGE WORLDS: EDYCJA PRZYGODOWA (SWEP / SWADE)
 * Główna logika aplikacji, walidacja zasad, zarządzanie stanem i interfejsem
 */

(function () {
  'use strict';

  // --- STAŁE I SŁOWNIKI POMOCNICZE ---
  const DIE_VALUES = {
    'k4': 4,
    'k6': 6,
    'k8': 8,
    'k10': 10,
    'k12': 12,
    'k12+1': 13,
    'k12+2': 14
  };

  const DIE_STEPS = ['k4', 'k6', 'k8', 'k10', 'k12', 'k12+1', 'k12+2'];

  function getDieIndex(die) {
    const idx = DIE_STEPS.indexOf(die);
    return idx >= 0 ? idx : 0;
  }

  function getNextDie(die) {
    if (!die || die === 'none') return 'k4';
    const idx = DIE_STEPS.indexOf(die);
    if (idx >= 0 && idx < DIE_STEPS.length - 1) {
      return DIE_STEPS[idx + 1];
    }
    return die;
  }

  function getPrevDie(die) {
    if (!die || die === 'k4') return null;
    const idx = DIE_STEPS.indexOf(die);
    if (idx > 0) {
      return DIE_STEPS[idx - 1];
    }
    return null;
  }

  function getRankInfo(advancesCount = 0) {
    if (advancesCount >= 16) return { name: 'Legenda', code: 'L', full: 'Legenda (L)', index: 4 };
    if (advancesCount >= 12) return { name: 'Bohater', code: 'H', full: 'Bohater (H)', index: 3 };
    if (advancesCount >= 8) return { name: 'Weteran', code: 'W', full: 'Weteran (W)', index: 2 };
    if (advancesCount >= 4) return { name: 'Doświadczony', code: 'D', full: 'Doświadczony (D)', index: 1 };
    return { name: 'Nowicjusz', code: 'N', full: 'Nowicjusz (N)', index: 0 };
  }

  function isEdgeRankAllowed(edgeReq, currentRankIndex) {
    if (!edgeReq) return true;
    const reqUpper = edgeReq.toUpperCase();
    if (reqUpper.includes('LEGENDA') || reqUpper.startsWith('L,') || reqUpper === 'L' || reqUpper.includes(' L,') || reqUpper.includes('/L')) {
      return currentRankIndex >= 4;
    }
    if (reqUpper.includes('BOHATER') || reqUpper.includes('HEROS') || reqUpper.startsWith('H,') || reqUpper === 'H' || reqUpper.includes(' H,') || reqUpper.includes('/H')) {
      return currentRankIndex >= 3;
    }
    if (reqUpper.includes('WETERAN') || reqUpper.startsWith('W,') || reqUpper === 'W' || reqUpper.includes(' W,') || reqUpper.includes('/W')) {
      return currentRankIndex >= 2;
    }
    if (reqUpper.includes('DOŚWIADCZONY') || reqUpper.includes('DOSWIADCZONY') || reqUpper.startsWith('D,') || reqUpper === 'D' || reqUpper.includes(' D,') || reqUpper.includes('/D')) {
      return currentRankIndex >= 1;
    }
    return true;
  }

  // --- STAN APLIKACJI I MODUŁÓW ---
  const appState = {
    activeModules: {
      swep: true,
      horror: true,
      fantasy: true
    },
    catalogFilters: {
      raceMod: 'all',
      hindMod: 'all',
      edgeMod: 'all',
      equipMod: 'all',
      powerMod: 'all'
    }
  };

  function getSourceBadgeHtml(source) {
    const s = source || 'swep';
    if (s === 'horror') return '<span class="badge-source badge-horror" title="Horror Companion">🦇 Horror</span>';
    if (s === 'fantasy') return '<span class="badge-source badge-fantasy" title="Fantasy Companion">🐉 Fantasy</span>';
    return '<span class="badge-source badge-swep" title="Podręcznik Główny SWEP">📘 SWEP</span>';
  }

  function getAllRaces() {
    let list = SW_DATA.races.map(r => ({ ...r, source: r.source || 'swep' }));
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.races) {
      list.push(...HORROR_DATA.races);
    }
    if (appState.activeModules.fantasy && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.races) {
      list.push(...FANTASY_DATA.races);
    }
    return list;
  }

  function getRaceConfig(raceId) {
    const all = getAllRaces();
    const found = all.find(r => r.id === raceId);
    if (found) return found;
    if (typeof HORROR_DATA !== 'undefined' && HORROR_DATA.races) {
      const hr = HORROR_DATA.races.find(r => r.id === raceId);
      if (hr) return hr;
    }
    if (typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.races) {
      const fr = FANTASY_DATA.races.find(r => r.id === raceId);
      if (fr) return fr;
    }
    return SW_DATA.races[0];
  }

  function getAllHindrances() {
    let rawList = SW_DATA.hindrances.map(h => ({ ...h, source: h.source || 'swep', sources: [h.source || 'swep'] }));
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.hindrances) {
      rawList.push(...HORROR_DATA.hindrances.map(h => ({ ...h, source: h.source || 'horror', sources: [h.source || 'horror'] })));
    }
    if (appState.activeModules.fantasy && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.hindrances) {
      rawList.push(...FANTASY_DATA.hindrances.map(h => ({ ...h, source: h.source || 'fantasy', sources: [h.source || 'fantasy'] })));
    }

    const byName = new Map();
    rawList.forEach(h => {
      const key = h.name.trim().toLowerCase();
      if (!byName.has(key)) {
        byName.set(key, { ...h, sources: [...(h.sources || [h.source || 'swep'])] });
      } else {
        const existing = byName.get(key);
        const src = h.source || 'swep';
        if (!existing.sources.includes(src)) {
          existing.sources.push(src);
        }
      }
    });
    return Array.from(byName.values());
  }

  function getHindranceMode(hObj) {
    const s = (hObj.severity || hObj.type || '').toLowerCase();
    if (s.includes('/') || s.includes('lub')) return 'dual';
    if (s.includes('poważna') || s.includes('większa') || s.includes('major')) return 'powazna';
    return 'drobna';
  }

  function hasArcaneBackground() {
    if (!currentChar) return false;
    if (currentChar.powers && currentChar.powers.length > 0) return true;
    return (currentChar.edges || []).some(e => {
      const nm = (e.name || '').toLowerCase();
      const cat = (e.category || e.type || '').toLowerCase();
      return !!e.isArcaneBackground ||
             nm.includes('zdolności nadprzyrodzone') ||
             nm.includes('pochodzenie niesamowite') ||
             cat.includes('nadprzyrodzone');
    });
  }

  const HINDRANCE_MUTUAL_EXCLUSIONS = {
    'grubas': ['Konus'],
    'konus': ['Grubas'],
    'ostrożny': ['Porywczy'],
    'porywczy': ['Ostrożny'],
    'chojrak': ['Tchórz'],
    'tchórz': ['Chojrak'],
    'bohaterski': ['Bezwzględny'],
    'bezwzględny': ['Bohaterski'],
    'ślepiec': ['Jednooki', 'Kiepski wzrok'],
    'jednooki': ['Ślepiec'],
    'kiepski wzrok': ['Ślepiec'],
    'dzieciak': ['Ramol'],
    'ramol': ['Dzieciak']
  };

  const HINDRANCE_EDGE_EXCLUSIONS = {
    'grubas': ['Krzepki'],
    'pech': ['Szczęściarz', 'Cholerny szczęściarz'],
    'powolny': ['Chyży'],
    'niezdecydowany': ['Błyskawiczny refleks', 'Opanowany', 'Bardzo opanowany'],
    'biedak': ['Bogaty', 'Krezus']
  };

  const ARCANE_REQUIRED_HINDRANCES = [
    'splugawienie',
    'komponenty materialne',
    'krępowanie przez pancerz',
    'talizman'
  ];

  function checkHindranceConstraints(hObj) {
    const key = (hObj.name || '').trim().toLowerCase();
    const chosenHinds = currentChar.hindrances || [];
    const chosenEdges = currentChar.edges || [];

    const mutHinds = HINDRANCE_MUTUAL_EXCLUSIONS[key] || [];
    for (const excl of mutHinds) {
      if (chosenHinds.some(ch => ch.name.trim().toLowerCase() === excl.toLowerCase())) {
        return { blocked: true, reason: `Wyklucza się z wybraną Zawadą: ${excl}` };
      }
    }

    const mutEdges = HINDRANCE_EDGE_EXCLUSIONS[key] || [];
    for (const excl of mutEdges) {
      if (chosenEdges.some(ce => ce.name.trim().toLowerCase() === excl.toLowerCase())) {
        return { blocked: true, reason: `Wyklucza się z wybraną Przewagą: ${excl}` };
      }
    }

    let warning = null;
    if (ARCANE_REQUIRED_HINDRANCES.includes(key) && !hasArcaneBackground()) {
      warning = 'Wymaga Przewagi: Zdolności nadprzyrodzone / Pochodzenie Niesamowite (Krok 5)';
    }

    return { blocked: false, reason: null, warning };
  }

  function checkEdgeConflictWithHindrances(edgeName) {
    const eLower = (edgeName || '').trim().toLowerCase();
    const chosenHinds = currentChar.hindrances || [];
    for (const [hKey, edgeList] of Object.entries(HINDRANCE_EDGE_EXCLUSIONS)) {
      if (edgeList.some(en => en.toLowerCase() === eLower)) {
        const foundHind = chosenHinds.find(ch => ch.name.trim().toLowerCase() === hKey);
        if (foundHind) {
          return { blocked: true, reason: `Wyklucza się z Zawadą: ${foundHind.name}` };
        }
      }
    }
    return { blocked: false, reason: null };
  }

  function getAllEdges() {
    let list = SW_DATA.edges.map(e => ({ ...e, source: e.source || 'swep' }));
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.edges) {
      list.push(...HORROR_DATA.edges);
    }
    if (appState.activeModules.fantasy && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.edges) {
      list.push(...FANTASY_DATA.edges);
    }
    return list;
  }

  function getAllPowers() {
    let list = SW_DATA.powers.map(p => ({ ...p, source: p.source || 'swep' }));
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.powers) {
      list.push(...HORROR_DATA.powers);
    }
    if (appState.activeModules.fantasy && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.powers) {
      list.push(...FANTASY_DATA.powers);
    }
    return list;
  }

  function getAllEquipment(category) {
    let list = [];
    if (SW_DATA.equipment && SW_DATA.equipment[category]) {
      list.push(...SW_DATA.equipment[category].map(it => ({ ...it, source: it.source || 'swep' })));
    }
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.equipment) {
      if (Array.isArray(HORROR_DATA.equipment)) {
        list.push(...HORROR_DATA.equipment.filter(it => it.category === category));
      } else if (HORROR_DATA.equipment[category]) {
        list.push(...HORROR_DATA.equipment[category]);
      }
    }
    if (appState.activeModules.fantasy && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.equipment) {
      if (Array.isArray(FANTASY_DATA.equipment)) {
        list.push(...FANTASY_DATA.equipment.filter(it => it.category === category));
      } else if (FANTASY_DATA.equipment[category]) {
        list.push(...FANTASY_DATA.equipment[category]);
      }
    }
    return list;
  }

  // Zwraca listę umiejętności podstawowych i z aktywnych modułów
  function getDefaultSkillsList() {
    let list = SW_DATA.skills.map(s => ({
      name: s.name,
      attr: s.attr,
      isCore: !!s.isCore,
      isArcane: !!s.isArcane,
      arcaneType: s.arcaneType || null,
      desc: s.desc || '',
      source: s.source || 'swep',
      die: s.isCore ? 'k4' : null
    }));

    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.skills) {
      HORROR_DATA.skills.forEach(hs => {
        if (!list.some(s => s.name.toLowerCase() === hs.name.toLowerCase())) {
          list.push({
            name: hs.name,
            attr: hs.attr,
            isCore: !!hs.isCore,
            isArcane: !!hs.isArcane,
            arcaneType: hs.arcaneType || null,
            desc: hs.desc || '',
            source: hs.source || 'horror',
            die: null
          });
        }
      });
    }
    return list;
  }

  function syncCharacterSkillsWithModules() {
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.skills) {
      HORROR_DATA.skills.forEach(hs => {
        if (!currentChar.skills.some(s => s.name.toLowerCase() === hs.name.toLowerCase())) {
          currentChar.skills.push({
            name: hs.name,
            attr: hs.attr,
            isCore: !!hs.isCore,
            isArcane: !!hs.isArcane,
            arcaneType: hs.arcaneType || null,
            desc: hs.desc || '',
            source: hs.source || 'horror',
            die: null
          });
        }
      });
    }
  }

  // Bezpieczne scalanie wczytanych umiejętności z pełnym katalogiem
  function mergeSkillsWithCatalog(existingSkills) {
    const catalog = getDefaultSkillsList();
    if (!existingSkills || existingSkills.length === 0) return catalog;

    const matchedNames = new Set();
    catalog.forEach(item => {
      const match = existingSkills.find(es => es.name && es.name.trim().toLowerCase() === item.name.toLowerCase());
      if (match) {
        item.die = match.die !== undefined ? match.die : (item.isCore ? 'k4' : null);
        if (match.attr) item.attr = match.attr;
        matchedNames.add(match.name.trim().toLowerCase());
      }
    });

    // Własne umiejętności dodane przez użytkownika
    existingSkills.forEach(es => {
      if (es.name && !matchedNames.has(es.name.trim().toLowerCase())) {
        catalog.push({
          name: es.name,
          attr: es.attr || 'spryt',
          isCore: !!es.isCore,
          isCustom: true,
          desc: es.desc || 'Własna umiejętność',
          die: es.die || 'k4'
        });
      }
    });

    return catalog;
  }

  // Domyślny pusty szablon postaci
  function createDefaultCharacter() {
    return {
      id: 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: 'Nowy Bohater',
      concept: 'Awanturnik',
      gender: '',
      appearance: '',
      raceId: 'czlowiek',
      raceName: 'Człowiek',
      activeModules: { swep: true, horror: true, fantasy: true },
      rank: 'Nowicjusz',
      advancesCount: 0,
      advancesList: [],
      attributes: {
        zrecznosc: 'k4',
        spryt: 'k4',
        duch: 'k4',
        sila: 'k4',
        wigor: 'k4'
      },
      skills: getDefaultSkillsList(),
      hindrances: [],
      hindranceSpend: {
        attr: 0,
        edge: 0,
        skill: 0,
        funds: 0
      },
      edges: [],
      weapons: [],
      armorItems: [],
      gear: [],
      powers: [],
      funds: 500,
      powerPoints: 10,
      wounds: { 1: false, 2: false, 3: false, ko: false },
      fatigue: { 1: false, 2: false },
      sanityWounds: { 1: false, 2: false, 3: false, ko: false },
      sanityNotes: '',
      ammoUsed: [],
      notes: '',
      dateModified: new Date().toISOString()
    };
  }

  // --- STAN APLIKACJI ---
  let currentChar = createDefaultCharacter();
  let currentWizardStep = 1;
  let isSheetInlineEdit = false;
  let activeEquipCategory = 'weapons_melee';
  let currentSkillFilterCategory = 'all';
  let currentSkillFilterText = '';

  // ==========================================================================
  // KALKULACJE I WALIDACJA REGUŁ SWADE
  // ==========================================================================


  function getBaseAttributeForRace(attrKey, raceId) {
    const race = getRaceConfig(raceId);
    if (race.attribute_bonuses && race.attribute_bonuses[attrKey]) {
      return race.attribute_bonuses[attrKey];
    }
    return 'k4';
  }

  // Wyliczanie kosztu punktów Cech (Atrybutów)
  function calcAttributePoints() {
    let spent = 0;
    for (const attr of SW_DATA.attributes) {
      const currentDie = currentChar.attributes[attr.id] || 'k4';
      const baseDie = getBaseAttributeForRace(attr.id, currentChar.raceId);
      const currentIdx = getDieIndex(currentDie);
      const baseIdx = getDieIndex(baseDie);
      if (currentIdx > baseIdx) {
        spent += (currentIdx - baseIdx);
      }
    }

    let bonusFromAdvances = 0;
    if (currentChar.advancesList) {
      currentChar.advancesList.forEach(a => {
        if (a && a.type === 'attr') bonusFromAdvances += 1;
      });
    }

    let baseAttrPts = SW_DATA.rules.attributePoints;
    const dzieciakHind = (currentChar.hindrances || []).find(h => h.name.trim().toLowerCase() === 'dzieciak');
    if (dzieciakHind) {
      baseAttrPts = (dzieciakHind.severity === 'Poważna') ? 3 : 4;
    }

    const bonusFromHindrances = currentChar.hindranceSpend.attr || 0;
    const totalAllowed = baseAttrPts + bonusFromHindrances + bonusFromAdvances;
    return {
      spent: spent,
      total: totalAllowed,
      remaining: totalAllowed - spent
    };
  }

  // Wyliczanie kosztu punktów Umiejętności
  function calcSkillPoints() {
    let spent = 0;

    currentChar.skills.forEach(skill => {
      if (!skill.die) return; // Niewykupione umiejętności nie kosztują punktów
      const currentDie = skill.die;
      const currentIdx = getDieIndex(currentDie);

      // Startowy poziom kości dla umiejętności podstawowych to k4 (indeks 0).
      // Dla niepodstawowych to brak (indeks -1).
      const startIdx = skill.isCore ? 0 : -1;

      if (currentIdx > startIdx) {
        const linkedAttrDie = currentChar.attributes[skill.attr] || 'k4';
        const linkedAttrIdx = getDieIndex(linkedAttrDie);

        for (let i = startIdx + 1; i <= currentIdx; i++) {
          if (i <= linkedAttrIdx) {
            spent += 1; // 1 pkt za stopień <= atrybut
          } else {
            spent += 2; // 2 pkt za stopień > atrybut
          }
        }
      }
    });

    let bonusFromAdvances = 0;
    if (currentChar.advancesList) {
      currentChar.advancesList.forEach(a => {
        if (a && a.type === 'skills') {
          bonusFromAdvances += 2;
        }
      });
    }

    let baseSkillPts = SW_DATA.rules.skillPoints;
    if ((currentChar.hindrances || []).some(h => h.name.trim().toLowerCase() === 'dzieciak')) {
      baseSkillPts = 10;
    }
    if ((currentChar.hindrances || []).some(h => h.name.trim().toLowerCase() === 'ramol')) {
      baseSkillPts += 5;
    }

    const bonusFromHindrances = currentChar.hindranceSpend.skill || 0;
    const totalAllowed = baseSkillPts + bonusFromHindrances + bonusFromAdvances;
    return {
      spent: spent,
      total: totalAllowed,
      remaining: totalAllowed - spent
    };
  }

  // Wylicza koszt punktowy konkretnej umiejętności
  function getSkillPointsSpent(skill) {
    if (!skill.die) return 0;
    const currentIdx = getDieIndex(skill.die);
    const startIdx = skill.isCore ? 0 : -1;
    if (currentIdx <= startIdx) return 0;

    let cost = 0;
    const linkedAttrDie = currentChar.attributes[skill.attr] || 'k4';
    const linkedAttrIdx = getDieIndex(linkedAttrDie);

    for (let i = startIdx + 1; i <= currentIdx; i++) {
      if (i <= linkedAttrIdx) {
        cost += 1;
      } else {
        cost += 2;
      }
    }
    return cost;
  }

  // Wyliczanie punktów z Zawad
  function calcHindrancePoints() {
    let rawEarned = 0;
    (currentChar.hindrances || []).forEach(h => {
      if (typeof h.points === 'number' && !isNaN(h.points)) {
        rawEarned += h.points;
      } else {
        const sev = (h.severity || h.type || '').toLowerCase();
        if (sev === 'poważna' || sev === 'większa') rawEarned += 2;
        else rawEarned += 1;
      }
    });

    const earned = Math.min(rawEarned, SW_DATA.rules.maxHindrancePoints);

    const spend = currentChar.hindranceSpend || { attr: 0, edge: 0, skill: 0, funds: 0 };
    const spent = (spend.attr * 2) + (spend.edge * 2) + (spend.skill * 1) + (spend.funds * 1);

    return {
      earned: earned,
      rawEarned: rawEarned,
      spent: spent,
      remaining: earned - spent
    };
  }

  // Automatyczna redukcja wydanych punktów z Zawad, gdy usunięto lub zmniejszono Zawadę
  function clampHindranceSpend() {
    let pts = calcHindrancePoints();
    const spend = currentChar.hindranceSpend;
    let safety = 10;
    while (pts.remaining < 0 && safety > 0) {
      safety--;
      if (pts.remaining === -1) {
        if (spend.funds > 0) spend.funds--;
        else if (spend.skill > 0) spend.skill--;
        else if (spend.edge > 0) spend.edge--;
        else if (spend.attr > 0) spend.attr--;
        else break;
      } else {
        if (spend.edge > 0) spend.edge--;
        else if (spend.attr > 0) spend.attr--;
        else if (spend.funds > 0) spend.funds--;
        else if (spend.skill > 0) spend.skill--;
        else break;
      }
      pts = calcHindrancePoints();
    }
  }

  // Wyliczanie dostępnych darmowych Przewag
  function calcFreeEdges() {
    let allowed = 0;
    const race = getRaceConfig(currentChar.raceId);
    if (race.free_edges) allowed += race.free_edges;

    allowed += (currentChar.hindranceSpend.edge || 0);

    // Zawada Ślepiec zapewnia 1 dodatkową darmową Przewagę (SWEP str. 27)
    if ((currentChar.hindrances || []).some(h => h.name.trim().toLowerCase() === 'ślepiec')) {
      allowed += 1;
    }

    if (currentChar.advancesList) {
      currentChar.advancesList.forEach(a => {
        if (a && a.type === 'edge') allowed += 1;
      });
    }

    const chosenCount = currentChar.edges.length;
    return {
      total: allowed,
      chosen: chosenCount,
      remaining: allowed - chosenCount
    };
  }

  // Wyliczanie Funduszy
  function calcFunds() {
    let starting = SW_DATA.rules.startingFunds;
    if ((currentChar.hindrances || []).some(h => h.name.trim().toLowerCase() === 'biedak')) {
      starting = Math.floor(starting / 2);
    }

    starting += (currentChar.hindranceSpend.funds || 0) * 500;

    if (currentChar.edges.some(e => e.name.toLowerCase().includes('krezus'))) {
      starting *= 5;
    } else if (currentChar.edges.some(e => e.name.toLowerCase().includes('bogaty'))) {
      starting *= 3;
    }

    let spent = 0;
    currentChar.weapons.forEach(w => spent += (w.cost || 0));
    currentChar.armorItems.forEach(a => spent += (a.cost || 0));
    currentChar.gear.forEach(g => spent += (g.cost || 0));

    return {
      initial: starting,
      spent: spent,
      current: starting - spent
    };
  }

  // Wyliczanie Wagi i Obciążenia
  function calcLoad() {
    let totalWeight = 0;
    currentChar.weapons.forEach(w => totalWeight += (w.weight || 0));
    currentChar.armorItems.forEach(a => totalWeight += (a.weight || 0));
    currentChar.gear.forEach(g => totalWeight += (g.weight || 0));

    const strDie = currentChar.attributes.sila || 'k4';
    let strVal = DIE_VALUES[strDie] || 4;

    // Bonus Krzepki lub Krasnolud
    const isKrzepki = currentChar.edges.some(e => e.name.toLowerCase().includes('krzepki'));
    const isKrasnolud = currentChar.raceId === 'krasnolud';
    if (isKrzepki || isKrasnolud) {
      strVal += 2;
    }

    const maxLoad = strVal * 5;
    return {
      current: Math.round(totalWeight * 10) / 10,
      max: maxLoad,
      isEncumbered: totalWeight > maxLoad
    };
  }

  // Wyliczanie statystyk pochodnych
  function calcDerivedStats() {
    // 1. OBRONA (Parowanie)
    // 2 + połowa Walki + modyfikatory tarczy/przewag
    const fightingSkill = currentChar.skills.find(s => s.name.toLowerCase() === 'walka');
    let fightDieVal = 0;
    if (fightingSkill) {
      fightDieVal = DIE_VALUES[fightingSkill.die] || 0;
    }
    let baseParry = 2 + Math.floor(fightDieVal / 2);

    let shieldParryMod = 0;
    currentChar.armorItems.forEach(item => {
      if (item.parry) shieldParryMod += item.parry;
    });

    if (currentChar.edges.some(e => e.name.toLowerCase() === 'garda')) {
      baseParry += 1;
    }

    // 2. WYTRZYMAŁOŚĆ (Toughness) i ROZMIAR (Size)
    // 2 + połowa Wigoru + Pancerz + Rozmiar
    const vigorDie = currentChar.attributes.wigor || 'k4';
    const vigorVal = DIE_VALUES[vigorDie] || 4;
    let baseToughness = 2 + Math.floor(vigorVal / 2);

    let armorVal = 0;
    currentChar.armorItems.forEach(item => {
      if (item.armor && item.armor > armorVal) {
        armorVal = item.armor;
      }
    });

    const race = getRaceConfig(currentChar.raceId);
    let size = (race.size !== undefined) ? race.size : 0;
    if (race.toughness_mod) baseToughness += race.toughness_mod;
    if (race.armor_mod) armorVal += race.armor_mod;

    if (currentChar.edges.some(e => e.name.toLowerCase().includes('krzepki'))) {
      size += 1;
      baseToughness += 1;
    }

    const hinds = currentChar.hindrances || [];
    const hasGrubas = hinds.some(h => h.name.trim().toLowerCase() === 'grubas');
    const hasKonus = hinds.some(h => h.name.trim().toLowerCase() === 'konus');
    const dzieciak = hinds.find(h => h.name.trim().toLowerCase() === 'dzieciak');
    const hasRamol = hinds.some(h => h.name.trim().toLowerCase() === 'ramol');
    const powolny = hinds.find(h => h.name.trim().toLowerCase() === 'powolny');

    if (hasGrubas) {
      size += 1;
      baseToughness += 1;
    }
    if (hasKonus || (dzieciak && dzieciak.severity === 'Poważna')) {
      if (size > -1) {
        size -= 1;
        baseToughness -= 1;
      }
    }

    // 3. TEMPO (Pace)
    let pace = 6;
    let runningDie = 'k6';
    if (race.pace) pace = race.pace;
    if (race.running_die) runningDie = race.running_die;

    if (currentChar.edges.some(e => e.name.toLowerCase() === 'chyży')) {
      pace += 2;
      runningDie = 'k8';
    }

    if (hasGrubas) {
      pace -= 1;
      runningDie = 'k4';
    }
    if (powolny) {
      if (powolny.severity === 'Poważna') {
        pace -= 2;
      } else {
        pace -= 1;
      }
      runningDie = getPrevDie(runningDie) || 'k4';
    }
    if (hasRamol) {
      pace -= 1;
      runningDie = getPrevDie(runningDie) || 'k4';
    }
    pace = Math.max(1, pace);

    // 4. FUKSY (Bennies)
    let bennies = 3;
    if (currentChar.raceId === 'niziolek') bennies += 1;
    if (currentChar.edges.some(e => e.name.toLowerCase() === 'szczęściarz')) bennies += 1;
    if (currentChar.edges.some(e => e.name.toLowerCase() === 'cholerny szczęściarz')) bennies += 2;
    if (dzieciak) {
      bennies += (dzieciak.severity === 'Poważna') ? 2 : 1;
    }
    if (hinds.some(h => h.name.toLowerCase() === 'pech')) bennies -= 1;

    // 5. RANGA
    const advances = currentChar.advancesCount || 0;
    let rank = 'Nowicjusz (N)';
    if (advances >= 16) rank = 'Legenda (L)';
    else if (advances >= 12) rank = 'Bohater (H)';
    else if (advances >= 8) rank = 'Weteran (W)';
    else if (advances >= 4) rank = 'Doświadczony (D)';

    return {
      parry: baseParry + shieldParryMod,
      parryBase: baseParry,
      shieldMod: shieldParryMod,
      toughness: baseToughness + armorVal,
      toughnessBase: baseToughness,
      armor: armorVal,
      size: size,
      pace: pace,
      runningDie: runningDie,
      bennies: Math.max(1, bennies),
      rank: rank
    };
  }

  // ==========================================================================
  // AKTUALIZACJA INTERFEJSU UŻYTKOWNIKA (UI RENDERERS)
  // ==========================================================================

  function updateTrackerBadges() {
    const attr = calcAttributePoints();
    const skill = calcSkillPoints();
    const hind = calcHindrancePoints();
    const funds = calcFunds();

    const elAttr = document.getElementById('val-attr-points');
    const badgeAttr = document.getElementById('badge-attr');
    elAttr.textContent = `${attr.spent} / ${attr.total} (Zostało: ${attr.remaining})`;
    badgeAttr.className = 'tracker-badge ' + (attr.remaining === 0 ? 'valid' : (attr.remaining < 0 ? 'warning' : ''));

    const elSkill = document.getElementById('val-skill-points');
    const badgeSkill = document.getElementById('badge-skill');
    elSkill.textContent = `${skill.spent} / ${skill.total} (Zostało: ${skill.remaining})`;
    badgeSkill.className = 'tracker-badge ' + (skill.remaining === 0 ? 'valid' : (skill.remaining < 0 ? 'warning' : ''));

    const elHind = document.getElementById('val-hindrance-points');
    const badgeHind = document.getElementById('badge-hind');
    elHind.textContent = `${hind.earned} / 4 (Wydano: ${hind.spent})`;
    if (badgeHind) {
      badgeHind.className = 'tracker-badge ' + (hind.remaining === 0 && hind.earned > 0 ? 'valid' : (hind.remaining < 0 ? 'warning' : ''));
    }

    const elFunds = document.getElementById('val-funds');
    elFunds.textContent = `$${funds.current}`;

    const freeEdges = calcFreeEdges();
    const elFreeEdges = document.getElementById('val-free-edges');
    if (elFreeEdges) {
      elFreeEdges.textContent = `${freeEdges.remaining} (z ${freeEdges.total})`;
    }

    const elEquipFunds = document.getElementById('equip-funds-display');
    if (elEquipFunds) elEquipFunds.textContent = `$${funds.current}`;

    const load = calcLoad();
    const elLoad = document.getElementById('equip-weight-display');
    if (elLoad) {
      elLoad.textContent = `${load.current} / ${load.max} kg ${load.isEncumbered ? '⚠️ PRZECIĄŻENIE!' : ''}`;
      elLoad.style.color = load.isEncumbered ? '#c43202' : 'inherit';
    }
  }

  // Renderowanie wyboru rasy (Krok 1)
  function renderRacesSelection() {
    const container = document.getElementById('races-selection-grid');
    if (!container) return;

    container.innerHTML = '';
    const allRaces = getAllRaces();
    const filterMod = appState.catalogFilters.raceMod || 'all';

    const visibleRaces = allRaces.filter(race => {
      const src = race.source || 'swep';
      if (filterMod !== 'all' && src !== filterMod) return false;
      return true;
    });

    if (visibleRaces.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #888; padding: 30px; font-style: italic;">Brak ras w wybranym filtrze dodatków. Włącz dodatek w górnym pasku.</div>';
      return;
    }

    visibleRaces.forEach(race => {
      const card = document.createElement('div');
      card.className = 'race-card ' + (currentChar.raceId === race.id ? 'selected' : '');
      card.dataset.raceId = race.id;

      let traitsHtml = '';
      if (race.traits) {
        traitsHtml = '<ul class="race-traits-list">' +
          race.traits.map(t => typeof t === 'string' ? `<li>${t}</li>` : `<li><strong>${t.title}:</strong> ${t.desc}</li>`).join('') +
          '</ul>';
      }

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h3 style="margin: 0;">${race.name}</h3>
          ${getSourceBadgeHtml(race.source)}
        </div>
        <p>${race.desc}</p>
        ${traitsHtml}
      `;

      card.addEventListener('click', () => {
        setRace(race.id);
      });

      container.appendChild(card);
    });
  }

  function setRace(raceId) {
    currentChar.raceId = raceId;
    const race = getRaceConfig(raceId);
    currentChar.raceName = race.name;

    // Aplikacja minimalnych wartości cech
    SW_DATA.attributes.forEach(attr => {
      const baseDie = getBaseAttributeForRace(attr.id, raceId);
      const currentDie = currentChar.attributes[attr.id] || 'k4';
      if (getDieIndex(currentDie) < getDieIndex(baseDie)) {
        currentChar.attributes[attr.id] = baseDie;
      }
    });

    renderRacesSelection();
    renderAttributesCreator();
    renderSkillsCreator();
    updateTrackerBadges();
    renderSheet();
  }

  // Renderowanie Cech (Krok 3)
  function renderAttributesCreator() {
    const container = document.getElementById('attributes-creator-container');
    if (!container) return;

    container.innerHTML = '';
    SW_DATA.attributes.forEach(attr => {
      const row = document.createElement('div');
      row.className = 'attr-row';

      const currentDie = currentChar.attributes[attr.id] || 'k4';
      const baseDie = getBaseAttributeForRace(attr.id, currentChar.raceId);
      const baseIdx = getDieIndex(baseDie);

      let buttonsHtml = '';
      ['k4', 'k6', 'k8', 'k10', 'k12'].forEach(die => {
        const dieIdx = getDieIndex(die);
        const isSelected = (currentDie === die);
        const isDisabled = (dieIdx < baseIdx);

        buttonsHtml += `
          <button class="dice-btn ${isSelected ? 'selected' : ''}" 
                  data-attr="${attr.id}" 
                  data-die="${die}" 
                  ${isDisabled ? 'disabled' : ''}>
            ${die}
          </button>
        `;
      });

      row.innerHTML = `
        <div class="attr-info">
          <h3>${attr.name} (${attr.short})</h3>
          <p>${attr.desc}</p>
          ${baseIdx > 0 ? `<span style="font-size:0.75rem; color:#236329; font-weight:bold;">Premia rasowa: baza ${baseDie}</span>` : ''}
        </div>
        <div class="dice-selector">
          ${buttonsHtml}
        </div>
      `;

      container.appendChild(row);
    });

    container.querySelectorAll('.dice-btn:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const attrId = e.currentTarget.dataset.attr;
        const die = e.currentTarget.dataset.die;
        currentChar.attributes[attrId] = die;
        renderAttributesCreator();
        renderSkillsCreator();
        updateTrackerBadges();
        renderSheet();
      });
    });
  }

  // Renderowanie Umiejętności (Krok 4)
  function renderSkillsCreator() {
    const tbody = document.querySelector('#skills-creator-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filterText = currentSkillFilterText.trim().toLowerCase();
    const filterCat = currentSkillFilterCategory;

    // Filtrowanie umiejętności
    const filteredSkills = currentChar.skills.filter(skill => {
      // Filtr kategorii
      if (filterCat === 'core' && !skill.isCore) return false;
      if (filterCat === 'learned' && !skill.die) return false;
      if (filterCat === 'zrecznosc' && skill.attr !== 'zrecznosc') return false;
      if (filterCat === 'spryt' && skill.attr !== 'spryt') return false;
      if (filterCat === 'duch' && skill.attr !== 'duch') return false;
      if (filterCat === 'arcane' && !skill.isArcane) return false;

      // Wyszukiwanie tekstowe
      if (filterText) {
        const nameMatch = skill.name.toLowerCase().includes(filterText);
        const descMatch = (skill.desc || '').toLowerCase().includes(filterText);
        const attrMatch = (skill.attr || '').toLowerCase().includes(filterText);
        if (!nameMatch && !descMatch && !attrMatch) return false;
      }

      return true;
    });

    if (filteredSkills.length === 0) {
      const emptyTr = document.createElement('tr');
      emptyTr.innerHTML = `
        <td colspan="4" style="text-align: center; color: #888; padding: 25px; font-style: italic;">
          Brak umiejętności spełniających kryteria wyszukiwania. Zmień filtr lub wyszukiwaną frazę.
        </td>
      `;
      tbody.appendChild(emptyTr);
      return;
    }

    filteredSkills.forEach(skill => {
      const tr = document.createElement('tr');
      const linkedAttr = SW_DATA.attributes.find(a => a.id === skill.attr);
      const linkedAttrDie = currentChar.attributes[skill.attr] || 'k4';
      const attrName = linkedAttr ? linkedAttr.name : skill.attr;

      // Przyciski wyboru kości
      let diceButtons = '';
      if (!skill.isCore) {
        const isNoneSelected = !skill.die;
        diceButtons += `
          <button type="button" class="dice-btn ${isNoneSelected ? 'selected' : ''}" 
                  data-die="none" 
                  data-skill-name="${skill.name}"
                  title="Brak umiejętności (nie wykupiono)">
            Brak
          </button>
        `;
      }

      ['k4', 'k6', 'k8', 'k10', 'k12'].forEach(die => {
        const isSelected = (skill.die === die);
        diceButtons += `
          <button type="button" class="dice-btn ${isSelected ? 'selected' : ''}" 
                  data-die="${die}" 
                  data-skill-name="${skill.name}">
            ${die}
          </button>
        `;
      });

      // Usuwanie umiejętności niestandardowych (własnych)
      let customDeleteBtn = '';
      if (skill.isCustom) {
        customDeleteBtn = `
          <button type="button" class="sw-btn" data-delete-custom-skill="${skill.name}" 
                  style="padding: 2px 7px; font-size: 0.75rem; color: #c43202; margin-left: 6px;" 
                  title="Usuń tę własną umiejętność">✕</button>
        `;
      }

      // Koszt w punktach
      let costHtml = '';
      if (!skill.die) {
        costHtml = '<span style="color: #999; font-size: 0.85rem;">—</span>';
      } else if (skill.isCore && skill.die === 'k4') {
        costHtml = '<span style="color: #2e7d32; font-weight: 600; font-size: 0.82rem;">0 pkt (Darmo)</span>';
      } else {
        const pts = getSkillPointsSpent(skill);
        const isOverAttr = getDieIndex(skill.die) > getDieIndex(linkedAttrDie);
        costHtml = `
          <span style="font-weight: bold; color: ${isOverAttr ? 'var(--sw-red)' : 'var(--sw-ink)'};" 
                title="${isOverAttr ? `Kość (${skill.die}) wyższa niż cecha (${linkedAttrDie}) - stopnie powyżej cechy kosztują po 2 pkt!` : 'Koszt w normie (1 pkt za stopień)'}">
            ${pts} pkt ${isOverAttr ? '⚠️' : ''}
          </span>
        `;
      }

      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong style="font-size: 0.95rem;">${skill.name}</strong>
            ${skill.isCore ? '<span class="skill-tag-core" title="Umiejętność podstawowa - każdy bohater zaczyna z nią na k4 za darmo">Podstawowa (k4)</span>' : ''}
            ${skill.isArcane ? `<span class="skill-tag-arcane" title="Umiejętność Mocy (${skill.arcaneType || 'ZN'})">ZN: ${skill.arcaneType || 'Moc'}</span>` : ''}
            ${skill.isCustom ? '<span style="background: #eef2f7; color: #444; font-size: 0.72rem; padding: 1px 5px; border-radius: 3px;">Własna</span>' : ''}
          </div>
          ${skill.desc ? `<div style="font-size: 0.78rem; color: #666; margin-top: 3px; line-height: 1.25;">${skill.desc}</div>` : ''}
        </td>
        <td>
          <strong>${attrName}</strong> 
          <span style="font-weight: bold; color: var(--sw-red); font-size: 0.85rem; margin-left: 2px;">(${linkedAttrDie})</span>
        </td>
        <td>
          <div class="dice-selector" style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
            ${diceButtons}
          </div>
          ${customDeleteBtn}
        </td>
        <td style="text-align: center;">
          ${costHtml}
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Obsługa kliknięć przycisków kości
    tbody.querySelectorAll('.dice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skillName = e.currentTarget.dataset.skillName;
        const die = e.currentTarget.dataset.die;
        const targetSkill = currentChar.skills.find(s => s.name === skillName);
        if (!targetSkill) return;

        if (die === 'none') {
          if (!targetSkill.isCore) {
            targetSkill.die = null;
          }
        } else {
          // Jeśli kliknięto już wybraną niepodstawową kość, odznaczamy na null
          if (targetSkill.die === die && !targetSkill.isCore) {
            targetSkill.die = null;
          } else {
            targetSkill.die = die;
          }
        }

        renderSkillsCreator();
        updateTrackerBadges();
        renderSheet();
      });
    });

    // Obsługa usuwania umiejętności niestandardowych
    tbody.querySelectorAll('[data-delete-custom-skill]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sName = e.currentTarget.dataset.deleteCustomSkill;
        const idx = currentChar.skills.findIndex(s => s.name === sName);
        if (idx >= 0) {
          currentChar.skills.splice(idx, 1);
          renderSkillsCreator();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });
  }

  // Renderowanie katalogu i wybranych Zawad (Krok 2)
  function renderHindrances() {
    const catalog = document.getElementById('hindrances-catalog-list');
    const selected = document.getElementById('selected-hindrances-box');
    if (!catalog || !selected) return;

    const filterText = (document.getElementById('filter-hindrances').value || '').toLowerCase();
    const filterSevEl = document.getElementById('filter-hindrances-severity');
    const filterSev = filterSevEl ? filterSevEl.value : 'all';
    const allowExtraEl = document.getElementById('chk-allow-extra-hindrances');
    const allowExtra = allowExtraEl ? allowExtraEl.checked : false;

    const allHindrances = getAllHindrances();
    const filterMod = appState.catalogFilters.hindMod || 'all';
    const hindPts = calcHindrancePoints();
    const maxPts = SW_DATA.rules.maxHindrancePoints; // 4

    // Aktualizacja paska podsumowania punktów w Kroku 2
    const bannerEarned = document.getElementById('hind-banner-earned');
    const bannerSpent = document.getElementById('hind-banner-spent');
    const bannerRem = document.getElementById('hind-banner-remaining');
    if (bannerEarned) {
      bannerEarned.textContent = `${hindPts.earned} / ${maxPts} pkt`;
      bannerEarned.style.color = hindPts.earned === maxPts ? '#1a6e25' : 'var(--sw-ink)';
    }
    if (bannerSpent) {
      bannerSpent.textContent = `${hindPts.spent} / ${hindPts.earned} pkt`;
    }
    if (bannerRem) {
      bannerRem.textContent = `${hindPts.remaining} pkt`;
      bannerRem.style.color = hindPts.remaining > 0 ? 'var(--sw-red)' : '#1a6e25';
    }

    // Katalog
    catalog.innerHTML = '';
    const visibleHindrances = allHindrances.filter(h => {
      const srcs = h.sources || [h.source || 'swep'];
      if (filterMod !== 'all' && !srcs.includes(filterMod)) return false;

      const mode = getHindranceMode(h);
      if (filterSev !== 'all') {
        if (filterSev === 'drobna' && mode !== 'drobna' && mode !== 'dual') return false;
        if (filterSev === 'powazna' && mode !== 'powazna' && mode !== 'dual') return false;
        if (filterSev === 'dual' && mode !== 'dual') return false;
      }

      if (filterText && !h.name.toLowerCase().includes(filterText) && !h.desc.toLowerCase().includes(filterText)) {
        return false;
      }
      return true;
    });

    const countLabel = document.getElementById('hindrances-count-label');
    if (countLabel) countLabel.textContent = visibleHindrances.length;

    if (visibleHindrances.length === 0) {
      catalog.innerHTML = '<div style="text-align: center; color: #888; padding: 20px; font-style: italic;">Brak zawad w wybranym filtrze.</div>';
    }

    visibleHindrances.forEach(h => {
      const chosenObj = currentChar.hindrances.find(ch => ch.name.trim().toLowerCase() === h.name.trim().toLowerCase());
      const isChosen = !!chosenObj;
      const mode = getHindranceMode(h);
      const constraint = checkHindranceConstraints(h);

      const item = document.createElement('div');
      item.style.padding = '9px 8px';
      item.style.borderBottom = '1px solid #eee';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.gap = '10px';
      if (constraint.blocked && !isChosen) {
        item.style.opacity = '0.65';
        item.style.background = '#fafafa';
      }

      let sevBadgeHtml = '';
      if (mode === 'dual') {
        sevBadgeHtml = '<span class="hind-severity-badge hind-sev-dual">Drobna (1) / Poważna (2)</span>';
      } else if (mode === 'powazna') {
        sevBadgeHtml = '<span class="hind-severity-badge hind-sev-major">Poważna (2 pkt)</span>';
      } else {
        sevBadgeHtml = '<span class="hind-severity-badge hind-sev-minor">Drobna (1 pkt)</span>';
      }

      const sourceBadges = (h.sources || [h.source || 'swep']).map(s => getSourceBadgeHtml(s)).join(' ');

      let constraintHtml = '';
      if (constraint.blocked && !isChosen) {
        constraintHtml = `<div style="font-size: 0.76rem; color: #b91c1c; font-weight: 600; margin-top: 3px;">🔒 ${constraint.reason}</div>`;
      } else if (constraint.warning) {
        constraintHtml = `<div style="font-size: 0.76rem; color: #b45309; margin-top: 3px;">⚠️ ${constraint.warning}</div>`;
      }

      let buttonsHtml = '';
      if (isChosen) {
        buttonsHtml = `<button class="sw-btn" disabled style="white-space: nowrap; font-size: 0.78rem;">✓ Wybrano (${chosenObj.severity})</button>`;
      } else if (constraint.blocked) {
        buttonsHtml = `<button class="sw-btn" disabled title="${constraint.reason}" style="white-space: nowrap; font-size: 0.78rem;">🔒 Wykluczone</button>`;
      } else {
        const canMinorPoints = (hindPts.earned + 1 <= maxPts);
        const canMajorPoints = (hindPts.earned + 2 <= maxPts);

        const minorBtnDisabled = !canMinorPoints && !allowExtra;
        const majorBtnDisabled = !canMajorPoints && !allowExtra;

        const minorPtsToGrant = canMinorPoints ? 1 : 0;
        const majorPtsToGrant = canMajorPoints ? 2 : 0;

        const minorLabel = canMinorPoints ? '+ Drobna (1 pkt)' : '+ Drobna (0 pkt)';
        const majorLabel = canMajorPoints ? '+ Poważna (2 pkt)' : '+ Poważna (0 pkt)';

        const minorTitle = minorBtnDisabled ? 'Osiągnięto limit 4 punktów z Zawad (włącz opcję Zawad fabularnych 0 pkt powyżej)' : 'Dodaj jako Zawadę Drobną';
        const majorTitle = majorBtnDisabled ? 'Dodanie Poważnej Zawady (2 pkt) przekroczyłoby limit 4 punktów' : 'Dodaj jako Zawadę Poważną';

        buttonsHtml = '<div class="hind-btn-group">';
        if (mode === 'drobna' || mode === 'dual') {
          buttonsHtml += `
            <button class="sw-btn ${minorBtnDisabled ? '' : 'btn-primary'}" 
                    data-add-hindrance="${h.name}" 
                    data-hind-sev="Drobna" 
                    data-hind-pts="${minorPtsToGrant}"
                    title="${minorTitle}"
                    style="white-space: nowrap; font-size: 0.78rem; padding: 5px 9px;" 
                    ${minorBtnDisabled ? 'disabled' : ''}>
              ${minorLabel}
            </button>`;
        }
        if (mode === 'powazna' || mode === 'dual') {
          buttonsHtml += `
            <button class="sw-btn ${majorBtnDisabled ? '' : 'btn-primary'}" 
                    data-add-hindrance="${h.name}" 
                    data-hind-sev="Poważna" 
                    data-hind-pts="${majorPtsToGrant}"
                    title="${majorTitle}"
                    style="white-space: nowrap; font-size: 0.78rem; padding: 5px 9px;" 
                    ${majorBtnDisabled ? 'disabled' : ''}>
              ${majorLabel}
            </button>`;
        }
        buttonsHtml += '</div>';
      }

      item.innerHTML = `
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong>${h.name}</strong> 
            ${sevBadgeHtml}
            ${sourceBadges}
          </div>
          <div style="font-size: 0.8rem; color: #555; margin-top: 3px;">${h.desc}</div>
          ${constraintHtml}
        </div>
        ${buttonsHtml}
      `;

      catalog.appendChild(item);
    });

    catalog.querySelectorAll('[data-add-hindrance]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const hName = e.currentTarget.dataset.addHindrance;
        const chosenSev = e.currentTarget.dataset.hindSev || 'Drobna';
        const chosenPts = parseInt(e.currentTarget.dataset.hindPts, 10);
        const allH = getAllHindrances();
        const hObj = allH.find(x => x.name === hName);
        if (hObj && !currentChar.hindrances.some(x => x.name.trim().toLowerCase() === hName.trim().toLowerCase())) {
          const check = checkHindranceConstraints(hObj);
          if (check.blocked) {
            alert(check.reason);
            return;
          }
          currentChar.hindrances.push({
            name: hObj.name,
            severity: chosenSev,
            points: isNaN(chosenPts) ? (chosenSev === 'Poważna' ? 2 : 1) : chosenPts,
            desc: hObj.desc,
            customNote: '',
            source: hObj.source || 'swep'
          });
          renderHindrances();
          renderAttributesCreator();
          renderSkillsCreator();
          renderEdges();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });

    // Wybrane Zawady
    selected.innerHTML = '';
    if (currentChar.hindrances.length === 0) {
      selected.innerHTML = '<div style="color: #888; font-style: italic; padding: 10px;">Nie wybrano jeszcze żadnych Zawad. Możesz zdobyć maksymalnie 4 punkty (np. 1 Poważna i 2 Drobne).</div>';
    } else {
      currentChar.hindrances.forEach((h, idx) => {
        const catalogMatch = allHindrances.find(ch => ch.name.trim().toLowerCase() === h.name.trim().toLowerCase());
        const isDual = catalogMatch ? (getHindranceMode(catalogMatch) === 'dual') : false;
        const ptsNum = (typeof h.points === 'number') ? h.points : (h.severity === 'Poważna' ? 2 : 1);

        let switchSevBtnHtml = '';
        if (isDual) {
          if (h.severity === 'Drobna') {
            const canUpgradePaid = (hindPts.earned - ptsNum + 2 <= maxPts);
            if (canUpgradePaid) {
              switchSevBtnHtml = `<button class="sw-btn" data-toggle-hind-sev="${idx}" data-target-sev="Poważna" data-target-pts="2" style="font-size: 0.72rem; padding: 2px 6px;" title="Zmień stopień na Poważną (2 pkt)">⬆ Zmień na Poważną (2 pkt)</button>`;
            } else if (allowExtra) {
              switchSevBtnHtml = `<button class="sw-btn" data-toggle-hind-sev="${idx}" data-target-sev="Poważna" data-target-pts="0" style="font-size: 0.72rem; padding: 2px 6px;" title="Zmień stopień na Poważną (0 pkt - fabularna)">⬆ Zmień na Poważną (0 pkt)</button>`;
            }
          } else {
            const targetMinorPts = (ptsNum === 0 && hindPts.earned >= maxPts) ? 0 : 1;
            switchSevBtnHtml = `<button class="sw-btn" data-toggle-hind-sev="${idx}" data-target-sev="Drobna" data-target-pts="${targetMinorPts}" style="font-size: 0.72rem; padding: 2px 6px;" title="Zmień stopień na Drobną (${targetMinorPts} pkt)">⬇ Zmień na Drobną (${targetMinorPts} pkt)</button>`;
          }
        }

        const ptsLabel = ptsNum === 0 ? '0 pkt - fabularna' : `${ptsNum} pkt`;

        const item = document.createElement('div');
        item.style.padding = '8px 10px';
        item.style.background = '#fef6f6';
        item.style.border = '1px solid #f0d0d0';
        item.style.borderRadius = '4px';
        item.style.marginBottom = '8px';

        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div>
              <strong>${h.name}</strong> 
              <span style="font-size: 0.8rem; color: var(--sw-red); font-weight: 600;">(${h.severity} — ${ptsLabel})</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center;">
              ${switchSevBtnHtml}
              <button class="sw-btn" data-remove-hindrance="${idx}" style="font-size: 0.75rem; padding: 2px 6px;">✕ Usuń</button>
            </div>
          </div>
          <div style="font-size: 0.78rem; color: #555; margin-top: 3px;">${h.desc || ''}</div>
          <div style="margin-top: 5px;">
            <input type="text" class="form-control" data-hind-note="${idx}" value="${(h.customNote || '').replace(/"/g, '&quot;')}" placeholder="Szczegóły (np. czego dotyczy Fobia, Przysięga, Nawyk, Wróg...)" style="font-size: 0.78rem; padding: 3px 8px; height: auto;">
          </div>
        `;

        selected.appendChild(item);
      });

      selected.querySelectorAll('[data-toggle-hind-sev]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.toggleHindSev, 10);
          const targetSev = e.currentTarget.dataset.targetSev;
          const targetPts = parseInt(e.currentTarget.dataset.targetPts, 10);
          if (currentChar.hindrances[idx]) {
            currentChar.hindrances[idx].severity = targetSev;
            currentChar.hindrances[idx].points = targetPts;
            clampHindranceSpend();
            renderHindrances();
            renderAttributesCreator();
            renderSkillsCreator();
            renderEdges();
            updateTrackerBadges();
            renderSheet();
          }
        });
      });

      selected.querySelectorAll('[data-hind-note]').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const idx = parseInt(e.currentTarget.dataset.hindNote, 10);
          if (currentChar.hindrances[idx]) {
            currentChar.hindrances[idx].customNote = e.target.value;
            renderSheet();
          }
        });
      });

      selected.querySelectorAll('[data-remove-hindrance]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.removeHindrance, 10);
          currentChar.hindrances.splice(idx, 1);
          clampHindranceSpend();
          renderHindrances();
          renderAttributesCreator();
          renderSkillsCreator();
          renderEdges();
          updateTrackerBadges();
          renderSheet();
        });
      });
    }

    // Odświeżenie pól i blokad przycisków wymiany
    document.getElementById('spend-attr-val').textContent = currentChar.hindranceSpend.attr;
    document.getElementById('spend-edge-val').textContent = currentChar.hindranceSpend.edge;
    document.getElementById('spend-skill-val').textContent = currentChar.hindranceSpend.skill;
    document.getElementById('spend-funds-val').textContent = currentChar.hindranceSpend.funds;

    const btnAttrPlus = document.getElementById('btn-spend-attr-plus');
    const btnAttrMinus = document.getElementById('btn-spend-attr-minus');
    const btnEdgePlus = document.getElementById('btn-spend-edge-plus');
    const btnEdgeMinus = document.getElementById('btn-spend-edge-minus');
    const btnSkillPlus = document.getElementById('btn-spend-skill-plus');
    const btnSkillMinus = document.getElementById('btn-spend-skill-minus');
    const btnFundsPlus = document.getElementById('btn-spend-funds-plus');
    const btnFundsMinus = document.getElementById('btn-spend-funds-minus');

    if (btnAttrPlus) btnAttrPlus.disabled = (hindPts.remaining < 2);
    if (btnAttrMinus) btnAttrMinus.disabled = (currentChar.hindranceSpend.attr <= 0);
    if (btnEdgePlus) btnEdgePlus.disabled = (hindPts.remaining < 2);
    if (btnEdgeMinus) btnEdgeMinus.disabled = (currentChar.hindranceSpend.edge <= 0);
    if (btnSkillPlus) btnSkillPlus.disabled = (hindPts.remaining < 1);
    if (btnSkillMinus) btnSkillMinus.disabled = (currentChar.hindranceSpend.skill <= 0);
    if (btnFundsPlus) btnFundsPlus.disabled = (hindPts.remaining < 1);
    if (btnFundsMinus) btnFundsMinus.disabled = (currentChar.hindranceSpend.funds <= 0);
  }

  // Renderowanie Przewag (Krok 5)
  function renderEdges() {
    const catalog = document.getElementById('edges-catalog-list');
    const selected = document.getElementById('selected-edges-box');
    if (!catalog || !selected) return;

    const filterText = (document.getElementById('filter-edges-text').value || '').toLowerCase();
    const filterCat = document.getElementById('filter-edges-category').value;
    const filterMod = document.getElementById('filter-edges-module') ? document.getElementById('filter-edges-module').value : 'all';

    catalog.innerHTML = '';
    const allEdges = getAllEdges();

    const visibleEdges = allEdges.filter(edge => {
      const src = edge.source || 'swep';
      if (filterMod !== 'all' && src !== filterMod) return false;

      if (filterCat !== 'all') {
        const cat = (edge.category || edge.type || '').toLowerCase();
        const fc = filterCat.toLowerCase();
        if (!cat.includes(fc) && !fc.includes(cat)) return false;
      }

      if (filterText) {
        const nm = edge.name.toLowerCase().includes(filterText);
        const dc = (edge.desc || '').toLowerCase().includes(filterText);
        if (!nm && !dc) return false;
      }
      return true;
    });

    if (visibleEdges.length === 0) {
      catalog.innerHTML = '<div style="text-align: center; color: #888; padding: 20px; font-style: italic;">Brak przewag w wybranym filtrze.</div>';
    }

    visibleEdges.forEach(edge => {
      const isChosen = currentChar.edges.some(e => e.name === edge.name);
      const hindConflict = checkEdgeConflictWithHindrances(edge.name);
      const isDisabled = isChosen || hindConflict.blocked;

      const item = document.createElement('div');
      item.style.padding = '8px';
      item.style.borderBottom = '1px solid #eee';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.gap = '10px';
      if (hindConflict.blocked && !isChosen) {
        item.style.opacity = '0.65';
      }

      const conflictNote = (hindConflict.blocked && !isChosen)
        ? `<div style="font-size: 0.75rem; color: #b91c1c; font-weight: 600; margin-top: 2px;">🔒 ${hindConflict.reason}</div>`
        : '';

      item.innerHTML = `
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong>${edge.name}</strong> 
            <span style="font-size: 0.75rem; background: #eee; padding: 2px 5px; border-radius: 3px;">${edge.category || edge.type}</span>
            ${getSourceBadgeHtml(edge.source)}
          </div>
          <span style="font-size: 0.75rem; color: #888;">Wymagania: ${edge.requirements || edge.req || 'Brak'}</span>
          <div style="font-size: 0.8rem; color: #444; margin-top: 2px;">${edge.desc}</div>
          ${conflictNote}
        </div>
        <button class="sw-btn ${isDisabled ? '' : 'btn-primary'}" data-add-edge="${edge.name}" title="${hindConflict.reason || ''}" style="white-space: nowrap; font-size: 0.8rem;" ${isDisabled ? 'disabled' : ''}>
          ${isChosen ? 'Wybrano' : (hindConflict.blocked ? '🔒 Wykluczone' : '+ Dodaj')}
        </button>
      `;

      catalog.appendChild(item);
    });

    catalog.querySelectorAll('[data-add-edge]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const edgeName = e.currentTarget.dataset.addEdge;
        const allEdges = getAllEdges();
        const edgeObj = allEdges.find(x => x.name === edgeName);
        if (edgeObj && !currentChar.edges.some(x => x.name === edgeName)) {
          currentChar.edges.push(edgeObj);

          if (edgeObj.isArcaneBackground || edgeName.includes('Zdolności nadprzyrodzone') || edgeName.includes('Pochodzenie Niesamowite')) {
            ensureArcaneSkill(edgeName);
          }

          renderEdges();
          updateTrackerBadges();
          renderPowers();
          renderSheet();
        }
      });
    });

    // Wybrane
    selected.innerHTML = '';
    if (currentChar.edges.length === 0) {
      selected.innerHTML = '<div style="color: #888; font-style: italic; padding: 10px;">Nie wybrano jeszcze żadnych Przewag.</div>';
    } else {
      currentChar.edges.forEach((edge, idx) => {
        const item = document.createElement('div');
        item.style.padding = '6px 10px';
        item.style.background = '#f2f8f2';
        item.style.border = '1px solid #c2e2c2';
        item.style.borderRadius = '4px';
        item.style.marginBottom = '6px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
          <div>
            <strong>${edge.name}</strong> 
            <span style="font-size: 0.75rem; color: #1a6e25;">[${edge.category}]</span>
          </div>
          <button class="sw-btn" data-remove-edge="${idx}" style="font-size: 0.75rem; padding: 2px 6px;">✕ Usuń</button>
        `;

        selected.appendChild(item);
      });

      selected.querySelectorAll('[data-remove-edge]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.removeEdge, 10);
          currentChar.edges.splice(idx, 1);
          renderEdges();
          updateTrackerBadges();
          renderPowers();
          renderSheet();
        });
      });
    }
  }

  function ensureArcaneSkill(edgeName = '') {
    const en = (edgeName || '').toLowerCase();
    let skillName = 'Rzucanie czarów';
    let attr = 'spryt';
    let arcaneType = 'Magia';

    if (en.includes('alchemik')) {
      skillName = 'Alchemia';
      attr = 'spryt';
      arcaneType = 'Alchemia';
    } else if (en.includes('bard')) {
      skillName = 'Występowanie';
      attr = 'duch';
      arcaneType = 'Pieśń';
    } else if (en.includes('kleryk') || en.includes('kapłan') || en.includes('druid') || en.includes('szaman') || en.includes('cuda')) {
      skillName = 'Wiara';
      attr = 'duch';
      arcaneType = 'Wiara';
    } else if (en.includes('psionika') || en.includes('śledczy')) {
      skillName = 'Psionika';
      attr = 'spryt';
      arcaneType = 'Psionika';
    } else if (en.includes('majsterkowicz') || en.includes('niesamowita nauka')) {
      skillName = 'Reperowanie';
      attr = 'spryt';
      arcaneType = 'Technika';
    } else if (en.includes('skażony')) {
      skillName = 'Skupienie';
      attr = 'duch';
      arcaneType = 'Skażenie';
    } else if (en.includes('demonolog') || en.includes('okultysta')) {
      skillName = 'Okultyzm';
      attr = 'spryt';
      arcaneType = 'Okultyzm';
    }

    const existingSkill = currentChar.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (existingSkill) {
      if (!existingSkill.die) existingSkill.die = 'k4';
    } else {
      currentChar.skills.push({
        name: skillName,
        die: 'k4',
        attr: attr,
        isCore: false,
        isArcane: true,
        arcaneType: arcaneType,
        desc: `Umiejętność niesamowita dla: ${edgeName || skillName}`
      });
    }
    renderSkillsCreator();
  }

  // Renderowanie Ekwipunku (Krok 6)
  function renderEquipment() {
    const catalog = document.getElementById('equipment-catalog-list');
    const selected = document.getElementById('selected-equipment-box');
    if (!catalog || !selected) return;

    catalog.innerHTML = '';
    const items = getAllEquipment(activeEquipCategory);
    const filterMod = appState.catalogFilters.equipMod || 'all';

    const visibleItems = items.filter(it => {
      const src = it.source || 'swep';
      if (filterMod !== 'all' && src !== filterMod) return false;
      return true;
    });

    if (visibleItems.length === 0) {
      catalog.innerHTML = '<div style="text-align: center; color: #888; padding: 20px; font-style: italic;">Brak przedmiotów w wybranej kategorii i filtrze dodatków.</div>';
    }

    visibleItems.forEach(item => {
      const el = document.createElement('div');
      el.style.padding = '8px';
      el.style.borderBottom = '1px solid #eee';
      el.style.display = 'flex';
      itemInfo(el, item);
      catalog.appendChild(el);
    });

    catalog.querySelectorAll('[data-buy-item]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemName = e.currentTarget.dataset.buyItem;
        const itemObj = items.find(x => x.name === itemName);
        if (itemObj) {
          if (activeEquipCategory.startsWith('weapons')) {
            currentChar.weapons.push({ ...itemObj });
          } else if (activeEquipCategory === 'armor' || activeEquipCategory === 'shields') {
            currentChar.armorItems.push({ ...itemObj });
          } else {
            currentChar.gear.push({ ...itemObj });
          }
          renderEquipment();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });

    // Wybrany ekwipunek
    selected.innerHTML = '';
    let totalItems = 0;

    const renderCategoryItems = (label, list, typeKey) => {
      if (list.length === 0) return;
      const heading = document.createElement('div');
      heading.style.fontWeight = 'bold';
      heading.style.marginTop = '8px';
      heading.style.color = 'var(--sw-ink)';
      heading.textContent = label + ':';
      selected.appendChild(heading);

      list.forEach((it, idx) => {
        totalItems++;
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '4px 6px';
        row.style.background = '#fafafa';
        row.style.borderBottom = '1px dotted #ccc';

        row.innerHTML = `
          <span style="font-size: 0.85rem;">${it.name} (${it.weight || 0} kg, $${it.cost || 0})</span>
          <button class="sw-btn" data-remove-equip="${typeKey}:${idx}" style="font-size: 0.7rem; padding: 1px 5px;">✕</button>
        `;
        selected.appendChild(row);
      });
    };

    renderCategoryItems('Broń', currentChar.weapons, 'weapons');
    renderCategoryItems('Pancerze i tarcze', currentChar.armorItems, 'armor');
    renderCategoryItems('Ekwipunek ogólny', currentChar.gear, 'gear');

    if (totalItems === 0) {
      selected.innerHTML = '<div style="color: #888; font-style: italic; padding: 10px;">Portfel pełen, ale plecak pusty! Wybierz broń i sprzęt z katalogu.</div>';
    }

    selected.querySelectorAll('[data-remove-equip]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const [typeKey, idxStr] = e.currentTarget.dataset.removeEquip.split(':');
        const idx = parseInt(idxStr, 10);
        if (typeKey === 'weapons') currentChar.weapons.splice(idx, 1);
        if (typeKey === 'armor') currentChar.armorItems.splice(idx, 1);
        if (typeKey === 'gear') currentChar.gear.splice(idx, 1);

        renderEquipment();
        updateTrackerBadges();
        renderSheet();
      });
    });
  }

  function itemInfo(el, item) {
    let details = [];
    if (item.damage) details.push(`Obr: ${item.damage}`);
    if (item.range) details.push(`Zas: ${item.range}`);
    if (item.armor) details.push(`Panc: +${item.armor}`);
    if (item.parry) details.push(`Obrona: +${item.parry}`);
    if (item.weight) details.push(`Waga: ${item.weight} kg`);
    if (item.cost) details.push(`Cena: $${item.cost}`);

    el.innerHTML = `
      <div style="flex:1;">
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <strong>${item.name}</strong>
          ${getSourceBadgeHtml(item.source)}
        </div>
        <div style="font-size:0.8rem; color:#444;">${details.join(' | ')}</div>
        ${item.notes ? `<div style="font-size:0.75rem; color:#777;">${item.notes}</div>` : ''}
      </div>
      <button class="sw-btn btn-primary" data-buy-item="${item.name}" style="font-size: 0.8rem;">
        Kup
      </button>
    `;
  }

  // Renderowanie Mocy (Krok 7)
  function renderPowers() {
    const hasArcane = currentChar.edges.some(e => {
      const n = (e.name || '').toLowerCase();
      return n.includes('zdolności nadprzyrodzone') || 
             n.includes('pochodzenie niesamowite') || 
             n.includes('alchemik') ||
             n.includes('bard') ||
             n.includes('kleryk') ||
             n.includes('druid') ||
             n.includes('demonolog') ||
             n.includes('szaman') ||
             n.includes('czarownik') ||
             n.includes('nekromanta') ||
             n.includes('iluzjonista') ||
             n.includes('elementalista') ||
             n.includes('majsterkowicz') ||
             n.includes('wiedźma') ||
             n.includes('mag / czarodziej') ||
             n.includes('skażony') ||
             n.includes('wróżbiarz') ||
             n.includes('medium') ||
             n.includes('okultysta') ||
             n.includes('kapłan') ||
             n.includes('śledczy parapsychologiczny') ||
             n.includes('wuduista') ||
             e.isArcaneBackground;
    });

    const lockedMsg = document.getElementById('arcane-locked-message');
    const activeBox = document.getElementById('arcane-active-container');

    if (!hasArcane) {
      if (lockedMsg) lockedMsg.style.display = 'block';
      if (activeBox) activeBox.style.display = 'none';
      return;
    } else {
      if (lockedMsg) lockedMsg.style.display = 'none';
      if (activeBox) activeBox.style.display = 'block';
    }

    const catalog = document.getElementById('powers-catalog-list');
    const selected = document.getElementById('selected-powers-box');
    if (!catalog || !selected) return;

    const filterText = (document.getElementById('filter-powers-text').value || '').toLowerCase();
    const filterMod = appState.catalogFilters.powerMod || 'all';

    catalog.innerHTML = '';
    const allPowers = getAllPowers();

    const visiblePowers = allPowers.filter(p => {
      const src = p.source || 'swep';
      if (filterMod !== 'all' && src !== filterMod) return false;
      if (filterText && !p.name.toLowerCase().includes(filterText) && !p.desc.toLowerCase().includes(filterText)) return false;
      return true;
    });

    if (visiblePowers.length === 0) {
      catalog.innerHTML = '<div style="text-align: center; color: #888; padding: 20px; font-style: italic;">Brak mocy w wybranym filtrze dodatków.</div>';
    }

    visiblePowers.forEach(p => {
      const isChosen = currentChar.powers.some(x => x.name === p.name);
      const item = document.createElement('div');
      item.style.padding = '8px';
      item.style.borderBottom = '1px solid #eee';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.gap = '8px';

      item.innerHTML = `
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong>${p.name}</strong> 
            <span style="font-size: 0.75rem; background: #e0d0f5; padding: 2px 5px; border-radius: 3px;">PM: ${p.pm || p.pp}</span>
            ${getSourceBadgeHtml(p.source)}
          </div>
          <span style="font-size: 0.75rem; color: #666;">Zas: ${p.range} | Trw: ${p.duration}</span>
          <div style="font-size: 0.8rem; color: #444; margin-top: 2px;">${p.desc}</div>
        </div>
        <button class="sw-btn ${isChosen ? '' : 'btn-primary'}" data-add-power="${p.name}" style="white-space: nowrap; font-size: 0.8rem;" ${isChosen ? 'disabled' : ''}>
          ${isChosen ? 'Znasz' : '+ Poznaj'}
        </button>
      `;

      catalog.appendChild(item);
    });

    catalog.querySelectorAll('[data-add-power]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pName = e.currentTarget.dataset.addPower;
        const allPowers = getAllPowers();
        const pObj = allPowers.find(x => x.name === pName);
        if (pObj && !currentChar.powers.some(x => x.name === pName)) {
          currentChar.powers.push(pObj);
          renderPowers();
          renderSheet();
        }
      });
    });

    // Wybrane moce
    selected.innerHTML = '';
    if (currentChar.powers.length === 0) {
      selected.innerHTML = '<div style="color: #888; font-style: italic; padding: 10px;">Postać nie zna jeszcze żadnych Mocy (startowo wybierz 3 moce).</div>';
    } else {
      currentChar.powers.forEach((p, idx) => {
        const item = document.createElement('div');
        item.style.padding = '6px 10px';
        item.style.background = '#f9f2ff';
        item.style.border = '1px solid #e1c8fa';
        item.style.borderRadius = '4px';
        item.style.marginBottom = '6px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
          <div>
            <strong>${p.name}</strong> 
            <span style="font-size: 0.75rem; color: #6a1b9a;">(${p.pm} PM, Zas: ${p.range})</span>
          </div>
          <button class="sw-btn" data-remove-power="${idx}" style="font-size: 0.75rem; padding: 2px 6px;">✕ Usuń</button>
        `;

        selected.appendChild(item);
      });

      selected.querySelectorAll('[data-remove-power]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.removePower, 10);
          currentChar.powers.splice(idx, 1);
          renderPowers();
          renderSheet();
        });
      });
    }
  }

  // Renderowanie Podsumowania (Krok 8)
  function renderWizardSummary() {
    const container = document.getElementById('wizard-summary-content');
    if (!container) return;

    const stats = calcDerivedStats();
    const load = calcLoad();
    const funds = calcFunds();

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
        <div style="background: var(--sw-parchment-dark); padding: 12px; border-radius: 6px;">
          <h4 style="font-family: var(--font-heading); color: var(--sw-red); margin-bottom: 6px;">Koncepcja i Rasa</h4>
          <div><strong>Imię:</strong> ${currentChar.name || 'Bez imienia'}</div>
          <div><strong>Rasa:</strong> ${currentChar.raceName}</div>
          <div><strong>Archetyp:</strong> ${currentChar.concept || '—'}</div>
          <div><strong>Ranga:</strong> ${stats.rank}</div>
        </div>

        <div style="background: var(--sw-parchment-dark); padding: 12px; border-radius: 6px;">
          <h4 style="font-family: var(--font-heading); color: var(--sw-red); margin-bottom: 6px;">Cechy Główne (Atrybuty)</h4>
          <div>Zręczność: <strong>${currentChar.attributes.zrecznosc}</strong></div>
          <div>Spryt: <strong>${currentChar.attributes.spryt}</strong></div>
          <div>Duch: <strong>${currentChar.attributes.duch}</strong></div>
          <div>Siła: <strong>${currentChar.attributes.sila}</strong></div>
          <div>Wigor: <strong>${currentChar.attributes.wigor}</strong></div>
        </div>

        <div style="background: var(--sw-parchment-dark); padding: 12px; border-radius: 6px;">
          <h4 style="font-family: var(--font-heading); color: var(--sw-red); margin-bottom: 6px;">Statystyki Bojowe</h4>
          <div>Obrona (Parowanie): <strong style="font-size: 1.1rem; color: var(--sw-red);">${stats.parry}</strong></div>
          <div>Wytrzymałość: <strong style="font-size: 1.1rem; color: var(--sw-red);">${stats.toughness}</strong> (${stats.toughnessBase} + ${stats.armor} Panc.)</div>
          <div>Tempo: <strong>${stats.pace}</strong> (Bieg: ${stats.runningDie})</div>
          <div>Fuksy: <strong>${stats.bennies}</strong></div>
          <div>Udźwig: <strong>${load.current} / ${load.max} kg</strong></div>
          <div>Pozostała gotówka: <strong>$${funds.current}</strong></div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // RENDEROWANIE OFICJALNEGO ARKUSZA POSTACI (SWEP CHARACTER SHEET)
  // ==========================================================================

  function renderSheet() {
    const stats = calcDerivedStats();
    const load = calcLoad();

    // Synchronizacja z polami formularza Kroku 1 (gdy użytkownik wpisał tekst w Kroku 1)
    const inputNameEl = document.getElementById('char-name');
    const inputConceptEl = document.getElementById('char-concept');
    const inputGenderEl = document.getElementById('char-gender');
    const inputAppEl = document.getElementById('char-appearance');

    if (inputNameEl && inputNameEl.value.trim()) {
      currentChar.name = inputNameEl.value.trim();
    }
    if (inputConceptEl && inputConceptEl.value.trim()) {
      currentChar.concept = inputConceptEl.value.trim();
    }
    if (inputGenderEl && inputGenderEl.value.trim()) {
      currentChar.gender = inputGenderEl.value.trim();
    }
    if (inputAppEl && inputAppEl.value.trim()) {
      currentChar.appearance = inputAppEl.value.trim();
    }

    const barNameEl = document.getElementById('sheet-bar-char-name');
    if (barNameEl) barNameEl.textContent = currentChar.name || 'Nowy Bohater';

    // Metryczka (w trybie edycji prawdziwe pola input/textarea/select z zablokowaną szerokością)
    const nameEl = document.getElementById('sheet-name');
    if (nameEl) {
      if (isSheetInlineEdit) {
        nameEl.innerHTML = `<input type="text" id="sheet-inline-name-inp" class="sheet-inline-text-input no-print" value="${(currentChar.name || '').replace(/"/g, '&quot;')}" placeholder="Imię postaci...">`;
        const inp = document.getElementById('sheet-inline-name-inp');
        if (inp) {
          inp.addEventListener('input', (e) => {
            currentChar.name = e.target.value;
            document.getElementById('char-name').value = currentChar.name;
            if (barNameEl) barNameEl.textContent = currentChar.name || 'Nowy Bohater';
          });
        }
      } else {
        nameEl.textContent = currentChar.name || 'Nowy Bohater';
      }
    }

    const sheetConceptEl = document.getElementById('sheet-concept');
    if (sheetConceptEl) {
      if (isSheetInlineEdit) {
        sheetConceptEl.innerHTML = `<textarea id="sheet-inline-concept-inp" class="sheet-inline-textarea no-print" rows="2" placeholder="Koncepcja / Archetyp...">${currentChar.concept || ''}</textarea>`;
        const inp = document.getElementById('sheet-inline-concept-inp');
        if (inp) {
          inp.addEventListener('input', (e) => {
            currentChar.concept = e.target.value;
            document.getElementById('char-concept').value = currentChar.concept;
          });
        }
      } else {
        sheetConceptEl.textContent = currentChar.concept || '—';
      }
    }

    const raceContainer = document.getElementById('sheet-race');
    if (raceContainer) {
      if (isSheetInlineEdit) {
        const allRaces = getAllRaces();
        const raceOpts = allRaces.map(r => `<option value="${r.id}" ${r.id === currentChar.raceId ? 'selected' : ''}>${r.name}</option>`).join('');
        raceContainer.innerHTML = `<select id="sheet-inline-race-select" class="sheet-inline-text-input no-print" style="padding: 1px 2px;">${raceOpts}</select>`;
        const raceSel = document.getElementById('sheet-inline-race-select');
        if (raceSel) {
          raceSel.addEventListener('change', (e) => {
            const newRaceId = e.target.value;
            const rCfg = getRaceConfig(newRaceId);
            currentChar.raceId = newRaceId;
            currentChar.raceName = rCfg.name;
            renderRacesSelection();
            renderAttributesCreator();
            updateTrackerBadges();
            renderSheet();
          });
        }
      } else {
        raceContainer.textContent = currentChar.raceName || 'Człowiek';
      }
    }

    document.getElementById('sheet-rank').textContent = stats.rank;
    document.getElementById('sheet-bennies').textContent = stats.bennies;

    const curHeight = currentChar.appearance ? currentChar.appearance.split(',')[0].trim() : '';
    const curWeight = currentChar.appearance ? (currentChar.appearance.split(',')[1] || '').trim() : '';

    const heightEl = document.getElementById('sheet-height');
    const weightBioEl = document.getElementById('sheet-weight-bio');

    if (isSheetInlineEdit) {
      const updateAppFromInputs = () => {
        const hInp = document.getElementById('sheet-inline-height-inp');
        const wInp = document.getElementById('sheet-inline-weight-inp');
        const hVal = hInp ? hInp.value.trim() : '';
        const wVal = wInp ? wInp.value.trim() : '';
        currentChar.appearance = (hVal || wVal) ? `${hVal}${wVal ? ', ' + wVal : ''}` : '';
        document.getElementById('char-appearance').value = currentChar.appearance;
      };
      if (heightEl) {
        heightEl.innerHTML = `<input type="text" id="sheet-inline-height-inp" class="sheet-inline-text-input no-print" value="${curHeight.replace(/"/g, '&quot;')}" placeholder="np. 180 cm">`;
        const hInp = document.getElementById('sheet-inline-height-inp');
        if (hInp) hInp.addEventListener('input', updateAppFromInputs);
      }
      if (weightBioEl) {
        weightBioEl.innerHTML = `<input type="text" id="sheet-inline-weight-inp" class="sheet-inline-text-input no-print" value="${curWeight.replace(/"/g, '&quot;')}" placeholder="np. 80 kg">`;
        const wInp = document.getElementById('sheet-inline-weight-inp');
        if (wInp) wInp.addEventListener('input', updateAppFromInputs);
      }
    } else {
      if (heightEl) heightEl.textContent = curHeight || '—';
      if (weightBioEl) weightBioEl.textContent = curWeight || '—';
    }

    document.getElementById('sheet-size').textContent = stats.size !== undefined ? stats.size : '0';

    // Okręgi pochodnych
    document.getElementById('sheet-parry').textContent = stats.parry;
    document.getElementById('sheet-parry-mod').textContent = stats.shieldMod > 0 ? `+${stats.shieldMod} Tarcza` : '+0 Tarcza';

    document.getElementById('sheet-toughness').textContent = stats.toughness;
    document.getElementById('sheet-armor-val').textContent = `(+${stats.armor} Panc.)`;

    document.getElementById('sheet-pace').textContent = stats.pace;
    document.getElementById('sheet-running-die').textContent = `Bieg: ${stats.runningDie}`;

    // Podświetlanie kości atrybutów na karcie
    document.querySelectorAll('.sheet-attr-box .sheet-dice-track').forEach(track => {
      const attrKey = track.dataset.attr;
      const currentDie = currentChar.attributes[attrKey] || 'k4';
      track.querySelectorAll('.sheet-die-step').forEach(step => {
        const stepDie = step.dataset.die;
        if (stepDie === currentDie) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    });

    // Umiejętności na karcie
    const skillsContainer = document.getElementById('sheet-skills-render-list');
    skillsContainer.innerHTML = '';
    const learnedSkills = currentChar.skills.filter(s => !!s.die);
    learnedSkills.forEach(skill => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.alignItems = 'center';
      row.style.fontSize = '0.85rem';
      row.style.gap = '4px';

      let diceTrack = `
        <div style="display: flex; align-items: center; gap: 3px; flex-shrink: 0;">
          <div class="sheet-dice-track" data-sheet-skill="${skill.name}" style="transform: scale(0.85); transform-origin: right center;">
            <span class="sheet-die-step ${skill.die === 'k4' ? 'active' : ''}" data-die="k4">4</span>
            <span class="sheet-die-step ${skill.die === 'k6' ? 'active' : ''}" data-die="k6">6</span>
            <span class="sheet-die-step ${skill.die === 'k8' ? 'active' : ''}" data-die="k8">8</span>
            <span class="sheet-die-step ${skill.die === 'k10' ? 'active' : ''}" data-die="k10">10</span>
            <span class="sheet-die-step ${skill.die === 'k12' ? 'active' : ''}" data-die="k12">12</span>
          </div>
          ${isSheetInlineEdit && !skill.isCore ? `<button type="button" class="sheet-inline-del-btn no-print" data-sheet-del-skill="${skill.name}" title="Usuń umiejętność">✕</button>` : ''}
        </div>
      `;

      row.innerHTML = `
        <span style="font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${skill.name}</span>
        ${diceTrack}
      `;
      skillsContainer.appendChild(row);
    });

    skillsContainer.querySelectorAll('.sheet-dice-track[data-sheet-skill] .sheet-die-step').forEach(stepEl => {
      stepEl.addEventListener('click', (e) => {
        if (!isSheetInlineEdit) return;
        const track = e.currentTarget.closest('[data-sheet-skill]');
        const sName = track ? track.dataset.sheetSkill : null;
        const newDie = e.currentTarget.dataset.die;
        if (sName && newDie) {
          const skObj = currentChar.skills.find(s => s.name === sName);
          if (skObj) {
            skObj.die = newDie;
            renderSkillsCreator();
            updateTrackerBadges();
            renderSheet();
          }
        }
      });
    });

    skillsContainer.querySelectorAll('[data-sheet-del-skill]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sName = e.currentTarget.dataset.sheetDelSkill;
        const skObj = currentChar.skills.find(s => s.name === sName);
        if (skObj) {
          skObj.die = null;
          renderSkillsCreator();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });

    if (isSheetInlineEdit) {
      const unlearnedSkills = currentChar.skills.filter(s => !s.die);
      if (unlearnedSkills.length > 0) {
        const addSkillRow = document.createElement('div');
        addSkillRow.className = 'sheet-inline-add-bar no-print';
        const opts = unlearnedSkills.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
        addSkillRow.innerHTML = `
          <select id="sheet-inline-add-skill-sel" class="sheet-inline-select">${opts}</select>
          <button type="button" class="sw-btn btn-sm btn-primary" id="btn-sheet-inline-add-skill" style="padding: 3px 7px; font-size: 0.72rem; flex-shrink: 0;">+ Dodaj</button>
        `;
        skillsContainer.appendChild(addSkillRow);
        const addBtn = addSkillRow.querySelector('#btn-sheet-inline-add-skill');
        const selEl = addSkillRow.querySelector('#sheet-inline-add-skill-sel');
        if (addBtn && selEl) {
          addBtn.addEventListener('click', () => {
            const sk = currentChar.skills.find(s => s.name === selEl.value);
            if (sk) {
              sk.die = 'k4';
              renderSkillsCreator();
              updateTrackerBadges();
              renderSheet();
            }
          });
        }
      }
    } else {
      const blankSkillsCount = Math.max(0, 8 - learnedSkills.length);
      for (let i = 0; i < blankSkillsCount; i++) {
        const blankRow = document.createElement('div');
        blankRow.className = 'sheet-blank-row';
        blankRow.style.display = 'flex';
        blankRow.style.justifyContent = 'space-between';
        blankRow.style.alignItems = 'center';
        blankRow.innerHTML = `
          <span class="sheet-blank-dots">...................................</span>
          <div class="sheet-dice-track" style="transform: scale(0.85); transform-origin: right center; opacity: 0.5;">
            <span class="sheet-die-step">4</span>
            <span class="sheet-die-step">6</span>
            <span class="sheet-die-step">8</span>
            <span class="sheet-die-step">10</span>
            <span class="sheet-die-step">12</span>
          </div>
        `;
        skillsContainer.appendChild(blankRow);
      }
    }

    // Sprzęt na karcie
    const gearList = document.getElementById('sheet-gear-rendered-list');
    gearList.innerHTML = '';
    const gearEntries = [
      ...currentChar.weapons.map((w, idx) => ({ label: `${w.name} (${w.weight || 0} kg)`, type: 'weapons', idx })),
      ...currentChar.armorItems.map((a, idx) => ({ label: `${a.name} (${a.weight || 0} kg)`, type: 'armorItems', idx })),
      ...currentChar.gear.map((g, idx) => ({ label: `${g.name} (${g.weight || 0} kg)`, type: 'gear', idx }))
    ];

    gearEntries.forEach(entry => {
      const li = document.createElement('li');
      if (isSheetInlineEdit) {
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.gap = '4px';
        li.style.marginBottom = '3px';
        li.innerHTML = `<span style="overflow:hidden; text-overflow:ellipsis;">• ${entry.label}</span> <button type="button" class="sheet-inline-del-btn no-print" data-sheet-del-equip-type="${entry.type}" data-sheet-del-equip-idx="${entry.idx}" title="Usuń przedmiot">✕</button>`;
      } else {
        li.textContent = entry.label;
      }
      gearList.appendChild(li);
    });

    gearList.querySelectorAll('[data-sheet-del-equip-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const t = e.currentTarget.dataset.sheetDelEquipType;
        const i = parseInt(e.currentTarget.dataset.sheetDelEquipIdx, 10);
        if (currentChar[t] && currentChar[t][i] !== undefined) {
          currentChar[t].splice(i, 1);
          renderEquipment();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });

    if (isSheetInlineEdit) {
      const addGearLi = document.createElement('li');
      addGearLi.className = 'sheet-inline-add-bar no-print';
      addGearLi.style.listStyle = 'none';
      addGearLi.innerHTML = `
        <input type="text" id="sheet-inline-gear-name" class="sheet-inline-select" placeholder="Przedmiot...">
        <input type="number" id="sheet-inline-gear-weight" class="sheet-inline-select" placeholder="kg" value="1" style="flex: 0 0 42px; width: 42px;">
        <button type="button" class="sw-btn btn-sm btn-primary" id="btn-sheet-inline-add-gear" style="padding: 3px 7px; font-size: 0.72rem; flex-shrink: 0;">+ Dodaj</button>
      `;
      gearList.appendChild(addGearLi);
      const btnAddGear = addGearLi.querySelector('#btn-sheet-inline-add-gear');
      if (btnAddGear) {
        btnAddGear.addEventListener('click', () => {
          const nm = addGearLi.querySelector('#sheet-inline-gear-name').value.trim();
          const wg = parseFloat(addGearLi.querySelector('#sheet-inline-gear-weight').value) || 0;
          if (nm) {
            currentChar.gear.push({ name: nm, weight: wg, cost: 0, notes: '' });
            renderEquipment();
            updateTrackerBadges();
            renderSheet();
          }
        });
      }
    } else {
      const blankGearCount = Math.max(0, 6 - gearEntries.length);
      for (let i = 0; i < blankGearCount; i++) {
        const li = document.createElement('li');
        li.style.color = '#bbb';
        li.textContent = '................................................';
        gearList.appendChild(li);
      }
    }

    document.getElementById('sheet-current-load').textContent = `${load.current} kg`;
    document.getElementById('sheet-max-load').textContent = `${load.max} kg`;

    // Zawady na karcie
    const hindrancesContainer = document.getElementById('sheet-hindrances-rendered-list');
    hindrancesContainer.innerHTML = '';
    if (currentChar.hindrances.length === 0 && !isSheetInlineEdit) {
      hindrancesContainer.innerHTML = `
        <div style="color: #666;"><em>Brak Zawad</em></div>
        <div style="color: #bbb;">....................................................................</div>
        <div style="color: #bbb;">....................................................................</div>
      `;
    } else {
      currentChar.hindrances.forEach((h, idx) => {
        const item = document.createElement('div');
        const noteStr = h.customNote ? ` <em>[${h.customNote}]</em>` : '';
        if (isSheetInlineEdit) {
          item.style.display = 'flex';
          item.style.justifyContent = 'space-between';
          item.style.alignItems = 'flex-start';
          item.style.gap = '6px';
          item.innerHTML = `
            <div style="min-width:0; flex:1;"><strong>${h.name}</strong>${noteStr} (${h.severity}) - <span style="color:#555;">${h.desc}</span></div>
            <button type="button" class="sheet-inline-del-btn no-print" data-sheet-del-hind="${idx}" title="Usuń Zawadę">✕</button>
          `;
        } else {
          item.innerHTML = `<strong>${h.name}</strong>${noteStr} (${h.severity}) - <span style="color:#555;">${h.desc}</span>`;
        }
        hindrancesContainer.appendChild(item);
      });

      hindrancesContainer.querySelectorAll('[data-sheet-del-hind]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.sheetDelHind, 10);
          currentChar.hindrances.splice(idx, 1);
          clampHindranceSpend();
          renderHindrances();
          updateTrackerBadges();
          renderSheet();
        });
      });

      if (isSheetInlineEdit) {
        const allH = getAllHindrances().filter(h => !currentChar.hindrances.some(ch => ch.name === h.name));
        if (allH.length > 0) {
          const addHindRow = document.createElement('div');
          addHindRow.className = 'sheet-inline-add-bar no-print';
          const opts = allH.map(h => `<option value="${h.name}">${h.name} (${h.severity || h.type})</option>`).join('');
          addHindRow.innerHTML = `
            <select id="sheet-inline-add-hind-sel" class="sheet-inline-select">${opts}</select>
            <button type="button" class="sw-btn btn-sm btn-primary" id="btn-sheet-inline-add-hind" style="padding: 3px 7px; font-size: 0.72rem; flex-shrink: 0;">+ Dodaj</button>
          `;
          hindrancesContainer.appendChild(addHindRow);
          const btnAddH = addHindRow.querySelector('#btn-sheet-inline-add-hind');
          const selH = addHindRow.querySelector('#sheet-inline-add-hind-sel');
          if (btnAddH && selH) {
            btnAddH.addEventListener('click', () => {
              const hObj = allH.find(x => x.name === selH.value);
              if (hObj) {
                const mode = getHindranceMode(hObj);
                const sev = mode === 'powazna' ? 'Poważna' : 'Drobna';
                const pts = sev === 'Poważna' ? 2 : 1;
                currentChar.hindrances.push({
                  name: hObj.name,
                  severity: sev,
                  points: pts,
                  desc: hObj.desc,
                  customNote: '',
                  source: hObj.source || 'swep'
                });
                renderHindrances();
                updateTrackerBadges();
                renderSheet();
              }
            });
          }
        }
      }
    }

    // Przewagi na karcie
    const edgesContainer = document.getElementById('sheet-edges-rendered-list');
    edgesContainer.innerHTML = '';
    if (currentChar.edges.length === 0 && !isSheetInlineEdit) {
      edgesContainer.innerHTML = `
        <div style="color: #666;"><em>Brak Przewag</em></div>
        <div style="color: #bbb;">N: ................................................................</div>
        <div style="color: #bbb;">N: ................................................................</div>
      `;
    } else {
      currentChar.edges.forEach((e, idx) => {
        const item = document.createElement('div');
        if (isSheetInlineEdit) {
          item.style.display = 'flex';
          item.style.justifyContent = 'space-between';
          item.style.alignItems = 'flex-start';
          item.style.gap = '6px';
          item.innerHTML = `
            <div style="min-width:0; flex:1;"><strong>${e.name}</strong> - <span style="color:#555;">${e.desc}</span></div>
            <button type="button" class="sheet-inline-del-btn no-print" data-sheet-del-edge="${idx}" title="Usuń Przewagę">✕</button>
          `;
        } else {
          item.innerHTML = `<strong>${e.name}</strong> - <span style="color:#555;">${e.desc}</span>`;
        }
        edgesContainer.appendChild(item);
      });

      edgesContainer.querySelectorAll('[data-sheet-del-edge]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.sheetDelEdge, 10);
          currentChar.edges.splice(idx, 1);
          renderEdges();
          updateTrackerBadges();
          renderSheet();
        });
      });

      if (isSheetInlineEdit) {
        const allE = getAllEdges().filter(e => !currentChar.edges.some(ce => ce.name === e.name));
        if (allE.length > 0) {
          const addEdgeRow = document.createElement('div');
          addEdgeRow.className = 'sheet-inline-add-bar no-print';
          const opts = allE.map(e => `<option value="${e.name}">${e.name} [${e.category || e.type}]</option>`).join('');
          addEdgeRow.innerHTML = `
            <select id="sheet-inline-add-edge-sel" class="sheet-inline-select">${opts}</select>
            <button type="button" class="sw-btn btn-sm btn-primary" id="btn-sheet-inline-add-edge" style="padding: 3px 7px; font-size: 0.72rem; flex-shrink: 0;">+ Dodaj</button>
          `;
          edgesContainer.appendChild(addEdgeRow);
          const btnAddE = addEdgeRow.querySelector('#btn-sheet-inline-add-edge');
          const selE = addEdgeRow.querySelector('#sheet-inline-add-edge-sel');
          if (btnAddE && selE) {
            btnAddE.addEventListener('click', () => {
              const eObj = allE.find(x => x.name === selE.value);
              if (eObj) {
                currentChar.edges.push(eObj);
                if (eObj.isArcaneBackground || eObj.name.includes('Zdolności nadprzyrodzone') || eObj.name.includes('Pochodzenie Niesamowite')) {
                  ensureArcaneSkill(eObj.name);
                }
                renderEdges();
                renderPowers();
                updateTrackerBadges();
                renderSheet();
              }
            });
          }
        }
      }
    }

    // Tabela broni na karcie
    const weaponsTbody = document.getElementById('sheet-weapons-tbody');
    weaponsTbody.innerHTML = '';
    const weaponsList = currentChar.weapons || [];
    weaponsList.forEach((w, idx) => {
      const tr = document.createElement('tr');
      const delBtn = isSheetInlineEdit ? `<button type="button" class="sheet-inline-del-btn no-print" data-sheet-del-weapon="${idx}" title="Usuń broń" style="margin-left: 6px;">✕</button>` : '';
      tr.innerHTML = `
        <td><strong>${w.name}</strong></td>
        <td>${w.range || 'Wręcz'}</td>
        <td><strong>${w.damage || 'Si'}</strong></td>
        <td>${w.ap !== undefined ? w.ap : '—'}</td>
        <td>${w.rof || 1}</td>
        <td>${w.weight || 1} kg</td>
        <td><div style="display:flex; justify-content:space-between; align-items:center;"><span>${w.notes || '—'}</span>${delBtn}</div></td>
      `;
      weaponsTbody.appendChild(tr);
    });

    weaponsTbody.querySelectorAll('[data-sheet-del-weapon]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.sheetDelWeapon, 10);
        currentChar.weapons.splice(idx, 1);
        renderEquipment();
        updateTrackerBadges();
        renderSheet();
      });
    });

    if (isSheetInlineEdit) {
      const allWeaps = [...getAllEquipment('weapons_melee'), ...getAllEquipment('weapons_ranged')];
      const addWTr = document.createElement('tr');
      addWTr.className = 'no-print';
      const wOpts = allWeaps.map((w, i) => `<option value="${i}">${w.name} (${w.damage || 'Si'}, Zas: ${w.range || 'Wręcz'})</option>`).join('');
      addWTr.innerHTML = `
        <td colspan="7">
          <div class="sheet-inline-add-bar" style="margin-top:0; padding-top:2px; border-top:none;">
            <select id="sheet-inline-add-weap-sel" class="sheet-inline-select">${wOpts}</select>
            <button type="button" class="sw-btn btn-sm btn-primary" id="btn-sheet-inline-add-weap" style="padding: 3px 8px; font-size: 0.75rem; flex-shrink: 0;">+ Dodaj broń</button>
          </div>
        </td>
      `;
      weaponsTbody.appendChild(addWTr);
      const btnAddW = addWTr.querySelector('#btn-sheet-inline-add-weap');
      const selW = addWTr.querySelector('#sheet-inline-add-weap-sel');
      if (btnAddW && selW) {
        btnAddW.addEventListener('click', () => {
          const wObj = allWeaps[parseInt(selW.value, 10)];
          if (wObj) {
            currentChar.weapons.push({ ...wObj });
            renderEquipment();
            updateTrackerBadges();
            renderSheet();
          }
        });
      }
    } else {
      const blankWeaponsCount = Math.max(0, 3 - weaponsList.length);
      for (let i = 0; i < blankWeaponsCount; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="color:#aaa;">...................</td>
          <td style="color:#aaa;">.......</td>
          <td style="color:#aaa;">.......</td>
          <td style="color:#aaa;">....</td>
          <td style="color:#aaa;">....</td>
          <td style="color:#aaa;">....</td>
          <td style="color:#aaa;">...................</td>
        `;
        weaponsTbody.appendChild(tr);
      }
    }

    // Tabela mocy na karcie
    const powersContainer = document.getElementById('sheet-powers-container');
    const powersTbody = document.getElementById('sheet-powers-tbody');
    if (currentChar.powers.length === 0 && (!isSheetInlineEdit || !hasArcaneBackground())) {
      powersContainer.style.display = 'none';
    } else {
      powersContainer.style.display = 'block';
      powersTbody.innerHTML = '';
      currentChar.powers.forEach((p, idx) => {
        const tr = document.createElement('tr');
        const delBtn = isSheetInlineEdit ? `<button type="button" class="sheet-inline-del-btn no-print" data-sheet-del-power="${idx}" title="Usuń Moc" style="margin-left: 6px;">✕</button>` : '';
        tr.innerHTML = `
          <td><strong>${p.name}</strong></td>
          <td>${p.pm || p.pp || 1}</td>
          <td>${p.range || 'Sp'}</td>
          <td>${p.duration || '5 rund'}</td>
          <td><div style="display:flex; justify-content:space-between; align-items:center;"><span>${p.desc}</span>${delBtn}</div></td>
        `;
        powersTbody.appendChild(tr);
      });

      powersTbody.querySelectorAll('[data-sheet-del-power]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.sheetDelPower, 10);
          currentChar.powers.splice(idx, 1);
          renderPowers();
          renderSheet();
        });
      });

      if (isSheetInlineEdit) {
        const allP = getAllPowers().filter(p => !currentChar.powers.some(cp => cp.name === p.name));
        if (allP.length > 0) {
          const addPTr = document.createElement('tr');
          addPTr.className = 'no-print';
          const pOpts = allP.map(p => `<option value="${p.name}">${p.name} (PM: ${p.pm || p.pp || 1})</option>`).join('');
          addPTr.innerHTML = `
            <td colspan="5">
              <div class="sheet-inline-add-bar" style="margin-top:0; padding-top:2px; border-top:none;">
                <select id="sheet-inline-add-power-sel" class="sheet-inline-select">${pOpts}</select>
                <button type="button" class="sw-btn btn-sm btn-primary" id="btn-sheet-inline-add-power" style="padding: 3px 8px; font-size: 0.75rem; flex-shrink: 0;">+ Dodaj moc</button>
              </div>
            </td>
          `;
          powersTbody.appendChild(addPTr);
          const btnAddP = addPTr.querySelector('#btn-sheet-inline-add-power');
          const selP = addPTr.querySelector('#sheet-inline-add-power-sel');
          if (btnAddP && selP) {
            btnAddP.addEventListener('click', () => {
              const pObj = allP.find(x => x.name === selP.value);
              if (pObj) {
                currentChar.powers.push({ ...pObj });
                renderPowers();
                renderSheet();
              }
            });
          }
        }
      }
    }

    // Notatki na karcie (Strona 2)
    const notesArea = document.getElementById('char-notes-area');
    const notesPrintArea = document.getElementById('notes-print-display');
    if (notesArea) {
      notesArea.value = currentChar.notes || '';
    }
    if (notesPrintArea) {
      notesPrintArea.textContent = currentChar.notes || '';
    }

    // Aktualizacja stanu Ran, Zmęczenia i Poczytalności na karcie
    document.querySelectorAll('.wound-box[data-wound]').forEach(box => {
      const wKey = box.dataset.wound;
      if (currentChar.wounds && currentChar.wounds[wKey]) {
        box.classList.add('checked');
      } else {
        box.classList.remove('checked');
      }
    });

    document.querySelectorAll('.wound-box[data-fatigue]').forEach(box => {
      const fKey = box.dataset.fatigue;
      if (currentChar.fatigue && currentChar.fatigue[fKey]) {
        box.classList.add('checked');
      } else {
        box.classList.remove('checked');
      }
    });

    document.querySelectorAll('.wound-box[data-sanity]').forEach(box => {
      const sKey = box.dataset.sanity;
      if (currentChar.sanityWounds && currentChar.sanityWounds[sKey]) {
        box.classList.add('checked');
      } else {
        box.classList.remove('checked');
      }
    });

    const sanityNotesInput = document.getElementById('char-sanity-notes');
    if (sanityNotesInput) {
      sanityNotesInput.value = currentChar.sanityNotes || '';
    }

    // Historia Awansów na karcie
    const advContainer = document.getElementById('sheet-advances-rendered-list');
    const advCountDisplay = document.getElementById('sheet-advances-count-display');
    const btnUndoAdv = document.getElementById('btn-undo-last-advance');

    if (advCountDisplay) {
      advCountDisplay.textContent = currentChar.advancesCount || 0;
    }

    if (btnUndoAdv) {
      btnUndoAdv.style.display = (currentChar.advancesList && currentChar.advancesList.length > 0) ? 'inline-flex' : 'none';
    }

    if (advContainer) {
      advContainer.innerHTML = '';
      if (!currentChar.advancesList || currentChar.advancesList.length === 0) {
        advContainer.innerHTML = '<div style="color: #888; font-style: italic; font-size: 0.75rem;">Brak wykupionych rozwinięć (Postać w randze Nowicjusz).</div>';
      } else {
        currentChar.advancesList.forEach((adv, idx) => {
          const item = document.createElement('div');
          item.className = 'advance-log-item';
          const rCode = adv.rankCode || (adv.rank ? adv.rank.substring(0, 1) : 'N');
          const num = adv.number || (idx + 1);
          const tag = adv.tag || (adv.type === 'edge' ? 'Przewaga' : (adv.type === 'attr' ? 'Atrybut' : (adv.type === 'skills' ? 'Umiejętności' : 'Zawada')));

          item.innerHTML = `
            <div>
              <span class="advance-log-tag">[#${num} ${rCode}]</span>
              <strong>${adv.summary || adv.desc || 'Awans'}</strong>
            </div>
            <span style="font-size: 0.7rem; color: #888;">${tag}</span>
          `;
          advContainer.appendChild(item);
        });
      }
    }

    renderAdvancesDots();
    renderAmmoTrack();
  }

  // Pasek postępu awansów (kamienie milowe: N, D, W, H, L)
  function renderAdvancesDots() {
    const container = document.getElementById('advances-dots-container');
    if (!container) return;

    container.innerHTML = '';
    const milestones = [
      { code: 'N1', num: 1, rank: 'Nowicjusz' },
      { code: 'N2', num: 2, rank: 'Nowicjusz' },
      { code: 'N3', num: 3, rank: 'Nowicjusz' },
      { code: 'D1', num: 4, rank: 'Doświadczony' },
      { code: 'D2', num: 5, rank: 'Doświadczony' },
      { code: 'D3', num: 6, rank: 'Doświadczony' },
      { code: 'D4', num: 7, rank: 'Doświadczony' },
      { code: 'W1', num: 8, rank: 'Weteran' },
      { code: 'W2', num: 9, rank: 'Weteran' },
      { code: 'W3', num: 10, rank: 'Weteran' },
      { code: 'W4', num: 11, rank: 'Weteran' },
      { code: 'H1', num: 12, rank: 'Bohater' },
      { code: 'H2', num: 13, rank: 'Bohater' },
      { code: 'H3', num: 14, rank: 'Bohater' },
      { code: 'H4', num: 15, rank: 'Bohater' },
      { code: 'L1', num: 16, rank: 'Legenda' },
      { code: 'L2', num: 17, rank: 'Legenda' },
      { code: 'L3', num: 18, rank: 'Legenda' },
      { code: 'L4', num: 19, rank: 'Legenda' }
    ];

    const currentCount = currentChar.advancesCount || 0;

    milestones.forEach((m, idx) => {
      const dot = document.createElement('div');
      const isAchieved = (idx < currentCount);
      const isNext = (idx === currentCount);
      dot.className = 'advance-dot ' + (isAchieved ? 'active' : (isNext ? 'next-target' : ''));
      dot.textContent = m.code;

      const advRecord = (currentChar.advancesList && currentChar.advancesList[idx]) ? currentChar.advancesList[idx] : null;
      if (advRecord) {
        dot.title = `Awans #${m.num} (${m.rank}): ${advRecord.summary || advRecord.desc || ''}`;
      } else if (isNext) {
        dot.title = `Kliknij, aby wybrać Awans #${m.num} (${m.rank})`;
      } else {
        dot.title = `Awans #${m.num} (${m.rank})`;
      }

      dot.addEventListener('click', () => {
        if (idx === currentCount) {
          openAdvancementModal();
        } else if (idx < currentCount) {
          const rec = (currentChar.advancesList && currentChar.advancesList[idx]) ? currentChar.advancesList[idx] : null;
          const msg = rec ? `Awans #${m.num} (${m.code}):\n${rec.summary || rec.desc}` : `Awans #${m.num} (${m.code})`;
          alert(msg);
        } else {
          openAdvancementModal();
        }
      });

      container.appendChild(dot);
    });
  }

  // Licznik amunicji (1-30)
  function renderAmmoTrack() {
    const track = document.getElementById('sheet-ammo-track');
    if (!track) return;

    track.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
      const node = document.createElement('div');
      const isSpecial = (i % 5 === 0);
      const isUsed = currentChar.ammoUsed && currentChar.ammoUsed.includes(i);

      node.className = `ammo-node ${isSpecial ? 'special' : ''} ${isUsed ? 'used' : ''}`;
      node.textContent = i;

      node.addEventListener('click', () => {
        if (!currentChar.ammoUsed) currentChar.ammoUsed = [];
        const foundIdx = currentChar.ammoUsed.indexOf(i);
        if (foundIdx >= 0) {
          currentChar.ammoUsed.splice(foundIdx, 1);
        } else {
          currentChar.ammoUsed.push(i);
        }
        renderAmmoTrack();
      });

      track.appendChild(node);
    }
  }

  // Renderowanie Archetypów
  function renderArchetypes() {
    const container = document.getElementById('archetypes-list-container');
    if (!container) return;

    container.innerHTML = '';
    SW_DATA.archetypes.forEach(arch => {
      const card = document.createElement('div');
      card.className = 'archetype-card';

      let skillsStr = arch.skills.map(s => `${s.name} ${s.die}`).join(', ');
      let edgesStr = arch.edges.map(e => e.name).join(', ');
      let hindStr = arch.hindrances.map(h => `${h.name} (${h.severity})`).join(', ');

      card.innerHTML = `
        <div>
          <h3>${arch.name}</h3>
          <div class="archetype-concept">${arch.concept} | ${arch.race}</div>
          <div class="archetype-stats-summary">
            <div><strong>Cechy:</strong> Zr ${arch.attributes.zrecznosc}, Sp ${arch.attributes.spryt}, Du ${arch.attributes.duch}, Si ${arch.attributes.sila}, Wi ${arch.attributes.wigor}</div>
            <div style="margin-top: 4px;"><strong>Umiejętności:</strong> ${skillsStr}</div>
            <div style="margin-top: 4px;"><strong>Przewagi:</strong> ${edgesStr}</div>
            <div style="margin-top: 4px;"><strong>Zawady:</strong> ${hindStr}</div>
            ${arch.powers ? `<div style="margin-top: 4px;"><strong>Moce:</strong> ${arch.powers.map(p => p.name).join(', ')}</div>` : ''}
          </div>
          <p style="font-size: 0.85rem; color: #555; font-style: italic; margin-bottom: 12px;">"${arch.notes}"</p>
        </div>
        <button class="sw-btn btn-primary" data-load-archetype="${arch.id}" style="width: 100%; justify-content: center;">
          ⚡ Załaduj tego bohatera
        </button>
      `;

      container.appendChild(card);
    });

    container.querySelectorAll('[data-load-archetype]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const archId = e.currentTarget.dataset.loadArchetype;
        const arch = SW_DATA.archetypes.find(a => a.id === archId);
        if (arch) {
          loadCharacterFromObject(JSON.parse(JSON.stringify(arch)));
          switchView('view-sheet');
        }
      });
    });
  }

  // ==========================================================================
  // ZARZĄDZANIE PLIKAMI I LOCALSTORAGE
  // ==========================================================================

  function getSavedCharactersList() {
    try {
      const data = localStorage.getItem('swade_saved_characters');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Błąd odczytu localStorage:', e);
      return [];
    }
  }

  function saveCharactersList(list) {
    try {
      localStorage.setItem('swade_saved_characters', JSON.stringify(list));
      updateSavedCount();
    } catch (e) {
      console.error('Błąd zapisu localStorage:', e);
    }
  }

  function updateSavedCount() {
    const list = getSavedCharactersList();
    const badge = document.getElementById('saved-count');
    if (badge) badge.textContent = list.length;
  }

  function saveCurrentCharacter() {
    // Odczyt aktualnych wartości z pól formularza
    currentChar.name = document.getElementById('char-name').value || currentChar.name || 'Nowy Bohater';
    currentChar.concept = document.getElementById('char-concept').value || currentChar.concept;
    const genderEl = document.getElementById('char-gender');
    if (genderEl) currentChar.gender = genderEl.value || currentChar.gender;
    currentChar.appearance = document.getElementById('char-appearance').value || currentChar.appearance;
    currentChar.notes = document.getElementById('char-notes-area').value || currentChar.notes;
    const sNotesEl = document.getElementById('char-sanity-notes');
    if (sNotesEl) currentChar.sanityNotes = sNotesEl.value;
    currentChar.dateModified = new Date().toISOString();

    const list = getSavedCharactersList();
    const existingIdx = list.findIndex(c => c.id === currentChar.id);

    if (existingIdx >= 0) {
      list[existingIdx] = currentChar;
    } else {
      list.push(currentChar);
    }

    saveCharactersList(list);
    alert(`Postać "${currentChar.name}" została pomyślnie zapisana!`);
    renderSheet();
  }

  function loadCharacterFromObject(charData) {
    if (!charData) return;

    // Bezpieczne mapowanie rasy
    let raceId = charData.raceId;
    if (!raceId && charData.race) {
      const lower = charData.race.toLowerCase();
      if (lower.includes('człow') || lower.includes('czlow')) raceId = 'czlowiek';
      else if (lower.includes('elf') && !lower.includes('pół') && !lower.includes('pol')) raceId = 'elf';
      else if (lower.includes('krasn')) raceId = 'krasnolud';
      else if (lower.includes('nizio')) raceId = 'niziolek';
      else if (lower.includes('półelf') || lower.includes('polelf')) raceId = 'polelf';
      else if (lower.includes('półork') || lower.includes('polork')) raceId = 'polork';
      else if (lower.includes('aslan') || lower.includes('kot')) raceId = 'aslanoid';
      else if (lower.includes('zaur') || lower.includes('jaszcz')) raceId = 'zaur';
      else if (lower.includes('andro')) raceId = 'android';
      else raceId = 'custom';
    }
    if (!raceId) raceId = 'czlowiek';

    const raceCfg = getRaceConfig(raceId);
    const raceName = charData.raceName || charData.race || raceCfg.name || 'Człowiek';

    // Normalizacja ekwipunku
    const weapons = charData.weapons || [];
    const armorItems = charData.armorItems || charData.armor_items || [];
    const rawGear = charData.gear || [];
    const gear = rawGear.map(g => {
      if (typeof g === 'string') {
        return { name: g, weight: 1, cost: 0, notes: '' };
      }
      return g;
    });

    currentChar = {
      id: charData.id || 'char_' + Date.now(),
      name: charData.name || 'Nowy Bohater',
      concept: charData.concept || '',
      gender: charData.gender || '',
      appearance: charData.appearance || '',
      raceId: raceId,
      raceName: raceName,
      rank: charData.rank || 'Nowicjusz',
      advancesCount: typeof charData.advancesCount === 'number' ? charData.advancesCount : (Array.isArray(charData.advancesList) ? charData.advancesList.length : 0),
      advancesList: Array.isArray(charData.advancesList) ? charData.advancesList.map((adv, idx) => {
        if (typeof adv === 'string') {
          return { id: 'adv_' + idx, number: idx + 1, rank: 'Nowicjusz', rankCode: 'N', type: 'custom', summary: adv };
        }
        return adv;
      }) : [],
      attributes: charData.attributes ? { ...charData.attributes } : { zrecznosc: 'k4', spryt: 'k4', duch: 'k4', sila: 'k4', wigor: 'k4' },
      skills: mergeSkillsWithCatalog(charData.skills),
      hindrances: charData.hindrances ? JSON.parse(JSON.stringify(charData.hindrances)) : [],
      hindranceSpend: charData.hindranceSpend ? { ...charData.hindranceSpend } : { attr: 0, edge: 0, skill: 0, funds: 0 },
      edges: charData.edges ? JSON.parse(JSON.stringify(charData.edges)) : [],
      weapons: weapons,
      armorItems: armorItems,
      gear: gear,
      powers: charData.powers ? JSON.parse(JSON.stringify(charData.powers)) : [],
      funds: charData.funds !== undefined ? charData.funds : 500,
      powerPoints: charData.powerPoints || charData.power_points || 10,
      wounds: charData.wounds ? { ...charData.wounds } : { 1: false, 2: false, 3: false, ko: false },
      fatigue: charData.fatigue ? { ...charData.fatigue } : { 1: false, 2: false },
      sanityWounds: charData.sanityWounds ? { ...charData.sanityWounds } : { 1: false, 2: false, 3: false, ko: false },
      sanityNotes: charData.sanityNotes || '',
      ammoUsed: charData.ammoUsed ? [...charData.ammoUsed] : [],
      notes: charData.notes || '',
      dateModified: charData.dateModified || new Date().toISOString()
    };

    if (charData.activeModules) {
      appState.activeModules = {
        swep: true,
        horror: !!charData.activeModules.horror,
        fantasy: !!charData.activeModules.fantasy
      };
    } else {
      const hasHorror = (charData.skills && charData.skills.some(s => s.name === 'Alchemia')) ||
                        (charData.edges && charData.edges.some(e => e.source === 'horror')) ||
                        (charData.hindrances && charData.hindrances.some(h => h.source === 'horror')) ||
                        (charData.raceId && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.races.some(r => r.id === charData.raceId));
      const hasFantasy = (charData.edges && charData.edges.some(e => e.source === 'fantasy')) ||
                         (charData.hindrances && charData.hindrances.some(h => h.source === 'fantasy')) ||
                         (charData.raceId && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.races.some(r => r.id === charData.raceId));
      appState.activeModules = {
        swep: true,
        horror: !!(appState.activeModules.horror || hasHorror),
        fantasy: !!(appState.activeModules.fantasy || hasFantasy)
      };
    }
    currentChar.activeModules = { ...appState.activeModules };

    // Ustawienie wartości w polach formularza
    document.getElementById('char-name').value = currentChar.name || '';
    document.getElementById('char-concept').value = currentChar.concept || '';
    const charGenderInput = document.getElementById('char-gender');
    if (charGenderInput) charGenderInput.value = currentChar.gender || '';
    document.getElementById('char-appearance').value = currentChar.appearance || '';
    document.getElementById('char-notes-area').value = currentChar.notes || '';
    const sNotesField = document.getElementById('char-sanity-notes');
    if (sNotesField) sNotesField.value = currentChar.sanityNotes || '';

    updateModuleTogglesUI();
    renderAttributesCreator();
    renderSkillsCreator();
    renderWizardSummary();
    renderSheet();
    updateTrackerBadges();
  }

  function renderSavedCharactersModal() {
    const container = document.getElementById('saved-chars-container');
    if (!container) return;

    const list = getSavedCharactersList();
    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = '<div style="color: #666; font-style: italic; padding: 20px; text-align: center;">Brak zapisanych postaci. Stwórz nowego bohatera i kliknij "Zapisz"!</div>';
      return;
    }

    list.forEach(char => {
      const item = document.createElement('div');
      item.className = 'saved-char-item';

      const dateStr = new Date(char.dateModified).toLocaleDateString('pl-PL');

      item.innerHTML = `
        <div>
          <strong style="font-size: 1.1rem; color: var(--sw-red);">${char.name || 'Bez imienia'}</strong>
          <div style="font-size: 0.85rem; color: #555;">${char.concept || '—'} | ${char.raceName || 'Człowiek'} (${char.rank || 'Nowicjusz'})</div>
          <div style="font-size: 0.75rem; color: #888;">Zapisano: ${dateStr}</div>
        </div>
        <div class="saved-char-actions">
          <button class="sw-btn btn-primary" data-load-char="${char.id}" title="Otwórz Kartę Postaci">📜 Karta</button>
          <button class="sw-btn" data-edit-wizard-char="${char.id}" title="Wczytaj postać do edycji w Kreatorze">✏️ Edytuj</button>
          <button class="sw-btn" data-export-char="${char.id}" title="Pobierz plik JSON">JSON</button>
          <button class="sw-btn" data-delete-char="${char.id}" style="color: #9e1b1b;" title="Usuń postać">Usuń</button>
        </div>
      `;

      container.appendChild(item);
    });

    container.querySelectorAll('[data-load-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.loadChar;
        const target = list.find(c => c.id === id);
        if (target) {
          loadCharacterFromObject(JSON.parse(JSON.stringify(target)));
          document.getElementById('modal-char-manager').classList.remove('active');
          switchView('view-sheet');
        }
      });
    });

    container.querySelectorAll('[data-edit-wizard-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.editWizardChar;
        const target = list.find(c => c.id === id);
        if (target) {
          loadCharacterFromObject(JSON.parse(JSON.stringify(target)));
          document.getElementById('modal-char-manager').classList.remove('active');
          switchView('view-wizard');
          switchWizardStep(1);
        }
      });
    });

    container.querySelectorAll('[data-edit-inline-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.editInlineChar;
        const target = list.find(c => c.id === id);
        if (target) {
          loadCharacterFromObject(JSON.parse(JSON.stringify(target)));
          document.getElementById('modal-char-manager').classList.remove('active');
          switchView('view-sheet');
          setSheetInlineEditMode(true);
        }
      });
    });

    container.querySelectorAll('[data-export-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.exportChar;
        const target = list.find(c => c.id === id);
        if (target) exportCharacterToJSON(target);
      });
    });

    container.querySelectorAll('[data-delete-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.deleteChar;
        if (confirm('Czy na pewno chcesz usunąć tę postać?')) {
          const newList = list.filter(c => c.id !== id);
          saveCharactersList(newList);
          renderSavedCharactersModal();
        }
      });
    });
  }

  function exportCharacterToJSON(characterObj = currentChar) {
    const jsonStr = JSON.stringify(characterObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (characterObj.name || 'bohater').replace(/[^a-z0-9ąćęłńóśźż]/gi, '_').toLowerCase();
    a.download = `SWADE_${safeName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleImportJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        loadCharacterFromObject(imported);
        alert(`Pomyślnie wczytano postać "${imported.name}"!`);
        switchView('view-sheet');
      } catch (err) {
        alert('Błąd odczytu pliku JSON postaci: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // ==========================================================================
  // NAWIGACJA WIDOKAMI I KROKAMI KREATORA
  // ==========================================================================

  function setSheetInlineEditMode(enabled) {
    isSheetInlineEdit = !!enabled;
    const viewSheet = document.getElementById('view-sheet');
    const topBar = document.getElementById('sheet-top-bar');
    const drawer = document.getElementById('sheet-edit-drawer');
    const toggleBtn = document.getElementById('btn-toggle-sheet-edit');
    const statusPill = document.getElementById('sheet-edit-status-pill');
    const subText = document.getElementById('sheet-edit-subtext');

    if (viewSheet) {
      viewSheet.classList.toggle('sheet-edit-active', isSheetInlineEdit);
    }
    if (topBar) {
      topBar.classList.toggle('is-editing', isSheetInlineEdit);
    }
    if (drawer) {
      drawer.style.display = isSheetInlineEdit ? 'flex' : 'none';
    }
    if (toggleBtn) {
      toggleBtn.innerHTML = isSheetInlineEdit
        ? '<span>✅</span> Zakończ edycję'
        : '<span>✏️</span> Tryb edycji';
    }
    if (statusPill) {
      statusPill.textContent = isSheetInlineEdit ? 'Edycja aktywna' : 'Podgląd';
    }
    if (subText) {
      subText.textContent = isSheetInlineEdit
        ? 'Kliknij w Imię, Koncepcję, Wzrost, Wagę lub w kości (4–12) na arkuszu, albo wybierz poniżej sekcję do edycji w Kreatorze.'
        : 'Kliknij „Tryb edycji”, aby edytować pola i kości na arkuszu lub przejść do wybranej sekcji Kreatora.';
    }
    renderSheet();
  }

  function switchView(viewId) {
    document.querySelectorAll('.sw-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.sw-tab-btn').forEach(b => b.classList.remove('active'));

    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');

    const targetBtn = document.querySelector(`.sw-tab-btn[data-view="${viewId}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    if (viewId === 'view-sheet') {
      renderSheet();
    }
  }

  function switchWizardStep(stepNum) {
    currentWizardStep = stepNum;
    document.querySelectorAll('.wizard-step-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.step-nav-btn').forEach(b => b.classList.remove('active'));

    const targetPane = document.getElementById(`wizard-step-${stepNum}`);
    if (targetPane) targetPane.classList.add('active');

    const targetNav = document.querySelector(`.step-nav-btn[data-step="${stepNum}"]`);
    if (targetNav) targetNav.classList.add('active');

    if (stepNum === 8) {
      renderWizardSummary();
    }

    updateTrackerBadges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // OBSŁUGA PRZEŁĄCZNIKÓW MODUŁÓW I FILTRÓW KATALOGÓW
  // ==========================================================================

  function updateModuleTogglesUI() {
    const horrorToggle = document.getElementById('mod-toggle-horror');
    const fantasyToggle = document.getElementById('mod-toggle-fantasy');
    const horrorLabel = document.getElementById('lbl-toggle-horror');
    const fantasyLabel = document.getElementById('lbl-toggle-fantasy');
    const horrorStatus = document.getElementById('status-badge-horror');
    const fantasyStatus = document.getElementById('status-badge-fantasy');

    if (horrorToggle && horrorLabel && horrorStatus) {
      horrorToggle.checked = !!appState.activeModules.horror;
      if (appState.activeModules.horror) {
        horrorLabel.classList.add('is-active');
        horrorStatus.textContent = 'Aktywny';
      } else {
        horrorLabel.classList.remove('is-active');
        horrorStatus.textContent = 'Wyłączony';
      }
    }

    if (fantasyToggle && fantasyLabel && fantasyStatus) {
      fantasyToggle.checked = !!appState.activeModules.fantasy;
      if (appState.activeModules.fantasy) {
        fantasyLabel.classList.add('is-active');
        fantasyStatus.textContent = 'Aktywny';
      } else {
        fantasyLabel.classList.remove('is-active');
        fantasyStatus.textContent = 'Wyłączony';
      }
    }

    syncCharacterSkillsWithModules();
    renderRacesSelection();
    renderHindrances();
    renderSkillsCreator();
    renderEdges();
    renderEquipment();
    renderPowers();
  }

  function initModuleToggles() {
    const horrorToggle = document.getElementById('mod-toggle-horror');
    const fantasyToggle = document.getElementById('mod-toggle-fantasy');

    if (horrorToggle) {
      horrorToggle.addEventListener('change', () => {
        appState.activeModules.horror = horrorToggle.checked;
        currentChar.activeModules = { ...appState.activeModules };
        updateModuleTogglesUI();
        renderSheet();
      });
    }

    if (fantasyToggle) {
      fantasyToggle.addEventListener('change', () => {
        appState.activeModules.fantasy = fantasyToggle.checked;
        currentChar.activeModules = { ...appState.activeModules };
        updateModuleTogglesUI();
        renderSheet();
      });
    }

    // Obsługa filtrów modułów wewnątrz kroków (Rasy, Zawady, Sprzęt, Moce)
    const setupChipGroup = (containerId, filterKey, callback) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.querySelectorAll('.chip-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          container.querySelectorAll('.chip-filter-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const modKey = Object.keys(e.currentTarget.dataset)[0];
          appState.catalogFilters[filterKey] = e.currentTarget.dataset[modKey];
          callback();
        });
      });
    };

    setupChipGroup('races-module-filters', 'raceMod', renderRacesSelection);
    setupChipGroup('hindrances-module-filters', 'hindMod', renderHindrances);
    setupChipGroup('equip-module-filters', 'equipMod', renderEquipment);
    setupChipGroup('powers-module-filters', 'powerMod', renderPowers);

    const edgeModSelect = document.getElementById('filter-edges-module');
    if (edgeModSelect) {
      edgeModSelect.addEventListener('change', () => {
        renderEdges();
      });
    }

    updateModuleTogglesUI();
  }

  // ==========================================================================
  // INICJALIZACJA EVENT LISTENERÓW
  // ==========================================================================

  function initEventListeners() {
    initModuleToggles();
    // Nawigacja zakładkami głównymi
    document.querySelectorAll('.sw-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const viewId = e.currentTarget.dataset.view;
        switchView(viewId);
      });
    });

    // Pasek kroków kreatora
    document.querySelectorAll('.step-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const step = parseInt(e.currentTarget.dataset.step, 10);
        switchWizardStep(step);
      });
    });

    document.querySelectorAll('.btn-next-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = parseInt(e.currentTarget.dataset.target, 10);
        switchWizardStep(target);
      });
    });

    document.querySelectorAll('.btn-prev-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = parseInt(e.currentTarget.dataset.target, 10);
        switchWizardStep(target);
      });
    });

    // Szybkie przejście do karty z paska stanu
    document.getElementById('btn-wizard-to-sheet').addEventListener('click', () => {
      switchView('view-sheet');
    });

    document.getElementById('btn-finish-wizard').addEventListener('click', () => {
      switchView('view-sheet');
    });

    // Pasek akcji nagłówka
    document.getElementById('btn-new-char').addEventListener('click', () => {
      if (confirm('Czy chcesz rozpocząć nową postać? Niezapisane zmiany zostaną utracone.')) {
        loadCharacterFromObject(createDefaultCharacter());
        switchView('view-wizard');
        switchWizardStep(1);
      }
    });

    document.getElementById('btn-save-char').addEventListener('click', saveCurrentCharacter);
    document.getElementById('btn-export-json').addEventListener('click', () => exportCharacterToJSON());

    const importInput = document.getElementById('input-import-json');
    importInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImportJSON(e.target.files[0]);
      }
    });

    document.getElementById('btn-open-manager').addEventListener('click', () => {
      renderSavedCharactersModal();
      document.getElementById('modal-char-manager').classList.add('active');
    });

    document.getElementById('btn-print').addEventListener('click', () => {
      switchView('view-sheet');
      setTimeout(() => {
        window.print();
      }, 200);
    });

    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
      document.body.classList.toggle('theme-print-bw');
    });

    // Zamykanie modali
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.dataset.close;
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
      });
    });

    // Zmiana kroków wymiany punktów z Zawad
    const attachSpendButton = (id, key, delta) => {
      document.getElementById(id).addEventListener('click', () => {
        const costPerUnit = (key === 'attr' || key === 'edge') ? 2 : 1;
        const currentVal = currentChar.hindranceSpend[key];
        const newVal = currentVal + delta;

        if (newVal < 0) return;

        // Sprawdź czy starczy punktów
        const currentTotalSpent = (currentChar.hindranceSpend.attr * 2) +
                                  (currentChar.hindranceSpend.edge * 2) +
                                  (currentChar.hindranceSpend.skill * 1) +
                                  (currentChar.hindranceSpend.funds * 1);

        const newTotalSpent = currentTotalSpent + (delta * costPerUnit);
        const earned = calcHindrancePoints().earned;

        if (newTotalSpent <= earned) {
          currentChar.hindranceSpend[key] = newVal;
          renderHindrances();
          renderAttributesCreator();
          renderSkillsCreator();
          updateTrackerBadges();
        }
      });
    };

    attachSpendButton('btn-spend-attr-plus', 'attr', 1);
    attachSpendButton('btn-spend-attr-minus', 'attr', -1);
    attachSpendButton('btn-spend-edge-plus', 'edge', 1);
    attachSpendButton('btn-spend-edge-minus', 'edge', -1);
    attachSpendButton('btn-spend-skill-plus', 'skill', 1);
    attachSpendButton('btn-spend-skill-minus', 'skill', -1);
    attachSpendButton('btn-spend-funds-plus', 'funds', 1);
    attachSpendButton('btn-spend-funds-minus', 'funds', -1);

    // Filtry umiejętności
    const filterSkillsInput = document.getElementById('filter-skills-text');
    if (filterSkillsInput) {
      filterSkillsInput.addEventListener('input', (e) => {
        currentSkillFilterText = e.target.value;
        renderSkillsCreator();
      });
    }

    const skillFilterContainer = document.getElementById('skills-filter-buttons');
    if (skillFilterContainer) {
      skillFilterContainer.querySelectorAll('.skill-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          skillFilterContainer.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          currentSkillFilterCategory = e.currentTarget.dataset.cat || 'all';
          renderSkillsCreator();
        });
      });
    }

    // Filtry
    document.getElementById('filter-hindrances').addEventListener('input', renderHindrances);
    const sevFilterEl = document.getElementById('filter-hindrances-severity');
    if (sevFilterEl) sevFilterEl.addEventListener('change', renderHindrances);
    const extraHindToggle = document.getElementById('chk-allow-extra-hindrances');
    if (extraHindToggle) extraHindToggle.addEventListener('change', renderHindrances);
    document.getElementById('filter-edges-text').addEventListener('input', renderEdges);
    document.getElementById('filter-edges-category').addEventListener('change', renderEdges);
    document.getElementById('filter-powers-text').addEventListener('input', renderPowers);

    // Przełączanie kategorii ekwipunku
    document.querySelectorAll('.equip-cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.equip-cat-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeEquipCategory = e.currentTarget.dataset.cat;
        renderEquipment();
      });
    });

    // Dodawanie niestandardowych elementów
    document.getElementById('btn-add-custom-skill').addEventListener('click', () => {
      const nameInput = document.getElementById('custom-skill-name');
      const name = nameInput.value.trim();
      const attr = document.getElementById('custom-skill-attr').value;
      if (name) {
        const existing = currentChar.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (existing) {
          if (!existing.die) existing.die = 'k4';
          alert(`Umiejętność "${name}" już istnieje w wykazie i została ustawiona na k4.`);
        } else {
          currentChar.skills.push({
            name: name,
            die: 'k4',
            attr: attr,
            isCore: false,
            isCustom: true,
            desc: 'Własna umiejętność'
          });
        }
        nameInput.value = '';
        renderSkillsCreator();
        updateTrackerBadges();
        renderSheet();
      }
    });

    document.getElementById('btn-add-custom-edge').addEventListener('click', () => {
      const name = document.getElementById('custom-edge-name').value.trim();
      const desc = document.getElementById('custom-edge-desc').value.trim();
      if (name) {
        currentChar.edges.push({
          name: name,
          category: 'Własna',
          desc: desc || 'Własna Przewaga'
        });
        document.getElementById('custom-edge-name').value = '';
        document.getElementById('custom-edge-desc').value = '';
        renderEdges();
        updateTrackerBadges();
      }
    });

    document.getElementById('btn-add-custom-item').addEventListener('click', () => {
      const name = document.getElementById('custom-item-name').value.trim();
      const weight = parseFloat(document.getElementById('custom-item-weight').value) || 1;
      const cost = parseInt(document.getElementById('custom-item-cost').value, 10) || 10;
      if (name) {
        currentChar.gear.push({
          name: name,
          weight: weight,
          cost: cost,
          notes: 'Własny przedmiot'
        });
        document.getElementById('custom-item-name').value = '';
        renderEquipment();
        updateTrackerBadges();
      }
    });

    // ========================================================================
    // KOMPLEKSOWA OBSŁUGA AWANSÓW (ADVANCEMENT SYSTEM)
    // ========================================================================

    function openAdvancementModal() {
      const modal = document.getElementById('modal-advancement');
      if (!modal) return;

      const currentCount = currentChar.advancesCount || 0;
      const nextNum = currentCount + 1;
      const rankInfo = getRankInfo(currentCount);

      const numSpan = document.getElementById('adv-current-num');
      const rankSpan = document.getElementById('adv-current-rank');
      if (numSpan) numSpan.textContent = `#${nextNum}`;
      if (rankSpan) rankSpan.textContent = rankInfo.full;

      const defaultRadio = document.querySelector('input[name="adv-choice"][value="edge"]');
      if (defaultRadio) defaultRadio.checked = true;
      switchAdvModalChoice('edge');

      modal.classList.add('active');
    }

    function switchAdvModalChoice(choice) {
      document.querySelectorAll('.adv-choice-card').forEach(card => card.classList.remove('active'));
      const activeLabel = document.getElementById(`lbl-adv-${choice}`);
      if (activeLabel) activeLabel.classList.add('active');

      document.querySelectorAll('.adv-panel').forEach(p => p.style.display = 'none');
      const targetPanel = document.getElementById(`adv-panel-${choice}`);
      if (targetPanel) targetPanel.style.display = 'block';

      if (choice === 'edge') {
        renderAdvModalEdges();
      } else if (choice === 'attr') {
        renderAdvModalAttributes();
      } else if (choice === 'skills') {
        renderAdvModalSkills();
      } else if (choice === 'hindrance') {
        renderAdvModalHindrances();
      }
    }

    function renderAdvModalEdges() {
      const select = document.getElementById('adv-edge-select');
      const searchInput = document.getElementById('adv-edge-search');
      const rankFilter = document.getElementById('adv-edge-rank-filter');
      const detailsBox = document.getElementById('adv-edge-details');
      const countBadge = document.getElementById('adv-edge-count-badge');
      const descInput = document.getElementById('adv-description');
      if (!select) return;

      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const rankMode = rankFilter ? rankFilter.value : 'eligible';
      const currentRank = getRankInfo(currentChar.advancesCount || 0);

      const allEdges = getAllEdges();
      const ownedNames = new Set((currentChar.edges || []).map(e => e.name.toLowerCase()));

      const filtered = allEdges.filter(e => {
        if (ownedNames.has(e.name.toLowerCase())) return false;
        if (rankMode === 'eligible' && !isEdgeRankAllowed(e.requirements || e.req, currentRank.index)) {
          return false;
        }
        if (query) {
          const nameMatch = e.name.toLowerCase().includes(query);
          const descMatch = (e.desc || '').toLowerCase().includes(query);
          const catMatch = (e.category || e.type || '').toLowerCase().includes(query);
          if (!nameMatch && !descMatch && !catMatch) return false;
        }
        return true;
      });

      if (countBadge) countBadge.textContent = `Dostępne: ${filtered.length}`;

      select.innerHTML = '';
      if (filtered.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '-- Brak dostępnych Przewag spełniających kryteria --';
        opt.disabled = true;
        select.appendChild(opt);
        if (detailsBox) detailsBox.textContent = 'Brak przewag spełniających kryteria filtrowania.';
        if (descInput) descInput.value = '';
        return;
      }

      filtered.forEach((edge, idx) => {
        const opt = document.createElement('option');
        opt.value = edge.name;
        const srcTag = edge.source === 'horror' ? '[🦇 Horror]' : (edge.source === 'fantasy' ? '[🐉 Fantasy]' : '[📘 SWEP]');
        opt.textContent = `${srcTag} ${edge.name} (${edge.category || edge.type}) — Wym: ${edge.requirements || edge.req || 'Brak'}`;
        if (idx === 0) opt.selected = true;
        select.appendChild(opt);
      });

      const updateEdgeDetails = () => {
        const chosenName = select.value;
        const edge = allEdges.find(e => e.name === chosenName);
        if (edge) {
          if (detailsBox) {
            detailsBox.innerHTML = `
              <strong>${edge.name}</strong> [${edge.category || edge.type}]<br>
              <span style="color: var(--sw-red); font-weight: bold;">Wymagania:</span> ${edge.requirements || edge.req || 'Brak'}<br>
              <span style="color: #444;">${edge.desc}</span>
            `;
          }
          if (descInput) {
            descInput.value = `Nowa Przewaga: ${edge.name}`;
          }
        }
      };

      select.onchange = updateEdgeDetails;
      updateEdgeDetails();
    }

    function renderAdvModalAttributes() {
      const container = document.getElementById('adv-attr-radios');
      const warningBox = document.getElementById('adv-attr-warning');
      const descInput = document.getElementById('adv-description');
      if (!container) return;

      container.innerHTML = '';
      const currentRank = getRankInfo(currentChar.advancesCount || 0);

      let attrRaisedInCurrentRank = false;
      if (currentChar.advancesList) {
        attrRaisedInCurrentRank = currentChar.advancesList.some(a => {
          return a.type === 'attr' && (a.rankCode === currentRank.code || a.rank === currentRank.name);
        });
      }

      if (warningBox) {
        warningBox.style.display = (attrRaisedInCurrentRank && currentRank.code !== 'L') ? 'block' : 'none';
      }

      SW_DATA.attributes.forEach((attr, idx) => {
        const currentDie = currentChar.attributes[attr.id] || 'k4';
        const nextDie = getNextDie(currentDie);
        const isMaxed = (currentDie === 'k12' || currentDie === 'k12+2');

        const label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '10px';
        label.style.padding = '8px 12px';
        label.style.border = '1px solid var(--sw-border-light)';
        label.style.borderRadius = '4px';
        label.style.cursor = isMaxed ? 'not-allowed' : 'pointer';
        label.style.background = isMaxed ? '#f9f9f9' : '#fff';

        label.innerHTML = `
          <input type="radio" name="adv-attr-choice" value="${attr.id}" ${idx === 0 && !isMaxed ? 'checked' : ''} ${isMaxed ? 'disabled' : ''}>
          <div style="flex: 1;">
            <strong>${attr.name}</strong>: 
            <span style="color: var(--sw-ink);">${currentDie}</span> ➔ 
            <strong style="color: var(--sw-red);">${isMaxed ? 'MAKSYMALNA' : nextDie}</strong>
          </div>
        `;

        container.appendChild(label);
      });

      const updateAttrDesc = () => {
        const selected = container.querySelector('input[name="adv-attr-choice"]:checked');
        if (selected) {
          const attrObj = SW_DATA.attributes.find(a => a.id === selected.value);
          const curDie = currentChar.attributes[selected.value] || 'k4';
          const nxtDie = getNextDie(curDie);
          if (descInput && attrObj) {
            descInput.value = `Podniesienie Atrybutu: ${attrObj.name} z ${curDie} do ${nxtDie}`;
          }
        }
      };

      container.onchange = updateAttrDesc;
      updateAttrDesc();
    }

    function renderAdvModalSkills() {
      const modeRadios = document.querySelectorAll('input[name="adv-skill-mode"]');
      const twoContainer = document.getElementById('adv-skills-two-container');
      const oneContainer = document.getElementById('adv-skills-one-container');
      const select1 = document.getElementById('adv-skill-select-1');
      const select2 = document.getElementById('adv-skill-select-2');
      const selectSingle = document.getElementById('adv-skill-select-single');
      const descInput = document.getElementById('adv-description');

      const updateSkillsUI = () => {
        const checkedMode = document.querySelector('input[name="adv-skill-mode"]:checked');
        const mode = checkedMode ? checkedMode.value : 'two_below';

        if (twoContainer && oneContainer) {
          twoContainer.style.display = (mode === 'two_below') ? 'block' : 'none';
          oneContainer.style.display = (mode === 'one_equal') ? 'block' : 'none';
        }

        if (mode === 'two_below') {
          const populateTwo = (sel, otherSel) => {
            if (!sel) return;
            const prevVal = sel.value;
            sel.innerHTML = '';
            currentChar.skills.forEach(skill => {
              const attrDie = currentChar.attributes[skill.attr] || 'k4';
              const attrIdx = getDieIndex(attrDie);
              const curIdx = skill.die ? getDieIndex(skill.die) : -1;
              const isBelow = (curIdx < attrIdx);
              const curDieStr = skill.die || 'brak';
              const nextDieStr = getNextDie(skill.die);

              const opt = document.createElement('option');
              opt.value = skill.name;
              opt.textContent = `${skill.name} (${curDieStr} ➔ ${nextDieStr}) [${skill.attr}: ${attrDie}]${isBelow ? ' ✔️' : ' ⚠️'}`;
              sel.appendChild(opt);
            });
            if (prevVal && sel.querySelector(`option[value="${prevVal}"]`)) {
              sel.value = prevVal;
            }
          };

          populateTwo(select1, select2);
          populateTwo(select2, select1);
          if (select2 && select2.options.length > 1) {
            select2.selectedIndex = 1;
          }

          const updateDescTwo = () => {
            const s1 = select1 ? select1.value : '';
            const s2 = select2 ? select2.value : '';
            if (descInput) {
              descInput.value = `Rozwój Umiejętności: ${s1} oraz ${s2}`;
            }
          };
          if (select1) select1.onchange = updateDescTwo;
          if (select2) select2.onchange = updateDescTwo;
          updateDescTwo();
        } else {
          if (selectSingle) {
            const prevVal = selectSingle.value;
            selectSingle.innerHTML = '';
            currentChar.skills.forEach(skill => {
              const attrDie = currentChar.attributes[skill.attr] || 'k4';
              const curDieStr = skill.die || 'brak';
              const nextDieStr = getNextDie(skill.die);

              const opt = document.createElement('option');
              opt.value = skill.name;
              opt.textContent = `${skill.name} (${curDieStr} ➔ ${nextDieStr}) [${skill.attr}: ${attrDie}]`;
              selectSingle.appendChild(opt);
            });
            if (prevVal && selectSingle.querySelector(`option[value="${prevVal}"]`)) {
              selectSingle.value = prevVal;
            }

            const updateDescSingle = () => {
              const s = selectSingle.value;
              if (descInput) {
                descInput.value = `Rozwój Umiejętności: ${s}`;
              }
            };
            selectSingle.onchange = updateDescSingle;
            updateDescSingle();
          }
        }
      };

      modeRadios.forEach(r => r.addEventListener('change', updateSkillsUI));
      updateSkillsUI();
    }

    function renderAdvModalHindrances() {
      const container = document.getElementById('adv-hindrance-content');
      const descInput = document.getElementById('adv-description');
      if (!container) return;

      container.innerHTML = '';
      const hindrances = currentChar.hindrances || [];

      if (hindrances.length === 0) {
        container.innerHTML = '<div style="color: #888; font-style: italic; padding: 10px;">Postać nie posiada żadnych Zawad do usunięcia.</div>';
        if (descInput) descInput.value = '';
        return;
      }

      let selectHtml = `
        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.8rem; font-weight: bold; display: block; margin-bottom: 4px;">Wybierz Zawadę:</label>
          <select id="adv-hindrance-select" class="form-control" style="font-size: 0.85rem;">
      `;

      hindrances.forEach((h, idx) => {
        selectHtml += `<option value="${idx}">${h.name} (${h.severity}) — ${h.desc || ''}</option>`;
      });

      selectHtml += `
          </select>
        </div>
        <div id="adv-hindrance-action-box" style="font-size: 0.85rem; padding: 8px; background: var(--sw-parchment-light); border-radius: 4px; border: 1px solid var(--sw-border-light);">
        </div>
      `;

      container.innerHTML = selectHtml;

      const select = document.getElementById('adv-hindrance-select');
      const actionBox = document.getElementById('adv-hindrance-action-box');

      const updateHindranceUI = () => {
        const idx = parseInt(select.value, 10);
        const h = hindrances[idx];
        if (!h) return;

        if (h.severity === 'Drobna') {
          actionBox.innerHTML = `Akcja: <strong>Całkowite usunięcie Zawady</strong> Drobnej (zgodnie z zasadami SWADE).`;
          if (descInput) descInput.value = `Usunięcie Zawady Drobnej: ${h.name}`;
        } else {
          actionBox.innerHTML = `Akcja: <strong>Zmniejszenie Zawady z Poważnej do Drobnej</strong> (lub usunięcie za zgodą MG).`;
          if (descInput) descInput.value = `Zmniejszenie Zawady Poważnej do Drobnej: ${h.name}`;
        }
      };

      select.onchange = updateHindranceUI;
      updateHindranceUI();
    }

    function applyCurrentAdvance() {
      const choiceInput = document.querySelector('input[name="adv-choice"]:checked');
      const choice = choiceInput ? choiceInput.value : 'edge';
      const desc = (document.getElementById('adv-description').value || '').trim() || 'Nowy awans';
      const currentCount = currentChar.advancesCount || 0;
      const rankInfo = getRankInfo(currentCount);

      const advRecord = {
        id: 'adv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        number: currentCount + 1,
        rank: rankInfo.name,
        rankCode: rankInfo.code,
        type: choice,
        summary: desc,
        date: new Date().toISOString()
      };

      if (choice === 'edge') {
        const select = document.getElementById('adv-edge-select');
        const edgeName = select ? select.value : '';
        if (!edgeName) {
          alert('Proszę wybrać Przewagę z listy!');
          return;
        }
        const allEdges = getAllEdges();
        const edgeObj = allEdges.find(e => e.name === edgeName);
        if (!edgeObj) {
          alert('Nie odnaleziono wybranej Przewagi!');
          return;
        }

        currentChar.edges.push(edgeObj);
        if (edgeObj.isArcaneBackground || edgeName.includes('Zdolności nadprzyrodzone')) {
          ensureArcaneSkill(edgeName);
        }
        advRecord.tag = 'Przewaga';
        advRecord.edgeName = edgeName;
      } else if (choice === 'attr') {
        const selected = document.querySelector('input[name="adv-attr-choice"]:checked');
        if (!selected) {
          alert('Proszę wybrać atrybut do podniesienia!');
          return;
        }
        const attrKey = selected.value;
        const oldDie = currentChar.attributes[attrKey] || 'k4';
        const newDie = getNextDie(oldDie);

        currentChar.attributes[attrKey] = newDie;
        advRecord.tag = 'Atrybut';
        advRecord.attr = attrKey;
        advRecord.from = oldDie;
        advRecord.to = newDie;
      } else if (choice === 'skills') {
        const modeInput = document.querySelector('input[name="adv-skill-mode"]:checked');
        const mode = modeInput ? modeInput.value : 'two_below';
        if (mode === 'two_below') {
          const sel1 = document.getElementById('adv-skill-select-1');
          const sel2 = document.getElementById('adv-skill-select-2');
          const name1 = sel1 ? sel1.value : '';
          const name2 = sel2 ? sel2.value : '';

          const skill1 = currentChar.skills.find(s => s.name === name1);
          const skill2 = currentChar.skills.find(s => s.name === name2);

          const old1 = skill1 ? skill1.die : null;
          const old2 = skill2 ? skill2.die : null;
          const new1 = getNextDie(old1);
          const new2 = getNextDie(old2);

          if (skill1) skill1.die = new1;
          if (skill2) skill2.die = new2;

          advRecord.tag = 'Umiejętności';
          advRecord.subMode = 'two_below';
          advRecord.skills = [
            { name: name1, from: old1, to: new1 },
            { name: name2, from: old2, to: new2 }
          ];
        } else {
          const selSingle = document.getElementById('adv-skill-select-single');
          const name = selSingle ? selSingle.value : '';
          const skill = currentChar.skills.find(s => s.name === name);
          const oldDie = skill ? skill.die : null;
          const newDie = getNextDie(oldDie);

          if (skill) skill.die = newDie;

          advRecord.tag = 'Umiejętności';
          advRecord.subMode = 'one_equal';
          advRecord.skills = [
            { name: name, from: oldDie, to: newDie }
          ];
        }
      } else if (choice === 'hindrance') {
        const select = document.getElementById('adv-hindrance-select');
        const idx = select ? parseInt(select.value, 10) : -1;
        if (idx >= 0 && currentChar.hindrances && currentChar.hindrances[idx]) {
          const h = currentChar.hindrances[idx];
          const oldSev = h.severity;
          if (oldSev === 'Drobna') {
            const removed = currentChar.hindrances.splice(idx, 1)[0];
            advRecord.tag = 'Zawada';
            advRecord.hindranceAction = 'removed';
            advRecord.hindrance = removed;
          } else {
            h.severity = 'Drobna';
            advRecord.tag = 'Zawada';
            advRecord.hindranceAction = 'reduced';
            advRecord.hindranceName = h.name;
          }
        }
      }

      if (!currentChar.advancesList) currentChar.advancesList = [];
      currentChar.advancesList.push(advRecord);
      currentChar.advancesCount = currentChar.advancesList.length;

      document.getElementById('modal-advancement').classList.remove('active');
      renderSheet();
      updateTrackerBadges();
      renderAttributesCreator();
      renderSkillsCreator();
      renderEdges();
    }

    function undoLastAdvance() {
      if (!currentChar.advancesList || currentChar.advancesList.length === 0) return;
      const last = currentChar.advancesList[currentChar.advancesList.length - 1];

      if (!confirm(`Czy na pewno chcesz cofnąć ostatni awans (#${last.number || currentChar.advancesList.length})?\n"${last.summary || last.desc}"`)) {
        return;
      }

      if (last.type === 'edge') {
        const edgeIdx = currentChar.edges.findIndex(e => e.name === last.edgeName);
        if (edgeIdx >= 0) currentChar.edges.splice(edgeIdx, 1);
      } else if (last.type === 'attr') {
        if (last.attr && last.from) {
          currentChar.attributes[last.attr] = last.from;
        }
      } else if (last.type === 'skills') {
        if (last.skills) {
          last.skills.forEach(ch => {
            const s = currentChar.skills.find(x => x.name === ch.name);
            if (s) s.die = ch.from;
          });
        }
      } else if (last.type === 'hindrance') {
        if (last.hindranceAction === 'removed' && last.hindrance) {
          currentChar.hindrances.push(last.hindrance);
        } else if (last.hindranceAction === 'reduced' && last.hindranceName) {
          const h = currentChar.hindrances.find(x => x.name === last.hindranceName);
          if (h) h.severity = 'Poważna';
        }
      }

      currentChar.advancesList.pop();
      currentChar.advancesCount = currentChar.advancesList.length;

      renderSheet();
      updateTrackerBadges();
      renderAttributesCreator();
      renderSkillsCreator();
      renderEdges();
    }

    // Podpięcie zdarzeń modalu awansów
    const btnOpenAdvModal = document.getElementById('btn-open-advancement-modal');
    if (btnOpenAdvModal) {
      btnOpenAdvModal.addEventListener('click', openAdvancementModal);
    }

    const btnConfirmAdv = document.getElementById('btn-confirm-advance');
    if (btnConfirmAdv) {
      btnConfirmAdv.addEventListener('click', applyCurrentAdvance);
    }

    const btnUndoAdv = document.getElementById('btn-undo-last-advance');
    if (btnUndoAdv) {
      btnUndoAdv.addEventListener('click', undoLastAdvance);
    }

    document.querySelectorAll('input[name="adv-choice"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        switchAdvModalChoice(e.target.value);
      });
    });

    const advEdgeSearch = document.getElementById('adv-edge-search');
    if (advEdgeSearch) {
      advEdgeSearch.addEventListener('input', renderAdvModalEdges);
    }

    const advEdgeRankFilter = document.getElementById('adv-edge-rank-filter');
    if (advEdgeRankFilter) {
      advEdgeRankFilter.addEventListener('change', renderAdvModalEdges);
    }

    // Reset amunicji
    document.getElementById('btn-reset-ammo').addEventListener('click', () => {
      currentChar.ammoUsed = [];
      renderAmmoTrack();
    });

    // Rany, Zmęczenie i Poczytalność interakcja
    document.querySelectorAll('.wound-box[data-wound]').forEach(box => {
      box.addEventListener('click', (e) => {
        const key = e.currentTarget.dataset.wound;
        if (!currentChar.wounds) currentChar.wounds = {};
        currentChar.wounds[key] = !currentChar.wounds[key];
        e.currentTarget.classList.toggle('checked', !!currentChar.wounds[key]);
      });
    });

    document.querySelectorAll('.wound-box[data-fatigue]').forEach(box => {
      box.addEventListener('click', (e) => {
        const key = e.currentTarget.dataset.fatigue;
        if (!currentChar.fatigue) currentChar.fatigue = {};
        currentChar.fatigue[key] = !currentChar.fatigue[key];
        e.currentTarget.classList.toggle('checked', !!currentChar.fatigue[key]);
      });
    });

    document.querySelectorAll('.wound-box[data-sanity]').forEach(box => {
      box.addEventListener('click', (e) => {
        const key = e.currentTarget.dataset.sanity;
        if (!currentChar.sanityWounds) currentChar.sanityWounds = {};
        currentChar.sanityWounds[key] = !currentChar.sanityWounds[key];
        e.currentTarget.classList.toggle('checked', !!currentChar.sanityWounds[key]);
      });
    });

    const sanityNotesInput = document.getElementById('char-sanity-notes');
    if (sanityNotesInput) {
      sanityNotesInput.addEventListener('input', (e) => {
        currentChar.sanityNotes = e.target.value;
      });
    }

    // Aktualizacja pól tekstu (Krok 1 <-> Finalna Karta Postaci)
    document.getElementById('char-name').addEventListener('input', (e) => {
      currentChar.name = e.target.value;
      const shName = document.getElementById('sheet-name');
      if (shName) {
        if (shName.tagName === 'INPUT') shName.value = currentChar.name;
        else shName.textContent = currentChar.name || 'Nowy Bohater';
      }
    });

    document.getElementById('char-concept').addEventListener('input', (e) => {
      currentChar.concept = e.target.value;
      const shConcept = document.getElementById('sheet-concept');
      if (shConcept) shConcept.textContent = currentChar.concept || '—';
    });

    const charGenderEl = document.getElementById('char-gender');
    if (charGenderEl) {
      charGenderEl.addEventListener('input', (e) => {
        currentChar.gender = e.target.value;
        const shGender = document.getElementById('sheet-gender');
        if (shGender && shGender.tagName === 'INPUT') shGender.value = currentChar.gender;
      });
    }

    document.getElementById('char-appearance').addEventListener('input', (e) => {
      currentChar.appearance = e.target.value;
      const shApp = document.getElementById('sheet-appearance');
      if (shApp && shApp.tagName === 'INPUT') shApp.value = currentChar.appearance;
    });

    // Edycja bezpośrednio na Finalnej Karcie Postaci
    const shNameInput = document.getElementById('sheet-name');
    if (shNameInput && shNameInput.tagName === 'INPUT') {
      shNameInput.addEventListener('input', (e) => {
        currentChar.name = e.target.value;
        document.getElementById('char-name').value = currentChar.name;
      });
    }
    const shConceptInput = document.getElementById('sheet-concept');
    if (shConceptInput && shConceptInput.tagName === 'INPUT') {
      shConceptInput.addEventListener('input', (e) => {
        currentChar.concept = e.target.value;
        document.getElementById('char-concept').value = currentChar.concept;
      });
    }
    const shGenderInput = document.getElementById('sheet-gender');
    if (shGenderInput && shGenderInput.tagName === 'INPUT') {
      shGenderInput.addEventListener('input', (e) => {
        currentChar.gender = e.target.value;
        if (charGenderEl) charGenderEl.value = currentChar.gender;
      });
    }
    const shAppInput = document.getElementById('sheet-appearance');
    if (shAppInput && shAppInput.tagName === 'INPUT') {
      shAppInput.addEventListener('input', (e) => {
        currentChar.appearance = e.target.value;
        document.getElementById('char-appearance').value = currentChar.appearance;
      });
    }

    document.getElementById('char-notes-area').addEventListener('input', (e) => {
      currentChar.notes = e.target.value;
      const notesPrint = document.getElementById('notes-print-display');
      if (notesPrint) notesPrint.textContent = e.target.value;
    });

    // Obsługa paska edycji na Karcie Postaci (#view-sheet)
    const btnToggleSheetEdit = document.getElementById('btn-toggle-sheet-edit');
    if (btnToggleSheetEdit) {
      btnToggleSheetEdit.addEventListener('click', () => {
        setSheetInlineEditMode(!isSheetInlineEdit);
      });
    }

    const btnSheetToWizard = document.getElementById('btn-sheet-to-wizard');
    if (btnSheetToWizard) {
      btnSheetToWizard.addEventListener('click', () => {
        switchView('view-wizard');
        switchWizardStep(1);
      });
    }

    const btnSheetQuickSave = document.getElementById('btn-sheet-quick-save');
    if (btnSheetQuickSave) {
      btnSheetQuickSave.addEventListener('click', () => {
        saveCurrentCharacter();
      });
    }

    const btnSheetSaveCopy = document.getElementById('btn-sheet-save-copy');
    if (btnSheetSaveCopy) {
      btnSheetSaveCopy.addEventListener('click', () => {
        currentChar.id = 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
        if (!currentChar.name.endsWith(' (Kopia)')) {
          currentChar.name = (currentChar.name || 'Bohater') + ' (Kopia)';
          document.getElementById('char-name').value = currentChar.name;
        }
        saveCurrentCharacter();
      });
    }

    document.querySelectorAll('[data-sheet-goto-step]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const step = parseInt(e.currentTarget.dataset.sheetGotoStep, 10);
        switchView('view-wizard');
        switchWizardStep(step || 1);
      });
    });

    // Bezpośrednia edycja kości Atrybutów na Karcie Postaci w trybie edycji
    document.querySelectorAll('.sheet-attr-box .sheet-dice-track .sheet-die-step').forEach(stepEl => {
      stepEl.addEventListener('click', (e) => {
        if (!isSheetInlineEdit) return;
        const track = e.currentTarget.closest('.sheet-dice-track');
        const attrKey = track ? track.dataset.attr : null;
        const newDie = e.currentTarget.dataset.die;
        if (attrKey && newDie) {
          currentChar.attributes[attrKey] = newDie;
          renderAttributesCreator();
          renderSkillsCreator();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });

    // Bezpośrednia edycja pól metryczki (contenteditable) na Karcie Postaci
    const sheetNameSpan = document.getElementById('sheet-name');
    if (sheetNameSpan) {
      sheetNameSpan.addEventListener('blur', () => {
        if (!isSheetInlineEdit) return;
        const val = sheetNameSpan.textContent.trim();
        currentChar.name = val || 'Nowy Bohater';
        document.getElementById('char-name').value = currentChar.name;
        const toolbarNameEl = document.getElementById('sheet-toolbar-char-name');
        if (toolbarNameEl) toolbarNameEl.textContent = currentChar.name;
      });
    }

    const sheetConceptSpan = document.getElementById('sheet-concept');
    if (sheetConceptSpan) {
      sheetConceptSpan.addEventListener('blur', () => {
        if (!isSheetInlineEdit) return;
        const val = sheetConceptSpan.textContent.trim();
        currentChar.concept = (val === '—') ? '' : val;
        document.getElementById('char-concept').value = currentChar.concept;
      });
    }

    const syncAppearanceFromSheet = () => {
      if (!isSheetInlineEdit) return;
      const hEl = document.getElementById('sheet-height');
      const wEl = document.getElementById('sheet-weight-bio');
      const hVal = hEl ? hEl.textContent.trim() : '';
      const wVal = wEl ? wEl.textContent.trim() : '';
      const cleanH = (hVal === '—') ? '' : hVal;
      const cleanW = (wVal === '—') ? '' : wVal;
      currentChar.appearance = [cleanH, cleanW].filter(Boolean).join(', ');
      document.getElementById('char-appearance').value = currentChar.appearance;
    };

    const sheetHeightSpan = document.getElementById('sheet-height');
    if (sheetHeightSpan) sheetHeightSpan.addEventListener('blur', syncAppearanceFromSheet);
    const sheetWeightSpan = document.getElementById('sheet-weight-bio');
    if (sheetWeightSpan) sheetWeightSpan.addEventListener('blur', syncAppearanceFromSheet);
  }

  // --- START APLIKACJI ---
  function startApp() {
    initEventListeners();
    updateSavedCount();
    loadCharacterFromObject(currentChar);
    renderArchetypes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }

})();
