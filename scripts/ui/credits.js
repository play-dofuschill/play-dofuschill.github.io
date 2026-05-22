// credits.js — Rendu du menu Crédits

function renderCredits() {
    const list = document.getElementById('credits-list')
    if (!list) return

    list.innerHTML = creditsSections.map(s => `
        <div class="guide-section" id="credits-section-${s.id}">
            <div class="guide-section-header" onclick="toggleCreditsSection('${s.id}')">
                <span>${s.title}</span>
                <span class="guide-chevron">&#9654;</span>
            </div>
            <div class="guide-section-body">${s.content}</div>
        </div>
    `).join('')
}

function toggleCreditsSection(id) {
    const section = document.getElementById('credits-section-' + id)
    if (!section) return
    section.classList.toggle('guide-open')
}
