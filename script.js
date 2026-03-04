// Danh sách 22 phần thưởng
const gifts = [
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" },
    { name: "Mạnh Tân", image: "manh-tan.png" }
];

const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21', 'c22'];
gifts.sort(() => Math.random() - 0.5);

const container = document.getElementById('boxContainer');
const progressText = document.getElementById('progressText');
let openedCount = 0;

// --- CÁC BIẾN CHO POPUP ---
const popup = document.getElementById('customPopup');
const btnCancel = document.getElementById('btnCancel');
const btnConfirm = document.getElementById('btnConfirm');
let selectedBoxIndex = null; // Lưu vị trí hộp được chọn
let selectedBoxElement = null; // Lưu phần tử hộp được chọn

// Vòng lặp tạo 22 hộp
for (let i = 0; i < 22; i++) {
    const box = document.createElement('div');
    box.className = `box unopened ${colors[i]}`;
    
    box.innerHTML = `
        <p class="box-num">Hộp #${i + 1}</p>
        <div class="box-icon">:gift:</div>
        <h3 class="box-name" style="display: none;"></h3>
        <p class="box-status">Nhấn vào đây này</p>
    `;

    box.addEventListener('click', function() {
        if (this.classList.contains('opened')) return;

        // Lưu lại thông tin hộp vừa click và hiện Popup
        selectedBoxIndex = i;
        selectedBoxElement = this;
        popup.classList.remove('hidden');
    });

    container.appendChild(box);
}

// --- SỰ KIỆN KHI BẤM NÚT TRONG POPUP ---

// Nếu bấm "Thôi, sợ lắm!" -> Chỉ ẩn popup đi
btnCancel.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// Nếu bấm "Mở luôn!" -> Chạy hiệu ứng mở quà
btnConfirm.addEventListener('click', () => {
    popup.classList.add('hidden'); // Ẩn popup trước

    // Kích hoạt pháo hoa
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    // Thay đổi giao diện hộp đã lưu
    selectedBoxElement.classList.remove('unopened');
    selectedBoxElement.classList.add('opened');

    const gift = gifts[selectedBoxIndex];
    selectedBoxElement.querySelector('.box-icon').innerHTML = `<img src="${gift.image}" alt="${gift.name}" class="gift-img">`;
    
    const nameEl = selectedBoxElement.querySelector('.box-name');
    nameEl.innerText = gift.name;
    nameEl.style.display = 'block'; 
    
    selectedBoxElement.querySelector('.box-status').innerText = 'Chưa tày lắm!';

    // Cập nhật tiến trình
    openedCount++;
    progressText.innerText = `Tiến trình: ${openedCount} / 22 túi đã mất trink`;
});