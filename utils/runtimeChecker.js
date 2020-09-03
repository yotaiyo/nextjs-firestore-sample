import * as React from 'react'

// check ssr
export const runtimeCheck = ()=> {
  if (typeof window !== 'undefined') {
    return 'InBrowser'
  }
  return 'ServerSide'
}

export const Checker= ({ runtime }) => <h1>runtime: {runtime}</h1>