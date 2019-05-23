import request from '@/utils/http'

/**
 * 根据类型分页查询视频
 * @param o
 */
export function selectSortPage(o) {
    return request({
        url: '/video/sort/page',
        method: 'get',
        params: o
    })
}

/**
 * 根据id查看视频详细
 * @param o
 */
export function getDetailById(id) {
    return request({
        url: '/video/'+id+'/detail',
        method: 'get',
    })
}

/**
 * 根据id分页查询视频url
 * @param o
 */
export function selectUrlPageById(id,o) {
    return request({
        url: '/video/'+id+'/url/page',
        method: 'get',
        params: o
    })
}

/**
 * 根据id更新视频所有信息
 * @param o
 */
export function updateAllInfoById(id) {
    return request({
        url: '/video/'+id+'/allinfo',
        method: 'put'
    })
}

/**
 * 分页查询电影
 * @param o
 */
export function selectPage(query) {
    return request({
        url: '/video/detail/page',
        method: 'get',
        params: query
    })
}
