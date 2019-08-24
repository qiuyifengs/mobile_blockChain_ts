import api from '@/api/index';
import request from '@/utils/request'

export function DposAll() {
    return request({
        url: api.DposAll,
        method: 'get'
    })
}

export function DposByFindone(data: any) {
    return request({
        url: `${api.DposFindoneByAddress}/${data.id}`,
        method: 'get'
    })
}
