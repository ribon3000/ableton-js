import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";
import { RawChain, Chain } from "./chain";

export interface GettableProperties {
  can_have_chains: boolean;
  chains: RawChain[];
  can_have_drum_pads: boolean;
  class_display_name: string;
  class_name: string;
  is_active: boolean;
  name: string;
  parameters: RawDeviceParameter[];
  type: DeviceType;
}

export interface TransformedProperties {
  parameters: DeviceParameter[];
  chains: Chain[];
}

export interface SettableProperties {
  name: string;
}

export interface ObservableProperties {
  is_active: boolean;
  name: string;
  parameters: string;
  chains: Chain[];
}

export enum DeviceType {
  AudioEffect = "audio_effect",
  Instrument = "instrument",
  MidiEffect = "midi_effect",
  Undefined = "undefined",
}

export class RackDevice extends Namespace<
GettableProperties,
TransformedProperties,
SettableProperties,
ObservableProperties
>  {
  constructor(ableton: Ableton, public raw: RawDevice) {
    super(ableton, "rackdevice" , raw.id);
    this.transformers = {
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
      chains: (cs) => cs.map((c) => new Chain(ableton, c)),
    };

    this.cachedProps = {
      parameters: true,
      chains: true,
    };
  }
}