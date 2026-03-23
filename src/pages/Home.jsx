import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '../components/Container'
import RestaurantCard from '../components/RestaurantCard'

const HeroSection = styled.section`
  padding: 72px 0 64px;

  @media (max-width: 600px) {
    padding: 48px 0 40px;
  }
`

const HeroGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 40px;
  font-weight: 800;
  margin: 0 0 16px;
  max-width: 420px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`

const HeroSubtitle = styled.p`
  margin: 0 0 24px;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 460px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.green};
  color: #fff;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 600px) {
    width: 100%;
  }
`

const HeroImage = styled.div`
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  min-height: 280px;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.35) 100%
    );
  }

  @media (max-width: 600px) {
    min-height: 200px;
  }
`

const HeroBadge = styled.span`
  position: absolute;
  left: 16px;
  bottom: 16px;
  background: rgba(255, 255, 255, 0.92);
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
`

const Section = styled.section`
  padding: 48px 0 72px;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 28px;
  margin: 0 0 8px;
`

const SectionSubtitle = styled.p`
  margin: 0 0 24px;
  opacity: 0.75;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`

const Status = styled.p`
  margin: 0;
  opacity: 0.7;
`

function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setRestaurants(data)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const destaque = restaurants.find((item) => item.destacado) || restaurants[0]

  return (
    <>
      <Header />
      <HeroSection>
        <HeroGrid>
          <div>
            <HeroTitle>
              Experiencias de restaurante com um toque caseiro.
            </HeroTitle>
            <HeroSubtitle>
              Delivery selecionado para transformar a sua refeicao em um momento
              especial.
            </HeroSubtitle>
            {destaque && (
              <HeroButton to={`/restaurante/${destaque.id}`}>
                Ver destaques
              </HeroButton>
            )}
          </div>
          <HeroImage $image={destaque?.capa}>
            <HeroBadge>Curadoria efood</HeroBadge>
          </HeroImage>
        </HeroGrid>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>Restaurantes em destaque</SectionTitle>
          <SectionSubtitle>
            Escolha um estilo, veja o cardapio e acompanhe cada etapa do seu
            pedido.
          </SectionSubtitle>
          {isLoading && <Status>Carregando restaurantes...</Status>}
          {hasError && (
            <Status>Erro ao carregar restaurantes. Tente novamente.</Status>
          )}
          {!isLoading && !hasError && (
            <Grid>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </Grid>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  )
}

export default Home
