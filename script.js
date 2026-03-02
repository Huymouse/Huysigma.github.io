// Danh sách 12 phần thưởng
const gifts = [
    { name: "Cúp Vàng", Image: "https://cdn.discordapp.com/attachments/1259727756846043189/1478046365555884102/donk_depzai.jpg?ex=69a6f972&is=69a5a7f2&hm=65d12c74b73c65d1f10c3aeddf134531f7e38f7ed402ec3f61e590d661aa38c9&" },
    { name: "Gậy Phép Thuật", icon: "🪄" },
    { name: "Kim Cương", icon: "💎" },
    { name: "Pháo Bông", icon: "🎉" },
    { name: "Vương Miện", icon: "👑" },
    { name: "Ngôi Sao", icon: "⭐" },
    { name: "Trái Tim", icon: "❤️" },
    { name: "Ngọn Lửa", icon: "🔥" },
    { name: "Cầu Vồng", icon: "🌈" },
    { name: "Tên Lửa", icon: "🚀" },
    { name: "Huy Chương", icon: "🏅" },
    { name: "Cỏ 4 Lá", icon: "🍀" }
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