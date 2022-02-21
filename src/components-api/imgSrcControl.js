const imgSrc = ref("http://192.168.25.60:8000/files");
import {
  pdfImag,
  xlsImag,
  txtImag,
  svgImag,
  pptImag,
  docImag,
  mp4Imag,
  mp3Imag,
  rtfImag,
  csvImag,
  fileImag,
  odtImag,
} from "../assets/image";
import { ref } from "@vue/reactivity";

export function imgControl(fileName, fileType) {
  if (fileType === "jpg" || fileType === "gif" || fileType === "png") {
    return `${imgSrc.value}/thumbnail/${fileName}.png`;
  } else if (fileType === "pdf") {
    return pdfImag;
  } else if (fileType.substr(0, 3) === "xls") {
    return xlsImag;
  } else if (fileType.substr(0, 3) === "txt") {
    return txtImag;
  } else if (fileType.substr(0, 3) === "ppt") {
    return pptImag;
  } else if (fileType.substr(0, 3) === "svg") {
    return svgImag;
  } else if (fileType.substr(0, 3) === "doc") {
    return docImag;
  } else if (fileType.substr(0, 3) === "mp4") {
    return mp4Imag;
  } else if (fileType.substr(0, 3) === "mp3") {
    return mp3Imag;
  } else if (fileType.substr(0, 3) === "rtf") {
    return rtfImag;
  } else if (fileType.substr(0, 3) === "csv") {
    return csvImag;
  } else if (fileType.substr(0, 3) === "odt") {
    return odtImag;
  } else {
    return fileImag;
  }
}
