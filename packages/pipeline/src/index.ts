type Predicate<T> = (items: T[]) => T[]
type DebugCallback<T> = (context: { logs: string[]; result: T[] }) => void

export class Pipeline<T extends Record<string, any>> {
  private originalData: T[]
  private result: T[]
  private anyConditionMatched = false
  private logs: string[] = []
  private debugEnabled = false
  private debugHandler?: DebugCallback<T>

  constructor(data: T[]) {
    this.originalData = [...data]
    this.result = [...data]
  }

  debug(callback?: DebugCallback<T> | boolean): this {
    if (typeof callback === 'function') {
      this.debugEnabled = true
      this.debugHandler = callback
    } else if (callback === false) {
      this.debugEnabled = false
      this.debugHandler = undefined
    } else {
      this.debugEnabled = true
    }
    return this
  }

  when(condition: boolean, callback: Predicate<T>): this {
    const beforeCount = this.result.length

    if (condition) {
      this.result = callback(this.result)
      this.anyConditionMatched = true
      this.log(`✔️ when applied → ${beforeCount} → ${this.result.length} records`)
    } else {
      this.log(`❌ when ignored (condition false)`)
    }

    return this
  }

  else(callback: Predicate<T>): this {
    if (!this.anyConditionMatched) {
      const beforeCount = this.result.length
      this.result = callback(this.result)
      this.log(`⚠️ else applied → ${beforeCount} → ${this.result.length} records`)
    } else {
      this.log(`ℹ️ else ignored (some when it has already been applied)`)
    }
    return this
  }

  reset(): this {
    this.result = [...this.originalData]
    this.anyConditionMatched = false
    this.log('🔄 reset applied → original data restored')
    return this
  }

  run(): T[] {
    if (this.debugEnabled) {
      const context = { logs: this.logs, result: this.result }

      if (this.debugHandler) {
        this.debugHandler(context)
      } else {
        console.group('🧩 Debug')
        this.logs.forEach(log => console.log(log))
        console.log('📊 Final result:', this.result)
        console.groupEnd()
      }
    }

    return this.result
  }

  private log(message: string): void {
    if (this.debugEnabled) {
      this.logs.push(message)
    }
  }
}
