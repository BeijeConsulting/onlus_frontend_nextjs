import { useMediaQuery } from "react-responsive"

import styled from "styled-components"

const useResponsive = () => {
  const DesktopContainer = styled.div`
    @media (max-width: 768px) {
      display: none !important;
    }
  `

  const MobileContainer = styled.div`
    @media (min-width: 769px) {
      display: none !important;
    }
  `

  return [DesktopContainer, MobileContainer]
}

export default useResponsive
