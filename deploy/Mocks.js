module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("WETH9Mock", {
    from: deployer,
    log: true,
  })

  await deploy('ERC20Mock', {
    from: deployer,
    log: true,
    args: ['DAI', 'DAI', '9999999999999999999999']
  })

  await deploy('ERC20Mock', {
    from: deployer,
    log: true,
    args: ['USDC', 'USDC', '9999999999999999999999']
  })
}

module.exports.skip = ({ getChainId }) =>
  new Promise(async (resolve, reject) => {
    try {
      const chainId = await getChainId()
      resolve(chainId !== "31337" && chainId !== '71401')
    } catch (error) {
      reject(error)
    }
  })

module.exports.tags = ["test", "Mocks"]