import {useSelector} from "react-redux";
import _ from "lodash";
import Constants from "i18nConstants/constants";

export const I18n = (input: any) => {
  const activeLanguage = useSelector((state: any) => state.selectedLanguage);
  let selectedFile = Constants[activeLanguage];
  return _.get(selectedFile, input);
};

export default I18n;
