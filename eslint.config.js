import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  {
    // Salidas de build y material que no es código del proyecto.
    ignores: [".next/**", "out/**", "public/**", "scripts/out/**", "assets-inbox/**"],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
