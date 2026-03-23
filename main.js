const girlNames = ["서아", "이서", "하윤", "지안", "아윤", "서윤", "지우", "하은", "아린", "지아"];
const boyNames = ["도준", "이준", "서준", "은우", "시우", "지호", "이안", "하준", "유준", "주원"];

const generateBtn = document.getElementById("generate-btn");
const nameDisplay = document.getElementById("generated-name");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// 테마 로드
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "라이트 모드";
}

// 테마 토글
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "라이트 모드" : "다크 모드";
});

generateBtn.addEventListener("click", () => {
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    let finalName = "";

    // 기존 테마 클래스 초기화 (dark-mode는 유지)
    body.classList.remove("girl-theme", "boy-theme");

    if (selectedGender === "girl") {
        finalName = girlNames[Math.floor(Math.random() * girlNames.length)];
        body.classList.add("girl-theme");
    } else if (selectedGender === "boy") {
        finalName = boyNames[Math.floor(Math.random() * boyNames.length)];
        body.classList.add("boy-theme");
    } else {
        const allNames = [...girlNames, ...boyNames];
        finalName = allNames[Math.floor(Math.random() * allNames.length)];
    }

    // 애니메이션 효과를 위해 기존 이름 숨기기
    nameDisplay.classList.remove("show");

    setTimeout(() => {
        nameDisplay.textContent = finalName;
        // 애니메이션 효과와 함께 새 이름 표시
        nameDisplay.classList.add("show");
    }, 300);
});
