const gifts = Array(10).fill({ name: "Mạnh Tân", image: "manh-tan.png" });
const colors = ['c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21', 'c22'];
gifts.sort(() => Math.random() - 0.5);

const container = document.getElementById('boxContainer');
const progressText = document.getElementById('progressText');
let openedCount = 0;

const popup = document.getElementById('customPopup');
const btnCancel = document.getElementById('btnCancel');
const btnConfirm = document.getElementById('btnConfirm');
let selectedBoxIndex = null;
let selectedBoxElement = null;

// Vòng lặp 10 hộp (từ 13 đến 22)
for (let i = 0; i < 10; i++) {
    const box = document.createElement('div');
    box.className = `box unopened ${colors[i]}`;
    
    box.innerHTML = `
        <p class="box-num">Túi #${i + 13}</p>
        <div class="box-icon">🎁</div>
        <h3 class="box-name" style="display: none;"></h3>
        <p class="box-status">Nhấn vào đây này</p>
    `;

    box.addEventListener('click', function() {
        if (this.classList.contains('opened')) return;
        selectedBoxIndex = i;
        selectedBoxElement = this;
        popup.classList.remove('hidden');
    });
    container.appendChild(box);
}

btnCancel.addEventListener('click', () => popup.classList.add('hidden'));

btnConfirm.addEventListener('click', () => {
    popup.classList.add('hidden'); 
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    selectedBoxElement.classList.remove('unopened');
    selectedBoxElement.classList.add('opened');

    const gift = gifts[selectedBoxIndex];
    selectedBoxElement.querySelector('.box-icon').innerHTML = `<img src="${gift.image}" alt="${gift.name}" class="gift-img">`;
    
    const nameEl = selectedBoxElement.querySelector('.box-name');
    nameEl.innerText = gift.name;
    nameEl.style.display = 'block'; 
    selectedBoxElement.querySelector('.box-status').innerText = 'Chưa tày lắm!';

    openedCount++;
    progressText.innerText = `Tiến trình: ${openedCount} / 10 túi đã mất trink`;
});