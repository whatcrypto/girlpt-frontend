// page.tsx
import { CharacterBackground } from "./components/background";
import { Assistant } from "./components/assistant";
import { Suspense } from "react";

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Assistant />
    </Suspense>
  );
}
