/* eslint-disable import/no-extraneous-dependencies */
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { ethers } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts } = hre
  const { deployer } = await getNamedAccounts()

  const dummyOracale = await ethers.getContract('DummyOracle')
  const _dummyOracale = dummyOracale.connect(await ethers.getSigner(deployer))
  const txHash = await _dummyOracale['set(int256)'](160000000000)

  console.log(`Setting dummy oracle to 160000000000 (tx: ${txHash.hash})...`)
  return true
}

func.id = 'update_contracts'

export default func
