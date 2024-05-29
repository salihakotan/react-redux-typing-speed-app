import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLangs, setLang } from "../redux/typesSlice";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

function Header() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.types.language.status);

  const items = useSelector((state) => state.types.language.items);

  const lang = useSelector((state) => state.types.language.name);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getLangs());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    dispatch(setLang());
  };

  return (
    <Box mt={10}>
      <Heading as="h1">Typing Speed App</Heading>
      <Box mt={20} className="headerButtonsArea">
        <Button colorScheme="green" className="btn">Giriş</Button>
        <select
          value={lang}
          style={{ backgroundColor: "purple" }}
          className="btn"
          onChange={(e) => handleChange(e.target.value)}
        >
            {items.map((item,index)=> (
                <option key={index} value={item.name}>{item.name}</option>
            ))}
        </select>
      </Box>
    </Box>
  );
}

export default Header;
