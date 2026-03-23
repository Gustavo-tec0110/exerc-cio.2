import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;

  @media (max-width: 420px) {
    padding-top: 100%;
  }
`

const Highlight = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 700;
  font-size: 12px;
`

const CardBody = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;

  @media (max-width: 420px) {
    padding: 12px;
    gap: 6px;
  }
`

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 420px) {
    font-size: 16px;
  }
`

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 14px;
`

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 420px) {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`

const Rating = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.green};
`

const Button = styled(Link)`
  padding: 8px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.green};
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`

function RestaurantCard({ restaurant }) {
  return (
    <Card>
      <ImageWrapper $image={restaurant.capa}>
        {restaurant.destacado && <Highlight>Destaque</Highlight>}
      </ImageWrapper>
      <CardBody>
        <Title>{restaurant.titulo}</Title>
        <Meta>{restaurant.tipo}</Meta>
        <Description>{restaurant.descricao}</Description>
        <Footer>
          <Rating>Nota {restaurant.avaliacao}</Rating>
          <Button to={`/restaurante/${restaurant.id}`}>Ver detalhes</Button>
        </Footer>
      </CardBody>
    </Card>
  )
}

export default RestaurantCard
