# TypeScript EventEmitter

一个类型安全的事件发射器实现，提供完整的 TypeScript 类型提示和检查，支持函数类型的事件定义。

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ 事件名和参数的类型提示
- ✅ 编译时类型检查
- ✅ 支持函数类型的事件定义
- ✅ 支持所有标准的事件发射器方法
- ✅ 使用 Map 数据结构，性能更好

## 使用方法

### 1. 定义事件类型

```typescript
interface AppEvents {
  'user:login': (username: string, userId: number) => void;
  'user:logout': (userId: number) => void;
  'data:update': (data: { id: number; name: string }) => void;
  notification: (message: string, type: 'info' | 'warning' | 'error') => void;
  'no-args': () => void;
}
```

### 2. 创建事件发射器实例

```typescript
import { EventEmitter } from './EventEmitter';

const emitter = new EventEmitter<AppEvents>();
```

### 3. 注册事件监听器

```typescript
// 有完整的类型提示
emitter.on('user:login', (username, userId) => {
  console.log(`User ${username} logged in with ID: ${userId}`);
});

emitter.on('data:update', (data) => {
  console.log('Data updated:', data.id, data.name);
});
```

### 4. 触发事件

```typescript
// 有完整的类型检查
emitter.emit('user:login', 'john_doe', 123);
emitter.emit('data:update', { id: 1, name: 'Test Item' });
```

## 你的用例

```typescript
interface Events {
  resize: (width: number, height: number) => void;
}

const emitter = new EventEmitter<Events>();

// 完全类型安全
emitter.on('resize', (width, height) => {
  console.log(`Resized to ${width}x${height}`);
});

emitter.emit('resize', 800, 600);
```

## API 参考

### `on(event, listener)`

注册事件监听器

### `emit(event, ...args)`

触发事件，返回所有监听器的返回值数组

### `off(event, listener?)`

移除事件监听器，如果不提供 listener 则移除该事件的所有监听器

### `once(event, listener)`

注册只执行一次的事件监听器

### `clear()`

清除所有事件监听器

### `removeAllListeners(event?)`

移除所有监听器，如果指定了事件名则只移除该事件的监听器

## 类型安全

这个 EventEmitter 实现提供了完整的 TypeScript 类型安全：

- 事件名有自动补全和类型检查
- 事件参数有类型检查
- 函数签名完全匹配
- 错误的事件名或参数会在编译时报错
- 支持 IDE 的智能提示
- 无 `any` 类型污染
