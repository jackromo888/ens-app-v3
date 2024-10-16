import { ComponentProps } from 'react'
import styled, { css } from 'styled-components'

import { useNFTImage } from '@app/hooks/useAvatar'

const StyledNftBox = styled.img<{ $loading: boolean }>(
  ({ theme, $loading }) => css`
    width: 100%;
    background: ${$loading ? theme.colors.accentGradient : 'none'};
    border-radius: ${theme.radii['2xLarge']};
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
  `,
)

const Container = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
)

export const NFTWithPlaceholder = ({
  name,
  network,
  ...props
}: {
  name: string
  network: number
} & ComponentProps<'img'> &
  ComponentProps<typeof StyledNftBox>) => {
  const { image, isLoading, isCompatible } = useNFTImage(name, network)

  if (!isCompatible) return null

  return (
    <Container>
      <StyledNftBox {...{ ...props, $loading: isLoading, src: image }} />
    </Container>
  )
}
