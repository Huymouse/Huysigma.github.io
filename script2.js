const totalBoxes = 22;
const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21', 'c22'];

let gifts = [];
let openedBoxes = [];

if (localStorage.getItem('huy_gifts')) {
    gifts = JSON.parse(localStorage.getItem('huy_gifts'));
} else {
    gifts = [
        { name: "Chúc mừng!", image: "giaidocdac.jpg" },
        { name: "Chúc mừng!", image: "giaidocdac.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhat.jpg" },
        { name: "Chúc mừng!", image: "giainhi.jpg" },
        { name: "Chúc mừng!", image: "giainhi.jpg" },
        { name: "Chúc mừng!", image: "giainhi.jpg" },
        { name: "Chúc mừng!", image: "giainhi.jpg" },
        { name: "Chúc mừng!", image: "giainhi.jpg" },
        { name: "Chúc mừng!", image: "giaiba.jpg" },
        { name: "Chúc mừng!", image: "giaiba.jpg" },
        { name: "Chúc mừng!", image: "giaiba.jpg" },
        { name: "Chúc mừng!", image: "giaikk.jpg" },
        { name: "Chúc mừng!", image: "giaikk.jpg" },
        { name: "Chúc mừng!", image: "giaikk.jpg" },
        { name: "Chúc mừng!", image: "giaikk.jpg" }
    ];
    gifts.sort(() => Math.random() - 0.5);
    localStorage.setItem('huy_gifts', JSON.stringify(gifts));
}

if (localStorage.getItem('huy_opened')) {
    openedBoxes = JSON.parse(localStorage.getItem('huy_opened'));
}

const container = document.getElementById('boxContainer');
const progressText = document.getElementById('progressText');

const updateProgress = () => {
    progressText.innerText = `Tiến trình: ${openedBoxes.length} / ${totalBoxes} túi đã mất trink`;
};
updateProgress();

const popup = document.getElementById('customPopup');
const btnCancel = document.getElementById('btnCancel');
const btnConfirm = document.getElementById('btnConfirm');
let selectedBoxIndex = null;
let selectedBoxElement = null;

for (let i = 12; i < 22; i++) {
    const box = document.createElement('div');
    box.className = `box unopened ${colors[i]}`;
    
    box.innerHTML = `
        <p class="box-num">Hộp #${i + 1}</p>
        <div class="box-icon">🎁</div>
        <h3 class="box-name" style="display: none;"></h3>
        <p class="box-status">Nhấn vào đây này</p>
    `;

    if (openedBoxes.includes(i)) {
        box.classList.remove('unopened');
        box.classList.add('opened');
        
        const gift = gifts[i];
        box.querySelector('.box-icon').innerHTML = `<img src="${gift.image}" alt="${gift.name}" class="gift-img">`;
        box.querySelector('.box-name').innerText = gift.name;
        box.querySelector('.box-name').style.display = 'block'; 
        box.querySelector('.box-status').innerText = 'Chưa tày lắm!';
    }

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

    openedBoxes.push(selectedBoxIndex);
    localStorage.setItem('huy_opened', JSON.stringify(openedBoxes));
    updateProgress();
});

const btnReset = document.getElementById('btnReset');
const resetPopup = document.getElementById('resetPopup');
const btnCancelReset = document.getElementById('btnCancelReset');
const btnConfirmReset = document.getElementById('btnConfirmReset');

if (btnReset) {
    btnReset.addEventListener('click', () => { resetPopup.classList.remove('hidden'); });
}
if (btnCancelReset) {
    btnCancelReset.addEventListener('click', () => { resetPopup.classList.add('hidden'); });
}
if (btnConfirmReset) {
    btnConfirmReset.addEventListener('click', () => {
        localStorage.removeItem('huy_gifts');
        localStorage.removeItem('huy_opened');
        location.reload(); 
    });
}