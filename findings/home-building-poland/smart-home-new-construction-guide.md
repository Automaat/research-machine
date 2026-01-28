# 🏠 Smart Home New Construction Guide for Home Assistant

**Date:** 2026-01-01
**Tags:** #research #smart-home #home-assistant #construction #wiring
**Focus:** Infrastructure and coordination requirements for HA-optimized new build

---

## 📋 Summary

Building a smart home during new construction is the optimal time for infrastructure investment. Key requirements: extensive Cat6A ethernet runs, neutral wires at all switches, C-wires at thermostats, large gang boxes, conduit for future-proofing, and early coordination with low-voltage specialists (not just electricians).

---

## 🔌 Phase 1: Infrastructure Requirements

### Ethernet & Networking

| Requirement | Specification | Source Evidence |
|-------------|---------------|-----------------|
| Cat6/Cat6A to every room | Including bathrooms | "Try to run at least 2 Cat 6 runs to every room. In this day and age even the bathrooms" [Source: HomeTechHacker] |
| Cable quality | Cat6A preferred | "Cat6A ethernet cables are your best bet. They offer the necessary bandwidth" [Source: AIS] |
| Access points | PoE ceiling locations | "run Cat6 to a central location on the ceiling or high on a wall on each floor for an access point" [Source: HomeTechHacker] |
| Streaming requirement | Wired mandatory for 4K | "if you ever want to stream 4k content, wifi is not the way to go" [Source: Play Home Technology] |

### Electrical Infrastructure

| Requirement | Specification | Source Evidence |
|-------------|---------------|-----------------|
| Neutral wires | All switch locations | "most smart switches need them to function" [Source: Spartan Concepts] |
| C-wires | All thermostat locations | "Nest thermostats usually require a C-wire (common wire) to deliver constant power" [Source: Spartan Concepts] |
| Gang box size | Larger than standard | "Install large gang boxes in light switch and outlet locations. Smart devices often require more room in the box than regular switches" [Source: HomeTechHacker] |
| Panel capacity | 200A+ recommended | 🔗 INFERRED: Smart homes with EVs, pools, electric heating need more capacity |

### Conduit & Future-Proofing

| Requirement | Specification | Source Evidence |
|-------------|---------------|-----------------|
| Conduit size | 2" PVC or 2.5" flexible | "2″ PVC pipe or 2.5″ flexible conduit" [Source: Search results] |
| Key locations | A/V rooms, TV mounts | "Run conduits in the walls of rooms where you have A/V equipment" [Source: HomeTechHacker] |
| Pull string | Include in all conduit | 🔗 INFERRED: Standard practice for cable pulling |

---

## ⚡ Phase 2: Installation Timing & Coordination

### Critical Timing

📄 **STATED:** "Low voltage cables should be installed after the high voltage wiring is completed but before the insulation is installed" [Source: Search results]

📄 **STATED:** "Postponing electrical coordination until after framing, finishes, or even millwork are in progress is a frequent and costly mistake" [Source: Search results]

### Who to Hire

| Professional | Role | Source Evidence |
|--------------|------|-----------------|
| Low-voltage integrator | Smart home wiring | "Think twice about hiring an electrician to pre-wire for home automation—the majority of smart home wiring is low voltage and unique" [Source: Search results] |
| System integrators | Early planning | "Engage with custom system integrators early to avoid last-minute rushes, scheduling conflicts" [Source: AIS] |
| Electrician | High voltage, panels | Standard role - handle main power infrastructure |

### ⚠️ Key Coordination Points with Architect

1. **🔌 Electrical Plans:**
   - Outlet placement for mounted TVs, projectors
   - Switch locations with neutral wire specs
   - Thermostat locations with C-wire requirements
   - Panel location and capacity

2. **🌐 Network Closet:**
   - Closet-sized space for structured wiring panel
   - Adequate power feeds
   - Ventilation for equipment heat
   - Central location for cable runs

3. **📡 Low-Voltage Runs:**
   - Document camera locations (indoor/outdoor)
   - Speaker wire paths
   - Sensor locations (door/window/motion)
   - Motorized shade power points

---

## 📡 Phase 3: Protocol Selection for Home Assistant

### Protocol Comparison

| Protocol | Frequency | Best For | HA Status |
|----------|-----------|----------|-----------|
| **Zigbee** | 2.4 GHz | Lighting, sensors, established ecosystems | ✅ Mature |
| **Z-Wave** | 908 MHz | Locks, security (less interference) | ✅ Mature |
| **Thread** | 2.4 GHz | Low-latency, real-time apps | ⚠️ Growing |
| **Matter** | Multi-protocol | Cross-platform, future-proof | ⚠️ Beta |

### Source Evidence

📄 **STATED:** "Zigbee operates on IEEE 802.15.4 standard at 2.4 GHz" [Source: Seeed Studio]

📄 **STATED:** "Z-Wave uses a low frequency of 908.42 MHz" [Source: Search results]

📄 **STATED:** "For most homeowners in 2025, Zigbee and Z-Wave remain the smarter choice" [Source: Search results]

📄 **STATED:** "we still label Matter as Beta in the integrations list" [Source: Home Assistant Official Blog]

### Matter Requirements

📄 **STATED:** "Thread devices need a border router (like an Apple HomePod or Amazon Echo)" [Source: Search results]

📄 **STATED:** "Enable IPv6 on your home router and Home Assistant Operating System" [Source: HA Official Blog]

📄 **STATED:** "Matter is designed for flat networks" [Source: XDA Developers]

### 🎯 Recommendation for New Build

1. **Primary:** Zigbee for lighting, sensors (proven, local control)
2. **Locks/Security:** Z-Wave (sub-GHz = less interference)
3. **Future-ready:** Home Assistant SkyConnect for Zigbee + Thread/Matter
4. **Network:** Flat network preferred, or VLANs with mDNS reflector

---

## 🏗️ Phase 4: Systems to Pre-Wire

### Essential (High Priority)

- ✅ **Ethernet:** Every room, ceiling APs, camera locations
- ✅ **Smart switches:** Neutral wires everywhere
- ✅ **Thermostats:** C-wires at all locations
- ✅ **Security cameras:** PoE runs to all planned locations
- ✅ **Network closet:** Central wiring location with power

### Recommended

- 🔲 **Speaker wiring:** Living areas, outdoor spaces
- 🔲 **Motorized shades:** Window control wiring
- 🔲 **Video doorbells:** Power + ethernet
- 🔲 **EV charger:** 240V circuit to garage
- 🔲 **Generator/UPS:** Panel prep for future

### Nice to Have

- 🔲 **Landscape lighting:** Low-voltage runs
- 🔲 **Irrigation control:** Power + network access
- 🔲 **Garage door:** Smart opener wiring
- 🔲 **Gate control:** If applicable

---

## ❌ Common Mistakes to Avoid

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| No neutral wires | Smart switches won't work | Spec neutral at ALL switch locations |
| Missing C-wires | Thermostat issues | "drain batteries quickly, reboot often, or not work at all" |
| Relying on WiFi only | Reliability issues | Wire all fixed devices |
| Late planning | Costly retrofits | Engage integrators before framing |
| Hiring only electricians | LV wiring done wrong | "the majority of smart home wiring is low voltage and unique" |
| Small gang boxes | Can't fit smart switches | Spec larger boxes upfront |
| No conduit | Future upgrades expensive | "$100 of conduit essentially future-proofs" |
| Overloading circuits | System failures | Design for smart home load |

---

## 📝 Checklist for Architect/Builder Discussions

### Initial Planning

- [ ] Identify network closet location
- [ ] Plan 200A+ electrical panel
- [ ] Mark all camera locations on plans
- [ ] Spec neutral wires at all switches
- [ ] Spec C-wires at all thermostat locations
- [ ] Identify conduit paths for A/V

### Before Framing

- [ ] Engage low-voltage integrator
- [ ] Document all ethernet run locations
- [ ] Plan speaker wire paths
- [ ] Mark motorized shade power points
- [ ] Identify outdoor speaker/camera locations

### During Rough-In

- [ ] Install high voltage first
- [ ] Install low voltage after HV, before insulation
- [ ] Photo document all cable locations
- [ ] Use painter's tape to protect LV on studs
- [ ] Verify conduit pull strings

### Before Drywall

- [ ] Verify all ethernet runs to closet
- [ ] Test continuity on all runs
- [ ] Confirm gang box sizing
- [ ] Final photo documentation

---

## 🔗 What Sources DON'T Cover

❓ **UNCERTAIN/NOT FOUND:**

- Specific wattage calculations for smart home loads
- Optimal network closet dimensions
- Recommended UPS sizing for smart home infrastructure
- Specific vendor recommendations for security systems
- Integration complexity between different HA integrations
- Labor cost estimates for pre-wiring
- Code requirements by jurisdiction (varies significantly)

---

## 📚 Sources

1. [HomeTechHacker - Tips for Building New Construction Smarthome](https://hometechhacker.com/tips-for-building-a-new-construction-smarthome/)
2. [AIS - Low Voltage Pre-Wire New Home Construction](https://aisav.com/low-voltage-pre-wire-new-home-construction/)
3. [Play Home Technology - 7 Things for Smart Home Wiring](https://playhometechnology.com/smart-home-wiring-dont-forget-these-7-things-when-building-a-new-home/)
4. [Spartan Concepts - Home Automation Wiring Mistakes](https://spartanconcepts.ai/home-automation-wiring-mistakes-homeowners-make-when-installing-smart-devices-2/)
5. [Seeed Studio - Matter vs Zigbee vs Thread](https://www.seeedstudio.com/blog/2024/12/11/matter-vs-zigbee-vs-thread/)
6. [Home Assistant - The State of Matter](https://www.home-assistant.io/blog/2024/01/25/matter-livestream-blog/)
7. [Home Assistant Community - Building House, Smart Home Alternatives](https://community.home-assistant.io/t/newbie-building-house-considering-smart-home-alternatives/689682)
8. [XDA Developers - VLAN Smart Home Issues](https://www.xda-developers.com/i-moved-my-smart-home-to-a-dedicated-vlan-and-heres-what-broke/)

---

## 🔗 Related

[[Home Assistant]], [[Smart Home]], [[New Construction]], [[Network Infrastructure]]

---

**Suggested Obsidian location:** 3_Resources/Smart-Home/
**Potential MOCs:** [[Smart Home MOC]], [[Home Improvement MOC]]
**Tags:** #smart-home #home-assistant #construction #infrastructure
