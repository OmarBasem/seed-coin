import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x44cAF15e40249Da72b2819461704EB73FFF6E889"
);

export default instance;
