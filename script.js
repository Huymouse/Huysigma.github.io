// Danh sách 12 phần thưởng
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
    { name: "Mạnh Tân", image: "manh-tan.png" }
];

// Danh sách 12 màu nền gradient tương ứng trong CSS
const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];

// Xáo trộn ngẫu nhiên danh sách quà (thuật toán Fisher-Yates thu gọn)
gifts.sort(() => Math.random() - 0.5);

const container = document.getElementById('boxContainer');
const progressText = document.getElementById('progressText');
let openedCount = 0;

// Vòng lặp tự động tạo 12 hộp quà
for (let i = 0; i < 12; i++) {
    const box = document.createElement('div');
    // Gắn class cơ bản, class trạng thái và màu nền ngẫu nhiên
    box.className = `box unopened ${colors[i]}`;
    
    // Cấu trúc HTML bên trong mỗi hộp khi chưa mở
    box.innerHTML = `
        <p class="box-num">Hộp #${i + 1}</p>
        <div class="box-icon">🎁</div>
        <h3 class="box-name" style="display: none;"></h3>
        <p class="box-status">Nhấn để mở</p>
    `;

    // Thêm sự kiện click
    box.addEventListener('click', function() {
        // Nếu hộp đã mở rồi thì không làm gì cả
        if (this.classList.contains('opened')) return;

        // 1. Kích hoạt hiệu ứng pháo giấy
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // 2. Thay đổi trạng thái hộp
        this.classList.remove('unopened');
        this.classList.add('opened');

        // 3. Hiển thị phần thưởng
        const gift = gifts[i];
        this.querySelector('.box-icon').innerText = gift.icon;
        
        const nameEl = this.querySelector('.box-name');
        nameEl.innerText = gift.name;
        nameEl.style.display = 'block'; // Hiện tên quà lên
        
        this.querySelector('.box-status').innerText = 'Chưa tày lắm!';

        // 4. Cập nhật thanh tiến trình
        openedCount++;
        progressText.innerText = `Tiến trình: ${openedCount} / 12 hộp đã mất trink`;
    });

    // Bơm hộp quà vào giao diện
    container.appendChild(box);
}