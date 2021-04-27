import React, { FC, memo } from 'react'
import {
  SimpleGrid,
  Box,
  Button,
  Icon,
  useTheme,
  Theme,
} from '@chakra-ui/react'
import { HiOutlineVideoCamera, HiOutlineStop } from 'react-icons/hi'

const MainRecorder: FC = () => {
  const theme: Theme = useTheme()

  return (
    <SimpleGrid spacing="5" p="5">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={[
          'column', // 0-30em
          'row', // 30em-48em
          'row', // 48em-62em
          'row', // 62em+
        ]}
      >
        <Button
          m="1"
          bg={theme.colors.blue[600]}
          size="lg"
          color="white"
          leftIcon={<Icon as={HiOutlineVideoCamera} />}
        >
          Start Recording
        </Button>
        <Button
          m="1"
          bg={theme.colors.blue[200]}
          size="lg"
          color="black"
          leftIcon={<Icon as={HiOutlineStop} />}
        >
          Stop Recording
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          bg="blue.50"
          h="50vh"
          width={[
            '100%', // 0-30em
            '100%', // 30em-48em
            '50vw', // 48em-62em
            '50vw', // 62em+
          ]}
        />
      </Box>
    </SimpleGrid>
  )
}

export default memo(MainRecorder)
