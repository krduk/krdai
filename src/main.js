import { GoogleGenerativeAI } from '@google/generative-ai';
import daigorouImg from '../public/avatars/daigorou.jpg';
import chiikidoImg from '../public/avatars/chiikido.jpg';
import tokibaaImg from '../public/avatars/tokibaa.jpg';
import motoyamaImg from '../public/avatars/motoyama.jpg';

// State Management
const STATE = {
  apiKey: localStorage.getItem('gemini_api_key') || '',
  imageApiKey: localStorage.getItem('gemini_image_api_key') || '',
  model: 'gemini-3.1-flash-lite',
  autoSpeech: localStorage.getItem('auto_speech') !== 'false',
  childName: localStorage.getItem('child_name') || 'きみ',
  honorific: localStorage.getItem('honorific') || 'くん',
  chatHistory: [], // Holds multi-turn conversation thread
  isDisplayingDialogue: false
};

// Character Config (Face close-ups via CSS zoom-face)
const CHARACTERS = {
  'だいごろう': { image: daigorouImg, class: 'speech-daigorou', pitch: 1.4, rate: 1.1 },
  'チイキド博士': { image: chiikidoImg, class: 'speech-chiikido', pitch: 0.9, rate: 1.0 },
  'トキばあ': { image: tokibaaImg, class: 'speech-tokibaa', pitch: 0.8, rate: 0.85 },
  '本山さん': { image: motoyamaImg, class: 'speech-motoyama', pitch: 1.25, rate: 1.05 }
};

const CHARACTER_NAMES = ['だいごろう', 'チイキド博士', 'トキばあ', '本山さん'];

// Helper to shuffle array randomly
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Dynamic System Prompt Supporting Continuous Dialogue Context
const getSystemPrompt = (childFullName) => {
  const facilitator = CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
  const others = shuffleArray(CHARACTER_NAMES.filter(name => name !== facilitator));

  return `
# 目的
ユーザー（子供）の質問や返答に対して、4人のキャラクター（だいごろう、チイキド博士、トキばあ、本山さん）がそれぞれの視点で楽しく会話を継続・深掘りし、子供がさらに自分の考えを深められるようにするAIです。

# 今回の劇の進行指定
- **今回の進行役（案内役）**: 【${facilitator}】
- **発言メンバー**: ${facilitator}、${others[0]}、${others[1]}、${others[2]}

# キャラクター（ペルソナ）設定
1. **だいごろう**：元気いっぱいの男の子。「〜〜したら楽しそう！」という無邪気で楽しい視点。
2. **チイキド博士**：物知りな優しい博士。「〜〜という仕組みなんだよ」という知識・理屈の視点。
3. **トキばあ**：おっとりしたおばあちゃん。「〜〜かもしれないよぉ」という優しく慎重な視点。
4. **本山さん**：しっかりもののお姉さん。「なるほどね！〜〜な気持ちもわかるな」という共感・まとめ視点。

# 算数・理科・社会の特別ルール（画像解説提案・必ずチイキド博士が図示する）
- 小学生の【算数・理科・社会】に関する質問や疑問が含まれる場合、必ず【チイキド博士】が発言の中で**「わしが絵（図解）を描いて詳しく説明しようか？」**や**「図を描いて詳しく説明しようか？」**のようにユーザーに問いかけて提案してください。
- ユーザーがそれに対して「はい」「お願い」「詳しく教えて」「みせて」などと答えた場合、必ず【チイキド博士】が**「よし！図を描いて詳しく説明するぞ！」**と答えてください。
- **重要（画像の提示は必ずチイキド博士が行う）**: 画像生成タグ【IMAGE: ...】を付けることができるのは**【チイキド博士】の発言のみ**です。他のキャラクター（だいごろう、トキばあ、本山さん）に【IMAGE: ...】タグを付けることは厳禁です。
- **重要（図内のテキスト・説明は日本語にする）**: 【IMAGE: ...】のプロンプト内には「Draw an educational diagram for Japanese elementary school students. All text, labels, and explanations inside the image MUST be written in JAPANESE (日本語).」という指示を含め、日本語表記の分かりやすい図解をリクエストしてください。

# 応答の重要ルール（継続対話）
- ユーザー（${childFullName}）の発言内容やこれまでの会話の流れを受けて、**4人で会話を繋げて自然に返答**してください。
- 今回の進行役は必ず【${facilitator}】が行ってください。【${facilitator}】が会話を受け止め、またはまとめ、**最後に必ず「${childFullName}は、どう思う？」や「〜〜はどうかな？」など次のお返事を促す問いかけ**をして終わってください。
- 子供が理解しやすい簡単な言葉（小学校低学年向け）を使い、1発言あたり1〜2文のテンポよい【劇のセリフ形式】で出力してください。
- 劇の会話の**一番最後の行に必ず**【OPTIONS: 返答の選択肢1 | 返答の選択肢2 | 返答の選択肢3】（例: 【OPTIONS: 詳しく教えて！ | 面白そうだね！ | 別のことも聞きたい】）という形式で、子供がワンタップで返答できる3つの選択肢を出力してください。

# 出力フォーマットの例
${facilitator}「${childFullName}、素敵なアイデアだね！みんなはどう思う？」
${others[0]}「ぼくは〜〜だと思うな！」
${others[1]}「〜〜という考え方もありますよ。」
${others[2]}「う〜ん、〜〜かもしれないねぇ。」
${facilitator}「みんな色んな考えがあるね！${childFullName}、次はどうしてみる？」
【OPTIONS: 詳しく教えて！ | 楽しそうだね！ | 他の考えもあるよ】
`;
};

// DOM Elements
const elements = {
  btnSettings: document.getElementById('btn-settings'),
  btnResetChat: document.getElementById('btn-reset-chat'),
  settingsModal: document.getElementById('settings-modal'),
  btnCloseModal: document.getElementById('btn-close-modal'),
  btnSaveSettings: document.getElementById('btn-save-settings'),
  apiKeyInput: document.getElementById('api-key-input'),
  imageApiKeyInput: document.getElementById('image-api-key-input'),
  selectModel: document.getElementById('select-model'),
  checkAutoSpeech: document.getElementById('check-auto-speech'),
  inputChildName: document.getElementById('input-child-name'),
  selectHonorific: document.getElementById('select-honorific'),
  questionInput: document.getElementById('question-input'),
  btnAsk: document.getElementById('btn-ask'),
  btnMic: document.getElementById('btn-mic'),
  micText: document.getElementById('mic-text'),
  voiceStatus: document.getElementById('voice-status'),
  voiceStatusText: document.getElementById('voice-status-text'),
  loadingState: document.getElementById('loading-state'),
  dialogueSection: document.getElementById('dialogue-section'),
  dialogueList: document.getElementById('dialogue-list'),
  btnReadAll: document.getElementById('btn-read-all'),
  suggestionsArea: document.getElementById('suggestions-area'),
  consoleTitle: document.getElementById('console-title')
};

// Speech Recognition
let recognition = null;
let isListening = false;

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    elements.btnMic.style.display = 'none';
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = () => {
    isListening = true;
    elements.btnMic.classList.add('listening');
    elements.micText.textContent = '聞いています...（おすと止まる）';
    elements.voiceStatus.classList.remove('hidden');
    elements.voiceStatusText.textContent = '声を聞いているよ... 👂';
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    elements.questionInput.value = transcript;
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    stopListening();
  };

  recognition.onend = () => {
    stopListening();
    const text = elements.questionInput.value.trim();
    if (text && !STATE.isDisplayingDialogue) {
      setTimeout(() => {
        handleAskQuestion();
      }, 400);
    }
  };

  elements.btnMic.addEventListener('click', toggleListening);
}

function toggleListening() {
  if (isListening) {
    recognition.stop();
  } else {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    try {
      recognition.start();
    } catch (e) {
      console.warn('Recognition start error:', e);
    }
  }
}

function stopListening() {
  isListening = false;
  elements.btnMic.classList.remove('listening');
  elements.micText.textContent = 'こえで はなしかける（おす）';
  elements.voiceStatus.classList.add('hidden');
}

// Initialize Application
function init() {
  elements.apiKeyInput.value = STATE.apiKey;
  if (elements.imageApiKeyInput) {
    elements.imageApiKeyInput.value = STATE.imageApiKey;
  }
  elements.checkAutoSpeech.checked = STATE.autoSpeech;
  elements.inputChildName.value = STATE.childName;
  elements.selectHonorific.value = STATE.honorific;

  initSpeechRecognition();

  elements.btnSettings.addEventListener('click', () => toggleModal(true));
  elements.btnCloseModal.addEventListener('click', () => toggleModal(false));
  elements.btnSaveSettings.addEventListener('click', saveSettings);
  elements.btnResetChat.addEventListener('click', resetChatSession);

  elements.inputChildName.addEventListener('change', updateChildProfile);
  elements.selectHonorific.addEventListener('change', updateChildProfile);

  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.questionInput.value = btn.dataset.question;
      handleAskQuestion();
    });
  });

  // Enable sending with Enter key inside text input
  elements.questionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  });

  elements.btnAsk.addEventListener('click', handleAskQuestion);
  elements.btnReadAll.addEventListener('click', readLatestDialogue);

  if (!STATE.apiKey) {
    setTimeout(() => {
      toggleModal(true);
    }, 500);
  }
}

function updateChildProfile() {
  STATE.childName = elements.inputChildName.value.trim() || 'きみ';
  STATE.honorific = elements.selectHonorific.value;
  localStorage.setItem('child_name', STATE.childName);
  localStorage.setItem('honorific', STATE.honorific);
}

function toggleModal(show) {
  if (show) {
    elements.settingsModal.classList.remove('hidden');
  } else {
    elements.settingsModal.classList.add('hidden');
  }
}

function saveSettings() {
  STATE.apiKey = elements.apiKeyInput.value.trim();
  if (elements.imageApiKeyInput) {
    STATE.imageApiKey = elements.imageApiKeyInput.value.trim();
    localStorage.setItem('gemini_image_api_key', STATE.imageApiKey);
  }
  STATE.autoSpeech = elements.checkAutoSpeech.checked;

  localStorage.setItem('gemini_api_key', STATE.apiKey);
  localStorage.setItem('auto_speech', STATE.autoSpeech);

  toggleModal(false);
  alert('設定を保存しました！✨');
}

// Reset Conversation Session
function resetChatSession() {
  if (STATE.isDisplayingDialogue) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  STATE.chatHistory = [];
  if (elements.dialogueList) elements.dialogueList.innerHTML = '';
  if (elements.dialogueSection) elements.dialogueSection.classList.add('hidden');
  if (elements.suggestionsArea) elements.suggestionsArea.classList.remove('hidden');
  if (elements.consoleTitle) elements.consoleTitle.innerHTML = `<span class="cyber-icon">🚀</span> 4人に話しかける`;
  if (elements.questionInput) elements.questionInput.value = '';

  alert('会話を新しくリセットしました！✨');
}

// Ask or Reply in Chat Thread
async function handleAskQuestion() {
  if (STATE.isDisplayingDialogue) return;

  const userText = elements.questionInput.value.trim();
  if (!userText) {
    alert('へんじ や しつもんを入力してね！');
    return;
  }

  if (!STATE.apiKey) {
    alert('最初に「せってい（⚙️）」から Gemini APIキー を入力してね！');
    toggleModal(true);
    return;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Hide suggestion tags after first message
  elements.suggestionsArea.classList.add('hidden');
  elements.loadingState.classList.remove('hidden');
  elements.questionInput.value = '';

  const childFullName = `${STATE.childName}${STATE.honorific}`;

  // Render User's message bubble in stream
  renderUserMessage(userText, childFullName);

  // Append user message to chat history
  STATE.chatHistory.push({ role: 'user', content: userText });

  try {
    const genAI = new GoogleGenerativeAI(STATE.apiKey);
    const targetModel = 'gemini-3.1-flash-lite';

    // Construct full prompt with previous conversation history
    let contextPrompt = getSystemPrompt(childFullName) + '\n\n# これまでの会話の流れ:\n';
    STATE.chatHistory.forEach(msg => {
      if (msg.role === 'user') {
        contextPrompt += `${childFullName}: 「${msg.content}」\n`;
      } else {
        contextPrompt += `${msg.content}\n`;
      }
    });

    const model = genAI.getGenerativeModel({
      model: targetModel,
      systemInstruction: contextPrompt
    });

    const result = await model.generateContent(`最新の${childFullName}の発言: 「${userText}」に返答してください。`);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('返答を取得できませんでした。');
    }

    // Append AI response to chat history
    STATE.chatHistory.push({ role: 'model', content: responseText });

    const parsedDialogue = parseDialogue(responseText);

    // Update console title to encourage continuing conversation if present
    if (elements.consoleTitle) {
      elements.consoleTitle.innerHTML = `<span class="cyber-icon">💬</span> 4人へのへんじ・つづきを話す`;
    }

    // Render dialogue with typing effect and voice
    await renderDialogueSequential(parsedDialogue);

  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    alert(`エラーが発生しました:\n${error.message || error}\n\n※ APIキーが正しいかご確認ください。`);
  } finally {
    elements.loadingState.classList.add('hidden');
  }
}

// Render User Message Bubble
function renderUserMessage(text, childFullName) {
  elements.dialogueSection.classList.remove('hidden');

  const itemEl = document.createElement('div');
  itemEl.className = 'speech-bubble-item speech-user';
  itemEl.innerHTML = `
    <div class="user-avatar-icon">👤</div>
    <div class="speech-content">
      <div class="speech-speaker">${escapeHtml(childFullName)}</div>
      <div class="speech-text">${escapeHtml(text)}</div>
    </div>
  `;

  elements.dialogueList.appendChild(itemEl);
  itemEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Helper to generate image using gemini-3.1-flash-lite-image model
async function generateExplanationImage(promptText) {
  try {
    const apiKeyToUse = STATE.imageApiKey || STATE.apiKey;
    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    const imageModel = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-image' });
    const result = await imageModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: promptText }] }]
    });

    const response = result.response;
    const candidates = response.candidates;
    if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (err) {
    console.error('Image generation error with gemini-3.1-flash-lite-image:', err);
  }
  return null;
}

// Parse Gemini line-by-line script response
function parseDialogue(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const dialogue = [];
  let options = [];

  const regex = /^(だいごろう|チイキド博士|トキばあ|本山さん)[「:：](.*)[」]?$/;
  const imageTagRegex = /【IMAGE:\s*(.*?)】/i;
  const optionsTagRegex = /【OPTIONS:\s*(.*?)】/i;

  lines.forEach(line => {
    // Check for OPTIONS tag
    const optMatch = line.match(optionsTagRegex);
    if (optMatch) {
      options = optMatch[1].split('|').map(s => s.trim()).filter(s => s.length > 0);
      return;
    }

    let imagePrompt = null;
    const imgMatch = line.match(imageTagRegex);
    if (imgMatch) {
      // Prompt enhancement for Japanese text inside generated image
      imagePrompt = `${imgMatch[1]}. Educational diagram for Japanese elementary school students with JAPANESE text labels and annotations (日本語表記).`;
      line = line.replace(imageTagRegex, '').trim();
    }

    const match = line.match(regex);
    if (match) {
      let speaker = match[1];
      let text = match[2].replace(/[」]$/, '');
      // Ensure ONLY Chiikido Doctor gets the image attached
      const finalImagePrompt = (speaker === 'チイキド博士') ? imagePrompt : null;
      dialogue.push({ speaker, text, imagePrompt: finalImagePrompt });
    } else {
      const fallbackSpeaker = CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
      const finalImagePrompt = (fallbackSpeaker === 'チイキド博士') ? imagePrompt : null;
      dialogue.push({ speaker: fallbackSpeaker, text: line.replace(/^[案内役|進行役][「:：]/, '').replace(/[」]$/, ''), imagePrompt: finalImagePrompt });
    }
  });

  // Fallback options if model missed OPTIONS tag
  if (options.length === 0) {
    options = ['もっと詳しく教えて！', 'おもしろそうだね！', '別のことも聞きたい！'];
  }

  return { dialogue, options };
}

// Render Character Speech Bubbles Sequentially
async function renderDialogueSequential(parsedData) {
  const dialogue = parsedData.dialogue;
  const options = parsedData.options || [];

  STATE.isDisplayingDialogue = true;

  for (let i = 0; i < dialogue.length; i++) {
    const item = dialogue[i];
    const config = CHARACTERS[item.speaker] || CHARACTERS['本山さん'];

    const itemEl = document.createElement('div');
    itemEl.className = `speech-bubble-item ${config.class}`;
    itemEl.innerHTML = `
      <div class="speech-avatar-img zoom-face"><img src="${config.image}" alt="${item.speaker}"></div>
      <div class="speech-content">
        <div class="speech-speaker">${item.speaker}</div>
        <div class="speech-text"><span class="typed-text"></span><span class="typing-cursor"></span></div>
        <div class="speech-image-container hidden"></div>
        <div class="speech-action">
          <button class="btn-speak-single" data-speaker="${item.speaker}" data-text="${escapeHtml(item.text)}">🔊 きく</button>
        </div>
      </div>
    `;

    elements.dialogueList.appendChild(itemEl);
    scrollToBottom();

    const textSpan = itemEl.querySelector('.typed-text');
    const cursorSpan = itemEl.querySelector('.typing-cursor');

    if (STATE.autoSpeech && 'speechSynthesis' in window) {
      const estimatedDurationMs = Math.max(item.text.length * 150, 1500);
      const typingCharSpeed = Math.floor(estimatedDurationMs / item.text.length);

      const typingPromise = typeTextAsync(textSpan, item.text, Math.min(typingCharSpeed, 60));
      await speakUtteranceAsync(item);
      await typingPromise;
    } else {
      await typeTextAsync(textSpan, item.text, 40);
      await new Promise(r => setTimeout(r, 800));
    }

    if (cursorSpan) {
      cursorSpan.style.display = 'none';
    }

    // If Chiikido Doctor triggered image generation
    if (item.imagePrompt) {
      const imgContainer = itemEl.querySelector('.speech-image-container');
      if (imgContainer) {
        imgContainer.classList.remove('hidden');
        imgContainer.innerHTML = `<div class="image-loading-text">🎨 チイキド博士が図を描いています... 🎨</div>`;
        scrollToBottom();

        const generatedDataUrl = await generateExplanationImage(item.imagePrompt);
        if (generatedDataUrl) {
          imgContainer.innerHTML = `<img src="${generatedDataUrl}" alt="チイキド博士の解説図" class="generated-explanation-img">`;
        } else {
          imgContainer.innerHTML = `<div class="image-error-text">⚠️ 図の作成に失敗しました</div>`;
        }
        scrollToBottom();
      }
    }

    await new Promise(r => setTimeout(r, 600));
  }

  // Attach individual click handlers for re-playing speech
  document.querySelectorAll('.btn-speak-single').forEach(btn => {
    btn.onclick = () => {
      speakSingle({ speaker: btn.dataset.speaker, text: btn.dataset.text });
    };
  });

  // Render 3 Response Options at the end of dialogue
  if (options && options.length > 0) {
    renderResponseOptions(options);
  }

  STATE.isDisplayingDialogue = false;
}

// Render Option Buttons for child to pick easily
function renderResponseOptions(options) {
  // Remove existing option containers if any
  const oldContainer = elements.dialogueList.querySelector('.reply-options-container');
  if (oldContainer) {
    oldContainer.remove();
  }

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'reply-options-container';
  optionsContainer.innerHTML = `<span class="options-label">💡 へんじの選択肢（タップで返事）：</span>`;

  const buttonsGroup = document.createElement('div');
  buttonsGroup.className = 'reply-options-buttons';

  options.forEach(optText => {
    const btn = document.createElement('button');
    btn.className = 'btn-reply-option';
    btn.textContent = optText;
    btn.onclick = () => {
      elements.questionInput.value = optText;
      handleAskQuestion();
    };
    buttonsGroup.appendChild(btn);
  });

  optionsContainer.appendChild(buttonsGroup);
  elements.dialogueList.appendChild(optionsContainer);
  scrollToBottom();
}

// Type text character by character
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

function typeTextAsync(element, text, speedMs = 40) {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = '';
    const timer = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speedMs);
  });
}

// Async speech synthesis helper
function speakUtteranceAsync(dialogueItem) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const config = CHARACTERS[dialogueItem.speaker] || CHARACTERS['本山さん'];
    const textToSpeak = dialogueItem.text;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.lang = 'ja-JP';
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;

    let hasResolved = false;
    const finish = () => {
      if (!hasResolved) {
        hasResolved = true;
        resolve();
      }
    };

    utterance.onend = finish;
    utterance.onerror = finish;

    window.speechSynthesis.speak(utterance);

    const checkSpeechState = setInterval(() => {
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        clearInterval(checkSpeechState);
        finish();
      }
    }, 200);

    const maxWaitTime = Math.max(textToSpeak.length * 400, 5000);
    setTimeout(() => {
      clearInterval(checkSpeechState);
      finish();
    }, maxWaitTime);
  });
}

function speakSingle(dialogueItem) {
  if (!('speechSynthesis' in window)) {
    alert('お使いのブラウザは音声読み上げに対応していません。');
    return;
  }

  window.speechSynthesis.cancel();

  const config = CHARACTERS[dialogueItem.speaker] || CHARACTERS['本山さん'];
  const utterance = new SpeechSynthesisUtterance(dialogueItem.text);
  utterance.lang = 'ja-JP';
  utterance.pitch = config.pitch;
  utterance.rate = config.rate;

  window.speechSynthesis.speak(utterance);
}

function readLatestDialogue() {
  const latestItems = elements.dialogueList.querySelectorAll('.speech-bubble-item');
  if (!('speechSynthesis' in window) || latestItems.length === 0) return;

  window.speechSynthesis.cancel();

  latestItems.forEach((el) => {
    const speakerEl = el.querySelector('.speech-speaker');
    const textEl = el.querySelector('.typed-text') || el.querySelector('.speech-text');
    if (speakerEl && textEl) {
      const speaker = speakerEl.textContent.trim();
      const text = textEl.textContent.trim();
      const config = CHARACTERS[speaker] || CHARACTERS['本山さん'];
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      if (config) {
        utterance.pitch = config.pitch;
        utterance.rate = config.rate;
      }
      window.speechSynthesis.speak(utterance);
    }
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

document.addEventListener('DOMContentLoaded', init);
