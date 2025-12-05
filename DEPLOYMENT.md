# 배포 가이드

이 프로젝트를 무료로 배포하는 방법을 안내합니다.

## 🚀 방법 1: Vercel (가장 추천)

Vercel은 React/Vite 프로젝트에 최적화되어 있어 가장 쉽습니다.

### 단계별 가이드

1. **GitHub에 코드 업로드**
   ```bash
   # Git 초기화 (아직 안 했다면)
   git init
   git add .
   git commit -m "Initial commit"
   
   # GitHub에 새 저장소 생성 후
   git remote add origin https://github.com/사용자명/저장소명.git
   git branch -M main
   git push -u origin main
   ```

2. **Vercel 배포**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 설정:
     - Framework Preset: **Vite**
     - Root Directory: `./` (기본값)
     - Build Command: `npm run build` (자동 감지)
     - Output Directory: `dist` (자동 감지)
   - "Deploy" 클릭

3. **완료!**
   - 몇 분 후 배포 완료
   - 자동으로 `https://프로젝트명.vercel.app` URL 제공
   - 코드 푸시 시 자동 재배포

---

## 🌐 방법 2: Netlify

Netlify도 매우 쉬운 배포 옵션입니다.

### 단계별 가이드

1. **GitHub에 코드 업로드** (위와 동일)

2. **Netlify 배포**
   - [netlify.com](https://netlify.com) 접속
   - GitHub 계정으로 로그인
   - "Add new site" → "Import an existing project"
   - GitHub 저장소 선택
   - 설정:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - "Deploy site" 클릭

3. **완료!**
   - 자동으로 `https://랜덤이름.netlify.app` URL 제공

---

## 📦 방법 3: GitHub Pages

GitHub Pages는 무료이지만 설정이 조금 더 필요합니다.

### 단계별 가이드

1. **vite.config.ts 수정**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     base: '/저장소명/', // GitHub 저장소 이름
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './'),
       },
     },
   })
   ```

2. **GitHub Actions 설정**
   - `.github/workflows/deploy.yml` 파일 생성:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **GitHub 저장소 설정**
   - Settings → Pages
   - Source: `gh-pages` 브랜치 선택

---

## ☁️ 방법 4: Cloudflare Pages

Cloudflare Pages는 빠른 속도로 유명합니다.

### 단계별 가이드

1. **GitHub에 코드 업로드**

2. **Cloudflare Pages 배포**
   - [dash.cloudflare.com](https://dash.cloudflare.com) 접속
   - Pages → "Create a project"
   - GitHub 저장소 연결
   - 설정:
     - Framework preset: **Vite**
     - Build command: `npm run build`
     - Build output directory: `dist`
   - "Save and Deploy" 클릭

---

## 📝 배포 전 체크리스트

- [ ] `.gitignore` 파일 확인 (node_modules 제외)
- [ ] `package.json`에 빌드 스크립트 확인
- [ ] 환경 변수 확인 (필요한 경우)
- [ ] MP3 파일이 `public` 폴더에 있는지 확인
- [ ] 빌드 테스트: `npm run build` 실행

---

## 🔧 문제 해결

### 빌드 오류 발생 시
```bash
# 로컬에서 빌드 테스트
npm run build
npm run preview
```

### 경로 문제
- Vite는 기본적으로 절대 경로를 사용합니다
- GitHub Pages 사용 시 `vite.config.ts`에 `base` 설정 필요

### MP3 파일이 로드되지 않을 때
- `public` 폴더에 파일이 있는지 확인
- 경로가 `/다카마쓰 트립 2026.mp3` 형식인지 확인

---

## 💡 추천

**가장 쉬운 방법: Vercel**
- 설정이 거의 없음
- 자동 HTTPS
- 자동 배포
- 빠른 속도
- 무료 플랜 충분

