import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Container from './Container'
import Tag from './Tag'
import MenuCard from './MenuCard'

const Banner = styled.section`
  position: relative;
  padding: 56px 0;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 600px) {
    padding: 40px 0;
  }
`

const BannerImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;
  opacity: 0.3;
`

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(243, 237, 226, 0.88);
`

const BannerContent = styled(Container)`
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 24px;
  }
`

const Info = styled.div`
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 36px;
  font-weight: 800;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`

const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.85;
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const BackButton = styled(Link)`
  align-self: flex-start;
  padding: 10px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.green};
  color: #fff;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`

function RestaurantHero({ restaurant }) {
  return (
    <Banner>
      <BannerImage $image={restaurant.capa} />
      <BannerOverlay />
      <BannerContent>
        <Info>
          <Title>{restaurant.titulo}</Title>
          <Description>{restaurant.descricao}</Description>
          <TagRow>
            <Tag>{restaurant.tipo}</Tag>
            <Tag>Nota {restaurant.avaliacao}</Tag>
            {restaurant.destacado && <Tag>Destaque</Tag>}
          </TagRow>
          <BackButton to="/">Voltar aos restaurantes</BackButton>
        </Info>
        <MenuCard
          title="Menu degustacao"
          description="Uma selecao com os pratos mais pedidos e sugestoes do chef."
          price="R$ 129"
        />
      </BannerContent>
    </Banner>
  )
}

export default RestaurantHero
