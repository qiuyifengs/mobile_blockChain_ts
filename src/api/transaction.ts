import api from '@/api/index';
import request from '@/utils/request'

export function TxsCount(data: any) {
    return request({
        url: api.TxsCount,
        params: data,
        method: 'get'
    })
}

export function TxsTop10() {
    return request({
        url: api.TxsTop10,
        method: 'get'
    })
}  

export function TxsAll(data: any) {
    return request({
        url: api.TxsAll,
        params: data,
        method: 'get'
    })
}

export function TxsByBlock(data: any) {
    return request({
        url: `${api.TxsByblock}/${data.id}`,
        params: data.params,
        method: 'get'
    })
}

export function TxsByHash(data: any) {
    return request({
        url: `${api.TxsByHash}/${data.number}`,
        method: 'get'
    })
}

export function TxsByAddress(obj: any) {
    return request({
        url: `${api.TxsByAddress}${obj.id}`,
        params: obj.params,
        method: 'get'
    })
}

export function TxsByaddrTobalance(obj: any) {
    return request({
        url: `${api.TxsByaddrTobalance}/${obj.id}`,
        method: 'get'
    })
}

export function TxsByManyaddrssTobalance(obj: any, data: any) {
    return request({
        url: `${api.TxsByManyaddrssTobalance}/${obj.hash}`,
        params: data,
        method: 'get'
    })
}

export function TxsDetermineAddress(obj: any) {
    return request({
        url: `${api.TxsDetermineAddress}${obj.id}`,
        method: 'get'
    })
}

export function TxsHolderlist(obj: any) {
    return request({
        url: `${api.TxsHolderlist}${obj.id}`,
        params: obj.params,
        method: 'get'
    })
}
