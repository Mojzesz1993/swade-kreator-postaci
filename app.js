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
      horror: false,
      fantasy: false
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
    let list = SW_DATA.hindrances.map(h => ({ ...h, source: h.source || 'swep' }));
    if (appState.activeModules.horror && typeof HORROR_DATA !== 'undefined' && HORROR_DATA.hindrances) {
      list.push(...HORROR_DATA.hindrances);
    }
    if (appState.activeModules.fantasy && typeof FANTASY_DATA !== 'undefined' && FANTASY_DATA.hindrances) {
      list.push(...FANTASY_DATA.hindrances);
    }
    return list;
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
      activeModules: { swep: true, horror: false, fantasy: false },
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

    const bonusFromHindrances = currentChar.hindranceSpend.attr || 0;
    const totalAllowed = SW_DATA.rules.attributePoints + bonusFromHindrances + bonusFromAdvances;
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

    const bonusFromHindrances = currentChar.hindranceSpend.skill || 0;
    const totalAllowed = SW_DATA.rules.skillPoints + bonusFromHindrances + bonusFromAdvances;
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
    let earned = 0;
    currentChar.hindrances.forEach(h => {
      if (h.severity === 'Poważna') earned += 2;
      else earned += 1;
    });

    earned = Math.min(earned, SW_DATA.rules.maxHindrancePoints);

    const spend = currentChar.hindranceSpend;
    const spent = (spend.attr * 2) + (spend.edge * 2) + (spend.skill * 1) + (spend.funds * 1);

    return {
      earned: earned,
      spent: spent,
      remaining: earned - spent
    };
  }

  // Wyliczanie dostępnych darmowych Przewag
  function calcFreeEdges() {
    let allowed = 0;
    const race = getRaceConfig(currentChar.raceId);
    if (race.free_edges) allowed += race.free_edges;

    allowed += (currentChar.hindranceSpend.edge || 0);

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
    starting += (currentChar.hindranceSpend.funds || 0) * 500;

    if (currentChar.edges.some(e => e.name.toLowerCase().includes('bogaty'))) {
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

    // 2. WYTRZYMAŁOŚĆ (Toughness)
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
    if (race.toughness_mod) baseToughness += race.toughness_mod;
    if (race.armor_mod) armorVal += race.armor_mod;

    if (currentChar.edges.some(e => e.name.toLowerCase().includes('krzepki'))) {
      baseToughness += 1;
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

    // 4. FUKSY (Bennies)
    let bennies = 3;
    if (currentChar.raceId === 'niziolek') bennies += 1;
    if (currentChar.edges.some(e => e.name.toLowerCase() === 'szczęściarz')) bennies += 1;
    if (currentChar.edges.some(e => e.name.toLowerCase() === 'cholerny szczęściarz')) bennies += 2;
    if (currentChar.hindrances.some(h => h.name.toLowerCase() === 'pech')) bennies -= 1;

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
    elHind.textContent = `${hind.earned} / 4 (Wydano: ${hind.spent})`;

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
    const allHindrances = getAllHindrances();
    const filterMod = appState.catalogFilters.hindMod || 'all';

    // Katalog
    catalog.innerHTML = '';
    const visibleHindrances = allHindrances.filter(h => {
      const src = h.source || 'swep';
      if (filterMod !== 'all' && src !== filterMod) return false;
      if (filterText && !h.name.toLowerCase().includes(filterText) && !h.desc.toLowerCase().includes(filterText)) {
        return false;
      }
      return true;
    });

    if (visibleHindrances.length === 0) {
      catalog.innerHTML = '<div style="text-align: center; color: #888; padding: 20px; font-style: italic;">Brak zawad w wybranym filtrze.</div>';
    }

    visibleHindrances.forEach(h => {
      const isChosen = currentChar.hindrances.some(ch => ch.name === h.name);
      const item = document.createElement('div');
      item.style.padding = '8px';
      item.style.borderBottom = '1px solid #eee';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.gap = '10px';

      const sevText = h.severity || h.type || 'Mniejsza';

      item.innerHTML = `
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong>${h.name}</strong> 
            <span style="font-size: 0.8rem; color: #666;">(${sevText})</span>
            ${getSourceBadgeHtml(h.source)}
          </div>
          <div style="font-size: 0.8rem; color: #555; margin-top: 2px;">${h.desc}</div>
        </div>
        <button class="sw-btn ${isChosen ? '' : 'btn-primary'}" data-add-hindrance="${h.name}" style="white-space: nowrap; font-size: 0.8rem;" ${isChosen ? 'disabled' : ''}>
          ${isChosen ? 'Wybrano' : '+ Wybierz'}
        </button>
      `;

      catalog.appendChild(item);
    });

    catalog.querySelectorAll('[data-add-hindrance]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const hName = e.currentTarget.dataset.addHindrance;
        const allH = getAllHindrances();
        const hObj = allH.find(x => x.name === hName);
        if (hObj && !currentChar.hindrances.some(x => x.name === hName)) {
          let pts = 1;
          let sev = 'Drobna';
          const s = (hObj.severity || hObj.type || '').toLowerCase();
          if (s.includes('większa') || s.includes('poważna') || s.includes('major')) {
            pts = 2;
            sev = 'Poważna';
          }
          currentChar.hindrances.push({
            name: hObj.name,
            severity: sev,
            points: pts,
            desc: hObj.desc,
            source: hObj.source || 'swep'
          });
          renderHindrances();
          updateTrackerBadges();
          renderSheet();
        }
      });
    });

    // Wybrane
    selected.innerHTML = '';
    if (currentChar.hindrances.length === 0) {
      selected.innerHTML = '<div style="color: #888; font-style: italic; padding: 10px;">Nie wybrano jeszcze żadnych Zawad.</div>';
    } else {
      currentChar.hindrances.forEach((h, idx) => {
        const item = document.createElement('div');
        item.style.padding = '6px 10px';
        item.style.background = '#fef6f6';
        item.style.border = '1px solid #f0d0d0';
        item.style.borderRadius = '4px';
        item.style.marginBottom = '6px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
          <div>
            <strong>${h.name}</strong> 
            <span style="font-size: 0.8rem; color: var(--sw-red);">(${h.severity} - ${h.points} pkt)</span>
          </div>
          <button class="sw-btn" data-remove-hindrance="${idx}" style="font-size: 0.75rem; padding: 2px 6px;">✕ Usuń</button>
        `;

        selected.appendChild(item);
      });

      selected.querySelectorAll('[data-remove-hindrance]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.removeHindrance, 10);
          currentChar.hindrances.splice(idx, 1);
          renderHindrances();
          updateTrackerBadges();
          renderSheet();
        });
      });
    }

    // Odświeżenie pól wymiany
    document.getElementById('spend-attr-val').textContent = currentChar.hindranceSpend.attr;
    document.getElementById('spend-edge-val').textContent = currentChar.hindranceSpend.edge;
    document.getElementById('spend-skill-val').textContent = currentChar.hindranceSpend.skill;
    document.getElementById('spend-funds-val').textContent = currentChar.hindranceSpend.funds;
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
      const item = document.createElement('div');
      item.style.padding = '8px';
      item.style.borderBottom = '1px solid #eee';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.gap = '10px';

      item.innerHTML = `
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <strong>${edge.name}</strong> 
            <span style="font-size: 0.75rem; background: #eee; padding: 2px 5px; border-radius: 3px;">${edge.category || edge.type}</span>
            ${getSourceBadgeHtml(edge.source)}
          </div>
          <span style="font-size: 0.75rem; color: #888;">Wymagania: ${edge.requirements || edge.req || 'Brak'}</span>
          <div style="font-size: 0.8rem; color: #444; margin-top: 2px;">${edge.desc}</div>
        </div>
        <button class="sw-btn ${isChosen ? '' : 'btn-primary'}" data-add-edge="${edge.name}" style="white-space: nowrap; font-size: 0.8rem;" ${isChosen ? 'disabled' : ''}>
          ${isChosen ? 'Wybrano' : '+ Dodaj'}
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

    // Metryczka
    document.getElementById('sheet-name').textContent = currentChar.name || 'Nowy Bohater';
    document.getElementById('sheet-race').textContent = currentChar.raceName || 'Człowiek';
    document.getElementById('sheet-rank').textContent = stats.rank;
    document.getElementById('sheet-bennies').textContent = stats.bennies;
    document.getElementById('sheet-height').textContent = currentChar.appearance ? currentChar.appearance.split(',')[0] : '—';
    document.getElementById('sheet-weight-bio').textContent = currentChar.appearance ? (currentChar.appearance.split(',')[1] || '—') : '—';

    const race = getRaceConfig(currentChar.raceId);
    document.getElementById('sheet-size').textContent = race.size !== undefined ? race.size : '0';

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

      let diceTrack = `
        <div class="sheet-dice-track" style="transform: scale(0.85); transform-origin: right center;">
          <span class="sheet-die-step ${skill.die === 'k4' ? 'active' : ''}">4</span>
          <span class="sheet-die-step ${skill.die === 'k6' ? 'active' : ''}">6</span>
          <span class="sheet-die-step ${skill.die === 'k8' ? 'active' : ''}">8</span>
          <span class="sheet-die-step ${skill.die === 'k10' ? 'active' : ''}">10</span>
          <span class="sheet-die-step ${skill.die === 'k12' ? 'active' : ''}">12</span>
        </div>
      `;

      row.innerHTML = `
        <span style="font-weight: 600;">${skill.name}</span>
        ${diceTrack}
      `;
      skillsContainer.appendChild(row);
    });

    // Uzupełnij puste linie umiejętności do minimum 8 pozycji
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

    // Sprzęt na karcie
    const gearList = document.getElementById('sheet-gear-rendered-list');
    gearList.innerHTML = '';
    const allGear = [
      ...currentChar.weapons.map(w => `${w.name} (${w.weight || 0} kg)`),
      ...currentChar.armorItems.map(a => `${a.name} (${a.weight || 0} kg)`),
      ...currentChar.gear.map(g => `${g.name} (${g.weight || 0} kg)`)
    ];

    allGear.forEach(itemStr => {
      const li = document.createElement('li');
      li.textContent = itemStr;
      gearList.appendChild(li);
    });

    // Uzupełnij puste linie sprzętu do minimum 6 pozycji
    const blankGearCount = Math.max(0, 6 - allGear.length);
    for (let i = 0; i < blankGearCount; i++) {
      const li = document.createElement('li');
      li.style.color = '#bbb';
      li.textContent = '................................................';
      gearList.appendChild(li);
    }

    document.getElementById('sheet-current-load').textContent = `${load.current} kg`;
    document.getElementById('sheet-max-load').textContent = `${load.max} kg`;

    // Zawady na karcie
    const hindrancesContainer = document.getElementById('sheet-hindrances-rendered-list');
    hindrancesContainer.innerHTML = '';
    if (currentChar.hindrances.length === 0) {
      hindrancesContainer.innerHTML = `
        <div style="color: #666;"><em>Brak Zawad</em></div>
        <div style="color: #bbb;">....................................................................</div>
        <div style="color: #bbb;">....................................................................</div>
      `;
    } else {
      currentChar.hindrances.forEach(h => {
        const item = document.createElement('div');
        item.innerHTML = `<strong>${h.name}</strong> (${h.severity}) - <span style="color:#555;">${h.desc}</span>`;
        hindrancesContainer.appendChild(item);
      });
    }

    // Przewagi na karcie
    const edgesContainer = document.getElementById('sheet-edges-rendered-list');
    edgesContainer.innerHTML = '';
    if (currentChar.edges.length === 0) {
      edgesContainer.innerHTML = `
        <div style="color: #666;"><em>Brak Przewag</em></div>
        <div style="color: #bbb;">N: ................................................................</div>
        <div style="color: #bbb;">N: ................................................................</div>
      `;
    } else {
      currentChar.edges.forEach(e => {
        const item = document.createElement('div');
        item.innerHTML = `<strong>${e.name}</strong> - <span style="color:#555;">${e.desc}</span>`;
        edgesContainer.appendChild(item);
      });
    }

    // Tabela broni na karcie
    const weaponsTbody = document.getElementById('sheet-weapons-tbody');
    weaponsTbody.innerHTML = '';
    const weaponsList = currentChar.weapons || [];
    weaponsList.forEach(w => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${w.name}</strong></td>
        <td>${w.range || 'Wręcz'}</td>
        <td><strong>${w.damage || 'Si'}</strong></td>
        <td>${w.ap !== undefined ? w.ap : '—'}</td>
        <td>${w.rof || 1}</td>
        <td>${w.weight || 1} kg</td>
        <td>${w.notes || '—'}</td>
      `;
      weaponsTbody.appendChild(tr);
    });

    // Uzupełnij puste linie broni do minimum 3 pozycji
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

    // Tabela mocy na karcie
    const powersContainer = document.getElementById('sheet-powers-container');
    const powersTbody = document.getElementById('sheet-powers-tbody');
    if (currentChar.powers.length === 0) {
      powersContainer.style.display = 'none';
    } else {
      powersContainer.style.display = 'block';
      powersTbody.innerHTML = '';
      currentChar.powers.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${p.name}</strong></td>
          <td>${p.pm || 1}</td>
          <td>${p.range || 'Sp'}</td>
          <td>${p.duration || '5 rund'}</td>
          <td>${p.desc}</td>
        `;
        powersTbody.appendChild(tr);
      });
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
        horror: !!hasHorror,
        fantasy: !!hasFantasy
      };
    }
    currentChar.activeModules = { ...appState.activeModules };

    // Ustawienie wartości w polach formularza
    document.getElementById('char-name').value = currentChar.name || '';
    document.getElementById('char-concept').value = currentChar.concept || '';
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
          <button class="sw-btn btn-primary" data-load-char="${char.id}">Otwórz</button>
          <button class="sw-btn" data-export-char="${char.id}">JSON</button>
          <button class="sw-btn" data-delete-char="${char.id}" style="color: #9e1b1b;">Usuń</button>
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

    // Aktualizacja pól tekstu
    document.getElementById('char-name').addEventListener('input', (e) => {
      currentChar.name = e.target.value;
      document.getElementById('sheet-name').textContent = currentChar.name || 'Nowy Bohater';
    });

    document.getElementById('char-concept').addEventListener('input', (e) => {
      currentChar.concept = e.target.value;
    });

    document.getElementById('char-appearance').addEventListener('input', (e) => {
      currentChar.appearance = e.target.value;
    });

    document.getElementById('char-notes-area').addEventListener('input', (e) => {
      currentChar.notes = e.target.value;
      const notesPrint = document.getElementById('notes-print-display');
      if (notesPrint) notesPrint.textContent = e.target.value;
    });
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
