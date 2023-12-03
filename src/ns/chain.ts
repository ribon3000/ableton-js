import { Ableton } from "..";
import { Namespace } from ".";
import { RawDevice, Device } from "./device";
import { RawChainMixerDevice, ChainMixerDevice } from "./chain-mixer-device";

export interface GettableProperties {
    is_active: boolean;
    name: string;
    devices  : RawDevice[];
    mixer_device: RawChainMixerDevice;

}
export interface TransformedProperties {
    devices: Device[];
    mixer_device: ChainMixerDevice;

}
export interface SettableProperties {
    name: string;
    is_active: boolean;
}
export interface ObservableProperties {
    is_active: boolean;
    name: string;
}
export interface RawChain {
    id: string;
    name: string;
    devices: RawDevice[];
    mixer_device: RawChainMixerDevice;
}
export class Chain extends Namespace<
  GettableProperties, 
  TransformedProperties, 
  SettableProperties, 
  ObservableProperties
> {
    constructor(ableton: Ableton, public raw: RawChain){
        super(ableton, "chain", raw.id);
        
        this.transformers = {
            devices: (ds) => ds.map((d) => new Device(ableton, d)),
            mixer_device: (mixer_device) => new ChainMixerDevice(ableton, mixer_device),
        };
  
      this.cachedProps = {
        devices: true,
      };
    };
}
