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

// Character Config
const CHARACTERS = {
  'こども': { emoji: '👦', class: 'speech-kodomo', pitch: 1.4, rate: 1.1 },
  '博士': { emoji: '🔬', class: 'speech-hakase', pitch: 0.9, rate: 1.0 },
  'おばあちゃん': { emoji: '👵', class: 'speech-obachan', pitch: 0.8, rate: 0.85 },
  'お姉さん': { emoji: '👩', class: 'speech-oneesan', pitch: 1.25, rate: 1.05 }
};

const CHARACTER_NAMES = ['こども', '博士', 'おばあちゃん', 'お姉さん'];

// Helper to shuffle array randomly
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// System Prompt Template with dynamic facilitator and random order
const getSystemPrompt = (childFullName) => {
  // Pick random facilitator from the 4 characters
  const facilitator = CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)];
  
  // Pick other 3 characters and shuffle their order
  const others = shuffleArray(CHARACTER_NAMES.filter(name => name !== facilitator));

  return `
# 目的
ユーザー（子供）の質問に対して、4人の異なる性格のAIキャラクターがそれぞれの視点で意見を出し合い、最終的に子供自身にどう思うかを考えてもらうためのAIです。

# 今回の劇の演出指定（最重要）
- **今回の進行役（案内役）**: 【${facilitator}】
- **発言の参加順序例**: ${facilitator}（最初の挨拶） ➔ ${others[0]} ➔ ${others[1]} ➔ ${others[2]} ➔ ${facilitator}（まとめ＆問いかけ）

# キャラクター（ペルソナ）設定
1. **こども（ひらめき・楽しさ担当）**：元気でポジティブ。「〜〜したら楽しそう！」という視点。
2. **博士（論理・仕組み担当）**：科学知識が豊富。「〜〜という仕組みです」という視点。
3. **おばあちゃん（慎重・別の視点担当）**：おっとり。「〜〜かもしれないよぉ」という優しいリスク視点。
4. **お姉さん（共感・気持ち・整理担当）**：親身。「なるほどね！〜〜な気持ちもわかるな」という共感視点。

# 応答の重要ルール
- **今回の進行役は必ず【${facilitator}】が行ってください。**【${facilitator}】が最初に質問を受け止め、会話の最後に必ず「${childFullName}は、どう思う？」と優しく問いかけて終わってください。
- 会話の途中で中間の意見を言う順番もシャッフルし、掛け合いを発生させてください。
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

  const regex = /^(こども|博士|おばあちゃん|お姉さん)[「:：](.*)[」]?$/;

  lines.forEach(line => {
    const match = line.match(regex);
    if (match) {
      let speaker = match[1];
      let text = match[2].replace(/[」]$/, '');
      dialogue.push({ speaker, text });
    } else {
      // Fallback speaker if unparsed, pick random from the 4
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
    const config = CHARACTERS[item.speaker] || CHARACTERS['お姉さん'];

    const itemEl = document.createElement('div');
    itemEl.className = `speech-bubble-item ${config.class}`;
    itemEl.innerHTML = `
      <div class="speech-avatar">${config.emoji}</div>
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
      // Speak first / synchronously with typing
      // Calculate speed based on sentence length so typing completes cleanly during speech
      const estimatedDurationMs = Math.max(item.text.length * 150, 1500);
      const typingCharSpeed = Math.floor(estimatedDurationMs / item.text.length);

      // Start typing animation concurrently with voice
      const typingPromise = typeTextAsync(textSpan, item.text, Math.min(typingCharSpeed, 60));
      
      // STRICTLY AWAIT speech utterance completion
      await speakUtteranceAsync(item);
      
      // Ensure typing animation has finished if speech was very fast
      await typingPromise;

    } else {
      // If voice is turned off, simply type out at steady speed and pause
      await typeTextAsync(textSpan, item.text, 40);
      await new Promise(r => setTimeout(r, 800));
    }

    // Hide cursor after line is fully spoken and typed
    if (cursorSpan) {
      cursorSpan.style.display = 'none';
    }

    // Short natural pause between speakers
    await new Promise(r => setTimeout(r, 600));
  }

  // Attach individual click handlers for re-playing speech
  document.querySelectorAll('.btn-speak-single').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      speakSingle(dialogue[idx]);
    });
  });

  // Reveal thought notebook after conversation finishes
  elements.thoughtSection.classList.remove('hidden');
  elements.thoughtPromptName.textContent = childFullName;
  elements.inputMyOpinion.value = '';
  elements.thoughtSection.scrollIntoView({ behavior: 'smooth' });

  STATE.isDisplayingDialogue = false;
}

// Type text character by character (Typewriter Effect)
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

// Async speech synthesis helper - Waits until audio actually finishes speaking
function speakUtteranceAsync(dialogueItem) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    // Cancel previous audio if any
    window.speechSynthesis.cancel();

    const config = CHARACTERS[dialogueItem.speaker] || CHARACTERS['お姉さん'];
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

    // Speak utterance
    window.speechSynthesis.speak(utterance);

    // Chrome/Safari speech synthesis work-around for long pauses
    const checkSpeechState = setInterval(() => {
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        clearInterval(checkSpeechState);
        finish();
      }
    }, 200);

    // Safety timeout based on text length (e.g. max 15 seconds)
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

  const config = CHARACTERS[dialogueItem.speaker] || CHARACTERS['お姉さん'];
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
    const config = CHARACTERS[item.speaker] || CHARACTERS['お姉さん'];
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

  alert('思考ログをデータベースに保存しました！🌟');
}

function renderSavedThoughts() {
  if (STATE.savedThoughts.length === 0) {
    elements.savedThoughtsSection.classList.add('hidden');
    return;
  }

  elements.savedThoughtsSection.classList.remove('hidden');
  elements.savedThoughtsList.innerHTML = STATE.savedThoughts.map(t => `
    <div class="saved-item">
      <div class="saved-q">🚀 ミッション: ${escapeHtml(t.question)}</div>
      <div class="saved-a">💡 ${escapeHtml(t.author)}の思考ログ: ${escapeHtml(t.opinion)} <small>(${t.date})</small></div>
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
