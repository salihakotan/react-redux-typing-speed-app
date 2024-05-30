import { Box, Textarea } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setLang } from "../redux/typingSlice";

function WordsArea() {
  const dispatch = useDispatch();


  const status = useSelector((state) => state.typing.status);
  const lang = useSelector((state) => state.typing.language);

  const item = useSelector((state) => state.typing.items.find(
    (item) => item.lang_name.toLowerCase() === lang.toLowerCase()))



  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error</div>;
  }

  return (
    <div>
      <Box
        borderRadius="10px"
        padding="10px"
        textAlign="left"
        height="100px"
        backgroundColor="white"
        fontSize="30px"
        disabled
      >
        {item &&
          item.words.map((word, index) => (
            <span key={index}>
              <span>
                {word.split("").map((char, idx) => (
                  <span key={idx}>{char}</span>
                ))}
              </span>
              <span> </span>
            </span>
          ))}
      </Box>
    </div>
  );
}

export default WordsArea;
