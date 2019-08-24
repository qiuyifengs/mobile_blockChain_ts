import moment from 'moment'
import { Decimal } from 'decimal.js'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'

const numberFormat = (value: any) => {
  if (!value) {
    return '0.00'
  }
  const inPart = Number(value) | 0
  const inPartFormat = inPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  let floatPart = '.00' // 预定义小数部分
  const value2Array = value.toString().split('.')

  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString() // 拿到小数部分
    if (floatPart.length === 1) { // 补0
      return `${inPartFormat}.${floatPart}0`
    } else {
      return `${inPartFormat}.${floatPart}`
    }
  } else {
    return inPartFormat + floatPart
  }
}

const fieldTo = (value: string) => {
  if (Array.isArray(value)) {
      return addressFormat(value.join())
  } else {
      return addressFormat(value)
  }
}

const txsDetailFromFilter = (value: string) => {
  if (value === undefined) {
    return false
  }
  return value.replace(/(.{5}).+(.{5}).+(.{5})/, '$1...$2...$3')
}

const addressFormat = (value: string) => {
  if (value === undefined || value === null) {
    return false
  }
  return value.replace(/(.{15}).+(.{8})/, '$1...$2')
}

const fieldFvalue = (value: string) => {
  if (Number(value) > 0) {
    return new Decimal(value).toFixed()
  } else {
    return '0.00'
  }
}

const fieldNonce = (value: string) => {
  return Web3.utils.fromWei(value, 'ether')
}

const bananceFilter = (value: string, decimal: number) => {
  const num = Number(value)
  if (num > 0) {
    return new Decimal(num).dividedBy(Math.pow(10, (decimal || 18))).toFixed()        
  } else {
    return 0
  }
}

const blockTimeFormat = (time: number) => { 
  if (time < 60) {
    return `${ time } secs ago`
  } else if (time < 180) {
    const t = String(time / 60)
    // tslint:disable-next-line: radix
    return `${ parseInt(t) } mins ${ time % 60 } secs ago`
  } else {
    return 'time error'
  }
}

const timestampFormat = (time: any) => {
  const en = moment().locale('en');
  en.localeData().months(moment(time * 1000))
  return moment(time * 1000)
}

const gasUsedCalc = (gasUsed: any, gasLimit: any) => {
  const result = gasUsed / gasLimit
  return (result * 100).toFixed(2)
}

const fieldTotalSupply = (value: any, decimals: number) => {
  decimals = (decimals || 18)
  decimals = decimals < 1 ? 18 : decimals
  const x = new BigNumber(value)
  const y = new BigNumber(Math.pow(10, decimals))

  return String(x.dividedBy(y)).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

const fieldTokenValue = (value: any, decimal: any) => {
  if (!decimal || decimal === 'null' ) {  
    decimal = 18
  }
  const strlen = value.length       
  if (value.length < decimal) {
    return  new Decimal(value).dividedBy(Math.pow(10, (parseFloat(decimal) || 18))).toFixed()
  } else {
    return new Decimal(value.substr(0, strlen - decimal )+'.'+ value.substr(strlen - decimal )).toFixed()
  }
}

const numberUnitFilter = (value: number) => {
  if (value >= 10000) {
    return Math.round(value / 1000) / 10 + 'W'
  } else if (value >= 1000) {
    return Math.round(value / 1000) / 10 + 'K'
  } else {
    return value
  }
}

const fomatFloat = (value: number, n: number) => {
  const f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
  let s = f.toString()
  const rs = s.indexOf('.')
  if (rs < 0) {
      s += '.'
  }
  for (let i = s.length - s.indexOf('.'); i <= n; i++) {
      s += '0'
  }
  return s
}

const percentageCompanyFilter = (value: number) => {
  return fomatFloat(value, 6)
}

const percentageFilter = (value: number, total: number) => {
  return Number(fomatFloat(value, 6)) / total
}

const percentageToFixedFilter = (value: number) => {
  return Number(value).toFixed(2)
}

const fieldBalanceHolder = (balance: any, decimal: number) => {
  if (Number(balance) > 0) {
    return new Decimal(balance).dividedBy(Math.pow(10, (decimal || 18))).toFixed()
  } else {
    return 0 
  }
}

const fieldGasPrice = (value: any) => {
  return Web3.utils.fromWei(value, 'Gwei')
}

export {
  numberFormat,
  txsDetailFromFilter,
  fieldFvalue,
  fieldTo,
  fieldNonce,
  bananceFilter,
  blockTimeFormat,
  timestampFormat,
  gasUsedCalc,
  fieldTotalSupply,
  fieldTokenValue,
  numberUnitFilter,
  percentageFilter,
  percentageToFixedFilter,
  fieldBalanceHolder,
  fieldGasPrice,
  addressFormat
}
