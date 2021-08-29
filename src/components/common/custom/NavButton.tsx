import { Box, useStyleConfig } from "@chakra-ui/react"

interface INabButtonProps {
  [props: string]: any
}

export const NavButton: React.FC<INabButtonProps> = (props) => {
  const { variant, children, ...rest } = props
  const styles = useStyleConfig("NavButton", { variant })
  return <Box __css={styles} {...rest} > {children} </Box>
}