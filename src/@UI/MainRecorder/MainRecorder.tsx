import React, { FC, memo, useState } from 'react'
import {
  Box,
  Icon,
  Theme,
  Button,
  useTheme,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react'
import { FaVideoSlash, FaDownload, FaCamera } from 'react-icons/fa'
import 'video-react/dist/video-react.css'
// @ts-ignore
import { Player } from 'video-react'
// @ts-ignore
import RecordRTC, {
  // @ts-ignore
  RecordRTCPromisesHandler,
} from 'recordrtc'
import { saveAs } from 'file-saver'

const MainRecorder: FC = () => {
  const theme: Theme = useTheme()
  const [recorder, setRecorder] = useState<RecordRTC | null>()
  const [stream, setStream] = useState<MediaStream | null>()
  const [videoBlob, setVideoUrlBlob] = useState<Blob | null>()
  const [type, setType] = useState<'video' | 'screen'>('video')

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices
    const stream: MediaStream =
      type === 'video'
        ? await mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
        : await (mediaDevices as any).getDisplayMedia({
            video: true,
            audio: false,
          })
    const recorder: RecordRTC = new RecordRTCPromisesHandler(stream, {
      type: 'video',
    })

    await recorder.startRecording()
    setRecorder(recorder)
    setStream(stream)
    setVideoUrlBlob(null)
  }

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording()
      const blob: Blob = await recorder.getBlob()
      ;(stream as any).stop()
      setVideoUrlBlob(blob)
      setStream(null)
      setRecorder(null)
    }
  }

  const downloadVideo = () => {
    if (videoBlob) {
      saveAs(videoBlob, `Video-${Date.now()}.webm`)
    }
  }

  const changeType = () => {
    if (type === 'screen') {
      setType('video')
    } else {
      setType('screen')
    }
  }

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
          aria-label="start recording"
          color="white"
          onClick={changeType}
        >
          {type === 'screen' ? 'Record Screen' : 'Record Video'}
        </Button>
        <IconButton
          m="1"
          bg={theme.colors.blue[600]}
          size="lg"
          aria-label="start recording"
          color="white"
          onClick={startRecording}
          icon={<Icon as={FaCamera} />}
        />
        <IconButton
          m="1"
          bg={theme.colors.blue[600]}
          size="lg"
          color="white"
          aria-label="stop recording"
          onClick={stopRecording}
          disabled={recorder ? false : true}
          icon={<Icon as={FaVideoSlash} />}
        />
        <IconButton
          bg={theme.colors.blue[600]}
          m="1"
          size="lg"
          disabled={!!!videoBlob}
          color="white"
          onClick={downloadVideo}
          aria-label="download video"
          icon={<Icon as={FaDownload} />}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          bg={!!videoBlob ? 'inherit' : 'blue.50'}
          h="50vh"
          width={[
            '100%', // 0-30em
            '100%', // 30em-48em
            '50vw', // 48em-62em
            '50vw', // 62em+
          ]}
        >
          {!!videoBlob && (
            <Player src={window.URL.createObjectURL(videoBlob)} />
          )}
        </Box>
      </Box>
    </SimpleGrid>
  )
}

export default memo(MainRecorder)
