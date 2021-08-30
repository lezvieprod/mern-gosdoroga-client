export const ContainerTheme = {
  baseStyle: {
    h: "100%",
    maxW: {
      xs: '100%',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1200px'
    }
  },
  variants: {
    modal: {
      maxW: '700px'
    }
  },
}

export const NavButtonTheme = {
  baseStyle: {
    display: "flex",
    alignItems: 'center',
    h: '100%',
    px: '1rem',
    cursor: 'pointer',
    color: 'gray.600',
    _hover: {
      bgColor: '#F3F3F3'
    }
  }
}

