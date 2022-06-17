const { assert } = require('chai');
const cryptoPredictionPool = artifacts.require('cryptoPredictionPool');
const TokenMintERC20Token = artifacts.require('TokenMintERC20Token');
const MegaPool = artifacts.require('MegaPool')

contract('contract deployment', accounts => {
    let Token,pool,Mega
    before('deploying', async() => {
        Token = await  TokenMintERC20Token.deployed('Token', 'TKN', '18', '1000000000000', '0x7E7690cB72a247bFF5f8E2DD089B6160f05EA471', '0x7E7690cB72a247bFF5f8E2DD089B6160f05EA471');
        pool = await  cryptoPredictionPool.deployed(Token.address);
        await Token.approve(pool.address, '100000000000000')
        Mega = await MegaPool.deployed();
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
        await pool.callMegaPool(Mega.address)
        await pool.whitelisting([accounts[0], accounts[1],accounts[2], accounts[3], accounts[4], accounts[5]])
        await pool.registerforMegaPool()
        await pool.registerforMegaPool({from: accounts[1]})
        await pool.registerforMegaPool({from: accounts[2]})
        await pool.registerforMegaPool({from: accounts[3]})
        await pool.registerforMegaPool({from: accounts[4]})
        await pool.registerforMegaPool({from: accounts[5]})
    })

    it('checking poolId', async() => {
        const id = await pool.poolId()
        assert.equal(id, '1')
    })

    it('checking balance in mega pool', async () => {
        const balance = await Mega.getBalance(Token.address)
        assert.equal(balance, '256')
    })

    it('checking if whitelisted', async() => {
        const check = await pool.whitelisted.call(accounts[2])
        assert.equal(check, true)
    })

    it('checking if registered for mega pool', async() =>{
        const check = await pool.registered.call(accounts[4])
        assert.equal(check, true)
    })

    it('Roll Dice', async() => {
        await pool.RollDice()
        const winner = await pool.WinnerAddress()
        await pool.claimabel({from: winner})
        const balance = await Token.balanceOf(winner)
        assert.equal(balance, '256')
    })

})

})