import styled from 'styled-components'

const Card = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 220px;

  @media (max-width: 420px) {
    min-height: 180px;
  }
`

const Image = styled.div`
  padding-top: 56.25%;
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;

  @media (max-width: 420px) {
    padding-top: 100%;
  }
`

const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  @media (max-width: 420px) {
    padding: 12px;
  }
`

const Title = styled.h4`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 18px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 420px) {
    font-size: 16px;
  }
`

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;

  @media (max-width: 420px) {
    font-size: 12px;
  }
`

const Price = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 700;
  margin-top: 12px;
  display: inline-block;
`

const Button = styled.button`
  margin-top: 8px;
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.green};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

function DishCard({ dish, onBuy }) {
  return (
    <Card>
      <Image $image={dish.foto} />
      <Body>
        <Title>{dish.nome}</Title>
        <Description>{dish.descricao}</Description>
        <Price>{formatPrice(dish.preco)}</Price>
        <Button type="button" onClick={onBuy}>
          Comprar
        </Button>
      </Body>
    </Card>
  )
}

export default DishCard
