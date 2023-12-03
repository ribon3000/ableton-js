from __future__ import absolute_import
from .Interface import Interface
from .DeviceParameter import DeviceParameter

class Device(Interface):
    @staticmethod
    def serialize_device(device):
        if device is None:
            return None

        device_id = Interface.save_obj(device)
        return {
            "id": device_id,
            "name": device.name,
            "type": str(device.type),
            "class_name": device.class_name,
            "can_have_chains": device.can_have_chains,
            "chains": device.chains if device.can_have_chains else None,
        }

    def __init__(self, c_instance, socket):
        super(Device, self).__init__(c_instance, socket)

    def get_parameters(self, ns):
        return map(DeviceParameter.serialize_device_parameter, ns.parameters)
    
    def get_chains(self, ns):
        return map(Chain.serialize_chain, ns.chains)

    def get_type(self, ns):
        return str(ns.type)


class Chain(Interface):
    @staticmethod
    def serialize_chain(chain):
        if chain is None:
            return None

        chain_id = Interface.save_obj(chain)
        return {
            "id": chain_id,
            "name": chain.name,
            # "mute": chain.mute,
            # "solo": chain.solo,
        }

    def __init__(self, c_instance, socket):
        super(Chain, self).__init__(c_instance, socket)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)

    def get_mixer_device(self, ns):
        return ChainMixerDevice.serialize_chain_mixer_device(ns.mixer_device)
    #def get_type(self, ns):
    #    return str(ns.type)


class ChainMixerDevice(Interface):
    @staticmethod
    def serialize_chain_mixer_device(chain_mixer_device):
        if chain_mixer_device is None:
            return None

        device_id = Interface.save_obj(chain_mixer_device)
        return {"id": device_id, "volume": chain_mixer_device.volume}

    def __init__(self, c_instance, socket):
        super(ChainMixerDevice, self).__init__(c_instance, socket)

    def get_panning(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.panning)
    
    def get_sends(self, ns):
        return map(DeviceParameter.serialize_device_parameter, ns.sends)

    def get_chain_activator(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.chain_activator)

    def get_volume(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.volume)
