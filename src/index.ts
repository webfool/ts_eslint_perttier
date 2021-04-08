import { config } from '@config'
import { env } from '@env'

export const indexName = 'index'
// 测试装饰器是否能被 babel 正常编译
@deco
class MyClass {}

type Type<T> = {
  new (...args: any[]): T
}

function deco(target: Type<Record<string, any>>) {
  ;(target as any).isTest = true
}

// 测试类属性的语法是否能被 babel 正常编译
class TestProperty {
  name = 'hw'
}

type Fn = (value: string | number) => void

const fn: Fn = function (v) {
  console.log(v)
}

class TestPropertyInitiallization {
  name: string

  constructor(name: string) {
    // this.name = name
  }
}

function testCall(value: string) {
  return `${value}-abc`
}

testCall('123')
testCall.call(undefined, '123')

const m = new Map()

interface Test {
  name: string
}

type Test2 = Test['name']
