# 🌟 KRDAI（クロダイ） 🚀

4人の個性豊かなキャラクター（だいごろう・チイキド博士・トキばあ・本山さん）と声や文字で何回でも対話し、子ども自身が自ら考える力を楽しく育む思考対話Webアプリケーションです。

---

## 🎨 特徴

1. **3人のキャラクターによる劇風の対話**
   - 👦 **こども**：元気・楽しさ・アイデア視点
   - 🔬 **博士**：科学的・論理的・仕組み視点
   - 👵 **おばあちゃん**：慎重・優しさ・リスク視点
2. **ブラウザ音声読み上げ（Text-to-Speech）**
   - キャラクターごとの声質（ピッチ・速さ）で会話を自動再生・個別再生
3. **じぶんのアイディアノート**
   - 3人の話し合いを聞いた後、「君はどう思う？」に対して考えた内容を保存＆紙吹雪（Confetti）アニメーション
4. **安心のGemini API直接連携**
   - 自分のGemini APIキーを画面上で設定して使用。サーバーにキーを保存しない安全設計。

---

## 🚀 ローカルでの動かし方

```bash
# 依存関係のインストール
npm install

# 開発サーバーの立ち上げ
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

---

## 📦 GitHubへのアップロード & GitHub Pagesでの無料公開手順

### 1. Gitの初期化 & リポジトリへPush

```bash
git init
git add .
git commit -m "Initial commit: 3人のアイディアひろば Web App"
git branch -M main
git remote add origin https://github.com/ユーザー名/kentAI.git
git push -u origin main
```

### 2. GitHub Pages の有効化

1. GitHubのリポジトリページを開き、**`Settings`** タブをクリック。
2. 左メニューの **`Pages`** を選択。
3. **`Source`** の項目で **`GitHub Actions`** を選択。
4. `main` ブランチに Push されると、自動的にビルド＆公開が完了します！
