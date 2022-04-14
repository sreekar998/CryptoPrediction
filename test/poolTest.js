const { assert } = require('chai');
const cryptoPredictionPool = artifacts.require('cryptoPredictionPool');
const TokenMintERC20Token = artifacts.require('TokenMintERC20Token');

contract('contract deployment', accounts => {
    let Token,pool
    before('deploying', async() => {
        Token = await  TokenMintERC20Token.deployed('Token', 'TKN', '18', '1000000000000', '0x7E7690cB72a247bFF5f8E2DD089B6160f05EA471', '0x7E7690cB72a247bFF5f8E2DD089B6160f05EA471');
        pool = await  cryptoPredictionPool.deployed(Token.address);
        await Token.approve(pool.address, '100000000000000')
    })

    it('checking allowance', async() => {
        const allowed = await Token.allowance(accounts[0], pool.address);
        assert.equal(allowed, '100000000000000');
    })

    it('checking name', async() => {
        const name = await Token.Name();
        assert.equal(name, 'Token');
    })

    describe('creating pool', async() => {

    before(async () => {
        await pool.createPool(['1','2','3','4','5','6','7','8','9','1','2','3','4','5','6'])
        await pool.Register('Sreekar')
        await pool.PlaceBet('1','1','1','1','256');
    })
})

})