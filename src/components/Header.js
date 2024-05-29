import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLangs, setLang } from "../redux/typesSlice";

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
    <div>
      <h1>Typing Speed App</h1>
      <div className="headerButtonsArea">
        <button className="btn">Giriş</button>
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
      </div>
    </div>
  );
}

export default Header;
