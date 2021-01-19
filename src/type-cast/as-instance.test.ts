import { asInstance, asOptInstance } from './as-instance';

describe('as instance', () => {
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
    expect(asInstance(BaseClass)(base)).toBe(base);
  });
  it('matches an extended class', () => {
    expect(asInstance(BaseClass)(extended)).toBe(extended);
  });
  it('does not match a similar class', () => {
    expect(() => asInstance(BaseClass)(similar)).toThrowError('Unable to cast object to BaseClass');
  });
  it('a check for an extended class does not match the base', () => {
    expect(() => asInstance(ExtendedClass)(base)).toThrowError('Unable to cast object to ExtendedClass');
  });
  it('does not match undefined', () => {
    expect(() => asInstance(BaseClass)(undefined)).toThrowError('Unable to cast undefined to BaseClass');
  });
  it('does not match null', () => {
    expect(() => asInstance(BaseClass)(null)).toThrowError('Unable to cast object to BaseClass');
  });
  it('returns a fallback parameter', () => {
    expect(asInstance(BaseClass)(null, base)).toBe(base);
    expect(asInstance(BaseClass)(undefined, base)).toBe(base);
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
    expect(asOptInstance(BaseClass)(base)).toBe(base);
  });
  it('matches an extended class', () => {
    expect(asOptInstance(BaseClass)(extended)).toBe(extended);
  });
  it('does not match a similar class', () => {
    expect(() => asOptInstance(BaseClass)(similar)).toThrowError('Unable to cast object to Optional<BaseClass>');
  });
  it('a check for an extended class does not match the base', () => {
    expect(() => asOptInstance(ExtendedClass)(base)).toThrowError('Unable to cast object to Optional<ExtendedClass>');
  });
  it('matches undefined', () => {
    expect(asOptInstance(BaseClass)(undefined)).toBe(undefined);
  });
  it('matches null', () => {
    expect(asOptInstance(BaseClass)(null)).toBe(undefined);
  });
});