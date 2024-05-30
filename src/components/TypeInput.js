import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function TypeInput() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputValue, setInputValue] = useState("");
  const [time, setTime] = useState(5);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [keystroke, setKeystroke] = useState(0);

  var intervalId;

  const status = useSelector((state) => state.typing.status);
  const lang = useSelector((state) => state.typing.language);

  const item = useSelector((state) =>
    state.typing.items.find(
      (item) => item.lang_name.toLowerCase() === lang.toLowerCase()
    )
  );

  const handleKeyDown = (event) => {

    if (currWordIndex >= item.words.length) return

    if (inputValue.endsWith(" ") || inputValue.length <= 0) {
      if (event.keyCode === 32 || event.keyCode === 8) {
        //prevent backspace and extra space
        event.preventDefault();
        return;
      }
    }

    if (event.keyCode === 32) {
      checkMatch();
      setCurrWordIndex(currWordIndex + 1);
    }
 
  };

  function checkMatch() {
    const wordToCompare = item.words[currWordIndex];
    const doesItMatch = wordToCompare === inputValue.split(" ")[currWordIndex];
    console.log("word at array:", wordToCompare);
    console.log("input word value:", inputValue.split(" ")[currWordIndex]);
    doesItMatch ? setCorrect((prev) => prev + 1) : setWrong((prev) => prev + 1);
    console.log({ doesItMatch });
    console.log("word index", currWordIndex);
  }

  const handleChange = (e) => {
    const regex = /^[A-Za-zÇçĞğİıÖöŞşÜü\s]*$/; // Türkçe harfler ve boşluklara izin veren regex
    if (currWordIndex >= item.words.length) {
      console.log("no anymore words");
      showResults();
      //finish game
      return;
    }
    // Eski değerden daha uzun olan yeni değerleri kabul et
    if (
      e.length > inputValue.length &&
      e.startsWith(inputValue) &&
      regex.test(e)
    ) {
      setInputValue(e);
      setKeystroke((prev) => prev + 1);
      console.log("keystroke inccreased: ", keystroke + 1);
    }

    // countdown()
  };

  function showResults() {
    setAccuracy(correct / item.words.length);
    console.log("------------RESULTS:---------------");
    console.log("CORRECT: ", correct);
    console.log("WRONG: ", wrong);
    console.log("KEYSTROKE: ", keystroke);

    console.log(
      "ACCURACY: (%) ",
      parseFloat((correct / item.words.length)*100).toFixed(2)
    );
  }

  const countdown = () => {
    intervalId = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          onOpen();
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const restartBtn = () => {
    setTime(5);
    // setTimesUp(false);
    setInputValue("");
    clearInterval(intervalId);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="typeInputArea">
        <Input tabIndex={0}
          height="50px"
          fontSize="30px"
          padding="10px"
          backgroundColor="white"
          //   disabled={timesUp}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        ></Input>
        <div className="timeBox">{time}</div>
        <Button
          colorScheme="blue"
          //   disabled={!timesUp}
          className="btn"
          onClick={restartBtn}
        >
          Restart
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Results</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text textAlign="center" fontSize={40}>
                73 WPM
              </Text>

              <TableContainer>
                <Table variant="striped" colorScheme="gray">
                  <Tbody>
                    <Tr>
                      <Td>Keystroke</Td>
                      <Td fontWeight="bold" isNumeric>
                        (<span className="greenText">363</span> |{" "}
                        <span className="redText">10</span>) 373
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Accuracy rate</Td>
                      <Td fontWeight="bold" isNumeric>
                        95.03%
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Correct words</Td>
                      <Td fontWeight="bold" color="green" isNumeric>
                        63
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Wrong words</Td>
                      <Td fontWeight="bold" color="red" isNumeric>
                        2
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default TypeInput;
