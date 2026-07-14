import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const newsApiKey = (env.NEWS_API_KEY || "").trim();

  const base = env.BASE_PATH || "/";
  const isPreview = env.IS_PREVIEW ? true : false;

  return {
    define: {
      __BASE_PATH__: JSON.stringify(base),
      __IS_PREVIEW__: JSON.stringify(isPreview),
      __READDY_PROJECT_ID__: JSON.stringify(env.PROJECT_ID || ""),
      __READDY_VERSION_ID__: JSON.stringify(env.VERSION_ID || ""),
      __READDY_AI_DOMAIN__: JSON.stringify(env.READDY_AI_DOMAIN || ""),
    },
    plugins: [
      react(),
      AutoImport({
        imports: [
          {
            react: [
              ["default", "React"],
              "useState",
              "useEffect",
              "useContext",
              "useReducer",
              "useCallback",
              "useMemo",
              "useRef",
              "useImperativeHandle",
              "useLayoutEffect",
              "useDebugValue",
              "useDeferredValue",
              "useId",
              "useInsertionEffect",
              "useSyncExternalStore",
              "useTransition",
              "startTransition",
              "lazy",
              "memo",
              "forwardRef",
              "createContext",
              "createElement",
              "cloneElement",
              "isValidElement",
            ],
          },
          {
            "react-router-dom": [
              "useNavigate",
              "useLocation",
              "useParams",
              "useSearchParams",
              "Link",
              "NavLink",
              "Navigate",
              "Outlet",
            ],
          },
          {
            "react-i18next": ["useTranslation", "Trans"],
          },
        ],
        dts: true,
      }),
    ],
    base,
    build: {
      sourcemap: true,
      outDir: "out",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      proxy: {
        "/api/news": {
          target: "https://newsapi.org/v2",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/news/, ""),
          bypass: (req, res) => {
            if (req.url === "/api/news/test") {
              res.writeHead(200, { "Content-Type": "application/json" });
              const hasApiKey = Boolean(newsApiKey && newsApiKey.length > 0);
              res.end(
                JSON.stringify({
                  success: hasApiKey,
                  hasApiKey,
                  message: hasApiKey
                    ? "NEWS_API_KEY configurada correctamente"
                    : "La variable NEWS_API_KEY no está configurada en el servidor",
                })
              );
            }
          },
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (newsApiKey) {
                proxyReq.setHeader("x-api-key", newsApiKey);
              }
            });
            proxy.on("proxyRes", (proxyRes, req) => {
              console.log(
                `[NewsAPI Proxy] ${req.method} ${req.url} → ${proxyRes.statusCode}`
              );
            });
            proxy.on("error", (err, req) => {
              console.error(
                `[NewsAPI Proxy] Error: ${err.message} for ${req.url}`,
                { hasApiKey: Boolean(newsApiKey) }
              );
            });
          },
        },
      },
    },
  };
});