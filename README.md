# hardhat-teloscan-abi [![Build Status](https://github.com/poma/hardhat-etherscan-abi/workflows/build/badge.svg)](https://github.com/poma/hardhat-etherscan-abi/actions) [![npm](https://img.shields.io/npm/v/hardhat-etherscan-abi.svg)](https://www.npmjs.com/package/hardhat-etherscan-abi) [![hardhat](https://hardhat.org/buidler-plugin-badge.svg?1)](https://hardhat.org)

[Hardhat](https://hardhat.org) plugin that fetches verified contract ABI from [Teloscan](https://teloscan.io) using its API.

## What

This plugin adds extra features on top of `@nomiclabs/hardhat-ethers` and allows creating contract instances without
manually downloading ABI: `ethers.getVerifiedContractAt('<address>')`. It supports Telos Mainnet and Telos Testnet.

## Installation

```bash
npm install --save-dev hardhat-teloscan-abi
```

And add the following statement to your `hardhat.config.js`:

```js
require("hardhat-teloscan-abi");
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```js
import "hardhat-teloscan-abi";
```

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This object has adds some extra `hardhat-etherscan-abi` specific functionalities by adding new extra fields to `hre.ethers`

### Helpers

These helpers are added to the `ethers` object:

```typescript
export async function getVerifiedContractAt(
  hre: HardhatRuntimeEnvironment,
  address: string,
  signer?: ethers.Signer
): Promise<ethers.Contract>;
```

## Usage

You need to add the following Etherscan config to your `hardhat.config.js` file. Etherscan API key is optional but without it Etherscan allows only 1 request per 5 seconds.

```js
module.exports = {
  networks: {
    mainnet: { ... }
  },
  teloscan: {
    // Your API key for Teloscan
    // Obtain one at https://api.teloscan.io/
    apiKey: "YOUR_TELOSCAN_API_KEY"
  }
};
```

Then use the function:

```js
const contract = await hre.ethers.getVerifiedContractAt('<address>');
```

It requires only contract address and will fetch the ABI for the contract automatically from Etherscan
