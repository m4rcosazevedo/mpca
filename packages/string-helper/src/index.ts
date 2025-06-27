class StringHelper {
  private sanitize = ''

  static prepare(value: string): StringHelper {
    const stringHelper = new StringHelper()
    stringHelper.sanitize = value.trim()

    return stringHelper
  }

  upper(): StringHelper {
    this.sanitize = this.sanitize.toUpperCase()
    return this
  }

  lower(): StringHelper {
    this.sanitize = this.sanitize.toLowerCase()
    return this
  }

  capitalize(): StringHelper {
    this.sanitize = this.sanitize
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())

    return this
  }

  removeNumbers(): StringHelper {
    this.sanitize = this.sanitize.replace(/[0-9]/g, '')
    return this
  }

  onlyNumbers(): StringHelper {
    this.sanitize = this.sanitize.replace(/\D/g, '')
    return this
  }

  removeAccents(): StringHelper {
    this.sanitize = this.sanitize
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return this
  }

  removeSpecialCharacters(): StringHelper {
    this.sanitize = this.sanitize.replace(/[^a-zA-Z0-9]/g, '')
    return this
  }

  removeSpecialCharactersWithExceptions(exceptions: string[]): StringHelper {
    const exceptionsPattern = exceptions.join('')
    const pattern = `[^a-zA-Z0-9${exceptionsPattern}]`
    this.sanitize = this.sanitize.replace(new RegExp(pattern, 'g'), '')
    return this
  }

  removeSpaces(): StringHelper {
    this.sanitize = this.sanitize.replace(/\s/g, '')
    return this
  }

  firstName(): StringHelper {
    const names = this.sanitize.split(' ')

    if (names.length === 1) {
      return this
    }

    this.sanitize = `${names[0]}`

    return this
  }

  firstAndLastName(): StringHelper {
    const names = this.sanitize.split(' ')

    if (names.length === 1) {
      return this
    }

    this.sanitize = `${names[0]} ${names[names.length - 1]}`

    return this
  }

  compact(maxWords = 3): StringHelper {
    const words = this.sanitize.split(' ')
    const addEllipsis = words.length > maxWords
    const compactedWords = words.slice(0, maxWords).join(' ')
    this.sanitize = addEllipsis ? `${compactedWords}...` : compactedWords

    return this
  }

  isEqual(compare: string): boolean {
    const sanitizedCompare = StringHelper.prepare(compare)
      .removeAccents()
      .lower()
      .build()
    const sanitizedThis = StringHelper.prepare(this.sanitize)
      .removeAccents()
      .lower()
      .build()

    return sanitizedCompare.includes(sanitizedThis)
  }

  build(): string {
    return this.sanitize
  }
}

export { StringHelper }
