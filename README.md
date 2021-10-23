<p align="center">
  <a href="https://verto.exchange">
    <img src="https://www.verto.exchange/logo_light.svg" alt="Verto logo (dark version)" width="110">
  </a>

<h3 align="center">Verto Cache Interface</h3>

  <p align="center">
    A communication package with Verto Cache System
  </p>
</p>

## Install

Install with [npm](https://npmjs.com):

```
$ npm install verto-cace-interface
```

## Usage

### Fetching a contract

**Signature**:  
`fetchContract<T = any>(contractId: string, 
                        withValidity?: boolean, 
                        dontThrow?: boolean): Promise<StateResult<T> | undefined>`

**Usage**:
```typescript

import { fetchContract } from 'verto-cace-interface';

fetchContract('t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE').then((result) => {
    const state = result.state;
    const validity = result.validity;
})

```




