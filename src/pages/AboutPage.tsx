import Header from "../components/Header";

function AboutPage() {
  return (
    <main>
      <Header
        title="Sobre"
        subtitle="Gerencie suas tarefas"
        user="Daniele"
        version={1}
      />
      <p>Sistema criado para estudar React e TypeScript.</p>
    </main>
  );
}

export default AboutPage;