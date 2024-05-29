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
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
} from "@chakra-ui/react";

function TypeInput() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputValue, setInputValue] = useState("");
  let [timesUp, setTimesUp] = useState(false);
  let [time, setTime] = useState(5);

  var intervalId;

  const handleChange = (e) => {
    setInputValue(e);
    intervalId = setInterval(countdown, 1000);
  };

  const countdown = () => {
    if (!intervalId) return;

    time--;
    setTime(time);

    if (time <= 0) {
      setTime("times up");
      clearInterval(intervalId);
      setTimesUp(true);
      onOpen()
    }
  };

  const restartBtn = () => {
    setTime(5);
    setTimesUp(false);
    setInputValue("");
  };

  return (
    <>
      <div className="typeInputArea">
        <Input
          disabled={timesUp}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        ></Input>
        <div className="timeBox">{time}</div>
        <Button colorScheme="blue" disabled={!timesUp} className="btn" onClick={restartBtn}>
          Restart
        </Button>
      </div>

    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="center" fontSize={40}>73 DKS</Text>

            <TableContainer>
              <Table variant="striped" colorScheme="gray">
               
                <Tbody>
                  <Tr>
                    <Td>Keystroke</Td>
                    <Td fontWeight="bold" isNumeric>(<span className="greenText">363</span> | <span className="redText">10</span>) 373</Td>
                  </Tr>
                  <Tr>
                  <Td>Accuracy rate</Td>
                    <Td fontWeight="bold" isNumeric>95.03%</Td>
                  </Tr>
                  <Tr>
                    <Td>Correct words</Td>
                    <Td fontWeight="bold" color="green" isNumeric>63</Td>
                  </Tr>
                  <Tr>
                    <Td>Wrong words</Td>
                    <Td fontWeight="bold" color="red" isNumeric>2</Td>
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
