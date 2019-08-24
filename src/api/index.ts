
// const API_BLOCK_ROUTER = 'http://192.168.4.188:3001/block'
// const API_TRANSACTION_ROUTER = 'http://192.168.4.188:3001/txs'
// const API_CONTRACT_ROUTER = 'http://192.168.4.188:3001/contract'
// const API_DPOS_ROUTER = 'http://192.168.4.188:3001/dpos'
// const API_TXSERC20_ROUTER = 'http://192.168.4.188:3001/txserc20'

// const API_BLOCK_ROUTER = '/api/block'
// const API_TRANSACTION_ROUTER = '/api/txs'
// const API_CONTRACT_ROUTER = '/api/contract'
// const API_DPOS_ROUTER = '/api/dpos'
// const API_TXSERC20_ROUTER = '/api/txserc20'

// const API_BLOCK_ROUTER = 'http://52.88.212.13/api/block'
// const API_TRANSACTION_ROUTER = 'http://52.88.212.13/api/txs'
// const API_CONTRACT_ROUTER = 'http://52.88.212.13/api/contract'
// const API_DPOS_ROUTER = 'http://52.88.212.13/api/dpos'
// const API_TXSERC20_ROUTER = 'http://52.88.212.13/api/txserc20'

const API_BLOCK_ROUTER = 'https://www.sasscan.com/api/block'
const API_TRANSACTION_ROUTER = 'https://www.sasscan.com/api/txs'
const API_CONTRACT_ROUTER = 'https://www.sasscan.com/api/contract'
const API_DPOS_ROUTER = 'https://www.sasscan.com/api/dpos'
const API_TXSERC20_ROUTER = 'https://www.sasscan.com/api/txserc20'

const api = {
    BlockCount: `${API_BLOCK_ROUTER}/count`,
    BlockTop10: `${API_BLOCK_ROUTER}/top10`,
    BlockAll: `${API_BLOCK_ROUTER}/all`,
    BlockByNumber: API_BLOCK_ROUTER,
    BlockNumberTime: API_BLOCK_ROUTER,
    AddressByMiner: API_BLOCK_ROUTER,

    TxsCount: `${API_TRANSACTION_ROUTER}/count`,
    TxsTop10: `${API_TRANSACTION_ROUTER}/top10`,
    TxsAll: `${API_TRANSACTION_ROUTER}/all`,
    TxsByblock: `${API_TRANSACTION_ROUTER}/byblock/`,
    TxsByHash: API_TRANSACTION_ROUTER,
    TxsByAddress: `${API_TRANSACTION_ROUTER}/byaddress/`,
    TxsByaddrTobalance: `${API_TRANSACTION_ROUTER}/accountbalance/`,
    TxsByManyaddrssTobalance: `${API_TRANSACTION_ROUTER}/byManyaddrssTobalance/`,
    TxsDetermineAddress: `${API_TRANSACTION_ROUTER}/determineAddress/`,
    TxsHolderlist: `${API_TRANSACTION_ROUTER}/holderlist/`,

    ContractAll: `${API_CONTRACT_ROUTER}/tokenContract`,
    ContractCount: `${API_CONTRACT_ROUTER}/count`,
    ContractTop10: `${API_CONTRACT_ROUTER}/top10`,
    ContractByAddress: `${API_CONTRACT_ROUTER}/byaddress/`,

    Txserc20All: `${API_TXSERC20_ROUTER}/all`,
    Txserc20ByAddress: `${API_TXSERC20_ROUTER}/byaddress/`,

    DposAll: `${API_DPOS_ROUTER}/all`,
    DposFindoneByAddress: `${API_DPOS_ROUTER}/findone`

}

export default api
