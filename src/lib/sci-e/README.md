# SCI-E (total energy)

`sci-e` is a model that simply sums up the contributions to a component's
energy use. The model retunrs `energy` which is used as the input to
the `sci-o` model that calculates operational emissions for the component.

## Model name

IF recognizes the SCI-E model as `sci-e`

## Parameters

### Model config

None

### Inputs

At least one of:

- `energy-cpu`: energy used by the CPU, in kWh
- `enmergy-memory`: energy used by memory, in kWh
- `energy-gpu`: energy used by GPU, in kWh
- `energy-network`: energy used to handle network traffic, in kWh

plus the following required:

- `timestamp`: a timestamp for the input
- `duration`: the amount of time, in seconds, that the input covers.

## Returns

- `energy`: the sum of all energy components, in kWh

## Calculation

`energy` is calculated as the sum of the energy due to CPU usage, energy due
to network trafic, energy due to memory and energy due to GPU usage.

```pseudocode
energy = energy-cpu + energy-network + energy-memory + e-gpu
```

In any model pipeline that includes `sci-o`, `sci-o` must be preceded by `sci-e`.
This is because `sci-o` does not recognize the individual contributions,
`energy-cpu`, `energy-network`, etc, but expects to find `energy`.
Only `sci-e` takes individual contributions and returns `energy`.

## Implementation

To run the model, you must first create an instance of `SciEModel` and
call its `configure()` method. Then, you can call `execute()` to return `energy`.

```typescript
import { SciEModel } from '@gsf/ief';

const sciEModel = new SciEModel();
sciEModel.configure()
const results = sciEModel.execute([
  {
    energy-cpu: 0.001,
    energy-memory: 0.0005,
    energy-network: 0.0005,
  }
])
```

## Example impl

IEF users will typically call the model as part of a pipeline defined in an `impl` file. In this case, instantiating and configuring the model is handled by `impact-engine` and does not have to be done explicitly by the user. The following is an example `impl` that calls `sci-e`:

```yaml
name: sci-e-demo
description:
tags:
initialize:
  models:
    - name: sci-e
      kind: plugin
      model: SciEModel
      path: sci-e
graph:
  children:
    child:
      pipeline:
        - sci-e
      config:
        sci-e:
      inputs:
        - timestamp: 2023-08-06T00:00
          duration: 3600
          energy-cpu: 0.001
```
