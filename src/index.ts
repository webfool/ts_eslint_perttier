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
