# ChatBase

ChatBase는 Electron과 React로 개발된 데스크톱 애플리케이션으로, SQLite 데이터베이스에 저장된 채팅 데이터를 탐색하고 관리할 수 있는 기능을 제공합니다. 직관적인 UI를 통해 채팅방과 메시지를 쉽게 확인하고 분석할 수 있습니다.

---

### **주요 기능**
- SQLite 데이터베이스 파일 선택 및 로드.
- 데이터베이스에 저장된 채팅방 목록 보기.
- 선택한 채팅방의 메시지 탐색.
- TailwindCSS로 제작된 반응형 및 현대적인 UI.
- 가볍고 휴대 가능한 애플리케이션.

---

### **시작하기**

#### **필수 조건**
- Node.js (v16 이상)
- npm 또는 yarn

#### **설치 방법**
1. 레포지토리 클론:
   ```bash
   git clone https://github.com/your-username/chatbase.git
   cd chatbase
   ```

2. 의존성 설치:
   ```bash
   npm install
   ```

3. 개발 모드로 애플리케이션 실행:
   ```bash
   npm start
   ```

4. React 프론트엔드 빌드:
   ```bash
   npm run build:react
   ```

5. 실행 파일로 패키징:
   ```bash
   npm run build
   ```

---

### **사용 방법**
1. 애플리케이션을 실행합니다.
2. "DB 파일 선택" 버튼을 클릭하여 SQLite 데이터베이스를 로드합니다.
3. 채팅방 목록을 탐색하고, 메시지를 확인하려는 채팅방을 선택합니다.

---

### **사용된 기술**
- **Electron**: 데스크톱 애플리케이션 개발.
- **React**: 사용자 인터페이스 제작.
- **SQLite3**: 데이터베이스와의 상호작용.
- **TailwindCSS**: 애플리케이션 스타일링.
- **Webpack**: React 프론트엔드 번들링.

---

### **프로젝트 구조**
```
ChatBase/
├── ipcHandlers/       # 데이터베이스 작업을 위한 Electron IPC 핸들러
├── public/            # 정적 파일 (HTML, assets)
├── src/               # React 컴포넌트 및 애플리케이션 로직
├── dist/              # 빌드 결과물
├── main.js            # Electron 메인 프로세스
├── preload.js         # 안전한 IPC 통신을 위한 프리로드 스크립트
├── webpack.config.js  # Webpack 설정
└── package.json       # 프로젝트 메타데이터 및 스크립트
```

---

### **라이선스**
이 프로젝트는 MIT 라이선스에 따라 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

---

### **사사**
이 프로젝트는 가천대학교 정보 보안 동아리 Pay1oad의 2025년 봄학기 iOS Forensic 프로젝트 팀인 "iOS 원정대"의 산출물입니다. 이 작업은 팀원들의 협력과 노력으로 이루어졌으며, 정보 보안 분야에서의 실용적인 경험과 지식을 바탕으로 진행되었습니다. 프로젝트에 도움을 주신 모든 분들께 감사의 말씀을 전합니다.

---

## **English Version**

# ChatBase

ChatBase is a desktop application built with Electron and React that allows users to browse and manage chat data stored in SQLite databases. It provides an intuitive interface for viewing chat rooms and messages, making it easy to analyze and interact with chat data.

---

### **Features**
- Select and load SQLite database files.
- View a list of chat rooms stored in the database.
- Browse messages within a selected chat room.
- Responsive and modern UI built with TailwindCSS.
- Lightweight and portable application.

---

### **Getting Started**

#### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

#### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chatbase.git
   cd chatbase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application in development mode:
   ```bash
   npm start
   ```

4. Build the React frontend:
   ```bash
   npm run build:react
   ```

5. Package the application into an executable:
   ```bash
   npm run build
   ```

---

### **Usage**
1. Launch the application.
2. Click the "Select DB File" button to load an SQLite database.
3. Browse the list of chat rooms and select one to view its messages.

---

### **Technologies Used**
- **Electron**: For building the desktop application.
- **React**: For creating the user interface.
- **SQLite3**: For database interaction.
- **TailwindCSS**: For styling the application.
- **Webpack**: For bundling the React frontend.

---

### **Project Structure**
```
ChatBase/
├── ipcHandlers/       # Electron IPC handlers for database operations
├── public/            # Static files (HTML, assets)
├── src/               # React components and application logic
├── dist/              # Build output
├── main.js            # Electron main process
├── preload.js         # Preload script for secure IPC communication
├── webpack.config.js  # Webpack configuration
└── package.json       # Project metadata and scripts
```

---

### **License**
This project is licensed under the MIT License. See the LICENSE file for details.

---

### **Acknowledgments**
This project is the result of the "iOS Expedition" team from the iOS Forensic Project in the Spring 2025 semester of Pay1oad, the Information Security Club at Gachon University. This work was completed through the collaboration and efforts of the team members, based on practical experience and knowledge in the field of information security. We would like to express our gratitude to everyone who contributed to this project.

---
