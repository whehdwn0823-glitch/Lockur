
const girlNames = ["서아", "이서", "하윤", "지안", "아윤", "서윤", "지우", "하은", "아린", "지아"];
const boyNames = ["도준", "이준", "서준", "은우", "시우", "지호", "이안", "하준", "유준", "주원"];

const generateBtn = document.getElementById("generate-btn");
const nameDisplay = document.getElementById("generated-name");
const body = document.body;

generateBtn.addEventListener("click", () => {
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    let finalName = "";

    if (selectedGender === "girl") {
        finalName = girlNames[Math.floor(Math.random() * girlNames.length)];
        body.className = 'girl-theme'; // 클래스 이름을 'girl-theme'으로 설정
    } else if (selectedGender === "boy") {
        finalName = boyNames[Math.floor(Math.random() * boyNames.length)];
        body.className = 'boy-theme';
    } else {
        const allNames = [...girlNames, ...boyNames];
        finalName = allNames[Math.floor(Math.random() * allNames.length)];
        // 'any' 선택 시 특정 테마를 원하지 않으면 클래스를 제거합니다.
        body.className = ''; 
    }

    // 애니메이션 효과를 위해 기존 이름 숨기기
    nameDisplay.classList.remove("show");

    setTimeout(() => {
        nameDisplay.textContent = finalName;
        // 애니메이션 효과와 함께 새 이름 표시
        nameDisplay.classList.add("show");
    }, 300); // 0.3초 지연
});
