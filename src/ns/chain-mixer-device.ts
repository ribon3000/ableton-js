import { Ableton } from "..";
import { Namespace } from ".";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter";


export interface GettableProperties {
  panning: RawDeviceParameter;
  sends: RawDeviceParameter[];
  chain_activator: RawDeviceParameter;
  volume: RawDeviceParameter;
}

export interface TransformedProperties {
  panning: DeviceParameter;
  sends: DeviceParameter[];
  chain_activator: DeviceParameter;
  volume: DeviceParameter;
}

export interface SettableProperties {
}

export interface ObservableProperties {
  sends: RawDeviceParameter[];
}

export interface RawChainMixerDevice {
  id: string;
  volume: string;
  chain_activator: RawDeviceParameter;
}

export class ChainMixerDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawChainMixerDevice) {
    super(ableton, "ChainMixerDevice", raw.id);

    this.transformers = {
      panning: (v) => new DeviceParameter(ableton, v),
      sends: (v) => v.map((s) => new DeviceParameter(ableton, s)),
      chain_activator: (v) => new DeviceParameter(ableton, v),
      volume: (v) => new DeviceParameter(ableton, v),
    };
  }
}
