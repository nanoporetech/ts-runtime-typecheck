// Alias exists for forwards/backwards compatibility.
// We used to define a custom error which was just Error with the name TypeAssertion
// but it's better to use a built in here.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TypeAssertion = TypeError;