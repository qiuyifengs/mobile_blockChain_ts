import api from '@/api/index';
import qs from 'qs';
import request from '@/utils/request'

export function BlockTop10() {
    return request({
        url: api.BlockTop10,
        method: 'get'
    })
}  

export function BlockCount(data: any) {
    const param = qs.stringify(data)
    return request({
        url: `${api.BlockCount}?${param}`,
        method: 'get'
    })
}

export function BlockAll(data: any) {
    return request({
        url: api.BlockAll,
        params: data,
        method: 'get'
    })
}

export function BlockByNumber(data: any) {
    return request({
        url: `${api.BlockByNumber}/${data.number}`,
        method: 'get'
    })
}

export function BlockNumberTime(data: any) {
    return request({
        url: `${api.BlockNumberTime}/${data.number}`,
        method: 'get'
    })
}

export function AddressByMiner(obj: any) {
    return request({
        url: `${api.AddressByMiner}/Miner/${obj.id}`,
        params: obj.param,
        method: 'get'
    })
}
