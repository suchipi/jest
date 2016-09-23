/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * @flow
 */
'use strict';

import type {Config} from 'types/Config';
import type {Global} from 'types/Global';
import type {Script} from 'vm';

const FakeTimers = require('jest-util').FakeTimers;
const installCommonGlobals = require('jest-util').installCommonGlobals;
const ModuleMocker = require('jest-mock');
const {makeWindow} = require('jest-nw');
const vm = require('vm');

console.log('jest-environment-nw loaded');

class NWEnvironment {

  fakeTimers: ?FakeTimers;
  global: ?Global;
  moduleMocker: ?ModuleMocker;

  constructor(config: Config): void {
    if (typeof window === 'undefined') {
      throw new Error(`
        To use the nw environment, jest must be launched from nw.
        Try: cd jest/packages/jest-nw-runner && nw . --env nw
      `); // TODO: User-friendly way of communicating this
    }

    const url = config.testURL || 'about:blank';
    const global = this.global = makeWindow(url);
    vm.createContext(this.global);
    installCommonGlobals(global, config.globals);

    this.moduleMocker = new ModuleMocker();
    this.fakeTimers = new FakeTimers(global, this.moduleMocker, config);
  }

  dispose(): void {
    if (this.fakeTimers) {
      this.fakeTimers.dispose();
    }
    if (this.global) {
      this.global.close();
    }
    this.global = null;
    this.fakeTimers = null;
  }

  runScript(script: Script): ?any {
    if (this.global) {
      script.runInContext(this.global);
    }
    return null;
  }

}

module.exports = NWEnvironment;
