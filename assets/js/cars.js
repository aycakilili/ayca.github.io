/* =========================================================
   A R A Ç   V E R İ L E R İ
========================================================= */
const cars = [
    {
        id: 1,
        name: "Hyundai i20",
        type: "Hatchback",
        price: 800,
        img: "assets/images/car1.png",
        img2: "assets/images/car1.png",
        img3: "assets/images/car1.png",
        gear: "Otomatik",
        fuel: "Benzin",
        seats: 5,
        luggage: "Orta",
        ac: true,
        desc: "Konforlu ve ekonomik şehir içi sürüşler için ideal bir araç."
    },
    {
        id: 2,
        name: "Volkswagen Polo",
        type: "Hatchback",
        price: 1200,
        img: "assets/images/car2.png",
        img2: "assets/images/car2.png",
        img3: "assets/images/car2.png",
        gear: "Otomatik",
        fuel: "Dizel",
        seats: 5,
        luggage: "Orta",
        ac: true,
        desc: "Uzun yol ve aile kullanımı için yüksek konfor sunar."
    },
    {
        id: 3,
        name: "Ford Explorer",
        type: "SUV",
        price: 600,
        img: "assets/images/car3.png",
        img2: "assets/images/car3.png",
        img3: "assets/images/car3.png",
        gear: "Manuel",
        fuel: "Benzin",
        seats: 5,
        luggage: "Geniş",
        ac: false,
        desc: "Şehir içi pratik kullanım ve düşük yakıt tüketimi."
    },
    {
        id: 4,
        name: "BMW",
        type: "Sedan",
        price: 950,
        img: "assets/images/car4.png",
        img2: "assets/images/car4.png",
        img3: "assets/images/car4.png",
        gear: "Otomatik",
        fuel: "Benzin",
        seats: 5,
        luggage: "Orta",
        ac: true,
        desc: "Premium segment, güçlü motor ve üst düzey konfor."
    }
];

/* =========================================================
   V A R S A Y I L A N   D E Ğ E R L E R
========================================================= */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentFilter = "all";
let showOnlyFavorites = false;
let currentSort = "none";
let selectedCarId = null;

const carList = document.getElementById("carList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

/* =========================================================
   A R A Ç   L İ S T E L E M E
========================================================= */
function renderCars(sourceList) {
    let list = sourceList.filter(car => {
        const filterOK = currentFilter === "all" || car.type === currentFilter;
        const favOK = showOnlyFavorites ? favorites.includes(car.id) : true;
        const searchOK = car.name.toLowerCase().includes((searchInput?.value || "").toLowerCase());
        return filterOK && favOK && searchOK;
    });

    list = sortCars(list);
    
     carList.innerHTML = "";
list.forEach((car) => {
    const isFav = favorites.includes(car.id);

    carList.innerHTML += `
    <div class="car-card">
        <img src="${car.img}" alt="${car.name}">
        <h3>${car.name}</h3>
        <p class="car-type">${car.type}</p>
        <p class="car-price">₺${car.price} / Günlük</p>

        <!-- ✔ Favori ve Detay yan yana -->
        <div class="card-top-buttons">
            <button class="favorite-btn" onclick="toggleFavorite(${car.id})">
                ${isFav ? "💛 Favori" : "🤍 Favori"}
            </button>

            <button class="detail-btn" onclick="openDetails(${car.id})">
                Detay
            </button>
        </div>

        <!-- ✔ Altta tam genişlik Kirala -->
        <button class="rent-btn" onclick="openReservation(${car.id})">
            Kirala
        </button>
    </div>`;
});

if (!list.length)
    carList.innerHTML = `<p class="empty-text">Seçilen özelliklerde araç bulunamadı.</p>`;
}


/* =========================================================
   S I R A L A M A
========================================================= */
function sortCars(list) {
    const sorted = [...list];
    switch (currentSort) {
        case "priceAsc": sorted.sort((a, b) => a.price - b.price); break;
        case "priceDesc": sorted.sort((a, b) => b.price - a.price); break;
        case "nameAsc": sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "nameDesc": sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return sorted;
}

/* =========================================================
   F A V O R İ   E K L E / Ç I K A R
========================================================= */
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(x => x !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Araç listesi güncellensin
    renderCars(cars);

    // Eğer detay sayfası açıksa butonu da güncelle
    if (selectedCarId === id) {
        const btn = document.getElementById("detailFavBtn");
        if (btn) {
            btn.innerHTML = favorites.includes(id)
                ? "💛 Favorilerde"
                : "🤍 Favorilere Ekle";
        }
    }
}


/* =========================================================
   D E T A Y   M O D A L İ
========================================================= */
function openDetails(id) {
    const car = cars.find(c => c.id === id);
    selectedCarId = id;

    document.getElementById("detailImg").src = car.img;

    const thumbs = document.querySelector(".detail-thumbs");
    

    thumbs.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", () => {
            document.getElementById("detailImg").src = img.src;
        });
    });

    // Bilgiler sekmesi
    document.getElementById("detailName").textContent = car.name;
    document.getElementById("detailPrice").textContent = "₺" + car.price + " / Günlük";
    document.getElementById("detailGear").textContent = car.gear;
    document.getElementById("detailFuel").textContent = car.fuel;
    document.getElementById("detailSeats").textContent = car.seats;
    document.getElementById("detailLuggage").textContent = car.luggage;
    document.getElementById("detailAC").textContent = car.ac ? "Var" : "Yok";
    document.getElementById("detailDesc").textContent = car.desc;



    // Favori butonu
    document.getElementById("detailFavBtn").innerHTML =
        favorites.includes(id) ? "💛 Favorilerde" : "🤍 Favorilere Ekle";

    openModal("detailModal");
}

/* =========================================================
   S E K M E   S İ S T E M İ
========================================================= */
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const target = btn.dataset.tab;
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});

/* =========================================================
   R E Z E R V A S Y O N   M O D A L İ
========================================================= */
function openReservation(id) {
    selectedCarId = id;
    const car = cars.find(c => c.id === id);

    document.getElementById("reservationCarName").textContent =
        "Kiralanacak Araç: " + car.name;

    document.getElementById("reservationForm").reset();
    openModal("reservationModal");
}

/* =========================================================
   M O D A L   A Ç / K A P A
========================================================= */
function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
}

document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
});
document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", () => overlay.parentElement.classList.add("hidden"));
});

/* =========================================================
   İ L K   Ç A L I Ş T I R M A
========================================================= */
renderCars(cars);
