import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import { EthereumProvider } from "hardhat/types";

const pluginName = "hardhat-teloscan-abi";

export interface TeloscanURLs {
  apiURL: string;
  browserURL: string;
}

type NetworkMap = {
  [networkID in NetworkID]: TeloscanURLs;
};

// See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids
enum NetworkID {
  MAINNET = 40,
  TESTNET = 41,
}

const networkIDtoEndpoints: NetworkMap = {
  [NetworkID.MAINNET]: {
    apiURL: "https://api.teloscan.io/v1",
    browserURL: "https://teloscan.io/",
  },
  [NetworkID.TESTNET]: {
    apiURL: "https://api.testnet.teloscan.io/v1",
    browserURL: "https://testnet.teloscan.io/",
  },
};

export async function getTeloscanEndpoints(
  provider: EthereumProvider,
  networkName: string
): Promise<EtherscanURLs> {
  // Disable this check because ABI download can be useful in fork mode
  // if (networkName === HARDHAT_NETWORK_NAME) {
  //   throw new NomicLabsHardhatPluginError(
  //     pluginName,
  //     `The selected network is ${networkName}. Please select a network supported by Teloscan.`
  //   );
  // }

  const chainID = parseInt(await provider.send("eth_chainId"), 16) as NetworkID;

  const endpoints = networkIDtoEndpoints[chainID];

  if (endpoints === undefined) {
    throw new NomicLabsHardhatPluginError(
      pluginName,
      `A teloscan endpoint could not be found for this network. ChainID: ${chainID}. The selected network is ${networkName}.

Possible causes are:
  - The selected network (${networkName}) is wrong.
  - Faulty hardhat network config.

 If you use Mainnet fork mode try setting 'chainId: 1' in hardhat config`
    );
  }

  return endpoints;
}
