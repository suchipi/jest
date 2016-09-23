/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails oncall+jsinfra
 */
'use strict';

describe('setMakeWindow', () => {
  it('saves the passed window creation function within the module', () => {
    const {setMakeWindow, makeWindow} = require.requireActual('../build/index');
    const fn = jest.fn();
    setMakeWindow(fn);
    makeWindow('some-url');
    expect(fn).toBeCalledWith('some-url');
  });
});
