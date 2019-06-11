import request from '@/utils/http'

/**
 * 查询所有代码
 * @param query
 */
export function selectList() {
    return request({
        url: '/dict/list',
        method: 'get'
    })
}

