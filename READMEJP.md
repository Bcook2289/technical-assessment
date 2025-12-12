# 実技テスト

## フルスタック・ログイン機能


## フルスタック・ログイン機能

Goalconnect　の技術課題である「任意の言語・フレームワークを使用したログイン機能の実装」に対する提出物です。
バックエンドには TypeScript／Node.js／Express、フロントエンドには Next.js／Tailwind CSS を採用しています。
また、データベースアクセスには Prisma を ORM として利用しています。
以下で、搭載している機能およびインストール手順について詳しく説明します。

---

## ハイライト

- **ユーザー登録** - ユーザーネームとパスワードを検証した上で新規ユーザーを作成
- **パスワードハッシュ化** - bcryptによる安全なパスワード保存
- **JWT 認証** - 保護されたルートを通じて、ユーザーデータへのアクセスを制御
- **セッション保存** - Cookieを利用した永続的なログインおよびリロード時のセッション復元
- **保護されたルート** - ログイン必須ページでのリダイレクト処理とミドルウェアによる認可
- **アカウント削除** - 認証済みユーザーのみが自身のアカウントを削除可能、削除後はリダイレクト処理を実行

---

## 技術スタック

### **フロントエンドフレームワーク** 
#### ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
### **言語**
#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### **スタイリング**
#### ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
### **認証** | JWT (バクエンドAPIにて処理)
### **ビルドツール** | Next Build

### **バクエンドフレームワーク** 
#### ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
#### ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
### **言語**
#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### **ORM**
#### ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
### **データベース** 
#### ![SQLite](https://img.shields.io/badge/SQLite-000?style=for-the-badge&logo=sqlite&logoColor=07405E)
### **認証** | JWT

---

## プロジェクト管理とワークフロー

[Github Projects Board](https://github.com/users/Bcook2289/projects/4/views/1)

---
## 認証システムの機能一覧
## コア機能
### ユーザー登録

- メールアドレスとパスワードの検証
- bcryptを使ったパスワードハッシュ化
- Prisma ORMによるユーザー情報の作成
- サーバー側での入力バリデーション（メール形式、パスワード条件）

### ユーザーログイン

- メールアドレスとパスワードによる認証
- JWTアクセストークンを用いたステートレス認証
- HTTP-only Cookieによる安全なトークン保存（XSS 防御）
- 保護ルートのJWT検証

### セッション管理

- Cookieを利用した永続的ログイン
- ページリフレッシュ時の自動セッション復元
- React Contextによるクライアント側認証状態管理
- セッションCookieを無効かするログイン機能

### 保護されたルール

- フロントエンドログイン必須ページを制御し、未ログイン時はリダイレクト
- バクエンドではミドルウェアによる認可チェックを実施

### アカウント削除
- 認証済みユーザーのみが削除可能
- Prisma による SQLite データベースからのユーザー削除
- 削除後は自動ログアウトおよびリダイレクト

##　フロントエンド（Next.js + Tailwind + TypeScript）
### UI コンポーネント
- レスポンシブ対応のログイン／登録／成功ダッシュボード画面
- Tailwind による入力フィールドや UI のスタイリング
- 共通 UI クラス（ボタン、フォームなど）の共通化
- エラーメッセージの表示およびフォームバリデーション

### UX フロー
- ログイン中ユーザーはログイン／登録ページへアクセス不可
- API 呼び出し時のローディング表示
- 成功／エラー／削除完了などの UI メッセージ

### 状態管理
- React Context によるグローバルな認証状態管理
- ログイン・ログアウト・登録・ユーザー検証用のフック

## Backend (Node/Express + Prisma + JWT)
### Authentication API
```bash POST /api/auth/register``` — 新規ユーザー登録
```bash POST /api/auth/login``` — ログイン・JWT Cookie 発行
```bash GET /api/auth/me``` — JWT 検証により現在のユーザーを返す
```bash POST /api/auth/logout``` — セッション Cookie 削除
```bash DELETE /api/auth/delete``` — 認証済みユーザーのアカウント削除

### セキュリティ
- JWT による署名付きトークン検証
- HTTP-only Cookie による XSS 対策
- パスワードはハッシュ化のみで保存（平文保存なし）
- 不正リクエスト防止のための入力検証

## データベース (SQLite + Prisma ORM)
### スキーマ
- email を index 化した軽量 User モデル
- Prisma による自動マイグレーション管理
### データアクセス
- Prisma Client による安全かつ型安全な DB クエリ
- 自動エスケープ処理による SQL Injection 防止
- トランザクション安全なユーザー作成・削除
### ローカル開発
- SQLite によるゼロコンフィグ開発環境
- DATABASE_URL による環境変数管理

---

## プロジェクトセットアップ

### 必要環境

Ensure you have the following installed:

- **Node.js** (v22.6.0+)
- **npm** (v10.8.2+)

### フロントエンドのセットアップ

1. **リポジトリのクローン**:
    ```bash
    git clone [https://github.com/sentient-band-site/frontend.git]
    cd frontend
    ```

2. **依存パッケージのインストール**:
    ```bash
    npm install
    ```

3. **必要な環境変数**:
    ```bash
    NEXT_PUBLIC_API_URL
    ```

4. **アプリケーションの起動**:
    ```bash
    npm run dev
    ```
    
    アプリは `http://localhost:3000`で利用可能

### バックエンドのセットアップ

1. **backend ディレクトリへ移動**
   ```bash
   cd .. (if using the same terminal)
   cd backend
   ```
2. **必要な環境変数**
   ```bash
   PORT
   FRONTEND_URL
   JWT_SECRET
   NODE_ENV //optional - only for production
   ```
3. **依存パッケージのインストール**
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```
4. **アプリケーションの起動**
   ```bash
   npm run dev
   ```
   
   サーバーは http://localhost:4000 で利用可能

## AI 利用について

AI ツールはあくまでサポート目的で使用し、問題解決や設計判断の補助として活用しました。
実装そのものはすべて手動で記述・検証しています。

### 問題解決・デバッグ用途
AI tools were used to diagnose and resolve issues such as:

- AuthContext が Cookie を正しく送信しない問題の調査
- Prisma 初期セットアップ
- Prisma バージョン差異によるエラーの解消
- TypeScript エラーの診断
- Git 設定の問題解消

典型的なプロンプト例:
```
I'm getting the following error when trying to do [EXPLANATION OF ACTIONS TAKEN]

[ERROR DESCRIPTION]
```

### 設計判断の妥当性確認
- バックエンド構成（SQLite vs PostgreSQL）の比較検討
- AuthContext の設計パターンの参照

典型的なプロンプト例:
```
Please provide an explanation of [INSERT TOPIC HERE]
```

### 翻訳

本プロジェクトでは、英語と日本語の双方向翻訳を正確に行うためにAIも活用し、円滑なコミュニケーションとドキュメント作成を支援しています。





