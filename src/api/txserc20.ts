import api from '@/api/index';
import request from '@/utils/request'

export function Txserc20All(data: any) {
    return request({
        url: api.Txserc20All,
        params: data,
        method: 'get'
    })
}

export function Txserc20ByAddress(obj: any, data: any) {
    return request({
        url: `${api.Txserc20ByAddress}/${obj.hash}`,
        params: data,
        method: 'get'
    })
}
