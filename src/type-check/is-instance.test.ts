import { isInstance, isOptInstance } from './is-instance';

describe('is instance', () => {
  class BaseClass {
    inner = 0
  }
  class ExtendedClass extends BaseClass {
    outer = 'a word'
  }
  class Similar {
    inner = 1
  }

  const base = new BaseClass;
  const extended = new ExtendedClass;
  const similar = new Similar;

  it('matches the given class', () => {
    expect(isInstance(BaseClass)(base)).toBeTruthy();
  });
  it('matches an extended class', () => {
    expect(isInstance(BaseClass)(extended)).toBeTruthy();
  });
  it('does not match a similar class', () => {
    expect(isInstance(BaseClass)(similar)).toBeFalsy();
  });
  it('a check for an extended class does not match the base', () => {
    expect(isInstance(ExtendedClass)(base)).toBeFalsy();
  });
  it('does not match undefined', () => {
    expect(isInstance(BaseClass)(undefined)).toBeFalsy();
  });
  it('does not match null', () => {
    expect(isInstance(BaseClass)(null)).toBeFalsy();
  });
});

describe('is optional instance', () => {
  class BaseClass {
    inner = 0
  }
  class ExtendedClass extends BaseClass {
    outer = 'a word'
  }
  class Similar {
    inner = 1
  }

  const base = new BaseClass;
  const extended = new ExtendedClass;
  const similar = new Similar;
  

  it('matches the given class', () => {
    expect(isOptInstance(BaseClass)(base)).toBeTruthy();
  });
  it('matches an extended class', () => {
    expect(isOptInstance(BaseClass)(extended)).toBeTruthy();
  });
  it('does not match a similar class', () => {
    expect(isOptInstance(BaseClass)(similar)).toBeFalsy();
  });
  it('a check for an extended class does not match the base', () => {
    expect(isOptInstance(ExtendedClass)(base)).toBeFalsy();
  });
  it('matches undefined', () => {
    expect(isOptInstance(BaseClass)(undefined)).toBeTruthy();
  });
  it('matches null', () => {
    expect(isOptInstance(BaseClass)(null)).toBeTruthy();
  });
});