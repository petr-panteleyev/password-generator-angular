/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core'
import { GeneratorService } from './generator.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lengthOptions = [4, 6, 8, 16, 24, 32]

  private generator: GeneratorService;
  title = 'Password Generator';
  password: string = ""

  upperCase = true
  lowerCase = true
  digits = true
  symbols = false
  avoidAmbiguousLetters = true
  passwordLength = 16

  constructor(generator: GeneratorService) {
    this.generator = generator
  }

  onGenerate() {
    this.password = this.generator.generate(this.passwordLength, this.upperCase, this.lowerCase, this.digits, this.symbols, this.avoidAmbiguousLetters)
  }

  onUnix() {
    this.upperCase = true
    this.lowerCase = true
    this.digits = true
    this.symbols = true
    this.passwordLength = 8
    this.onGenerate()
  }

  onPin() {
    this.upperCase = false
    this.lowerCase = false
    this.digits = true
    this.symbols = false
    this.passwordLength = 4
    this.onGenerate()
  }

  onClearPassword() {
    this.password = ""
  }
}
