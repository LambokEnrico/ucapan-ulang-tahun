document.addEventListener('DOMContentLoaded', () => {

    // --- Pemilihan Elemen ---
    const scenes = document.querySelectorAll('.scene');
    const heart = document.getElementById('heart');
    const passwordInput = document.getElementById('password-input');
    const submitPasswordBtn = document.getElementById('submit-password');
    const clueLink = document.getElementById('clue-link');
    const backToPasswordBtn = document.getElementById('back-to-password');
    const quizContainer = document.getElementById('quiz-container');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const clueResult = document.getElementById('clue-result');
    const envelope = document.getElementById('envelope');
    const birthdayCard = document.getElementById('birthday-card');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    // --- Data Kuis & Variabel ---
    const REAL_PASSWORD = "HBDMYLOVE"; // Password ini HARUS sesuai dengan huruf awal pertanyaan
    let currentQuestionIndex = 0;
    let collectedLetters = [];

    // =================================================================
    // === DATA KUIS TELAH DISESUAIKAN ===
    // =================================================================
    const quizData = [
        { question: "Hari apa yang paling ditunggu-tunggu?", correctAnswer: "Minggu" },
        { question: "Bulan apa kita jadian?", correctAnswer: "Februari" },
        { question: "Dimana tempat kita ngedate pertama kali?", correctAnswer: "Kafe" },
        { question: "Masih inget ga nonton bioskop waktu tahun baru 2023 di mana?", correctAnswer: "Metro" },
        { question: "Yang kamu cari waktu gerah?", correctAnswer: "Aqua dingin" },
        { question: "Liburan ke mana yang paling kamu pengen?", correctAnswer: "Korea" },
        { question: "Olahraga yang pengen banget kamu coba?", correctAnswer: "Pilates" },
        { question: "Varian eskrim yang dibeli kemarin-kemarin?", correctAnswer: "Stroberi" },
        { question: "Entah minuman atau makanan, tapi apa yang paling kamu suka?", correctAnswer: "Sushi" }
    ];
    
    // --- Jawaban untuk setiap pertanyaan ---
    const answerOptions = [
        ["Senin", "Rabu", "Jumat", "Minggu"],
        ["Juni", "Desember", "Februari", "Mei"],
        ["Bioskop", "Kafe", "Mall", "Taman"],
        ["Jatinangor", "BIP", "Metro", "Ubertos"],
        ["Teh manis", "Es jeruk", "Aqua dingin", "Kelapa muda"],
        ["Korea", "Thailand", "Jepang", "Swiss"],
        ["Yoga", "Basket", "Aerobik", "Pilates"],
        ["Cokelat", "Stroberi", "Vanilla", "Kopi"],
        ["Grill Steak", "Sushi", "Ramen", "Red Velvet"]
    ];
    // =================================================================

    // --- Fungsi ---
    function switchScene(sceneId) {
        scenes.forEach(scene => {
            scene.classList.remove('active');
        });
        document.getElementById(sceneId).classList.add('active');
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        collectedLetters = [];
        clueResult.style.display = 'none';
        quizContainer.style.display = 'block';
        showQuestion();
        switchScene('clue-scene');
    }

    function showQuestion() {
        answerButtons.innerHTML = '';
        const currentQuestion = quizData[currentQuestionIndex];
        const currentAnswers = answerOptions[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;
        
        currentAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtons.appendChild(button);
        });
    }

    function selectAnswer(selectedAnswer) {
        const currentQuestion = quizData[currentQuestionIndex];
        
        if (selectedAnswer === currentQuestion.correctAnswer) {
            const questionFirstLetter = currentQuestion.question.charAt(0).toUpperCase();
            collectedLetters.push(questionFirstLetter);
            
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion();
            } else {
                showClueResult();
            }
        } else {
            alert("Jawaban salah, coba pikirkan lagi :)");
        }
    }

    function showClueResult() {
        quizContainer.style.display = 'none';
        clueResult.style.display = 'block';
    }

    function checkPassword() {
        const input = passwordInput.value.trim().toUpperCase();
        const sortedInput = input.split('').sort().join('');
        const sortedPassword = REAL_PASSWORD.split('').sort().join('');
        
        if (sortedInput === sortedPassword) {
            switchScene('final-scene');
        } else {
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }

    // --- Event Listeners ---
    heart.addEventListener('click', () => { switchScene('password-scene'); });
    clueLink.addEventListener('click', (e) => { e.preventDefault(); startQuiz(); });
    backToPasswordBtn.addEventListener('click', () => { switchScene('password-scene'); });
    restartQuizBtn.addEventListener('click', startQuiz);
    submitPasswordBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') checkPassword(); });

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            birthdayCard.classList.add('show');
        }, 500);
    });

    // ==============================================
    // --- FUNGSI ANIMASI LATAR BELAKANG ---
    // ==============================================
    function startBackgroundAnimation() {
        const container = document.getElementById('background-animation-container');
        if (!container) return;

        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Acak posisi horizontal, durasi, dan delay
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3) + 5 + 's'; // Durasi 5-8 detik
            confetti.style.animationDelay = Math.random() * 2 + 's';

            // Acak ukuran
            const size = Math.random() * 8 + 6; // Ukuran 6px - 14px
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';

            // Acak warna
            const colorClass = 'color-' + (Math.floor(Math.random() * 4) + 1);
            confetti.classList.add(colorClass);
            
            container.appendChild(confetti);

            // Hapus confetti setelah selesai animasi untuk menjaga performa
            setTimeout(() => {
                confetti.remove();
            }, 8000); // Harus lebih lama dari durasi animasi maksimal
        }

        // Buat confetti baru setiap 300 milidetik
        setInterval(createConfetti, 300);
    }

    // Jalankan animasi latar belakang
    startBackgroundAnimation();
});