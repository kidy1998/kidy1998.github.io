
    const projectDivs = document.querySelectorAll('.project');
    projectDivs.forEach(div => {
        div.addEventListener('mouseenter', function() {
            // 이미지 투명도
            div.querySelector('img').style.opacity = '0.2';

           
            const name = div.getAttribute('name');

           
            let message = '';

            // name 속성 값에 따라 메시지 변경
            switch (name) {
                case 'project1':
                    message = '유기견 보호소 소개';
                    break;
                case 'project2':
                    message = '영화,영화관 소개';
                    break;
                case 'project3' :
                    message = 'AR_아바타 생성' ;
                    break;
                case 'github':
                    message = 'GitHub 링크';
                    break;
                case 'velog':
                    message = 'Velog 링크';
                    break;
                default:
                    message = '기타 프로젝트';
            }

            // 툴팁을 생성합니다.
            const tooltip = document.createElement('div');
            tooltip.textContent = message;
            tooltip.style.position = 'absolute';
            tooltip.style.width = `${div.offsetWidth * 0.9}px`;
            tooltip.style.height = `${div.offsetHeight * 0.9}px`;
            tooltip.style.top = `${div.offsetTop + (div.offsetHeight - tooltip.offsetHeight) / 20}px`; // 세로 중앙 정렬
            tooltip.style.left = `${div.offsetLeft + (div.offsetWidth - tooltip.offsetWidth) / 20}px`; // 가로 중앙 정렬
            tooltip.style.backgroundColor = 'rgba(0, 0, 12, 0.5)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.zIndex = '9999';
            tooltip.style.textAlign = 'center';
            tooltip.style.fontSize = '25px'


            tooltip.classList.add('tooltip'); // 클래스 추가
            div.appendChild(tooltip); // div 내에 툴팁을 추가.

            // 링크를 생성합니다.
            const gitElement = document.createElement('a');
            var linkElement;

            if (name === 'project1') {
                gitElement.href = 'https://github.com/kidy1998/Final_Project_2023_12'; 
                linkElement = document.createElement('a');
                linkElement.href = 'project/mungFriend.html';
            } else if (name === 'project2') {
                gitElement.href = 'https://github.com/kidy1998/Semi_Project_2023_09';
                linkElement = document.createElement('a');
                linkElement.href = 'movieInsight.html';
            } else if (name === 'project3') {
                gitElement.href = 'https://kidy1998.github.io/AR_PROJECT/main.html'; 
                linkElement = document.createElement('a');
                linkElement.href = 'project/webAvatar.html';
                
            } else if (name === 'github') {
                gitElement.href = 'https://github.com/kidy1998?tab=repositories'; 
            } else if (name === 'velog') {
                gitElement.href = 'https://velog.io/@zzangkidy/posts'; 
            }

            gitElement.textContent = 'Link';
            gitElement.classList.add('link'); //클래스 추가
            gitElement.target = '_blank';

          


            for (let i = 0; i < 2; i++) {
                tooltip.appendChild(document.createElement('br'));
            }

            if(linkElement){    
                
                linkElement.textContent = '상세보기';
                linkElement.classList.add('link');
                linkElement.target = '_blank';
                tooltip.append(linkElement);
            }
           
            tooltip.appendChild(document.createElement('br'));
            tooltip.appendChild(document.createElement('br'));
            tooltip.append(gitElement); // 툴팁 내에 링크 추가
        });

        div.addEventListener('mouseleave', function() {
            // 화면 밖으로 마우스 이동하면 이미지 투명도 초기화
            div.querySelector('img').style.opacity = '1';

            // 툴팁삭제
            const tooltip = div.querySelector('.tooltip');
            if (tooltip) {
                div.removeChild(tooltip);
            }
        });
    });





// 반복해서 타이핑할 텍스트
const text = "백엔드 개발자를 꿈꾸는 김도연입니다.";

// 타이핑 효과를 주기 위한 함수
function typeWriter(element, text, index) {
    if (index < text.length) {
        // 현재 인덱스까지의 텍스트를 출력
        element.innerHTML += text.charAt(index);
        // 다음 글자로 이동하기 위해 setTimeout을 사용하여 재귀 호출
        setTimeout(() => typeWriter(element, text, index + 1), 100); // 100ms 간격으로 한 글자씩 출력
    } else {
        // 한 문장을 모두 출력한 후에 다음 문장으로 넘어감
        setTimeout(() => eraseText(element, text), 1000); // 1초 대기 후에 텍스트 지우는 함수 호출
    }
}

// 텍스트를 지우는 함수
function eraseText(element, text) {
    if (element.innerHTML.length > 0) {
        // 텍스트를 한 글자씩 지우기
        element.innerHTML = text.substring(0, element.innerHTML.length - 1);
        // 다음 글자를 지우기 위해 setTimeout을 사용하여 재귀 호출
        setTimeout(() => eraseText(element, text), 100); // 100ms 간격으로 한 글자씩 지우기
    } else {
        // 모든 텍스트를 지우고 다음 문장으로 넘어감
        setTimeout(() => typeWriter(element, text, 0), 1000); // 1초 대기 후에 다음 문장 출력 함수 호출
    }
}

// 타이핑 효과를 적용할 요소 선택
const titleElement = document.getElementById("introduction");
titleElement.style.margin = 0;

// 타이핑 효과 적용
typeWriter(titleElement, text, 0);
  


  document.querySelectorAll('.Link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetTop = targetElement.offsetTop;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth' // 스크롤 효과
        });
    });
});