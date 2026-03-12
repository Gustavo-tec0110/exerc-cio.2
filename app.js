const styled = window.styled;
const { createGlobalStyle } = window.styled;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Karla", sans-serif;
    color: #1d1f23;
    background: #f5f7fb;
  }
`;

const Page = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  background: #0f172a;
  color: #ffffff;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  font-weight: 600;
`;

const NavLink = styled.a`
  color: #e2e8f0;
  text-decoration: none;
  &:hover {
    color: #ffffff;
  }
`;

const Hero = styled.section`
  padding: 48px 32px;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f8fafc;
`;

const HeroTitle = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(2rem, 4vw, 3rem);
`;

const HeroText = styled.p`
  margin: 0;
  max-width: 640px;
  color: #cbd5f5;
  line-height: 1.6;
`;

const Container = styled.main`
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 32px;
`;

const FormSection = styled.section`
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
`;

const FormTitle = styled.h2`
  margin: 0 0 16px;
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const FieldRow = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  display: grid;
  gap: 6px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
  font-family: inherit;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
  font-family: inherit;
`;

const Button = styled.button`
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;

const ListaVagas = styled.section`
  margin-top: 32px;
  display: grid;
  gap: 16px;
`;

const VagaCard = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  display: grid;
  gap: 8px;
`;

const VagaTitle = styled.h3`
  margin: 0;
`;

const VagaMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #64748b;
  font-size: 0.9rem;
`;

const Badge = styled.span`
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
`;

const VagaDescription = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.5;
`;

const Footer = styled.footer`
  padding: 32px;
  text-align: center;
  color: #94a3b8;
`;

const vagas = [
  {
    id: 1,
    titulo: "Frontend React",
    local: "Remoto",
    nivel: "Pleno",
    tipo: "CLT",
    descricao: "Atue na construcao de interfaces com foco em experiencia do usuario."
  },
  {
    id: 2,
    titulo: "Backend Node",
    local: "Sao Paulo",
    nivel: "Senior",
    tipo: "PJ",
    descricao: "Desenvolva APIs escalaveis e confiaveis com foco em performance."
  },
  {
    id: 3,
    titulo: "UI Designer",
    local: "Hibrido",
    nivel: "Junior",
    tipo: "CLT",
    descricao: "Crie prototipos e design systems alinhados com o produto."
  }
];

function Vaga({ vaga }) {
  return (
    <VagaCard>
      <VagaTitle>{vaga.titulo}</VagaTitle>
      <VagaMeta>
        <span>{vaga.local}</span>
        <span>{vaga.nivel}</span>
        <Badge>{vaga.tipo}</Badge>
      </VagaMeta>
      <VagaDescription>{vaga.descricao}</VagaDescription>
    </VagaCard>
  );
}

function App() {
  return (
    <Page>
      <GlobalStyle />

      <Header>
        <Brand>JobFinder</Brand>
        <Nav>
          <NavLink href="#hero">Inicio</NavLink>
          <NavLink href="#formulario">Formulario</NavLink>
          <NavLink href="#vagas">Vagas</NavLink>
        </Nav>
      </Header>

      <Hero id="hero">
        <HeroTitle>Encontre a vaga certa para voce</HeroTitle>
        <HeroText>
          Pesquise vagas filtrando por area, nivel e modelo de trabalho. Todas as partes foram estilizadas
          com Styled Components.
        </HeroText>
      </Hero>

      <Container>
        <FormSection id="formulario">
          <FormTitle>Filtre suas vagas</FormTitle>
          <Form>
            <FieldRow>
              <Label>
                Palavra-chave
                <Input type="text" placeholder="Ex: React, UX" />
              </Label>
              <Label>
                Nivel
                <Select>
                  <option>Junior</option>
                  <option>Pleno</option>
                  <option>Senior</option>
                </Select>
              </Label>
              <Label>
                Local
                <Select>
                  <option>Remoto</option>
                  <option>Hibrido</option>
                  <option>Sao Paulo</option>
                  <option>Rio de Janeiro</option>
                </Select>
              </Label>
            </FieldRow>
            <Button type="button">Buscar vagas</Button>
          </Form>
        </FormSection>

        <ListaVagas id="vagas">
          {vagas.map((vaga) => (
            <Vaga key={vaga.id} vaga={vaga} />
          ))}
        </ListaVagas>
      </Container>

      <Footer>Projeto com Styled Components</Footer>
    </Page>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
