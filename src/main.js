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
  currentDialogue: []
};

// Character Config
const CHARACTERS = {
  'こども': { emoji: '👦', class: 'speech-kodomo', pitch: 1.4, rate: 1.1 },
  '博士': { emoji: '🔬', class: 'speech-hakase', pitch: 0.9, rate: 1.0 },
  'おばあちゃん': { emoji: '👵', class: 'speech-obachan', pitch: 0.8, rate: 0.85 },
  '案内役': { emoji: '📢', class: 'speech-anai', pitch: 1.1, rate: 1.0 }
};

// System Prompt Template from user prompt
const getSystemPrompt = (childFullName) => `
# 目的
ユーザー（子供）の質問に対して、3人の異なる性格のキャラクターがそれぞれの視点で意見を出し合い、最終的に子供自身にどう思うかを考えてもらうためのAIです。

# キャラクター（ペルソナ）設定
1. **こども（ひらめき・楽しさ担当）**：
   - 性格：いつも元気でポジティブ。楽しいことや新しいアイデアが大好き。「〜〜したら楽しそう！」という視点で話す。
2. **博士（論理・仕組み担当）**：
   - 性格：科学知識が豊富。冷静で真面目。「データによると〜〜」「仕組みは〜〜」という視点で話す。
3. **おばあちゃん（慎重・別の視点担当）**：
   - 性格：おっとりしていて慎重。見落としがちなリスクや、別の優しい視点に気づかせてくれる。「〜〜かもしれないよぉ」と話す。

# 応答のルール
- 子供が理解しやすい、優しく簡単な言葉（小学校低学年向け）を使ってください。漢字には難しすぎるものを避け、平仮名も適度に使用してください。
- 答えをすぐに教えるのではなく、それぞれの意見を出すだけにとどめてください。
- 音声で読み上げられたときに誰のセリフか分かりやすいよう、以下のような【劇のセリフ形式】で出力してください。長文は避け、テンポよく掛け合いをさせてください。
- 案内役は三人のうちいずれかが行ってもよいし、案内役として発言してもよい。
- 最後に必ず、案内役（またはキャラクター）として「${childFullName}は、どう思う？」と優しく問いかけて終わってください。

# 出力フォーマットの例
案内役「面白い質問だね！みんなはどう思う？」
こども「ぼくは〜〜だと思うな！だって楽しそうじゃん！」
博士「〜〜という理由もあります。」
おばあちゃん「う〜ん、でも〜〜なこともあるかも？」
案内役「みんな違って面白いね。${childFullName}は、どう思う？」
`;

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
  // Load saved settings into UI
  elements.apiKeyInput.value = STATE.apiKey;
  elements.selectModel.value = STATE.model;
  elements.checkAutoSpeech.checked = STATE.autoSpeech;
  elements.inputChildName.value = STATE.childName;
  elements.selectHonorific.value = STATE.honorific;

  renderSavedThoughts();

  // Event Listeners
  elements.btnSettings.addEventListener('click', () => toggleModal(true));
  elements.btnCloseModal.addEventListener('click', () => toggleModal(false));
  elements.btnSaveSettings.addEventListener('click', saveSettings);
  
  elements.inputChildName.addEventListener('change', updateChildProfile);
  elements.selectHonorific.addEventListener('change', updateChildProfile);

  // Suggestion Tag Buttons
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.questionInput.value = btn.dataset.question;
      handleAskQuestion();
    });
  });

  elements.btnAsk.addEventListener('click', handleAskQuestion);
  elements.btnReadAll.addEventListener('click', readAllDialogue);
  elements.btnSaveThought.addEventListener('click', handleSaveThought);

  // Prompt API Key modal if not configured
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
  STATE.model = elements.selectModel.value;
  STATE.autoSpeech = elements.checkAutoSpeech.checked;

  localStorage.setItem('gemini_api_key', STATE.apiKey);
  localStorage.setItem('gemini_model', STATE.model);
  localStorage.setItem('auto_speech', STATE.autoSpeech);

  toggleModal(false);
  alert('設定をほぞんしました！✨');
}

// Ask Gemini Question
async function handleAskQuestion() {
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

  // Hide dialogue & Show loader
  elements.dialogueSection.classList.add('hidden');
  elements.thoughtSection.classList.add('hidden');
  elements.loadingState.classList.remove('hidden');

  const childFullName = `${STATE.childName}${STATE.honorific}`;

  try {
    const genAI = new GoogleGenerativeAI(STATE.apiKey);
    const targetModel = 'gemini-3.1-flash-lite';
    
    console.log(`Using fixed Gemini model: ${targetModel}`);
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

    renderDialogue(parsedDialogue, childFullName);

    if (STATE.autoSpeech) {
      readAllDialogue();
    }
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

  // Regex matches line like: 案内役「〜〜」 or こども「〜〜」 or 博士: 〜〜
  const regex = /^(こども|博士|おばあちゃん|案内役)[「:：](.*)[」]?$/;

  lines.forEach(line => {
    const match = line.match(regex);
    if (match) {
      let speaker = match[1];
      let text = match[2].replace(/[」]$/, ''); // strip trailing quote if matched
      dialogue.push({ speaker, text });
    } else {
      // Fallback if no explicit speaker prefix
      dialogue.push({ speaker: '案内役', text: line });
    }
  });

  return dialogue;
}

// Render Dialogue to UI
function renderDialogue(dialogue, childFullName) {
  elements.dialogueList.innerHTML = '';

  dialogue.forEach((item, index) => {
    const config = CHARACTERS[item.speaker] || CHARACTERS['案内役'];

    const itemEl = document.createElement('div');
    itemEl.className = `speech-bubble-item ${config.class}`;
    itemEl.style.animationDelay = `${index * 0.15}s`;

    itemEl.innerHTML = `
      <div class="speech-avatar">${config.emoji}</div>
      <div class="speech-content">
        <div class="speech-speaker">${item.speaker}</div>
        <div class="speech-text">${escapeHtml(item.text)}</div>
        <div class="speech-action">
          <button class="btn-speak-single" data-index="${index}">🔊 きく</button>
        </div>
      </div>
    `;

    elements.dialogueList.appendChild(itemEl);
  });

  // Attach individual speech listeners
  document.querySelectorAll('.btn-speak-single').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      speakSingle(dialogue[idx]);
    });
  });

  // Show dialogue section and thought notebook
  elements.dialogueSection.classList.remove('hidden');
  elements.thoughtSection.classList.remove('hidden');
  elements.thoughtPromptName.textContent = childFullName;
  elements.inputMyOpinion.value = '';

  // Scroll smooth to dialogue
  elements.dialogueSection.scrollIntoView({ behavior: 'smooth' });
}

// Speech Synthesis API
function speakSingle(dialogueItem) {
  if (!('speechSynthesis' in window)) {
    alert('お使いのブラウザは音声読み上げに対応していません。');
    return;
  }

  window.speechSynthesis.cancel(); // Stop ongoing speech

  const config = CHARACTERS[dialogueItem.speaker] || CHARACTERS['案内役'];
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
    const config = CHARACTERS[item.speaker] || CHARACTERS['案内役'];
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

  // Celebration Confetti!
  confetti({
    particleCount: 100,
    spread: 70,
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

// Run app init on DOM Content Loaded
document.addEventListener('DOMContentLoaded', init);
