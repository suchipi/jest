/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * @flow
 */
'use strict';

import type {Global} from 'types/Global';

let makeWindow;

module.exports = {
  setMakeWindow(func: (url: string) => Global) { makeWindow = func; },
  makeWindow: (url: string) => makeWindow(url),
};
