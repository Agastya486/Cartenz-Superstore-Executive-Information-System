function computeWhatIfScenario(capVal) {
    const baselineProfit = Number(totals.totalProfit) || 0;
    const totalSales = Number(totals.totalSales) || 0;

    // Recover $1,450 per discount point cut on loss-makers, keep 90% after ~10% customer volume drop
    let recoveredAmount = (40 - capVal) * 1450 * 0.90;
    if (capVal >= 40) recoveredAmount = 0;

    const newProfit = baselineProfit + recoveredAmount;
    const baseMargin = totalSales ? (baselineProfit / totalSales) * 100 : 0;
    const newMargin = totalSales ? (newProfit / totalSales) * 100 : 0;

    const { labels, actual, simulated } = buildWhatIfSubcategories(recoveredAmount);
    const entries = labels.map((name, i) => ({
        name,
        actual: actual[i],
        simulated: simulated[i],
        gain: simulated[i] - actual[i]
    }));

    const flipped = entries
        .filter(e => e.actual < 0 && e.simulated >= 0)
        .sort((a, b) => a.simulated - b.simulated);
    const stillLoss = entries
        .filter(e => e.simulated < 0)
        .sort((a, b) => a.simulated - b.simulated);
    const biggestGain = entries.slice().sort((a, b) => b.gain - a.gain)[0] || null;

    return {
        capVal,
        baselineProfit,
        recoveredAmount,
        newProfit,
        baseMargin,
        newMargin,
        flipped,
        stillLoss,
        biggestGain
    };
}

function renderWhatIfInterpretation(s) {
    const el = document.getElementById('whatIfInterpretation');
    if (!el) return;

    const gain = s.newProfit - s.baselineProfit;
    const gainPct = s.baselineProfit ? (gain / s.baselineProfit) * 100 : 0;
    const marginDelta = s.newMargin - s.baseMargin;
    const sign = gain >= 0 ? '+' : '-';

    let verdict;
    let verdictTone;
    if (s.capVal <= 10) {
        verdict = 'Aggressive intervention. Recovers the most profit but risks the largest drop in promotional volume.';
        verdictTone = 'text-rose-300';
    } else if (s.capVal >= 30) {
        verdict = 'Mild intervention. Protects customer volume but leaves most of the discount leakage unaddressed.';
        verdictTone = 'text-amber-300';
    } else {
        verdict = 'Moderate intervention. A balanced policy target between profit recovery and customer volume.';
        verdictTone = 'text-sky-300';
    }

    const flippedText = s.flipped.length
        ? s.flipped.map(e => `${escapeHtml(e.name)} (${formatCurrency(e.actual)} → ${formatCurrency(e.simulated)})`).join(', ')
        : 'None. No sub-category crosses back into profit';
    const stillLossText = s.stillLoss.length
        ? s.stillLoss.map(e => `${escapeHtml(e.name)} (${formatCurrency(e.simulated)})`).join(', ')
        : 'None. Every listed sub-category becomes profitable';
    const gainText = s.biggestGain
        ? `${escapeHtml(s.biggestGain.name)} (+${formatCurrency(s.biggestGain.gain)})`
        : '—';

    el.innerHTML = `
        <p class="text-xs font-semibold text-sky-300 uppercase tracking-wider">
            What-If Interpretation | <span class="text-white">${s.capVal}% Discount Cap</span>
        </p>
        <p class="leading-relaxed">
            At a <span class="text-slate-100 font-semibold">${s.capVal}% cap</span>, projected net profit moves from
            ${formatCurrency(s.baselineProfit)} to
            <span class="text-emerald-400 font-semibold">${formatCurrency(s.newProfit)}</span>
            (<span class="${gain >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-semibold">${sign}${formatCurrency(Math.abs(gain))}, ${sign}${Math.abs(gainPct).toFixed(2)}%</span>),
            lifting profit margin from ${s.baseMargin.toFixed(2)}% to
            <span class="text-sky-400 font-semibold">${s.newMargin.toFixed(2)}%.</span>
        </p>
        <ul class="space-y-1.5 leading-relaxed list-disc pl-5">
            <li><span class="text-slate-200 font-medium">Sub-categories returning to profit:</span> ${flippedText}.</li>
            <li><span class="text-slate-200 font-medium">Still loss-making after the cap:</span> ${stillLossText}.</li>
            <li><span class="text-slate-200 font-medium">Largest recovery:</span> ${gainText}.</li>
        </ul>
        <p class="${verdictTone}"><span class="font-semibold">Verdict:</span> ${verdict}</p>
    `;
}

function runWhatIfSimulation() {
    if (!totals || !Number.isFinite(Number(totals.totalProfit))) return;

    const capVal = parseInt(document.getElementById('discountCapSlider').value, 10);
    document.getElementById('sliderCapVal').textContent = `${capVal}% Cap`;

    const scenario = computeWhatIfScenario(capVal);

    document.getElementById('whatifProfitGain').textContent = `+${formatCurrency(scenario.recoveredAmount)}`;
    document.getElementById('whatifNewProfit').textContent = formatCurrency(scenario.newProfit);
    document.getElementById('whatifNewMargin').textContent = `${scenario.newMargin.toFixed(2)}%`;

    const baselineEl = document.getElementById('whatifBaselineProfit');
    if (baselineEl) baselineEl.textContent = formatCurrency(scenario.baselineProfit);

    renderWhatIfInterpretation(scenario);
    renderWhatIfChart(capVal, scenario.recoveredAmount);
}
