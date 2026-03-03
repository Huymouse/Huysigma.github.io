// Danh sách 12 phần thưởng "Mạnh Tân"
const gifts = [
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" },
    { name: "Mạnh Tân", image: "manh-tan.jpg" }
];

// Danh sách 12 màu nền gradient tương ứng trong CSS
const colors = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];

// Xáo trộn ngẫu nhiên danh sách quà
gifts.sort(() => Math.random() - 0.5);

const container = document.getElementById('boxContainer');
const progressText = document.getElementById('progressText');
let openedCount = 0;

// Vòng lặp tự động tạo 12 hộp quà
for (let i = 0; i < 12; i++) {
    const box = document.createElement('div');
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

        // --- BƯỚC MỚI: HIỆN POPUP XÁC NHẬN ---
        const isConfirmed = confirm("Bạn có sủe không?");
        
        // Nếu người dùng bấm "Hủy" (Cancel), thoát khỏi hàm và không mở hộp
        if (!isConfirmed) {
            return; 
        }

        // Nếu bấm "OK", tiếp tục chạy các hiệu ứng bên dưới
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
        
        this.querySelector('.box-icon').innerHTML = `<img src="${gift.image}" alt="${gift.name}" class="gift-img">`;
        
        const nameEl = this.querySelector('.box-name');
        nameEl.innerText = gift.name;
        nameEl.style.display = 'block'; 
        
        this.querySelector('.box-status').innerText = 'Chưa tày lắm!';

        // 4. Cập nhật thanh tiến trình
        openedCount++;
        progressText.innerText = `Tiến trình: ${openedCount} / 12 hộp đã mở`;
    });

    // Bơm hộp quà vào giao diện
    container.appendChild(box);
}