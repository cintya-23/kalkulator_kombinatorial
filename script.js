/* ==========================
   NAVIGASI ANTAR HALAMAN
========================== */

function showPage(pageId, clickedLink) {
  const pages = document.querySelectorAll(".page");
  const links = document.querySelectorAll(".nav-link");

  // Sembunyikan semua halaman
  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  // Tampilkan halaman yang dipilih
  document.getElementById(pageId).classList.add("active");

  // Hapus status aktif dari semua menu
  links.forEach(function (link) {
    link.classList.remove("active");
  });

  // Aktifkan menu yang diklik
  if (clickedLink) {
    clickedLink.classList.add("active");
  }

  window.scrollTo(0, 0);
}

// Navigasi dari tombol di dalam halaman
function bukaHalaman(pageId) {
  const link = document.querySelector('.nav-link[onclick*="' + pageId + '"]');

  showPage(pageId, link);
}

/* ==========================
   FAKTORIAL
========================== */

function faktorial(angka) {
  let hasil = 1n;

  for (let i = 1n; i <= BigInt(angka); i++) {
    hasil *= i;
  }

  return hasil;
}

/* ==========================
   KALKULATOR KOMBINASI
========================== */


function hitungKombinasi() {
    let n = document.getElementById("nilaiN").value;
    let r = document.getElementById("nilaiR").value;

    let hasil = document.getElementById("hasil");
    let langkah = document.getElementById("langkahPerhitungan");

    // Memeriksa input
    if (n === "" || r === "") {
        hasil.innerHTML = "Silakan isi kedua angka terlebih dahulu.";
        langkah.style.display = "none";
        return;
    }

    n = Number(n);
    r = Number(r);

    if (
        !Number.isSafeInteger(n) ||
        !Number.isSafeInteger(r) ||
        n < 0 || r < 0 || r > n
    ) {
        hasil.innerHTML =
            "Input tidak valid. Pastikan n dan r berupa bilangan bulat nonnegatif serta r tidak lebih besar dari n.";

        langkah.style.display = "none";
        return;
    }

    if (n > 1000) {
        hasil.innerHTML = "Nilai n maksimal adalah 1000.";
        langkah.style.display = "none";
        return;
    }

    // Menghitung kombinasi
    let pembilang = faktorial(n);
    let penyebut = faktorial(r) * faktorial(n - r);
    let hasilAkhir = pembilang / penyebut;

    // Membuat daftar angka pada pembilang
    let angkaAtas = [];

    for (let i = n; i > n - r; i--) {
        angkaAtas.push(i);
    }

    let bentukAtas = angkaAtas.length > 0
        ? angkaAtas.join(" × ")
        : "1";

    // Membuat daftar angka pada penyebut
    let angkaBawah = [];

    for (let i = r; i >= 1; i--) {
        angkaBawah.push(i);
    }

    let bentukBawah = angkaBawah.length > 0
        ? angkaBawah.join(" × ")
        : "1";

    // Menampilkan hasil akhir
    hasil.innerHTML =
        "Hasil kombinasi C(" + n + ", " + r + ") = " +
        "<strong>" + hasilAkhir.toString() + " cara</strong>";

    // Menampilkan langkah perhitungan
    langkah.style.display = "block";

    langkah.innerHTML = `
        <h3>Langkah-langkah Perhitungan</h3>

        <p class="step-description">
            Berikut proses menghitung kombinasi
            C(${n}, ${r}).
        </p>

        <div class="step-item">
            <span class="step-number">1</span>
            <div>
                <strong>Gunakan rumus kombinasi</strong>
                <div class="step-math">
                    C(n,r) = n! / (r! × (n-r)!)
                </div>
            </div>
        </div>

        <div class="step-item">
            <span class="step-number">2</span>
            <div>
                <strong>Masukkan nilai n dan r</strong>
                <div class="step-math">
                    C(${n},${r}) = ${n}! / (${r}! × ${n-r}!)
                </div>
            </div>
        </div>

        <div class="step-item">
            <span class="step-number">3</span>
            <div>
                <strong>Sederhanakan faktorial</strong>
                <div class="step-math">
                    = (${bentukAtas}) / (${bentukBawah})
                </div>
            </div>
        </div>

        <div class="step-item">
            <span class="step-number">4</span>
            <div>
                <strong>Hitung hasilnya</strong>
                <div class="step-math final-math">
                    = ${hasilAkhir.toString()}
                </div>
            </div>
        </div>

        <div class="step-conclusion">
            Jadi, hasil kombinasi C(${n},${r}) adalah
            <strong>${hasilAkhir.toString()} cara.</strong>
        </div>
    `;
}

/* ==========================
   DATA JAWABAN LATIHAN
========================== */

const soalLatihan = {
  1: {
    jawaban: 15,
    pembahasan: "C(6,2) = 6! / (2! × 4!) = (6 × 5) / (2 × 1) = 15 cara.",
  },

  2: {
    jawaban: 56,
    pembahasan:
      "C(8,3) = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56 cara.",
  },

  3: {
    jawaban: 210,
    pembahasan:
      "C(10,4) = 10! / (4! × 6!) = (10 × 9 × 8 × 7) / (4 × 3 × 2 × 1) = 210 cara.",
  },

  4: {
    jawaban: 792,
    pembahasan:
      "C(12,5) = 12! / (5! × 7!) = (12 × 11 × 10 × 9 × 8) / (5 × 4 × 3 × 2 × 1) = 792 cara.",
  },

  5: {
    jawaban: 35,
    pembahasan:
      "C(7,3) = 7! / (3! × 4!) = (7 × 6 × 5) / (3 × 2 × 1) = 35 cara.",
  },
};

/* ==========================
   PERIKSA JAWABAN LATIHAN
========================== */

function periksaLatihan(nomor) {
  const input = document.getElementById("jawaban" + nomor);
  const hasil = document.getElementById("hasil" + nomor);

  if (input.value.trim() === "") {
    hasil.className = "quiz-feedback incorrect";
    hasil.innerHTML = "Silakan masukkan jawaban terlebih dahulu.";
    return;
  }

  const jawabanPengguna = Number(input.value);
  const data = soalLatihan[nomor];

  if (!Number.isInteger(jawabanPengguna)) {
    hasil.className = "quiz-feedback incorrect";
    hasil.innerHTML = "Masukkan jawaban berupa bilangan bulat.";
    return;
  }

  if (jawabanPengguna === data.jawaban) {
    hasil.className = "quiz-feedback correct";
    hasil.innerHTML =
      "<strong>✓ Jawaban kamu benar!</strong><br>" +
      "Hasilnya adalah " +
      data.jawaban +
      " cara.<br><br>" +
      "<strong>Pembahasan:</strong><br>" +
      data.pembahasan;
  } else {
    hasil.className = "quiz-feedback incorrect";
    hasil.innerHTML =
      "<strong>Jawaban belum tepat.</strong><br>" +
      "Jawaban yang benar adalah <strong>" +
      data.jawaban +
      "</strong>.<br><br>" +
      "<strong>Pembahasan:</strong><br>" +
      data.pembahasan;
  }
}
