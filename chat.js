// Enhanced Chatbot for Jeonnam Museum - Professional Demo Version
class MuseumChatbot {
    constructor() {
        this.chatlog = document.getElementById("chatlog");
        this.chatForm = document.getElementById("chat-form");
        this.userInput = document.getElementById("user-input");
        this.sendButton = this.chatForm.querySelector('button[type="submit"]');
        
        this.isTyping = false;
        this.messageCount = 0;
        
        this.responses = {
            "aes+f": "AES+F는 러시아 출신의 미디어 아티스트 그룹입니다. 전시는 2022.11.25–2023.03.05까지 열렸습니다.",
            "who is aes+f": "AES+F is a Russian media artist collective. Their exhibition ran from Nov 25, 2022 to Mar 5, 2023.",
          
            "시간": "전시 관람 시간은 매일 10:00–18:00입니다. (월요일 휴관)",
            "open": "We're open daily from 10:00 to 18:00. Closed on Mondays.",
            "opening hours": "We're open daily from 10:00 to 18:00. Closed on Mondays.",
            "hours": "We're open daily from 10:00 to 18:00. Closed on Mondays.",
          
            "how to get there": "전남 광양시 광양읍 인덕로 105. 주차 가능. 버스: 120번.",
            "location": "Jeonnam Museum of Art is located at 105 Indeok-ro, Gwangyang-eup, Gwangyang-si, Jeollanam-do.",
            "address": "Jeonnam Museum of Art is located at 105 Indeok-ro, Gwangyang-eup, Gwangyang-si, Jeollanam-do.",
            "directions": "전남 광양시 광양읍 인덕로 105. 주차 가능. 버스: 120번.",
            "parking": "주차 가능합니다. Parking is available.",
          
            "press": "보도자료는 홈페이지에서 다운로드하실 수 있습니다: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "media": "Press kits are available on the museum's official website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "press kit": "Press kits are available on the museum's official website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
          
            "director": "전남도립미술관 관장 이지호는 이화여대와 프랑스 파리8/파리1대학을 졸업하고, 대전시립미술관 및 이응노미술관장을 역임했습니다.",
            "who is the director": "The museum director, LEE JI HO, holds degrees from Ewha Womans University and Paris 8 & 1. She previously directed the Daejeon Museum of Art and Lee Ungno Museum.",
            "museum director": "The museum director, LEE JI HO, holds degrees from Ewha Womans University and Paris 8 & 1. She previously directed the Daejeon Museum of Art and Lee Ungno Museum.",
          
            "소장품": "전남도립미술관은 한국 현대미술 중심의 작품을 소장하고 있으며, 435점의 작품을 온라인에서 확인할 수 있습니다: https://artmuseum.jeonnam.go.kr/museumofart/174/subview.do",
            "collection": "The museum houses a growing collection of 435 contemporary Korean artworks. You can view the full collection online: https://artmuseum.jeonnam.go.kr/museumofart/174/subview.do",
            "artworks": "The museum houses a growing collection of 435 contemporary Korean artworks. You can view the full collection online: https://artmuseum.jeonnam.go.kr/museumofart/174/subview.do",
          
            "vr": "온라인 VR 전시는 현재 기획 중이며, 향후 웹사이트 (https://artmuseum.jeonnam.go.kr/museumofart/index.do) 에서 제공될 예정입니다.",
            "virtual tour": "A virtual exhibition experience is being planned and will be launched on the museum website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "online": "A virtual exhibition experience is being planned and will be launched on the museum website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
          
            "current exhibitions": "현재 열리고 있는 전시는 홈페이지 (https://artmuseum.jeonnam.go.kr/museumofart/index.do) 또는 소셜미디어에서 확인하실 수 있습니다.",
            "what's on": "You can view current exhibitions on the museum website (https://artmuseum.jeonnam.go.kr/museumofart/index.do) or via social media channels.",
            "exhibitions": "You can view current exhibitions on the museum website (https://artmuseum.jeonnam.go.kr/museumofart/index.do) or via social media channels.",
            "현재 전시": "현재 열리고 있는 전시는 홈페이지 (https://artmuseum.jeonnam.go.kr/museumofart/index.do) 또는 소셜미디어에서 확인하실 수 있습니다.",
            
            "기다려색 전체": `《기다려-색!》전시는 전남도립미술관이 '예술로 소통하는 열린 미술관'이 되기 위한 첫 어린이 전시입니다.
            이 전시는 어린이뿐 아니라 모두가 함께 즐길 수 있도록 하기 위해, 누구에게나 익숙한 '색'을 주제로 하였으며, 
            눈으로 보는 것에서 더 나아가 여러 도구와 놀이 활동을 통해 스스로 예술을 느끼고 표현하는 즐거움을 온 몸으로 느낄 수 있도록 기획하였습니다.
            
            우리는 과연 색에 대해 얼마나, 어떻게 알고 있을까요? 누군가 정한 색에 대한 규칙과 이야기를 너무 쉽게 받아들이고 있지는 않나요?
            매년 발표되는 올해의 색, 퍼스널 컬러, 색연필과 물감의 이름들...
            전시에서는 색에 대한 정보와 지식을 아는 것에서 더 나아가 '색'을 다루는 태도와 방식에 대해 다시 생각해보고자 합니다.
            
            색은 언제나 똑같다 생각할 수 있지만, 시간에 따라 모습과 쓰임이 계속 바뀌어 왔습니다.
            우리가 정답처럼 여겼던 색에 대한 규칙들도 사실은 예술가와 과학자들이 사회와 기술의 변화에 따라 만들어낸 것입니다.
            CMYK, RGB 같은 색의 기본적 방식들도 19세기 인쇄 기술이 발전하며 생겨난 이론입니다.
            
            전시에 참여한 다섯 명의 작가들은 색이 왜 그런 모습이고, 왜 그런 역할을 가지는지 질문을 던지기도 하고,
            우리가 익숙하게 알고 있던 색의 규칙에서 벗어나 색을 새롭게 바라보고, 특별한 방법으로 표현하며 전혀 다른 역할을 주기도 했습니다.
            작가: 박미나, 박형진, 유지원, 이은선, 정정하
            전시 기간: 2024. 5. 10 ~ 2024. 10. 27`,
              
            "wait color full": `"Wait–Color!" is the museum's first children's exhibition, designed to help audiences of all ages explore color through interaction.
            It encourages new ways of thinking about color beyond conventional rules — with activities, games, and the works of five artists:
            Park Mina, Park Hyungjin, Yoo Ji Won, Lee Eunsun, and Jung Jungha. 
            Dates: May 10 – Oct 27, 2024`,
            
            "기다려색": "기다려-색! 전시에 대해 더 자세히 알고 싶으시면 '기다려색 전체'라고 입력해주세요.",
            "wait color": `"Wait–Color!" is the museum's first children's exhibition, designed to help audiences of all ages explore color through interaction. For full details, type "wait color full".`,
            
            // Additional helpful keywords
            "hello": "안녕하세요! 저는 미술관 톡톡이에요. 전시, 작가, 오시는 길 등 무엇이든 물어보세요! / Hello! I'm Tok-Tok, the museum chatbot. Ask me about exhibitions, artists, directions, and more!",
            "hi": "안녕하세요! 저는 미술관 톡톡이에요. 전시, 작가, 오시는 길 등 무엇이든 물어보세요! / Hello! I'm Tok-Tok, the museum chatbot. Ask me about exhibitions, artists, directions, and more!",
            "안녕": "안녕하세요! 저는 미술관 톡톡이에요. 전시, 작가, 오시는 길 등 무엇이든 물어보세요!",
            "help": "I can help you with information about exhibitions, opening hours, location, the museum director, our collection, and more. What would you like to know?",
            "도움": "전시, 관람시간, 위치, 관장님, 소장품 등에 대해 안내해드릴 수 있습니다. 무엇이 궁금하신가요?",
            
            "ticket": "Admission fees and ticket information are available on the museum website (https://artmuseum.jeonnam.go.kr/museumofart/index.do) or at the front desk.",
            "티켓": "입장료 및 티켓 정보는 미술관 웹사이트 (https://artmuseum.jeonnam.go.kr/museumofart/index.do) 나 안내데스크에서 확인하실 수 있습니다.",
            "입장료": "입장료 정보는 미술관 웹사이트 (https://artmuseum.jeonnam.go.kr/museumofart/index.do) 나 안내데스크에서 확인하실 수 있습니다.",
            
            "website": "Visit our official website for the latest information about exhibitions and events: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "웹사이트": "최신 전시 및 이벤트 정보는 공식 웹사이트에서 확인하실 수 있습니다: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "official website": "Visit our official website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "homepage": "Visit our official website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "홈페이지": "공식 홈페이지를 방문해주세요: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "link": "Visit the official Jeonnam Museum of Art website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "url": "Official website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "more information": "For more information, visit our official website: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            "더 많은 정보": "더 많은 정보는 공식 웹사이트에서 확인하세요: https://artmuseum.jeonnam.go.kr/museumofart/index.do",
            
            "thank": "You're welcome! Feel free to ask if you need any more information. / 천만에요! 더 궁금한 것이 있으시면 언제든 물어보세요.",
            "thanks": "You're welcome! Feel free to ask if you need any more information. / 천만에요! 더 궁금한 것이 있으시면 언제든 물어보세요.",
            "감사": "천만에요! 더 궁금한 것이 있으시면 언제든 물어보세요."
        };
        
        this.quickReplies = [
            { text: "소장품 🌱", value: "소장품" },
            { text: "오시는 길 🚴‍♂️", value: "directions" },
            { text: "현재 전시 📣", value: "현재 전시" },
            { text: "Current Shows 💎", value: "what's on" },
            { text: "기다려-색! 🌈", value: "기다려색 전체" },
            { text: "Ready...set...color! 🔥", value: "wait color full" }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
        this.showQuickReplies();
        this.setupNavigation();
    }
    
    setupEventListeners() {
        this.chatForm.addEventListener("submit", (e) => this.handleSubmit(e));
        this.userInput.addEventListener("keypress", (e) => this.handleKeypress(e));
        this.userInput.addEventListener("input", () => this.handleInput());
    }
    
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            const setNavExpanded = (expanded) => {
                navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            };

            setNavExpanded(false);

            navToggle.addEventListener('click', () => {
                const isOpen = navLinks.classList.toggle('active');
                navToggle.classList.toggle('active', isOpen);
                setNavExpanded(isOpen);
            });
            
            // Close mobile menu when clicking on links
            const navLinkElements = document.querySelectorAll('.nav-link');
            navLinkElements.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    setNavExpanded(false);
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    setNavExpanded(false);
                }
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const input = this.userInput.value.trim();
        if (!input || this.isTyping) return;
        
        this.sendMessage(input);
        this.userInput.value = "";
        this.hideQuickReplies();
    }
    
    handleKeypress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSubmit(e);
        }
    }
    
    handleInput() {
        const hasText = this.userInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText || this.isTyping;
        // Keep the paper plane icon, just change opacity for visual feedback
        this.sendButton.style.opacity = hasText && !this.isTyping ? '1' : '0.5';
    }
    
    showWelcomeMessage() {
        const welcomeDiv = document.createElement("div");
        welcomeDiv.className = "welcome-message";
        welcomeDiv.innerHTML = `
            <h3>안녕하세요! 저는 미술관 톡톡이에요.<br>전시, 작가, 오시는 길 등 무엇이든 물어보세요!</h3>
            <p>Hello! I'm the museum chatbot Talk-Talk!</p>
            <p>Ask me about exhibitions, artists, directions, and more.</p>
        `;
        this.chatlog.appendChild(welcomeDiv);
    }
    
    async sendMessage(input) {
        this.appendMessage("user", input);
        this.showTypingIndicator();
        
        // Simulate thinking time for more natural feel
        await this.delay(800 + Math.random() * 1200);
        
        this.hideTypingIndicator();
        const response = this.getResponse(input.toLowerCase());
        this.appendMessage("bot", response);
        
        // Show quick replies after bot response (with some delay)
        setTimeout(() => this.showQuickReplies(), 1000);
    }
    
    appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message message-${sender}`;
        
        const avatarDiv = document.createElement("div");
        avatarDiv.className = "message-avatar";
        avatarDiv.textContent = sender === "user" ? "👤" : "🤖";
        
        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";
        
        // Convert URLs to clickable links for bot messages
        if (sender === "bot") {
            contentDiv.innerHTML = this.linkifyUrls(text);
        } else {
            contentDiv.textContent = text;
        }
        
        if (sender === "user") {
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(avatarDiv);
        } else {
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
        }
        
        this.chatlog.appendChild(messageDiv);
        this.scrollToBottom();
        this.messageCount++;
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        this.sendButton.disabled = true;
        
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "typing-indicator";
        
        const avatarDiv = document.createElement("div");
        avatarDiv.className = "message-avatar";
        avatarDiv.textContent = "🤖";
        
        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";
        
        const dotsDiv = document.createElement("div");
        dotsDiv.className = "typing-dots";
        dotsDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        contentDiv.appendChild(dotsDiv);
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        this.chatlog.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
        this.sendButton.disabled = false;
    }
    
    getResponse(input) {
        // Enhanced keyword matching with fuzzy search
        let bestMatch = null;
        let highestScore = 0;
        
        for (const key in this.responses) {
            const score = this.calculateMatchScore(input, key);
            if (score > highestScore && score > 0.3) { // Threshold for matching
                highestScore = score;
                bestMatch = key;
            }
        }
        
        if (bestMatch) {
            return this.responses[bestMatch];
        }
        
        // Contextual fallback responses
        const fallbackResponses = [
            "죄송합니다. 해당 정보를 찾을 수 없습니다. 다른 질문을 해보시거나 빠른 답변 버튼을 이용해보세요. / Sorry, I couldn't find that information. Try another question or use the quick reply buttons.",
            "잘 이해하지 못했습니다. '도움'이라고 입력하시면 제가 답변할 수 있는 주제들을 안내해드릴게요. / I didn't understand that. Type 'help' to see topics I can assist with.",
            "더 구체적으로 질문해주시겠어요? 전시, 시간, 위치 등에 대해 물어보실 수 있습니다. / Could you be more specific? You can ask about exhibitions, hours, location, and more."
        ];
        
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
    
    calculateMatchScore(input, keyword) {
        // Simple but effective fuzzy matching
        input = input.toLowerCase();
        keyword = keyword.toLowerCase();
        
        // Exact match gets highest score
        if (input.includes(keyword)) return 1.0;
        if (keyword.includes(input)) return 0.9;
        
        // Check for partial matches and word boundaries
        const inputWords = input.split(/\s+/);
        const keywordWords = keyword.split(/\s+/);
        
        let matches = 0;
        for (const inputWord of inputWords) {
            for (const keywordWord of keywordWords) {
                if (inputWord.includes(keywordWord) || keywordWord.includes(inputWord)) {
                    matches++;
                    break;
                }
            }
        }
        
        return matches / Math.max(inputWords.length, keywordWords.length);
    }
    
    showQuickReplies() {
        let quickRepliesDiv = document.getElementById("quick-replies");
        
        if (!quickRepliesDiv) {
            quickRepliesDiv = document.createElement("div");
            quickRepliesDiv.id = "quick-replies";
            quickRepliesDiv.className = "quick-replies";
            
            // Insert before the chat form
            this.chatForm.parentNode.insertBefore(quickRepliesDiv, this.chatForm);
        }
        
        quickRepliesDiv.innerHTML = "";
        
        // Show random selection of quick replies to keep it fresh
        const shuffled = [...this.quickReplies].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6); // Show 6 random quick replies
        
        selected.forEach(reply => {
            const button = document.createElement("button");
            button.className = "quick-reply-btn";
            button.textContent = reply.text;
            button.addEventListener("click", () => {
                this.userInput.value = reply.value;
                this.handleSubmit(new Event('submit'));
            });
            quickRepliesDiv.appendChild(button);
        });
        
        quickRepliesDiv.classList.add("show");
    }
    
    hideQuickReplies() {
        const quickRepliesDiv = document.getElementById("quick-replies");
        if (quickRepliesDiv) {
            quickRepliesDiv.classList.remove("show");
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatlog.scrollTop = this.chatlog.scrollHeight;
        }, 100);
    }
    
    linkifyUrls(text) {
        // Convert URLs to clickable links, but exclude trailing punctuation
        const urlRegex = /(https?:\/\/[^\s]+?)(?=[.,;:!?)\]}]?\s|[.,;:!?)\]}]?$|$)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>');
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the chatbot when the page loads
document.addEventListener("DOMContentLoaded", () => {
    new MuseumChatbot();
});
