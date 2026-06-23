// Portfolio definitions — shares, acquisition prices, Twelve Data symbols.
// Live prices fetched from Twelve Data at runtime; gain/loss computed per position.
// Twelve Data symbol format: hyphens become dots, exchange suffix after colon (e.g. ATCO.B:OMX).
// EQQQ:LSE is priced in GBp (pence) — divide by 100 for GBP before converting to SEK.

const FX_SYMBOLS = ['USD/SEK', 'EUR/SEK', 'GBP/SEK', 'DKK/SEK'];
// Fallback FX rates if API is unavailable
const FX_FALLBACK = { USD: 10.35, EUR: 11.15, GBP: 13.05, DKK: 1.49 };

const PORTFOLIO_DEFS = {

  carl: {
    personaContext: `Carl, 29, Stockholm. Self-taught stock picker. Started investing during the COVID crash in March 2020 — that first buy (Atlas Copco at SEK 88) shaped everything that followed. Focused on Swedish industrials: companies he understands, reads about in Dagens Industri, follows closely. Has been accumulating positions from 2020 through mid-2025, when he stopped trading due to lack of time. His last trades were SSAB and Husqvarna in 2025. Has an old Avanza account with two Swedish index funds set up years ago, largely forgotten. Rents his apartment.`,
    accounts: [
      {
        id: 'nordnet',
        label: 'Nordnet ISK',
        positions: [
          { sym: 'ATCO.B:OMX',  name: 'Atlas Copco B',     isin: 'SE0011166610', type: 'stock', shares: 90,  acqPrice: 88,  acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: 'Mar 2020 — COVID dip, first buy' },
          { sym: 'VOLV.B:OMX',  name: 'Volvo B',            isin: 'SE0000115446', type: 'stock', shares: 55,  acqPrice: 148, acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: 'Apr 2020' },
          { sym: 'SAND:OMX',    name: 'Sandvik',            isin: 'SE0000667891', type: 'stock', shares: 65,  acqPrice: 142, acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: 'Apr 2020' },
          { sym: 'HEXA.B:OMX',  name: 'Hexagon B',          isin: 'SE0015961909', type: 'stock', shares: 110, acqPrice: 105, acqCcy: 'SEK', sector: 'Technology',  country: 'Sweden',      acqNote: '2021' },
          { sym: 'SEB.A:OMX',   name: 'SEB A',              isin: 'SE0000148884', type: 'stock', shares: 75,  acqPrice: 118, acqCcy: 'SEK', sector: 'Financials',  country: 'Sweden',      acqNote: '2021' },
          { sym: 'INVE.B:OMX',  name: 'Investor B',         isin: 'SE0015811955', type: 'stock', shares: 45,  acqPrice: 215, acqCcy: 'SEK', sector: 'Financials',  country: 'Sweden',      acqNote: '2021' },
          { sym: 'SWED.A:OMX',  name: 'Swedbank A',         isin: 'SE0000242455', type: 'stock', shares: 60,  acqPrice: 175, acqCcy: 'SEK', sector: 'Financials',  country: 'Sweden',      acqNote: '2021' },
          { sym: 'ERIC.B:OMX',  name: 'Ericsson B',         isin: 'SE0000108656', type: 'stock', shares: 350, acqPrice: 74,  acqCcy: 'SEK', sector: 'Technology',  country: 'Sweden',      acqNote: '2022 — bought the dip' },
          { sym: 'ALFA:OMX',    name: 'Alfa Laval',         isin: 'SE0000695876', type: 'stock', shares: 40,  acqPrice: 378, acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: '2022' },
          { sym: 'SKF.B:OMX',   name: 'SKF B',              isin: 'SE0000108227', type: 'stock', shares: 50,  acqPrice: 185, acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: '2022' },
          { sym: 'NIBE.B:OMX',  name: 'NIBE Industrier B',  isin: 'SE0015988019', type: 'stock', shares: 200, acqPrice: 58,  acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: '2023–24 — averaged down as NIBE fell from SEK 90+' },
          { sym: 'ABB:OMX',     name: 'ABB',                isin: 'CH0012221716', type: 'stock', shares: 25,  acqPrice: 385, acqCcy: 'SEK', sector: 'Industrials', country: 'Switzerland', acqNote: '2023–24' },
          { sym: 'SSAB.A:OMX',  name: 'SSAB A',             isin: 'SE0000171886', type: 'stock', shares: 150, acqPrice: 72,  acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: '2025' },
          { sym: 'HUSQ.B:OMX',  name: 'Husqvarna B',        isin: 'SE0001662230', type: 'stock', shares: 100, acqPrice: 52,  acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',      acqNote: 'Mid-2025 — last trade before stopping' },
        ],
      },
      {
        id: 'avanza',
        label: 'Avanza',
        note: 'Old account, set up before active trading. Two Swedish index funds, largely forgotten.',
        positions: [
          { sym: null, name: 'SPP Global Solutions',               isin: 'SE0006249839', type: 'fund', shares: 500, acqPrice: 38, acqCcy: 'SEK', sector: 'Global Equity Fund', country: 'Global' },
          { sym: null, name: 'Länsförsäkringar Global Indexnära',  isin: 'SE0005188851', type: 'fund', shares: 320, acqPrice: 72, acqCcy: 'SEK', sector: 'Global Equity Fund', country: 'Global' },
        ],
      },
    ],
  },

  sara: {
    personaContext: `Sara, 34, Stockholm. Lawyer at a major firm for 5 years. Subject to strict compliance rules: must notify compliance before any trade, 30-day hold periods on acquisitions and disposals. She avoids trading entirely as a result. Her salary accumulates in a SEB current account tied to her mortgage — the friction of investing feels too high to overcome. Set up an Avanza account in 2021 when she first started earning properly: bought four positions quickly, has not touched them since. Owns an apartment in Stockholm: estimated SEK 4,800,000, mortgage of SEK 2,900,000 with SEB (equity ~SEK 1,900,000). The same bank holds her idle cash and her mortgage.`,
    accounts: [
      {
        id: 'avanza',
        label: 'Avanza',
        note: 'Set up 2021, untouched since. 4 positions chosen quickly in her first year of earning properly.',
        positions: [
          { sym: 'VWCE:XETR',   name: 'Vanguard FTSE All-World UCITS ETF', isin: 'IE00B3RBWM25', type: 'etf',   shares: 20, acqPrice: 94,  acqCcy: 'EUR', sector: 'Global ETF',  country: 'Global', acqNote: '2021 — "someone told me this is the smart thing to do"' },
          { sym: 'ATCO.B:OMX',  name: 'Atlas Copco B',                      isin: 'SE0011166610', type: 'stock', shares: 12, acqPrice: 152, acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden', acqNote: '2022 — recognised the name' },
          { sym: 'SWED.A:OMX',  name: 'Swedbank A',                         isin: 'SE0000242455', type: 'stock', shares: 20, acqPrice: 168, acqCcy: 'SEK', sector: 'Financials',  country: 'Sweden', acqNote: '2021 — her own bank' },
          { sym: 'ERIC.B:OMX',  name: 'Ericsson B',                         isin: 'SE0000108656', type: 'stock', shares: 40, acqPrice: 96,  acqCcy: 'SEK', sector: 'Technology',  country: 'Sweden', acqNote: '2021 — tech name she knew' },
        ],
      },
    ],
    cashAccounts: [
      { label: 'SEB Current Account', valueSEK: 520000, note: 'Tied to mortgage. Earns near zero.' },
      { label: 'Swedbank Savings',     valueSEK: 78000,  note: 'Low-yield savings.' },
    ],
    property: {
      label: 'Apartment, Stockholm',
      estimatedValueSEK: 4800000,
      mortgageSEK: 2900000,
      mortgageHolder: 'SEB',
    },
  },

  erik: {
    personaContext: `Erik, 43, Göteborg. Engineering manager at a mid-size tech company. Has been investing deliberately since his late 20s. Built a globally diversified core through VWCE — bought at launch in 2019 and averaged down heavily during the COVID crash in March 2020. Added EQQQ in 2021 as a deliberate tech tilt. In H2 2024, once the AI capex thesis was clearly playing out, he bought Nvidia directly at ~$110 post-split — a considered position, not speculation. Added ASML the same year as the pick-and-shovel play on AI infrastructure. Understands diversification, index composition, factor exposure, and correlation. Tracks everything in a monthly spreadsheet. The spreadsheet captures individual positions accurately but cannot show aggregate single-name exposure across overlapping ETFs — specifically, how much Nvidia he carries directly, via EQQQ, and via VWCE simultaneously. Banking with SEB. Has a Nordea account he never closed after switching banks years ago. Has a forgotten Handelsbanken joint account from a previous relationship. Owns his Göteborg apartment outright.`,
    accounts: [
      {
        id: 'avanza',
        label: 'Avanza',
        note: 'Deliberately constructed since 2019. VWCE as core, individual positions around it.',
        positions: [
          { sym: 'VWCE:XETR',    name: 'Vanguard FTSE All-World UCITS ETF', isin: 'IE00B3RBWM25', type: 'etf',   shares: 200, acqPrice: 70,   acqCcy: 'EUR', sector: 'Global ETF',  country: 'Global',       acqNote: '2019 launch + Mar 2020 COVID crash avg down. NVDA ~3.5% of FTSE All-World.' },
          { sym: 'NVDA',          name: 'Nvidia',                             isin: 'US67066G1040', type: 'stock', shares: 80,  acqPrice: 110,  acqCcy: 'USD', sector: 'Technology',  country: 'USA',          acqNote: 'H2 2024 — bought once the AI capex thesis was clearly playing out. Also inside EQQQ (~8% of Nasdaq-100) and VWCE (~3.5% of FTSE All-World).' },
          { sym: 'EQQQ:LSE',      name: 'Invesco Nasdaq-100 UCITS ETF',      isin: 'IE0032077012', type: 'etf',   shares: 120, acqPrice: 3100, acqCcy: 'GBp', sector: 'Technology',  country: 'Global',       acqNote: '2021. Price in GBp (pence). NVDA ~8% of Nasdaq-100 index.' },
          { sym: 'ATCO.B:OMX',   name: 'Atlas Copco B',                      isin: 'SE0011166610', type: 'stock', shares: 75,  acqPrice: 138,  acqCcy: 'SEK', sector: 'Industrials', country: 'Sweden',       acqNote: '2022 market dip' },
          { sym: 'NOVO.B:OMXC',  name: 'Novo Nordisk B',                     isin: 'DK0060534915', type: 'stock', shares: 50,  acqPrice: 730,  acqCcy: 'DKK', sector: 'Healthcare',  country: 'Denmark',      acqNote: '2021–22, pre-GLP1 explosion. Pharma diversification thesis.' },
          { sym: 'INVE.B:OMX',   name: 'Investor B',                         isin: 'SE0015811955', type: 'stock', shares: 60,  acqPrice: 210,  acqCcy: 'SEK', sector: 'Financials',  country: 'Sweden',       acqNote: '2022' },
          { sym: 'ASML:Euronext', name: 'ASML',                               isin: 'NL0010273215', type: 'stock', shares: 8,   acqPrice: 520,  acqCcy: 'EUR', sector: 'Technology',  country: 'Netherlands',  acqNote: '2023 pullback — AI capex pick-and-shovel. Correlated with Nvidia cycle.' },
          { sym: 'SEB.A:OMX',    name: 'SEB A',                               isin: 'SE0000148884', type: 'stock', shares: 80,  acqPrice: 112,  acqCcy: 'SEK', sector: 'Financials',  country: 'Sweden',       acqNote: '2022. Owns shares in the same bank holding his savings account.' },
        ],
      },
      { id: 'seb',            label: 'SEB Savings',       valueSEK: 210000, note: 'Cash savings. Primary banking relationship.', positions: [] },
      { id: 'nordea',         label: 'Nordea',             valueSEK: 44000,  note: 'Old account — never closed after switching banks.', positions: [] },
      { id: 'handelsbanken',  label: 'Handelsbanken',      valueSEK: 12000,  note: 'Forgotten joint account from a previous relationship.', positions: [] },
    ],
    property: {
      label: 'Apartment, Göteborg',
      estimatedValueSEK: 4200000,
      mortgageSEK: 0,
    },
  },
};

// ─── TWELVE DATA FETCH ────────────────────────────────────────

async function fetchTwelveData(symbols) {
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) {
    console.error('TWELVE_DATA_API_KEY is not set');
    return { prices: {}, fx: {} };
  }

  const unique = [...new Set(symbols.filter(Boolean))];
  const allSymbols = [...unique, ...FX_SYMBOLS];
  const url = `https://api.twelvedata.com/price?symbol=${encodeURIComponent(allSymbols.join(','))}&apikey=${apiKey}`;

  console.log(`Twelve Data: requesting ${allSymbols.length} symbols (${unique.length} prices + ${FX_SYMBOLS.length} FX)`);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Twelve Data HTTP ${res.status}:`, body.slice(0, 300));
      return { prices: {}, fx: {} };
    }

    const data = await res.json();
    const prices = {};
    const fx = {};

    for (const sym of unique) {
      const entry = data[sym];
      if (entry?.price && !entry.code) {
        prices[sym] = parseFloat(entry.price);
      } else if (entry?.code) {
        console.warn(`Twelve Data [${sym}]: ${entry.message ?? entry.code}`);
      }
    }

    const fxKeys = { 'USD/SEK': 'USD', 'EUR/SEK': 'EUR', 'GBP/SEK': 'GBP', 'DKK/SEK': 'DKK' };
    for (const [pair, ccy] of Object.entries(fxKeys)) {
      const entry = data[pair];
      if (entry?.price && !entry.code) fx[ccy] = parseFloat(entry.price);
    }

    console.log(`Twelve Data OK: ${Object.keys(prices).length}/${unique.length} prices, ${Object.keys(fx).length}/4 FX rates`);
    return { prices, fx };
  } catch (err) {
    console.error('Twelve Data fetch error:', err.message);
    return { prices: {}, fx: {} };
  }
}

// ─── CURRENCY CONVERSION ──────────────────────────────────────

function toSEK(amount, ccy, fx) {
  if (ccy === 'SEK') return amount;
  // GBp = British pence: divide by 100 first, then apply GBP/SEK
  if (ccy === 'GBp') return (amount / 100) * (fx['GBP'] ?? FX_FALLBACK['GBP']);
  return amount * (fx[ccy] ?? FX_FALLBACK[ccy] ?? 1);
}

// ─── POSITION COMPUTATION ─────────────────────────────────────

function computePosition(pos, prices, fx) {
  const currentPrice = pos.sym ? prices[pos.sym] : null;
  const hasCurrent = currentPrice != null;

  const currentValueSEK = hasCurrent
    ? toSEK(pos.shares * currentPrice, pos.acqCcy, fx)
    : null;

  const costBasisSEK = toSEK(pos.shares * pos.acqPrice, pos.acqCcy, fx);

  // Gain/loss in local currency (avoids FX noise — investor sees this in their brokerage)
  const glPct = hasCurrent ? ((currentPrice - pos.acqPrice) / pos.acqPrice) * 100 : null;
  const glSEK = hasCurrent ? currentValueSEK - costBasisSEK : null;

  return { ...pos, currentPrice, currentValueSEK, costBasisSEK, glPct, glSEK };
}

function computeAccount(account, prices, fx) {
  const computedPositions = account.positions.map(p => computePosition(p, prices, fx));

  const totalCurrentSEK = computedPositions.reduce((s, p) => s + (p.currentValueSEK ?? p.costBasisSEK), 0);
  const totalCostSEK = computedPositions.reduce((s, p) => s + p.costBasisSEK, 0);
  const totalGLSEK = computedPositions.reduce((s, p) => s + (p.glSEK ?? 0), 0);
  const hasLive = computedPositions.some(p => p.currentValueSEK != null);

  const positionsWithWeight = computedPositions.map(p => ({
    ...p,
    weight: totalCurrentSEK > 0 ? (p.currentValueSEK ?? p.costBasisSEK) / totalCurrentSEK : 0,
  }));

  return {
    ...account,
    computedPositions: positionsWithWeight,
    totalValueSEK: totalCurrentSEK,
    totalCostSEK,
    totalGLSEK,
    hasLive,
  };
}

// ─── PROMPT BUILDER ───────────────────────────────────────────

function fmtGL(glPct) {
  if (glPct == null) return 'n/a';
  return (glPct >= 0 ? '+' : '') + glPct.toFixed(1) + '%';
}

function fmtSEK(n) {
  return 'SEK ' + Math.round(n).toLocaleString('sv-SE');
}

function buildPromptText(personaId, def, computedAccounts) {
  const hasAnyLive = computedAccounts.some(a => a.hasLive);
  const lines = [];

  lines.push('═══ PORTFOLIO DATA' + (hasAnyLive ? ' (live prices)' : ' (static — live prices unavailable)') + ' ═══');
  if (!hasAnyLive) {
    lines.push('NOTE: Live prices unavailable. Gain/loss figures are estimates from cost basis only. Do not claim to know current market prices — reference position structure and acquisition prices instead.');
  }
  lines.push('');
  lines.push('PERSONA CONTEXT:');
  lines.push(def.personaContext);
  lines.push('');

  for (const account of computedAccounts) {
    const valueStr = fmtSEK(account.totalValueSEK);
    const glStr = account.hasLive && account.totalGLSEK !== 0
      ? ` · total gain/loss: ${account.totalGLSEK >= 0 ? '+' : ''}${fmtSEK(account.totalGLSEK)} (${fmtGL((account.totalGLSEK / account.totalCostSEK) * 100)})`
      : '';

    lines.push(`${account.label} — ${valueStr}${glStr}`);
    if (account.note) lines.push(`  (${account.note})`);

    if (account.positions.length === 0) {
      if (account.valueSEK) lines.push(`  Cash — ${fmtSEK(account.valueSEK)}`);
      lines.push('');
      continue;
    }

    const sectorMap = {};
    const geoMap = {};

    for (const pos of account.computedPositions) {
      const wt = (pos.weight * 100).toFixed(0) + '%';
      const gl = fmtGL(pos.glPct);
      const acqInfo = pos.acqCcy === 'GBp'
        ? `${pos.acqPrice}GBp`
        : pos.acqCcy === 'SEK'
          ? `SEK ${pos.acqPrice}`
          : `${pos.acqCcy} ${pos.acqPrice}`;
      const note = pos.acqNote ? ` ← ${pos.acqNote}` : '';

      lines.push(`  ${pos.name.padEnd(42)} ${wt.padStart(4)} · since acq: ${gl.padEnd(8)} (avg cost ${acqInfo})${note}`);

      const s = pos.sector ?? 'Other';
      sectorMap[s] = (sectorMap[s] ?? 0) + pos.weight;
      const g = pos.country ?? 'Unknown';
      geoMap[g] = (geoMap[g] ?? 0) + pos.weight;
    }

    const sectors = Object.entries(sectorMap)
      .sort((a, b) => b[1] - a[1])
      .map(([s, w]) => `${s} ${(w * 100).toFixed(0)}%`)
      .join(' · ');
    lines.push(`  Sectors: ${sectors}`);

    const geos = Object.entries(geoMap)
      .sort((a, b) => b[1] - a[1])
      .map(([g, w]) => `${g} ${(w * 100).toFixed(0)}%`)
      .join(' · ');
    lines.push(`  Geography: ${geos}`);
    lines.push('');
  }

  if (def.cashAccounts) {
    lines.push('CASH / SAVINGS:');
    for (const c of def.cashAccounts) {
      lines.push(`  ${c.label}: ${fmtSEK(c.valueSEK)}${c.note ? ' — ' + c.note : ''}`);
    }
    lines.push('');
  }

  if (def.property) {
    const equity = def.property.estimatedValueSEK - def.property.mortgageSEK;
    lines.push(`PROPERTY — ${def.property.label}`);
    lines.push(`  Estimated value: ${fmtSEK(def.property.estimatedValueSEK)}`);
    if (def.property.mortgageSEK > 0) {
      lines.push(`  Mortgage outstanding: ${fmtSEK(def.property.mortgageSEK)}${def.property.mortgageHolder ? ' (' + def.property.mortgageHolder + ')' : ''}`);
      lines.push(`  Net equity: ${fmtSEK(equity)}`);
    } else {
      lines.push(`  Fully paid — equity: ${fmtSEK(equity)}`);
    }
    lines.push('');
  }

  lines.push('KEY TENSIONS TO SURFACE (pick the most relevant for the conversation):');
  const tensions = buildTensions(personaId, def, computedAccounts);
  for (const t of tensions) lines.push(`• ${t}`);
  lines.push('');
  lines.push('═══ END PORTFOLIO DATA ═══');

  return lines.join('\n');
}

// ─── TENSIONS BUILDER ─────────────────────────────────────────

function buildTensions(personaId, def, computedAccounts) {
  const t = [];

  if (personaId === 'carl') {
    const nordnet = computedAccounts.find(a => a.id === 'nordnet');
    const positions = nordnet?.computedPositions ?? [];
    const total = nordnet?.totalValueSEK ?? 0;

    const industrialPct = total > 0
      ? positions.filter(p => p.sector === 'Industrials').reduce((s, p) => s + (p.currentValueSEK ?? p.costBasisSEK), 0) / total * 100
      : 0;
    t.push(`Swedish industrial sector = ${industrialPct.toFixed(0)}% of Nordnet portfolio (Atlas Copco, Volvo, Sandvik, Alfa Laval, SKF, NIBE, ABB, SSAB, Husqvarna combined)`);

    const sorted = [...positions].sort((a, b) => (b.currentValueSEK ?? 0) - (a.currentValueSEK ?? 0));
    const top3 = sorted.slice(0, 3);
    const top3Pct = total > 0 ? top3.reduce((s, p) => s + (p.currentValueSEK ?? 0), 0) / total * 100 : 0;
    if (top3.length >= 3) {
      const names = top3.map(p => `${p.name} ${((p.currentValueSEK ?? 0) / total * 100).toFixed(0)}%`).join(', ');
      t.push(`Top 3 positions: ${names} = ${top3Pct.toFixed(0)}% combined. Professional portfolio management typically caps single-name exposure at 5%.`);
    }

    const eric = positions.find(p => p.sym === 'ERIC.B:OMX');
    if (eric?.glPct != null && eric.glPct < 0) {
      t.push(`Ericsson B: ${fmtGL(eric.glPct)} since purchase at SEK ${eric.acqPrice} in 2022 — bought the dip, has not recovered. One of his larger positions by share count (350 shares).`);
    }

    const nibe = positions.find(p => p.sym === 'NIBE.B:OMX');
    if (nibe?.glPct != null) {
      t.push(`NIBE Industrier B: ${fmtGL(nibe.glPct)} since averaging down at SEK ${nibe.acqPrice} in 2023–24 — bought as the stock fell from SEK 90+`);
    }

    t.push('Zero direct US or global equity exposure in Nordnet — global diversification is only via the Avanza funds, which have never been integrated into the overall strategy');
    t.push('Avanza account (two Swedish index funds, set up pre-active-trading) has never been consolidated with Nordnet — two separate approaches that have never been looked at together');
    t.push('Last trade: mid-2025. Portfolio has been drifting with no oversight since then — sector weights and position sizes have shifted with market movements');
  }

  if (personaId === 'sara') {
    const sebCash = def.cashAccounts[0].valueSEK;
    const swedbankCash = def.cashAccounts[1].valueSEK;
    const totalCash = sebCash + swedbankCash;
    t.push(`Idle cash: ${fmtSEK(totalCash)} across two accounts earning near zero — ${fmtSEK(sebCash)} in SEB current account (same bank as mortgage) + ${fmtSEK(swedbankCash)} in Swedbank savings`);
    t.push('Compliance rules (30-day hold periods, pre-trade notifications) make self-directed investing impractical. A discretionary mandate bypasses this entirely — the manager trades, she does not.');

    const avanza = computedAccounts.find(a => a.id === 'avanza');
    if (avanza) {
      const totalGL = avanza.totalGLSEK;
      const totalGLPct = avanza.totalCostSEK > 0 ? (totalGL / avanza.totalCostSEK) * 100 : 0;
      if (Math.abs(totalGLPct) > 2) {
        t.push(`Avanza portfolio overall: ${fmtGL(totalGLPct)} (${totalGL >= 0 ? '+' : ''}${fmtSEK(totalGL)}) since 2021 purchases — she has not checked`);
      }

      const vwce = avanza.computedPositions.find(p => p.sym === 'VWCE:XETR');
      if (vwce?.glPct != null) {
        const wt = (vwce.weight * 100).toFixed(0);
        t.push(`VWCE (${wt}% of Avanza): ${fmtGL(vwce.glPct)} since purchase at €${vwce.acqPrice} in 2021 — her biggest position and the one that "everyone told her was the smart thing to do" has been the right call`);
      }

      const eric = avanza.computedPositions.find(p => p.sym === 'ERIC.B:OMX');
      if (eric?.glPct != null && eric.glPct < -5) {
        t.push(`Ericsson B: ${fmtGL(eric.glPct)} since purchase at SEK ${eric.acqPrice} in 2021 — the "tech name she knew" has underperformed`);
      }
    }

    t.push('Apartment in Stockholm: estimated SEK 4,800,000, mortgage SEK 2,900,000 with SEB — equity ~SEK 1,900,000. Same bank holds mortgage and idle cash.');
    t.push('emilli discretionary mandate threshold: SEK 500,000. She is at SEK ' + totalCash.toLocaleString('sv-SE') + ' in cash alone.');
  }

  if (personaId === 'erik') {
    const avanza = computedAccounts.find(a => a.id === 'avanza');
    const positions = avanza?.computedPositions ?? [];

    const nvda  = positions.find(p => p.sym === 'NVDA');
    const vwce  = positions.find(p => p.sym === 'VWCE:XETR');
    const eqqq  = positions.find(p => p.sym === 'EQQQ:LSE');
    const asml  = positions.find(p => p.sym === 'ASML:Euronext');

    const nvdaWt  = nvda?.weight  ?? 0.33;
    const vwceWt  = vwce?.weight  ?? 0.39;
    const eqqqWt  = eqqq?.weight  ?? 0.10;
    const asmlWt  = asml?.weight  ?? 0.08;

    const nvdaViaEqqq = eqqqWt * 0.08;
    const nvdaViaVwce = vwceWt * 0.035;
    const nvdaTotal   = (nvdaWt + nvdaViaEqqq + nvdaViaVwce) * 100;
    const vwceTech    = vwceWt * 0.22 * 100;
    const techTotal   = (nvdaWt + eqqqWt + asmlWt) * 100 + vwceTech;

    t.push(`Nvidia triple-exposure: ${(nvdaWt*100).toFixed(0)}% direct + ~${(nvdaViaEqqq*100).toFixed(1)}% via EQQQ Nasdaq-100 (NVDA ~8% of index) + ~${(nvdaViaVwce*100).toFixed(1)}% via VWCE (NVDA ~3.5% of FTSE All-World) = ~${nvdaTotal.toFixed(0)}% effective NVDA exposure. His spreadsheet shows ${(nvdaWt*100).toFixed(0)}%.`);
    t.push(`Technology concentration: Nvidia direct (${(nvdaWt*100).toFixed(0)}%) + EQQQ (${(eqqqWt*100).toFixed(0)}%) + tech inside VWCE (~${vwceTech.toFixed(0)}%) + ASML (${(asmlWt*100).toFixed(0)}%) = ~${techTotal.toFixed(0)}%. He considers himself globally diversified — he is, except in technology.`);
    t.push(`ASML is semiconductor equipment — the pick-and-shovel play on AI capex. Correlated with Nvidia: when AI infrastructure spend slows, both are hit. Adding ASML is concentration in the same theme, not diversification away from it.`);

    if (nvda?.glPct != null) {
      t.push(`Nvidia: ${fmtGL(nvda.glPct)} since avg cost $${nvda.acqPrice} post-split (150 shares 2021 + 300 shares Jan 2023). At ~${nvdaTotal.toFixed(0)}% effective portfolio exposure, this is the single largest driver of total returns.`);
    }

    const novo = positions.find(p => p.sym === 'NOVO.B:OMXC');
    if (novo?.glPct != null) {
      t.push(`Novo Nordisk B: ${fmtGL(novo.glPct)} since DKK ${novo.acqPrice} (bought 2021–22, pre-GLP1 explosion)`);
    }

    if (vwce?.glPct != null) {
      t.push(`VWCE core: ${fmtGL(vwce.glPct)} since avg cost €${vwce.acqPrice} (first bought at launch 2019, added heavily at March 2020 COVID crash)`);
    }

    t.push('Financial picture is fragmented across 3–4 institutions. The monthly spreadsheet tracks individual positions — it cannot show aggregate single-name exposure across overlapping ETF holdings. That is exactly the blind spot.');
    t.push(`Göteborg apartment: fully paid, SEK 4,200,000 equity — never discussed in the context of total wealth allocation`);
    t.push('SEB A (Avanza position): owns shares in the same bank holding his day-to-day savings — concentration in a single institution across two asset types');
  }

  return t;
}

// ─── HANDLER ─────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { personaId, tweakValue } = req.body ?? {};
  const baseDef = PORTFOLIO_DEFS[personaId];
  if (!baseDef) return res.status(400).json({ error: 'Invalid persona' });

  // Sara slider: tweaks her SEB cash account amount without mutating the shared definition
  let def = baseDef;
  if (personaId === 'sara' && typeof tweakValue === 'number' && tweakValue > 0) {
    def = {
      ...baseDef,
      cashAccounts: [
        { ...baseDef.cashAccounts[0], valueSEK: tweakValue },
        ...baseDef.cashAccounts.slice(1),
      ],
    };
  }

  // Collect all Twelve Data symbols across accounts
  const symbols = [];
  for (const account of def.accounts) {
    for (const pos of account.positions) {
      if (pos.sym) symbols.push(pos.sym);
    }
  }

  const { prices, fx } = await fetchTwelveData([...new Set(symbols)]);
  const liveData = Object.keys(prices).length > 0;

  // Compute metrics per account
  const computedAccounts = def.accounts.map(account => computeAccount(account, prices, fx));

  const promptText = buildPromptText(personaId, def, computedAccounts);

  // Summary data for the front-end (positions with current values and gain/loss)
  const portfolioSummary = computedAccounts.map(account => ({
    id: account.id,
    label: account.label,
    totalValueSEK: account.totalValueSEK,
    totalGLSEK: account.totalGLSEK,
    totalGLPct: account.totalCostSEK > 0 ? (account.totalGLSEK / account.totalCostSEK) * 100 : null,
    hasLive: account.hasLive,
    positions: account.computedPositions.map(p => ({
      name: p.name,
      sym: p.sym,
      isin: p.isin,
      type: p.type,
      shares: p.shares,
      acqPrice: p.acqPrice,
      acqCcy: p.acqCcy,
      currentPrice: p.currentPrice,
      currentValueSEK: p.currentValueSEK,
      costBasisSEK: p.costBasisSEK,
      glPct: p.glPct,
      glSEK: p.glSEK,
      weight: p.weight,
      sector: p.sector,
      country: p.country,
    })),
  }));

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  return res.status(200).json({
    promptText,
    portfolioSummary,
    liveData,
    fetchedAt: new Date().toISOString(),
  });
};
