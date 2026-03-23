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

// 댓글 기능 로직
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
const commentNameInput = document.getElementById("comment-name");
const commentTextInput = document.getElementById("comment-text");

// 댓글 로드 및 렌더링
function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    commentList.innerHTML = "";
    
    comments.forEach((comment, index) => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        
        const date = new Date(comment.date).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });

        commentItem.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <div>
                    <span class="comment-date">${date}</span>
                    <button class="delete-comment-btn" data-index="${index}">삭제</button>
                </div>
            </div>
            <div class="comment-body">${comment.text}</div>
        `;
        
        commentList.appendChild(commentItem);
    });

    // 삭제 버튼 이벤트 연결
    document.querySelectorAll(".delete-comment-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            deleteComment(index);
        });
    });
}

// 댓글 작성
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = commentNameInput.value.trim();
    const text = commentTextInput.value.trim();
    
    if (name && text) {
        const comments = JSON.parse(localStorage.getItem("comments") || "[]");
        const newComment = {
            name,
            text,
            date: new Date().toISOString()
        };
        
        comments.unshift(newComment); // 최신 댓글을 위로
        localStorage.setItem("comments", JSON.stringify(comments));
        
        commentNameInput.value = "";
        commentTextInput.value = "";
        
        loadComments();
    }
});

// 댓글 삭제
function deleteComment(index) {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
        const comments = JSON.parse(localStorage.getItem("comments") || "[]");
        comments.splice(index, 1);
        localStorage.setItem("comments", JSON.stringify(comments));
        loadComments();
    }
}

// 초기 로드
loadComments();
