const gifts = Array(12).fill({ name: "Mạnh Tân", image: "manh-tan.png" });
const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];
gifts.sort(() => Math.random() - 0.5);

const container = document.getElementById('boxContainer');
const progressText = document.getElementById('progressText');
let openedCount = 0;

const popup = document.getElementById('customPopup');
const btnCancel = document.getElementById('btnCancel');
const btnConfirm = document.getElementById('btnConfirm');
let selectedBoxIndex = null;
let selectedBoxElement = null;

for (let i = 0; i < 12; i++) {
    const box = document.createElement('div');
    box.className = `box unopened ${colors[i]}`;
    
    box.innerHTML = `
        <p class="box-num">Túi #${i + 1}</p>
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
    progressText.innerText = `Tiến trình: ${openedCount} / 12 túi đã mất trink`;
});