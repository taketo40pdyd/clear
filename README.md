# Clear｜家計簿アプリ

GitHub Pages で公開するためのファイル一式です。

| ファイル | 役割 |
|---|---|
| `index.html` | アプリ本体（ホーム画面追加バナーを含む） |
| `sw.js` | オフライン対応とホーム画面追加に必要な Service Worker |
| `.nojekyll` | GitHub Pages の Jekyll 処理を止めるための空ファイル |
| `README.md` | この説明 |

## 公開手順

1. GitHub で新しいリポジトリを作る（Public）。
2. このフォルダの中身（`index.html`・`sw.js`・`.nojekyll`・`README.md`）を、リポジトリ直下にアップロードする。
   - `.nojekyll` は先頭にドットが付いた隠しファイルです。ZIP を展開してから、全ファイルを選んでアップロードしてください。
3. リポジトリの **Settings → Pages** を開く。
4. **Build and deployment** の Source を `Deploy from a branch`、Branch を `main` / `/ (root)` にして Save。
5. 1〜2分待つと `https://（ユーザー名）.github.io/（リポジトリ名）/` で開けます。

## 公開前に必ずやること（ログイン・同期を使う場合）

Firebase コンソール → **Authentication → 設定 → 承認済みドメイン** に、`（ユーザー名）.github.io` を追加してください。
追加しないと、公開したページでログインがエラーになります。

あわせて、Firestore の**セキュリティルール**が「ログインした本人だけが自分のデータを読み書きできる」設定になっているか確認してください。`index.html` 内の Firebase 設定値は公開されるのが前提の値なので、データの安全はルールで守ります。

## 更新するとき

`index.html` を差し替えてコミットするだけです。`sw.js` は画面本体を「ネット優先」で取得するので、次回の読み込みで自動的に新しくなります。

## ホーム画面追加の確認

- https で開くこと（GitHub Pages は標準で https）。
- Android の Chrome：バナーの「追加する」でインストール確認が出ます。
- iPhone の Safari：バナーの「追加する」で手順の案内が出ます。
