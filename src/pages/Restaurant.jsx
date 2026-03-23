import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '../components/Container'
import RestaurantHero from '../components/RestaurantHero'
import DishCard from '../components/DishCard'

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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 20;
`

const ModalCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  max-width: 520px;
  width: 100%;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  display: grid;
  gap: 16px;
`

const ModalImage = styled.div`
  width: 100%;
  padding-top: 56.25%;
  border-radius: ${({ theme }) => theme.radius};
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;
`

const ModalTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 22px;
`

const ModalText = styled.p`
  margin: 0;
  opacity: 0.8;
  line-height: 1.6;
`

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const BuyButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  background: ${({ theme }) => theme.colors.green};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`

const CloseButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: 999px;
  padding: 10px 18px;
  background: transparent;
  color: ${({ theme }) => theme.colors.green};
  font-weight: 600;
  cursor: pointer;
`

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

function Restaurant() {
  const { id } = useParams()
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

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

  const restaurant = useMemo(() => {
    const numericId = Number(id)
    return restaurants.find((item) => item.id === numericId) || restaurants[0]
  }, [id, restaurants])

  const handleCloseModal = () => setSelectedDish(null)

  return (
    <>
      <Header />
      {isLoading && <Status>Carregando restaurante...</Status>}
      {hasError && (
        <Status>Erro ao carregar restaurante. Tente novamente.</Status>
      )}
      {!isLoading && !hasError && restaurant && (
        <>
          <RestaurantHero restaurant={restaurant} />
          <Section>
            <Container>
              <SectionTitle>Cardapio</SectionTitle>
              <SectionSubtitle>
                Escolha seus favoritos e monte um pedido sob medida.
              </SectionSubtitle>
              <Grid>
                {restaurant.cardapio.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onBuy={() => setSelectedDish(dish)}
                  />
                ))}
              </Grid>
            </Container>
          </Section>
        </>
      )}
      <Footer />

      {selectedDish && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalImage $image={selectedDish.foto} />
            <ModalTitle>{selectedDish.nome}</ModalTitle>
            <ModalText>{selectedDish.descricao}</ModalText>
            <ModalText>Serve: {selectedDish.porcao}</ModalText>
            <ModalFooter>
              <strong>{formatPrice(selectedDish.preco)}</strong>
              <BuyButton type="button">Adicionar ao carrinho</BuyButton>
              <CloseButton type="button" onClick={handleCloseModal}>
                Fechar
              </CloseButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  )
}

export default Restaurant
