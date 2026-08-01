import { GoogleGenerativeAI } from '@google/generative-ai';
import confetti from 'canvas-confetti';

// State Management
const STATE = {
  apiKey: localStorage.getItem('gemini_api_key') || '',
  model: 'gemini-3.1-flash-lite',
  autoSpeech: localStorage.getItem('auto_speech') !== 'false',
  childName: localStorage.getItem('child_name') || 'きみ',
  honorific: localStorage.getItem('honorific') || 'くん',
  savedThoughts: JSON.parse(localStorage.getItem('saved_thoughts') || '[]'),
  currentDialogue: [],
  isDisplayingDialogue: false
};

// Character Config (Warm Picture-Book Style)
const CHARACTERS = {
  'だいごろう': { image: './avatars/daigorou.jpg', class: 'speech-daigorou', pitch: 1.4, rate: 1.1 },
  'チイキド博士': { image: './avatars/chiikido.jpg', class: 'speech-chiikido', pitch: 0.9, rate: 1.0 },
  'トキばあ': { image: './avatars/tokibaa.jpg', class: 'speech-tokibaa', pitch: 0.8, rate: 0.85 },
  '本山さん': { image: './avatars/motoyama.jpg', class: 'speech-motoyama', pitch: 1.25, rate: 1.05 }
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

// System Prompt Template with dynamic facilitator and warm non-AI persona
const getSystemPrompt = (childFullName) => {
  const facilitator = CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
  const others = shuffleArray(CHARACTER_NAMES.filter(name => name !== facilitator));

  return `
# 目的
ユーザー（子供）の質問に対して、4人の親しみやすいキャラクターがそれぞれの視点で楽しく話し合い、最終的に子供自身にどう思うかを考えてもらうための対話です。

# 今回の劇の演出指定（最重要）
- **今回の進行役（案内役）**: 【${facilitator}】
- **発言の参加順序例**: ${facilitator}（最初の呼びかけ） ➔ ${others[0]} ➔ ${others[1]} ➔ ${others[2]} ➔ ${facilitator}（まとめ＆問いかけ）

# キャラクター（ペルソナ）設定
1. **だいごろう**：元気いっぱいの男の子。「〜〜したら楽しそう！」という無邪気で楽しい視点。
2. **チイキド博士**：物知りな優しい博士。「〜〜という仕組みなんだよ」という知識・理屈の視点。
3. **トキばあ**：おっとりしたおばあちゃん。「〜〜かもしれないよぉ」という優しく慎重な視点。
4. **本山さん**：しっかりもののお姉さん。「なるほどね！〜〜な気持ちもわかるな」という共感・まとめ視点。

# 応答の重要ルール
- AIやシステムといった表現・言葉は一切使わないでください。自然な人間の劇・話し合いとして出力してください。
- **今回の進行役は必ず【${facilitator}】が行ってください。**【${facilitator}】が最初に質問を受け止め、会話の最後に必ず「${childFullName}は、どう思う？」と優しく問いかけて終わってください。
- 子供が理解しやすい簡単な言葉（小学校低学年向け）を使い、1発言あたり1〜2文のテンポよい【劇のセリフ形式】で出力してください。

# 出力フォーマットの例
${facilitator}「面白そうな質問だね！みんなはどう思う？」
${others[0]}「〜〜〜！」
${others[1]}「〜〜〜です。」
${others[2]}「〜〜〜かもねぇ。」
${facilitator}「みんな色んな意見があるね！${childFullName}は、どう思う？」
`;
};

// DOM Elements
const elements = {
  btnSettings: document.getElementById('btn-settings'),
  settingsModal: document.getElementById('settings-modal'),
  btnCloseModal: document.getElementById('btn-close-modal'),
  btnSaveSettings: document.getElementById('btn-save-settings'),
  apiKeyInput: document.getElementById('api-key-input'),
  selectModel: document.getElementById('select-model'),
  checkAutoSpeech: document.getElementById('check-auto-speech'),
  inputChildName: document.getElementById('input-child-name'),
  selectHonorific: document.getElementById('select-honorific'),
  questionInput: document.getElementById('question-input'),
  btnAsk: document.getElementById('btn-ask'),
  loadingState: document.getElementById('loading-state'),
  dialogueSection: document.getElementById('dialogue-section'),
  dialogueList: document.getElementById('dialogue-list'),
  btnReadAll: document.getElementById('btn-read-all'),
  thoughtSection: document.getElementById('thought-section'),
  thoughtPromptName: document.getElementById('thought-prompt-name'),
  inputMyOpinion: document.getElementById('input-my-opinion'),
  btnSaveThought: document.getElementById('btn-save-thought'),
  savedThoughtsSection: document.getElementById('saved-thoughts-section'),
  savedThoughtsList: document.getElementById('saved-thoughts-list')
};

// Initialize Application
function init() {
  elements.apiKeyInput.value = STATE.apiKey;
  elements.checkAutoSpeech.checked = STATE.autoSpeech;
  elements.inputChildName.value = STATE.childName;
  elements.selectHonorific.value = STATE.honorific;

  renderSavedThoughts();

  elements.btnSettings.addEventListener('click', () => toggleModal(true));
  elements.btnCloseModal.addEventListener('click', () => toggleModal(false));
  elements.btnSaveSettings.addEventListener('click', saveSettings);
  
  elements.inputChildName.addEventListener('change', updateChildProfile);
  elements.selectHonorific.addEventListener('change', updateChildProfile);

  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.questionInput.value = btn.dataset.question;
      handleAskQuestion();
    });
  });

  elements.btnAsk.addEventListener('click', handleAskQuestion);
  elements.btnReadAll.addEventListener('click', readAllDialogue);
  elements.btnSaveThought.addEventListener('click', handleSaveThought);

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
  STATE.autoSpeech = elements.checkAutoSpeech.checked;

  localStorage.setItem('gemini_api_key', STATE.apiKey);
  localStorage.setItem('auto_speech', STATE.autoSpeech);

  toggleModal(false);
  alert('設定をほぞんしました！✨');
}

// Ask Gemini Question
async function handleAskQuestion() {
  if (STATE.isDisplayingDialogue) return;

  const question = elements.questionInput.value.trim();
  if (!question) {
    alert('しつもんを入力してね！');
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

  elements.dialogueSection.classList.add('hidden');
  elements.thoughtSection.classList.add('hidden');
  elements.loadingState.classList.remove('hidden');

  const childFullName = `${STATE.childName}${STATE.honorific}`;

  try {
    const genAI = new GoogleGenerativeAI(STATE.apiKey);
    const targetModel = 'gemini-3.1-flash-lite';
    
    console.log(`Requesting Gemini model: ${targetModel}`);
    const model = genAI.getGenerativeModel({
      model: targetModel,
      systemInstruction: getSystemPrompt(childFullName)
    });

    const result = await model.generateContent(question);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('返答を取得できませんでした。');
    }

    const parsedDialogue = parseDialogue(responseText);
    STATE.currentDialogue = parsedDialogue;

    // Render dialogue with typing effect and sequential live play
    await renderDialogueSequential(parsedDialogue, childFullName);

  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    alert(`エラーが発生しました:\n${error.message || error}\n\n※ APIキーが正しいかご確認ください。`);
  } finally {
    elements.loadingState.classList.add('hidden');
  }
}

// Parse Gemini line-by-line script response
function parseDialogue(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const dialogue = [];

  const regex = /^(だいごろう|チイキド博士|トキばあ|本山さん)[「:：](.*)[」]?$/;

  lines.forEach(line => {
    const match = line.match(regex);
    if (match) {
      let speaker = match[1];
      let text = match[2].replace(/[」]$/, '');
      dialogue.push({ speaker, text });
    } else {
      const fallbackSpeaker = CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
      dialogue.push({ speaker: fallbackSpeaker, text: line.replace(/^[案内役|進行役][「:：]/, '').replace(/[」]$/, '') });
    }
  });

  return dialogue;
}

// Sequential Live Play with Synchronized Typing & Speech Synthesis
async function renderDialogueSequential(dialogue, childFullName) {
  STATE.isDisplayingDialogue = true;
  elements.dialogueList.innerHTML = '';
  elements.dialogueSection.classList.remove('hidden');
  elements.dialogueSection.scrollIntoView({ behavior: 'smooth' });

  for (let i = 0; i < dialogue.length; i++) {
    const item = dialogue[i];
    const config = CHARACTERS[item.speaker] || CHARACTERS['本山さん'];

    const itemEl = document.createElement('div');
    itemEl.className = `speech-bubble-item ${config.class}`;
    itemEl.innerHTML = `
      <div class="speech-avatar-img"><img src="${config.image}" alt="${item.speaker}"></div>
      <div class="speech-content">
        <div class="speech-speaker">${item.speaker}</div>
        <div class="speech-text"><span class="typed-text"></span><span class="typing-cursor"></span></div>
        <div class="speech-action">
          <button class="btn-speak-single" data-index="${i}">🔊 きく</button>
        </div>
      </div>
    `;

    elements.dialogueList.appendChild(itemEl);
    itemEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

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

    await new Promise(r => setTimeout(r, 600));
  }

  document.querySelectorAll('.btn-speak-single').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      speakSingle(dialogue[idx]);
    });
  });

  elements.thoughtSection.classList.remove('hidden');
  elements.thoughtPromptName.textContent = childFullName;
  elements.inputMyOpinion.value = '';
  elements.thoughtSection.scrollIntoView({ behavior: 'smooth' });

  STATE.isDisplayingDialogue = false;
}

// Type text character by character
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
    const textToSpeak = `${dialogueItem.speaker}。${dialogueItem.text}`;
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

function readAllDialogue() {
  if (!('speechSynthesis' in window) || STATE.currentDialogue.length === 0) return;

  window.speechSynthesis.cancel();

  STATE.currentDialogue.forEach((item) => {
    const config = CHARACTERS[item.speaker] || CHARACTERS['本山さん'];
    const textToSpeak = `${item.speaker}。${item.text}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ja-JP';
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;

    window.speechSynthesis.speak(utterance);
  });
}

// Save Thought to Notebook
function handleSaveThought() {
  const opinion = elements.inputMyOpinion.value.trim();
  const question = elements.questionInput.value.trim();

  if (!opinion) {
    alert('じぶんの考えを入力してね！');
    return;
  }

  const thoughtRecord = {
    id: Date.now(),
    date: new Date().toLocaleDateString('ja-JP'),
    question: question,
    opinion: opinion,
    author: `${STATE.childName}${STATE.honorific}`
  };

  STATE.savedThoughts.unshift(thoughtRecord);
  localStorage.setItem('saved_thoughts', JSON.stringify(STATE.savedThoughts));

  renderSavedThoughts();

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });

  alert('ノートにほぞんしたよ！よく考えたね！🌟');
}

function renderSavedThoughts() {
  if (STATE.savedThoughts.length === 0) {
    elements.savedThoughtsSection.classList.add('hidden');
    return;
  }

  elements.savedThoughtsSection.classList.remove('hidden');
  elements.savedThoughtsList.innerHTML = STATE.savedThoughts.map(t => `
    <div class="saved-item">
      <div class="saved-q">❓ しつもん: ${escapeHtml(t.question)}</div>
      <div class="saved-a">💡 ${escapeHtml(t.author)}の考え: ${escapeHtml(t.opinion)} <small>(${t.date})</small></div>
    </div>
  `).join('');
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
