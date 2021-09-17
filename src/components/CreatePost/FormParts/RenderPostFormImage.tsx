import { Button } from "@chakra-ui/button"
import Icon from "@chakra-ui/icon"
import { Image } from "@chakra-ui/image"
import { Flex } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { DeepMap, FieldError } from "react-hook-form"
import { FaUser } from "react-icons/fa"
import { useLang } from "../../../hooks/lang.hook"
import { IPostCreateSubmit } from "../../../types/post.interface"

interface IRenderImageProps {
  image?: FileList | string,
  errors: DeepMap<IPostCreateSubmit, FieldError>
}

export const RenderPostFormImage: React.FC<IRenderImageProps> = ({ image, errors }) => {

  const { lang, renderText } = useLang()

  if (!image) {
    return (
      <chakra.label borderRadius={'md'}
        overflow={'hidden'} htmlFor="image-upload" d={'flex'} w={'100%'} h={'100px'} cursor={'pointer'}>
        <Flex alignItems="center" justifyContent={'center'} w={'100%'} h={'100px'} border={'1px dashed #666'} borderRadius={'md'}>
          <Button
            type="button"
            bg={'transparent'}
            size="lg"
            fontWeight="medium"
            _focus={{ shadow: "none" }}
            pointerEvents="none"
          >
            {!image ? renderText(lang).SET_IMAGE :  renderText(lang).CHANGE_IMAGE}
          </Button>
        </Flex>
      </chakra.label>
    )
  }
  return (
    <chakra.label
      borderRadius={'md'}
      overflow={'hidden'}
      sx={{
        "&:hover span": {
          opacity: "1",
          visibility: "visible"
        },
      }}
      htmlFor="image-upload" d={'flex'} w={'100%'} cursor={'pointer'} pos={'relative'}>
      <Flex
        as={'span'}
        opacity={'0'}
        visibility={'hidden'}
        pos={'absolute'}
        w={'100%'}
        h={'100%'}
        bg={'rgba(0,0,0, 0.5)'}
        alignItems={'center'}
        justifyContent={'center'}
        color={'#fff'}
        fontSize={'20px'}
        transition={'all .3s ease'}
      >
        {renderText(lang).CHANGE_IMAGE}
      </Flex>
      <Flex alignItems={'center'} w={'100%'}>
        {
          image instanceof FileList
            ?
            <Image
              w={'100%'}
              h={'270px'}
              objectFit={'cover'}
              bg={"gray.100"}
              border={!!errors.postImageBefore ? '2px solid red' : '0'}
              icon={<Icon as={FaUser} boxSize={9} mt={3} rounded="full" color={"gray.300"} />}
              src={URL.createObjectURL(image[0])} alt={image[0].name}
            />
            :
            <Image
              w={'100%'}
              h={'270px'}
              objectFit={'cover'}
              bg={"gray.100"}
              border={!!errors.postImageBefore ? '2px solid red' : '0'}
              icon={<Icon as={FaUser} boxSize={9} mt={3} rounded="full" color={"gray.300"} />}
              src={image} alt={''}
            />
        }
        
      </Flex>
    </chakra.label>
  )

}