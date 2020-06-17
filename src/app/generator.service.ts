/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import { Injectable } from '@angular/core';

class Letters {
  chars: Array<string>;
  used = false

  constructor(chars: Array<string>) {
    this.chars = chars
  }

  getChar(index: number): string {
    return this.chars[index]
  }

  getSize(): number {
    return this.chars.length
  }

  check(pwd: string): boolean {
    for (let i = 0; i < pwd.length; i++) {
      for (let j = 0; j < this.chars.length; j++) {
        if (pwd.charAt(i) == this.chars[j]) {
          return true
        }
      }
    }

    return false
  }

  contains(symbol: string): boolean {
    for (let i = 0; i < this.chars.length; i++) {
      if (this.chars[i] == symbol) {
        return true
      }
    }
    return false
  }
}


@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private static readonly UPPER_CASE = new Letters([
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ])

  private static readonly LOWER_CASE = new Letters([
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ])

  private static readonly DIGITS = new Letters([
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ])

  private static readonly SYMBOLS = new Letters([
    '@', '#', '$', '%', '&', '*', '(', ')', '-', '+', '=', '^', '.', ','
  ])

  private static readonly BAD_LETTERS = new Letters([
    'I', 'l', 'O', '0'
  ])


  private password: string

  constructor() {

  }

  private nextInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  generate(len: number, upperCase: boolean, lowerCase: boolean, digits: boolean, symbols: boolean, avoidAmbiguousLetters: boolean): string {
    if (len < 4) {
      throw new Error("Password length must be 4 or greater");
    }

    let usedBuckets: Array<Letters> = []
    if (upperCase) {
      usedBuckets.push(GeneratorService.UPPER_CASE)
    }
    if (lowerCase) {
      usedBuckets.push(GeneratorService.LOWER_CASE)
    }
    if (digits) {
      usedBuckets.push(GeneratorService.DIGITS)
    }
    if (symbols) {
      usedBuckets.push(GeneratorService.SYMBOLS)
    }

    if (usedBuckets.length == 0) {
      throw new Error("At least one character set must be selected");
    }

    let password = ""

    while (password.length == 0) {
      let res = "";

      for (let i = 0; i < len; ++i) {
        let index = this.nextInt(usedBuckets.length)
        let bucket = usedBuckets[index]

        let sym = ' ';
        let symOk = false;
        while (!symOk) {
          let charIndex = this.nextInt(bucket.getSize())
          sym = bucket.getChar(charIndex);
          symOk = !avoidAmbiguousLetters || !GeneratorService.BAD_LETTERS.contains(sym);
          symOk = true
        }
        res = res + sym;
      }

      var allMatch = true
      for (let i = 0; i < usedBuckets.length; i++) {
        allMatch = allMatch && usedBuckets[i].check(res)
      }
      if (allMatch) {
        password = res
      }
    }

    return password
  }
}
