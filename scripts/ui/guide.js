// guide.js — Rendu du menu Guide

function renderGuide() {
    const list = document.getElementById('guide-list')
    if (!list) return

    list.innerHTML = guideSections.map(s => `
        <div class="guide-section" id="guide-section-${s.id}">
            <div class="guide-section-header" onclick="toggleGuideSection('${s.id}')">
                <span>${s.title}</span>
                <span class="guide-chevron">&#9654;</span>
            </div>
            <div class="guide-section-body">${s.content}</div>
        </div>
    `).join('')
}

function toggleGuideSection(id) {
    const section = document.getElementById('guide-section-' + id)
    if (!section) return
    section.classList.toggle('guide-open')
}
