import { CopyIcon } from "@chakra-ui/icons";

import { Heading, Text, Flex, Button, Container } from "@chakra-ui/react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

function App() {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <Container boxSize="lg" mt="2.5%">
      <Flex direction="column" gap="5" align="center">
        <Heading as="h1" fontSize="4xl">
          Practice Your Self
        </Heading>
        <Text color="gray" textAlign="center" fontSize="md">
          A Web application that converts speech from the microphone to text and
          make it available to You.
        </Text>
        <Flex
          boxSize="md"
          border="1px solid #ccc"
          direction="column"
          boxShadow="md"
          borderRadius="md"
        >
          <Flex
            height="lg"
            textAlign="center"
            p="5"
            overflow="auto"
            onClick={() => setTextToCopy(transcript)}
          >
            {transcript}
          </Flex>
          <Flex gap="5" justifyContent="center" p="3">
            <Button
              colorScheme="green"
              leftIcon={<CopyIcon />}
              onClick={setCopied}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Button colorScheme="green" onClick={startListening}>
              Start Listening
            </Button>
            <Button
              colorScheme="green"
              onClick={SpeechRecognition.stopListening}
            >
              Stop Listening
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default App;
