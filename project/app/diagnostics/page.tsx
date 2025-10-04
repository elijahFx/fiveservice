// app/page.tsx или app/diagnostics/page.tsx
import LaptopDiagnostics from "@/components/diagnostics/LaptopDiagnostics"
import FAQ from "@/components/common/FAQ";

export default function Home() {
  return (
    <main>
      {/* Другой контент вашей страницы */}
      <section>
        <h1>Главная страница</h1>
        <p>Добро пожаловать на наш сайт!</p>
      </section>

      {/* Компонент диагностики */}
      <LaptopDiagnostics />

      <FAQ />
    </main>
  );
}