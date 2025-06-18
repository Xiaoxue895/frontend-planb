

# 从0开始搭建 React + Redux Toolkit + TypeScript + Tailwind CSS 项目

---

## 1. 初始化项目

打开终端，执行：

```bash
mkdir my-app
cd my-app
npm init -y
```

---

## 2. 安装 React + ReactDOM + TypeScript + Vite（快速开发环境）

```bash
npm install react react-dom
npm install -D typescript vite @vitejs/plugin-react
```

---

## 3. 创建 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

---

## 4. 安装 Redux Toolkit 和 React-Redux

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 5. 安装 Tailwind CSS（顺风 CSS）

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

这会生成 `tailwind.config.js` 和 `postcss.config.js`

---

## 6. 配置 Tailwind

`tailwind.config.js` 内容示例：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 7. 创建 CSS 文件，`src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 8. 配置 Vite 项目结构和启动配置

创建 `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

---

## 9. 创建目录结构和示范文件

在 `src/` 里，按你的架构创建对应目录和文件：

```
src/
├── app/
│   └── store.ts
├── features/
│   └── auth/
│       ├── authSlice.ts
│       ├── AuthPage.tsx
│       └── components/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Button.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Dashboard.tsx
├── hooks/
│   └── reduxHooks.ts
├── utils/
│   └── formatDate.ts
├── types/
│   └── user.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 10. 关键文件示例代码

### 10.1 `src/app/store.ts`

```ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

### 10.2 `src/features/auth/authSlice.ts`

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

---

### 10.3 `src/hooks/reduxHooks.ts`

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

### 10.4 `src/features/auth/AuthPage.tsx`

```tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { login, logout } from "./authSlice";

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const [usernameInput, setUsernameInput] = useState("");

  const handleLogin = () => {
    if (usernameInput.trim()) {
      dispatch(login(usernameInput.trim()));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">登录页</h1>
      {auth.isAuthenticated ? (
        <div>
          <p>欢迎，{auth.username}！</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            登出
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="请输入用户名"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button
            onClick={handleLogin}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            登录
          </button>
        </div>
      )}
    </div>
  );
};
```

---

### 10.5 `src/App.tsx`

```tsx
import React from "react";
import { AuthPage } from "./features/auth/AuthPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthPage />
    </div>
  );
}

export default App;
```

---

### 10.6 `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## 11. 运行项目

修改 `package.json` 里的 scripts：

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

运行：

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173`，就可以看到简单的登录页了。

---

## 12. 后续建议

* 每个功能模块放在 `features/模块名/` 下，slice、组件、页面都在该目录管理，便于维护
* 可复用的 UI 组件放 `components/`，用于全局通用组件
* 页面级组件放 `pages/`，配合 React Router 实现多页面
* 用 `hooks/` 放自定义 hooks（如封装的 `useAppSelector`）
* 公用工具函数放 `utils/`
* 类型定义放 `types/`，便于全局引用和维护
* Tailwind CSS 可以随时用 utility classes 快速开发样式


