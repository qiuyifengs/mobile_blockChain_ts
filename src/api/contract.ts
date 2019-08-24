import api from '@/api/index';
import request from '@/utils/request'

export function ContractAll(data: any) {
    return request({
        url: api.ContractAll,
        params: data,
        method: 'get'
    })
}

export function ContractCount(data: any) {
    return request({
        url: api.ContractCount,
        params: data,
        method: 'get'
    })
}

export function ContractTop10(data: any) {
    return request({
        url: api.ContractTop10,
        params: data,
        method: 'get'
    })
}

export function ContractByAddress(obj: any) {
    return request({
        url: `${api.ContractByAddress}${obj.id}`,
        params: obj.params,
        method: 'get'
    })
}
