import axios from "axios";
import { fetchNINDetails } from "./monnifyController.js";

const verifyBVNDocument = async (req, res) => {
  res.send("verify document");
};
const verifyNINDocument = async (req, res) => {
  const { NIN } = req.body;
  console.log(NIN);
  const result = await fetchNINDetails(NIN);
  console.log(result);
  res.send("verify document");
};

export { verifyBVNDocument, verifyNINDocument };
