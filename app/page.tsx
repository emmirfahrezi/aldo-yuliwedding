import InvitationContainer from "@/components/layout/InvitationContainer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex justify-center text-[var(--color-gold-light)]">
      {/* Outermost Textured Background - Locked & fixed to viewport so it never scrolls */}
      <div
        aria-hidden="true"
        className="fixed inset-0 h-[100dvh] w-full pointer-events-none -z-20 bg-[var(--color-burgundy)] bg-paper-texture"
      />

      <InvitationContainer />
    </main>
  );
}
