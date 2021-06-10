import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import {
  CONTRACTS,
} from 'config'
import {
  ERC_ABI,
  BEP_ABI
} from 'libs/abis'
import { isEmpty } from 'utils/helpers/utility'
import usePopup from 'utils/hooks/usePopUp'

const NFTContext = createContext(null)

export function NFTProvider({ children }) {
  const { setPopUp } = usePopup();
  const { library, chainId, account } = useWeb3React();

  const nftContract = useMemo(() => library ? new ethers.Contract(CONTRACTS.NFT, ERC_ABI, library.getSigner()) : null, [library])
  const [ethereumContract, setEthereumContract] = useState();
  const [binanceContract, setBinanceContract] = useState();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const ethereumContract = new ethers.Contract(CONTRACTS.ERC, ERC_ABI, library.getSigner());
        setEthereumContract(ethereumContract)

        const binanceContract = new ethers.Contract(CONTRACTS.BEP, BEP_ABI, library.getSigner());
        setBinanceContract(binanceContract)
      } catch (error) {
        console.error('error => ', error)
      }
    }

    if (library) {
      getContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, chainId]);

  useEffect(() => {
    const getEthereumInfo = async () => {
      try {
        const latestEthereumBalance = await ethereumContract.balanceOf(account);
        const ethereumBalance = ethers.utils.formatUnits(latestEthereumBalance, 18);
        setEthereumBalance(ethereumBalance);
      } catch (error) {
        console.log('[Error] getEthereumInfo => ', error)
      }
    }

    if (!isEmpty(ethereumContract)) {
      getEthereumInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethereumContract])

  useEffect(() => {
    const getBinanceInfo = async () => {
      try {
        const latestBinanceBalance = await binanceContract.balanceOf(account);
        const binanceBalance = ethers.utils.formatUnits(latestBinanceBalance, 18);
        setBinanceBalance(binanceBalance);
      } catch (error) {
        console.log('[Error] getBinanceInfo => ', error)
      }
    }

    if (!isEmpty(binanceContract)) {
      getBinanceInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binanceContract])

  return (
    <NFTContext.Provider
      value={{}}
    >
      {children}
    </NFTContext.Provider>
  )
}

export function useContracts() {
  const context = useContext(NFTContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  const {
  } = context

  return {
  }
}