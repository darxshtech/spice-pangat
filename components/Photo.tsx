import { scenes, SceneKey } from "./art/Scenes";

/**
 * Image slot. Renders the illustrated scene by default. When the owners supply
 * real photography, set `src` for that slot in config/images.ts and it takes over.
 */
export function Photo({ scene, src, alt, className }: { scene: SceneKey; src?: string; alt: string; className?: string }) {
  const Scene = scenes[scene];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Scene />
    </div>
  );
}
