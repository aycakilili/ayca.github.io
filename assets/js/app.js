function searchCars() {
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;

    if (!start || !end) {
        alert("Lütfen tarih seçiniz.");
        return;
    }

    // ileride backend'e tarih göndereceğiz
    window.location.href = "cars.html";
}

function makeReservation() {
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;
    const pickup = document.getElementById("pickup-location").value;
    const drop = document.getElementById("drop-location").value;

    if (!start || !end || !pickup || !drop) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    alert(`Rezervasyonunuz başarıyla oluşturuldu!\nBaşlangıç: ${start}\nBitiş: ${end}\nAlış: ${pickup}\nTeslim: ${drop}`);
}


function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    // Şimdilik sadece alert ile simülasyon
    alert(`Giriş başarılı!\nEmail: ${email}`);
    window.location.href = "index.html";
}

function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Şifreler eşleşmiyor!");
        return;
    }

    // Şimdilik sadece alert ile simülasyon
    alert(`Kayıt başarılı!\nAd: ${name}\nEmail: ${email}`);
    window.location.href = "login.html";
}


const carListAdmin = document.getElementById("car-list-admin");

function addCar() {
    const name = document.getElementById("car-name").value;
    const price = document.getElementById("car-price").value;
    const gear = document.getElementById("car-gear").value;
    const fuel = document.getElementById("car-fuel").value;
    const image = document.getElementById("car-image").value;

    if (!name || !price || !gear || !fuel || !image) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    // Yeni araç kartı oluştur
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>Günlük Fiyat: ₺${price}</p>
        <p>Vites: ${gear} | Yakıt: ${fuel}</p>
        <button onclick="removeCar(this)">Sil</button>
    `;

    carListAdmin.appendChild(carCard);

    // Formu temizle
    document.getElementById("car-name").value = "";
    document.getElementById("car-price").value = "";
    document.getElementById("car-gear").value = "";
    document.getElementById("car-fuel").value = "";
    document.getElementById("car-image").value = "";
}

function removeCar(button) {
    const card = button.parentElement;
    carListAdmin.removeChild(card);
}



// MOBIL MENU
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// NAVBAR SHRINK
window.addEventListener("scroll", () => {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

