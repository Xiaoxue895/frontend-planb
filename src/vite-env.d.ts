/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_AUTH_SKIP: string
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 