import moment from 'moment'
import _ from 'lodash'
// export const oneSecond = 1000
// export const oneMinute = 60 * oneSecond
// export const oneHour = 60 * oneMinute
// export const oneDay = 24 * oneHour

/**
 * 口语化日期
 * @param {Long} time 
 * @param {Long} current 
 */
export function timeFrom(time, current) {
  current = current || new Date().getTime()
  // const value = Math.abs(time - current)
  // if (value < oneMinute) {
  //   return '刚刚'
  // }
  // if (oneMinute <= value && value < oneHour) {
  //   return `${Math.floor(value / oneMinute)}分钟前`
  // }
  // if (oneHour <= value && value <= oneDay) {
  //   return `${Math.floor(value / oneHour)}小时前`
  // }

  return moment(time).format('YYYY-MM-DD HH:mm')
}

export function ajustSourceCodeRecord(records = []) {
  records.forEach(record => {
    const { replacement, assets, origin_id, url } = record
    record['__assets__'] = _.cloneDeep(assets)
    _.keys(assets).forEach(key => {
      assets[key] = `${url}/${origin_id}/${assets[key]}`
    })
    _.chain(replacement).keys().forEach(key => {
      assets[key] = replacement[key]
    }).value()

  })

  return records
}