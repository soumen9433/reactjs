import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {translateTo} from "stores/actions";

function I18nSelector() {
  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  useEffect(() => {
    dispatch(translateTo(selectedLanguage));
  }, []);

  const handleSelectLanguage = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem("selectedLanguage", value);
    dispatch(translateTo(value));
  };

  return (
    <>
      <select
        value={selectedLanguage}
        onChange={(e) => handleSelectLanguage(e.target.value)}
      >
        <option value="en">ENGLISH</option>
        <option value="fr">FRENCH</option>
        <option value="es">SPANISH</option>
      </select>
    </>
  );
}

export default I18nSelector;
