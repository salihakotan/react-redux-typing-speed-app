import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { setLang, getItems } from "../redux/typingSlice";

function Header() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.typing.status);

  const items = useSelector((state) => state.typing.items);

  const lang = useSelector((state) => state.typing.language);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getItems());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    dispatch(setLang(e));
    dispatch(getItems());

  };

  return (
    <Box mt={10}>
      <Heading color="white" as="h1">Typing Speed App</Heading>
      <Box mt={20} className="headerButtonsArea">
        <select
          defaultValue={lang}
          style={{ backgroundColor: "green",width:"150px" }}
          className="btn"
          onChange={(e) => handleChange(e.target.value)}
        >
        {console.log("****items", items)}
            {
               items && (
                items.map((item,index)=> (
                <option key={index} value={item.lang_name}>{item.lang_name}</option>
               )
            ))
            }
        </select>
      </Box>
    </Box>
  );
}

export default Header;
