/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_MEDUSA_BASE_URL: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
