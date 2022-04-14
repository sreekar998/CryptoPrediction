const cryptoPredictionPool = artifacts.require("cryptoPredictionPool");
const TokenMintERC20Token = artifacts.require("TokenMintERC20Token")

module.exports = async function (deployer) {

   await deployer.deploy(TokenMintERC20Token, 'Token', 'TKN', '18', '1000000000000', '0x7E7690cB72a247bFF5f8E2DD089B6160f05EA471', '0x7E7690cB72a247bFF5f8E2DD089B6160f05EA471');
   const ercToken = await TokenMintERC20Token.deployed()

   await deployer.deploy(cryptoPredictionPool, ercToken.address);
   const Pool = await cryptoPredictionPool.deployed()
};
