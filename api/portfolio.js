// Static portfolio definitions — tickers, weights, sector, country.
// Live price/performance data is fetched from Yahoo Finance at runtime.
// Weights must sum to 1.0 per account.

const PORTFOLIO_DEFS = {
  carl: {
    personaContext: `Carl, 29, Stockholm. Active stock picker. Uses Nordnet as primary broker (switched from Avanza for deeper research tools). Reads Dagens Industri, listens to Fill or Kill podcast. Self-taught, started during the Reddit/GameStop era. Now focuses on top European companies by market cap. Has an old Avanza account he never integrated into his strategy. Rents his apartment.`,
    accounts: [
      {
        label: 'Nordnet ISK',
        valueSEK: 187000,
        positions: [
          { ticker: 'ATCO-B.ST',  name: 'Atlas Copco B',                      weight: 0.15, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'VOLV-B.ST',  name: 'Volvo B',                             weight: 0.12, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'HEXA-B.ST',  name: 'Hexagon B',                           weight: 0.10, sector: 'Technology',             country: 'Sweden' },
          { ticker: 'NOVO-B.CO',  name: 'Novo Nordisk B',                      weight: 0.09, sector: 'Healthcare',             country: 'Denmark' },
          { ticker: 'ERIC-B.ST',  name: 'Ericsson B',                          weight: 0.08, sector: 'Technology',             country: 'Sweden' },
          { ticker: 'SAND.ST',    name: 'Sandvik',                             weight: 0.07, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'EVO.ST',     name: 'Evolution',                           weight: 0.07, sector: 'Consumer Discretionary', country: 'Sweden' },
          { ticker: 'HMB.ST',     name: 'H&M B',                              weight: 0.06, sector: 'Consumer Discretionary', country: 'Sweden' },
          { ticker: 'KINV-B.ST',  name: 'Kinnevik B',                         weight: 0.05, sector: 'Financials',             country: 'Sweden' },
          { ticker: 'ASML.AS',    name: 'ASML',                               weight: 0.05, sector: 'Technology',             country: 'Netherlands' },
          { ticker: 'NIBE-B.ST',  name: 'Nibe Industrier B',                  weight: 0.04, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'SKF-B.ST',   name: 'SKF B',                              weight: 0.04, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'LIFCO-B.ST', name: 'Lifco B',                            weight: 0.04, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'VWCE.DE',    name: 'Vanguard FTSE All-World UCITS ETF',  weight: 0.04, sector: 'Global ETF',             country: 'Global' },
        ],
      },
      {
        label: 'Avanza',
        valueSEK: 43000,
        note: 'Old account, not part of active strategy. Set up when he started investing.',
        positions: [
          { ticker: null, name: 'SPP Global Solutions',               weight: 0.55, sector: 'Global Equity Fund', country: 'Global' },
          { ticker: null, name: 'Länsförsäkringar Global Indexnära', weight: 0.45, sector: 'Global Equity Fund', country: 'Global' },
        ],
      },
    ],
  },

  sara: {
    personaContext: `Sara, 34, Stockholm. Lawyer at a large firm. Subject to strict compliance rules: must flag every investment with compliance officer, 30-day hold periods before acquiring or disposing of any asset. Result: she avoids trading entirely. Her salary accumulates in a SEB current account tied to her mortgage — she has not moved it because the friction of investing feels too high. Set up an Avanza account in 2021 before the compliance restrictions became more burdensome; has not touched it since. Owns an apartment in Stockholm, estimated value SEK 4,800,000, mortgage of SEK 2,900,000 with SEB (equity ~SEK 1,900,000).`,
    accounts: [
      {
        label: 'Avanza',
        valueSEK: 31000,
        note: 'Set up in 2021, untouched since. 4 positions chosen quickly.',
        positions: [
          { ticker: 'NOVO-B.CO', name: 'Novo Nordisk B',                     weight: 0.30, sector: 'Healthcare',   country: 'Denmark', note: 'Bought on a colleague tip in 2021' },
          { ticker: 'INVE-B.ST', name: 'Investor B',                         weight: 0.25, sector: 'Financials',   country: 'Sweden',  note: 'Classic safe Swedish holding' },
          { ticker: 'ERIC-B.ST', name: 'Ericsson B',                         weight: 0.15, sector: 'Technology',   country: 'Sweden',  note: 'Looked promising in 2021' },
          { ticker: 'VWCE.DE',   name: 'Vanguard FTSE All-World UCITS ETF', weight: 0.30, sector: 'Global ETF',   country: 'Global' },
        ],
      },
    ],
    cashAccounts: [
      { label: 'SEB Current Account', valueSEK: 520000, note: 'Tied to mortgage. Earns near zero. Primary idle cash.' },
      { label: 'Swedbank Savings',     valueSEK: 78000,  note: 'Savings account, low yield.' },
    ],
    property: {
      label: 'Apartment, Stockholm',
      estimatedValueSEK: 4800000,
      mortgageSEK: 2900000,
      note: 'Mortgage held with SEB.',
    },
  },

  erik: {
    personaContext: `Erik, 43, Göteborg. Classic Swedish multi-bank tangle. Day-to-day banking with SEB. Opened Avanza separately for investing; has built positions over 15+ years, one at a time, with no overall strategy review. Has a Nordea account he never closed after switching banks. Has a forgotten Handelsbanken joint account. Owns an apartment in Göteborg — fully paid, estimated value SEK 4,200,000. Has never seen his full financial picture in one place.`,
    accounts: [
      {
        label: 'Avanza',
        valueSEK: 340000,
        note: 'Built up over 15+ years. Mix of long-term holds and accumulated positions.',
        positions: [
          { ticker: 'ATCO-B.ST',  name: 'Atlas Copco B',                      weight: 0.18, sector: 'Industrials',            country: 'Sweden',     note: 'Long-term core hold' },
          { ticker: 'VOLV-B.ST',  name: 'Volvo B',                            weight: 0.14, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'NOVO-B.CO',  name: 'Novo Nordisk B',                     weight: 0.12, sector: 'Healthcare',             country: 'Denmark' },
          { ticker: 'HMB.ST',     name: 'H&M B',                             weight: 0.10, sector: 'Consumer Discretionary', country: 'Sweden',     note: 'Held since early 2010s, down significantly from peak' },
          { ticker: 'ERIC-B.ST',  name: 'Ericsson B',                         weight: 0.08, sector: 'Technology',             country: 'Sweden',     note: 'Bought 2019-2020, has not performed' },
          { ticker: 'INVE-B.ST',  name: 'Investor B',                         weight: 0.08, sector: 'Financials',             country: 'Sweden' },
          { ticker: 'SEB-A.ST',   name: 'SEB A',                             weight: 0.07, sector: 'Financials',             country: 'Sweden',     note: 'Owns shares in the same bank where he keeps his savings' },
          { ticker: 'LIFCO-B.ST', name: 'Lifco B',                            weight: 0.10, sector: 'Industrials',            country: 'Sweden' },
          { ticker: 'VWCE.DE',    name: 'Vanguard FTSE All-World UCITS ETF', weight: 0.13, sector: 'Global ETF',             country: 'Global',     note: 'Added more recently' },
        ],
      },
      {
        label: 'SEB Savings',
        valueSEK: 210000,
        note: 'Cash savings. Primary banking relationship.',
        positions: [],
      },
      {
        label: 'Nordea',
        valueSEK: 44000,
        note: 'Old account. Never closed after switching banks.',
        positions: [],
      },
      {
        label: 'Handelsbanken',
        valueSEK: 12000,
        note: 'Forgotten joint account from a previous relationship.',
        positions: [],
      },
    ],
    property: {
      label: 'Apartment, Göteborg',
      estimatedValueSEK: 4200000,
      mortgageSEK: 0,
      note: 'Fully owned. No outstanding mortgage.',
    },
  },
};

// ─── YAHOO FINANCE FETCH ──────────────────────────────────────

async function fetchYahooQuotes(tickers) {
  if (!tickers.length) return {};
  const symbolStr = tickers.join(',');
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://finance.yahoo.com',
  };

  // Try query1, fall back to query2 if blocked (common on cloud IPs)
  const endpoints = [
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbolStr}&lang=en-US&region=US`,
    `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbolStr}&lang=en-US&region=US`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(7000) });
      if (!res.ok) {
        console.warn(`Yahoo Finance ${url.includes('query1') ? 'query1' : 'query2'} returned ${res.status}`);
        continue;
      }
      const data = await res.json();
      const results = data?.quoteResponse?.result ?? [];
      if (!results.length) {
        console.warn('Yahoo Finance returned empty result set');
        continue;
      }
      const map = {};
      for (const q of results) {
        // fiftyTwoWeekChangePercent is a fraction on some responses (0.34 = 34%), integer on others
        const raw52w = q.fiftyTwoWeekChangePercent;
        const change52w = raw52w != null
          ? (Math.abs(raw52w) < 5 ? raw52w * 100 : raw52w)
          : null;
        map[q.symbol] = {
          price:      q.regularMarketPrice ?? null,
          currency:   q.currency ?? 'SEK',
          change1d:   q.regularMarketChangePercent ?? null,
          change52w,
          pe:         q.trailingPE ?? q.forwardPE ?? null,
          marketCap:  q.marketCap ?? null,
        };
      }
      console.log(`Yahoo Finance OK via ${url.includes('query1') ? 'query1' : 'query2'}: ${Object.keys(map).length} quotes`);
      return map;
    } catch (err) {
      console.warn(`Yahoo Finance fetch failed (${url.includes('query1') ? 'query1' : 'query2'}):`, err.message);
    }
  }

  console.error('Yahoo Finance unavailable on both endpoints — falling back to static data');
  return {};
}

// ─── SUMMARY BUILDER ─────────────────────────────────────────

function fmt52w(v) {
  if (v == null) return 'n/a';
  return (v >= 0 ? '+' : '') + v.toFixed(1) + '%';
}

function fmtPE(v) {
  if (v == null) return '';
  return ` · P/E ${v.toFixed(0)}`;
}

function buildPromptText(personaId, def, quotes) {
  const lines = [];
  const liveData = Object.keys(quotes).length > 0;

  lines.push('═══ PORTFOLIO DATA' + (liveData ? ' (live prices — 52w performance data available)' : ' (static — live prices unavailable, 52w data shows as n/a)') + ' ═══');
  if (!liveData) {
    lines.push('NOTE: Live market data could not be fetched. 52w performance figures are unavailable. Do not claim to know performance numbers — reference position notes and structural observations only.');
  }
  lines.push('');
  lines.push('PERSONA CONTEXT:');
  lines.push(def.personaContext);
  lines.push('');

  // ── Accounts with positions ──
  for (const account of def.accounts) {
    const accountSEK = (account.valueSEK / 1000).toFixed(0);
    lines.push(`${account.label} — SEK ${account.valueSEK.toLocaleString('sv-SE')}`);
    if (account.note) lines.push(`  (${account.note})`);

    if (account.positions.length === 0) {
      lines.push('  Cash account — no investment positions');
      lines.push('');
      continue;
    }

    // Sector and geo aggregation
    const sectorMap = {};
    const geoMap = {};

    for (const pos of account.positions) {
      const q = pos.ticker ? quotes[pos.ticker] : null;
      const pct = (pos.weight * 100).toFixed(0) + '%';
      const change = q ? fmt52w(q.change52w) : (pos.ticker ? 'n/a' : '—');
      const pe = q ? fmtPE(q.pe) : '';
      const note = pos.note ? ` ← ${pos.note}` : '';

      lines.push(`  ${pos.name.padEnd(40)} ${pct.padStart(4)} · 52w: ${change.padEnd(8)}${pe}${note}`);

      // Aggregate
      const s = pos.sector || 'Other';
      sectorMap[s] = (sectorMap[s] || 0) + pos.weight;
      const g = pos.country || 'Unknown';
      geoMap[g] = (geoMap[g] || 0) + pos.weight;
    }

    // Sector breakdown
    const sectors = Object.entries(sectorMap)
      .sort((a, b) => b[1] - a[1])
      .map(([s, w]) => `${s} ${(w * 100).toFixed(0)}%`)
      .join(' · ');
    lines.push(`  Sectors: ${sectors}`);

    // Geo breakdown
    const geos = Object.entries(geoMap)
      .sort((a, b) => b[1] - a[1])
      .map(([g, w]) => `${g} ${(w * 100).toFixed(0)}%`)
      .join(' · ');
    lines.push(`  Geography: ${geos}`);
    lines.push('');
  }

  // ── Cash accounts (Sara) ──
  if (def.cashAccounts) {
    lines.push('CASH / SAVINGS:');
    for (const c of def.cashAccounts) {
      lines.push(`  ${c.label}: SEK ${c.valueSEK.toLocaleString('sv-SE')}${c.note ? ' — ' + c.note : ''}`);
    }
    lines.push('');
  }

  // ── Property ──
  if (def.property) {
    const equity = def.property.estimatedValueSEK - def.property.mortgageSEK;
    lines.push(`PROPERTY — ${def.property.label}`);
    lines.push(`  Estimated value: SEK ${def.property.estimatedValueSEK.toLocaleString('sv-SE')}`);
    if (def.property.mortgageSEK > 0) {
      lines.push(`  Mortgage outstanding: SEK ${def.property.mortgageSEK.toLocaleString('sv-SE')}`);
      lines.push(`  Net equity: SEK ${equity.toLocaleString('sv-SE')}`);
    } else {
      lines.push(`  Fully paid — equity: SEK ${equity.toLocaleString('sv-SE')}`);
    }
    if (def.property.note) lines.push(`  ${def.property.note}`);
    lines.push('');
  }

  // ── Persona-specific tensions ──
  lines.push('KEY TENSIONS TO SURFACE (pick the most relevant given the conversation):');
  const tensions = buildTensions(personaId, def, quotes);
  for (const t of tensions) lines.push(`• ${t}`);
  lines.push('');
  lines.push('═══ END PORTFOLIO DATA ═══');

  return lines.join('\n');
}

function buildTensions(personaId, def, quotes) {
  const t = [];

  if (personaId === 'carl') {
    const nordnet = def.accounts[0];
    const positions = nordnet.positions;

    // Check industrial concentration
    const industrialWeight = positions
      .filter(p => p.sector === 'Industrials')
      .reduce((s, p) => s + p.weight, 0);
    t.push(`Swedish industrial sector = ${(industrialWeight * 100).toFixed(0)}% of Nordnet portfolio (Atlas Copco, Volvo, Sandvik, Nibe, SKF, Lifco combined)`);

    // Top holding drift
    const top = positions[0];
    const topQ = quotes[top.ticker];
    if (topQ?.change52w != null && topQ.change52w > 20) {
      t.push(`${top.name} is up ${topQ.change52w.toFixed(1)}% over 52 weeks — likely grown beyond its original ${(top.weight * 100).toFixed(0)}% target weight`);
    }

    // Ericsson underperformance
    const ericQ = quotes['ERIC-B.ST'];
    if (ericQ?.change52w != null && ericQ.change52w < -10) {
      t.push(`Ericsson is down ${Math.abs(ericQ.change52w).toFixed(1)}% over 52 weeks — held at 8% weight despite sustained underperformance`);
    }

    // Nibe
    const nibeQ = quotes['NIBE-B.ST'];
    if (nibeQ?.change52w != null && nibeQ.change52w < -20) {
      t.push(`Nibe Industrier is down ${Math.abs(nibeQ.change52w).toFixed(1)}% — significant drawdown in a position he has not reviewed`);
    }

    t.push('Zero direct US equity exposure — global only via SEK 43,000 Avanza index funds alongside SEK 187,000 Nordnet portfolio');
    t.push('Avanza account (SEK 43,000) sits alongside Nordnet with no integrated strategy — two separate approaches that have never been looked at together');
    t.push('Top 3 positions (Atlas Copco 15%, Volvo 12%, Hexagon 10%) = 37% combined — professional portfolio management guidelines typically cap single-name exposure at 5%; all three exceed that threshold, suggesting positions have grown without being reviewed');
  }

  if (personaId === 'sara') {
    const sebCash = def.cashAccounts[0].valueSEK;
    const swedbankCash = def.cashAccounts[1].valueSEK;
    const totalCash = sebCash + swedbankCash;
    t.push(`Total cash across accounts: SEK ${totalCash.toLocaleString('sv-SE')} (SEB current account SEK ${sebCash.toLocaleString('sv-SE')} + Swedbank savings SEK ${swedbankCash.toLocaleString('sv-SE')}) — both earning near zero while Swedish inflation runs above 2%`);
    t.push('Compliance constraints (30-day hold periods) make self-directed investing impractical — discretionary management would bypass this entirely');

    const novoQ = quotes['NOVO-B.CO'];
    if (novoQ?.change52w != null && novoQ.change52w > 30) {
      t.push(`Novo Nordisk (30% of her Avanza) is up ${novoQ.change52w.toFixed(1)}% over 52 weeks — she has a significant unrealised gain she is likely unaware of`);
    }

    const ericQ = quotes['ERIC-B.ST'];
    if (ericQ?.change52w != null && ericQ.change52w < -10) {
      t.push(`Ericsson (15% of her Avanza) is down ${Math.abs(ericQ.change52w).toFixed(1)}% — a position she has not reviewed since 2021`);
    }

    t.push('Avanza account untouched since 2021 — performance relative to idle cash unknown to her');
    t.push('Apartment in Stockholm: estimated SEK 4,800,000, mortgage SEK 2,900,000 (SEB) — equity ~SEK 1,900,000. The same bank holds her mortgage and her idle cash.');
  }

  if (personaId === 'erik') {
    t.push(`Full financial picture fragmented across 4 institutions — no consolidated view has ever existed`);
    t.push('Avanza portfolio (SEK 340,000) built position by position over 15+ years with no overall strategy review');

    const hmbQ = quotes['HMB.ST'];
    if (hmbQ?.change52w != null && hmbQ.change52w < -5) {
      t.push(`H&M (10% of Avanza) is down ${Math.abs(hmbQ.change52w).toFixed(1)}% 52w — long-term hold that has underperformed`);
    }

    const ericQ = quotes['ERIC-B.ST'];
    if (ericQ?.change52w != null && ericQ.change52w < -10) {
      t.push(`Ericsson (8% of Avanza) is down ${Math.abs(ericQ.change52w).toFixed(1)}% 52w — bought 2019-2020, held through sustained decline`);
    }

    t.push('SEB A (7% of Avanza) — Erik owns shares in the same bank that holds his savings');
    t.push('Nordea account (SEK 44,000) and Handelsbanken account (SEK 12,000) are forgotten but real');
    t.push('Göteborg apartment fully paid — estimated SEK 4,200,000 in real estate equity never discussed in context of investment allocation');
  }

  return t;
}

// ─── HANDLER ─────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { personaId, tweakValue } = req.body ?? {};
  const baseDef = PORTFOLIO_DEFS[personaId];
  if (!baseDef) return res.status(400).json({ error: 'Invalid persona' });

  // Apply Sara's slider (SEB cash amount) without mutating the shared module-level object
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

  // Collect all fetchable tickers across all accounts
  const tickers = [];
  for (const account of def.accounts) {
    for (const pos of account.positions) {
      if (pos.ticker) tickers.push(pos.ticker);
    }
  }

  const quotes = await fetchYahooQuotes([...new Set(tickers)]);
  const promptText = buildPromptText(personaId, def, quotes);

  // Cache for 5 minutes at the edge
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  return res.status(200).json({
    promptText,
    liveData: Object.keys(quotes).length > 0,
    fetchedAt: new Date().toISOString(),
  });
};
