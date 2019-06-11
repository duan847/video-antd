import request from '@/utils/http'

/**
 * 根据类型分页查询视频
 * @param query
 */
export function selectSortPage(query) {
    return request({
        url: '/video/sort/page',
        method: 'get',
        params: query
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
 * @param query
 */
export function selectUrlPageById(id,query) {
    return request({
        url: '/video/'+id+'/url/page',
        method: 'get',
        params: query
    })
}

/**
 * 根据id分页查询视频下载url
 * @param query
 */
export function selectDownUrlPageById(id,query) {
    return request({
        url: '/video/'+id+'/down/page',
        method: 'get',
        params: query
    })
}

/**
 * 根据id更新视频所有信息
 * @param id
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
