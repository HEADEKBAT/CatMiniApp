import { useEffect, useState } from "react";
import { Controls } from "./components/Controls";
import { CatImage } from "./components/CatImage";
import { Container } from "./components/Container";

const CAT_API = "https://api.thecatapi.com/v1/images/search";

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [catUrl, setCatUrl] = useState<string | null>(null);
  const [nextCatUrl, setNextCatUrl] = useState<string | null>(null);

  // Загружает следующую картинку в hidden Image и сохраняет URL
  const preloadNextCat = async () => {
    const res = await fetch(CAT_API);
    const data = await res.json();
    const url = data[0]?.url;

    if (url) {
      const img = new Image();
      img.src = url;
      setNextCatUrl(url);
    }
  };

  // готовим следующую
  const showNextCat = () => {
    if (!enabled || !nextCatUrl) return;
    setCatUrl(nextCatUrl);
    preloadNextCat();
  };

  // начальная предзагрузка
  useEffect(() => {
    if (enabled && !nextCatUrl) {
      preloadNextCat();
    }
  }, [enabled]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh && enabled) {
      interval = setInterval(() => {
        showNextCat();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, enabled, nextCatUrl]);

  return (
    <Container>
      <Controls
        enabled={enabled}
        autoRefresh={autoRefresh}
        onEnabledChange={() => setEnabled(!enabled)}
        onAutoRefreshChange={() => setAutoRefresh(!autoRefresh)}
        onGetCat={showNextCat}
      />
      <CatImage url={catUrl} />
    </Container>
  );
}
