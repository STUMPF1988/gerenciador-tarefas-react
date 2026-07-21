interface HeaderProps {
  title: string;
  subtitle: string;
  user: string;
  version: number;
}

function Header({
  title,
  subtitle,
  user,
  version,
}: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>

      <p>{subtitle}</p>

      <strong>Bem-vinda, {user}</strong>

      <p>Versão {version}</p>
    </header>
  );
}

export default Header;