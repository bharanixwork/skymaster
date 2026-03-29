import { Chapter } from '../../types';

export const module3Chapters: Chapter[] = [
  {
    id: "ch14",
    title: "Chapter 14: Batteries and Power Systems",
    description: "Deep dive into LiPo technology and power delivery.",
    subChapters: [
      {
        id: "ch14-s1",
        title: "14.1 Lithium Polymer Chemistry & Safety",
        content: `Lithium Polymer (LiPo) batteries power modern drones due to their exceptional energy-to-weight ratio and ability to deliver massive burst currents.

### Anatomy of a LiPo Cell
A single LiPo cell consists of an anode, a cathode, a separator, and a polymer electrolyte. 
- **Nominal Voltage:** 3.7V per cell (the resting voltage of a semi-charged cell)
- **Charged Voltage:** 4.2V (never exceed this or risk a fire)
- **Discharged Voltage:** 3.0V (never drop below 3.2V to prevent permanent damage)

### Cell Configuration (S and P)
Batteries are described using 'S' (Series) and 'P' (Parallel) designations.
- **Series (S):** Increases voltage. A 4S battery has 4 cells in series: $4 \\times 3.7V = 14.8V$ nominal.
- **Parallel (P):** Increases capacity (mAh).
Higher voltage (e.g., 6S instead of 4S) allows for the same power delivery $P = IV$ at lower current, reducing heat losses in wires and ESCs.

### Safe Handling & Storage
LiPo batteries are volatile. If punctured, overcharged, or severely discharged, they can experience **thermal runaway** (a chemical fire that produces its own oxygen and cannot be smothered).
1. Always charge in a fireproof LiPo bag or ammo box.
2. Never leave charging batteries unattended.
3. Store batteries at **Storage Voltage** (3.8V per cell). A fully charged or fully empty LiPo degrades rapidly over time.`,
        realLifeExample: "A pilot left a fully charged 6S LiPo in their hot car for three days. The heat caused the electrolyte to produce gas, 'puffing' the battery permanently and making it unsafe to fly.",
        quiz: [
          {
            question: "What is the optimal storage voltage for a single LiPo cell?",
            options: ["3.2V", "3.8V", "4.2V", "0V (completely drained)"],
            correctAnswer: 1,
            explanation: "Storing LiPos at 3.8V per cell minimizes internal resistance buildup and degradation, prolonging battery life.",
            reviewSubChapterId: "ch14-s1"
          }
        ]
      },
      {
        id: "ch14-s2",
        title: "14.2 Battery Ratings: Capacity and C-Rating",
        content: `Understanding how to read a LiPo label is crucial for matching a battery to a drone's power demands.

### Capacity (mAh)
Milliamp-hours (mAh) indicate how much energy the battery holds. A 1500mAh battery can deliver 1500 milliamps (1.5 amps) for exactly one hour before dying.
- Larger capacity = longer flight time, but also heavier weight (diminishing returns).

### The C-Rating (Discharge Rate)
The C-Rating specifies how fast the battery can safely be discharged.
$$\\text{Maximum Continuous Current} = \\text{Capacity (Ah)} \\times \\text{C-Rating}$$

For a 1500mAh (1.5Ah) battery with a 100C rating:
$$\\text{Max Current} = 1.5A \\times 100 = 150A$$
This means the battery can safely deliver 150 amps continuously without damaging itself. High-performance FPV drones can pull 100A+ during punch-outs.

### Voltage Sag
When you pull massive current from a battery, its voltage temporarily drops due to internal resistance — this is called **Voltage Sag**. 
If your 4S battery reads 16.0V hovering, it might drop to 13.5V during a full-throttle climb, triggering low-battery alarms. High C-Rating batteries have lower internal resistance and suffer less voltage sag.`,
        realLifeExample: "You use a low-C-rating battery designed for a slow camera drone on a racing drone. During the first flip, the racing drone pulls 120A. The battery voltage sags so hard the flight controller reboots mid-air, causing a crash.",
        quiz: [
          {
            question: "If you have a 2000mAh battery with a 50C rating, what is its maximum continuous discharge current?",
            options: ["50 Amps", "100 Amps", "2000 Amps", "10 Amps"],
            correctAnswer: 1,
            explanation: "Convert 2000mAh to 2.0Ah. Multiply by 50C. 2.0A × 50 = 100 Amps maximum continuous discharge.",
            reviewSubChapterId: "ch14-s2"
          }
        ]
      },
      {
        id: "ch14-s3",
        title: "14.3 Advanced Power Sources: Solid State, Hydrogen & Solar",
        content: `Standard LiPo technology is plateauing. The future of drone power focuses on dramatic leaps in energy density to achieve multi-hour flight times.

### Solid State Batteries
These replace the flammable liquid electrolyte of a LiPo with a solid material (like ceramic or glass).
- **Benefits:** Much higher energy density, no risk of fiery thermal runaway, works better in extreme cold.
- **Drawbacks:** Currently very expensive and limited to low C-Ratings (not suitable for racing drones yet).

### Hydrogen Fuel Cells
Hydrogen gas combined with oxygen produces electricity, with water as the only byproduct.
- Provides 3x to 5x the flight time of LiPos.
- Used in enterprise mapping drones allowing 2+ hour flights.
- Drawback: Requires heavy pressurized tanks and complex refueling infrastructure.

### Solar Enhancement
Solar panels on drones are rarely the primary power source due to their low output. However, on highly efficient fixed-wing drones (like the Zephyr), thin-film solar arrays can charge the batteries during the day, enabling **perpetual flight**.`,
        realLifeExample: "The Airbus Zephyr is a high-altitude pseudo-satellite (HAPS) drone powered entirely by solar and batteries. It holds the world record for longest flight, staying airborne for over 64 days without landing.",
        quiz: [
          {
            question: "What is the primary advantage of a Hydrogen Fuel Cell over a standard LiPo battery in a drone?",
            options: ["It is cheaper", "It delivers massive burst currents for racing", "It provides significantly longer flight time and higher energy density", "It is smaller in size"],
            correctAnswer: 2,
            explanation: "Hydrogen fuel cells offer vastly superior energy density compared to LiPos, making them ideal for long-endurance commercial mapping and surveillance missions.",
            reviewSubChapterId: "ch14-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch15",
    title: "Chapter 15: Introduction to Embedded Systems",
    description: "The microprocessors and protocols inside the flight controller.",
    subChapters: [
      {
        id: "ch15-s1",
        title: "15.1 Microcontrollers vs. Microprocessors",
        content: `A drone's flight controller is a specialized **microcontroller**, which differs significantly from the microprocessor in your laptop.

### Microprocessors (e.g., Intel Core i7, Raspberry Pi)
- Powerful, general-purpose computing.
- Rely on external RAM, storage, and peripherals.
- Run complex OS (Windows, Linux).
- **Drawback for drones:** Not deterministic. If Linux decides to background update for 50 milliseconds, your drone crashes.

### Microcontrollers (MCUs) (e.g., STM32)
- An entire computer on a single chip (includes CPU, RAM, and Flash storage).
- Run highly optimized Real-Time Operating Systems (RTOS) or bare-metal code.
- **Deterministic:** Guaranteed to execute a loop in exactly $X$ microseconds.
- Have built-in hardware for precise timing (Timers) and communication (UART, I2C, SPI).

Flight controllers use ARM Cortex-M architecture (specifically the STM32 family) because of their blazing fast floating-point math capabilities, which are required for PID calculations.`,
        realLifeExample: "While a Raspberry Pi can do facial recognition, it is a terrible choice for directly spinning drone motors because a random background process could delay a motor speed update by a fraction of a second, causing the drone to flip.",
        quiz: [
          {
            question: "Why do we use microcontrollers (like STM32) rather than microprocessors (like Raspberry Pi) for low-level flight stabilization?",
            options: ["Microcontrollers are faster overall", "Microcontrollers have deterministic execution timing, critical for stability", "Microcontrollers have more RAM", "Microcontrollers can run Windows"],
            correctAnswer: 1,
            explanation: "Microcontrollers excel at deterministic, real-time execution. They guarantee that the PID loop runs exactly on schedule every time, which is essential to keep a drone in the air.",
            reviewSubChapterId: "ch15-s1"
          }
        ]
      },
      {
        id: "ch15-s2",
        title: "15.2 Hardware Communication Protocols",
        content: `Sensors, receivers, and ESCs must talk to the microcontroller efficiently. Drones rely on three primary serial protocols:

### Universal Asynchronous Receiver-Transmitter (UART)
- **Pins:** TX (Transmit), RX (Receive), GND.
- **How it works:** Point-to-point. Devices must agree on a "Baud Rate" (speed, e.g., 115200 bps).
- **Use case:** GPS modules, Radio Receivers (Crossfire/ELRS), VTX control.

### Inter-Integrated Circuit (I2C)
- **Pins:** SDA (Data), SCL (Clock), GND.
- **How it works:** A "bus" system. Multiple devices can share the same two wires. Each device has an address.
- **Limitation:** Slow and susceptible to electrical noise.
- **Use case:** Barometers, Magnetometers (compass).

### Serial Peripheral Interface (SPI)
- **Pins:** MOSI, MISO, SCK (Clock), CS (Chip Select).
- **How it works:** Much faster than I2C. Point-to-multipoint using dedicated Chip Select wires for each device.
- **Use case:** Blackbox Flash chips, and critically, the **Gyroscope (IMU)**, which updates at 8000Hz and needs massive bandwidth.`,
        realLifeExample: "If you connect a GPS module to your flight controller and they disagree on the UART Baud Rate (one is speaking at 9600 bps, the other listening at 115200 bps), they will output pure gibberish, and you will get zero satellites.",
        quiz: [
          {
            question: "Which communication protocol is typically used to connect the ultra-fast Gyroscope to the Flight Controller?",
            options: ["I2C", "UART", "SPI", "CAN Bus"],
            correctAnswer: 2,
            explanation: "SPI is the fastest of the three and is required to handle the massive data throughput needed by an 8kHz gyroscope.",
            reviewSubChapterId: "ch15-s2"
          }
        ]
      },
      {
        id: "ch15-s3",
        title: "15.3 Digital vs. Analog Signals (PWM to DShot)",
        content: `The way flight controllers communicate with Electronic Speed Controllers (ESCs) has evolved dramatically to reduce latency and errors.

### Pulse Width Modulation (PWM) - The Analog Era
Historically, FCs sent a PWM signal to ESCs. The *width* of the pulse (from 1000 microseconds to 2000 microseconds) indicated throttle level.
- **Problem:** Very slow (400Hz max). Electrical noise could slightly stretch the pulse, causing the motor to twitch. It also required manual calibration.

### Digital Protocols: DShot
**DShot (Digital Shot)** revolutionized drones. Instead of an analog pulse width, DShot sends a 16-bit digital binary packet indicating exact throttle (from 0 to 2047) and telemetry request.
- **DShot300 / DShot600:** The number represents kilobits per second. DShot600 runs at 600 kbps, updating the motor almost instantaneously.
- **Advantages:** Immune to electrical noise. No calibration required.
- **Bidirectional DShot:** The ESC sends RPM data *back* to the FC natively on the same wire. This allows the FC to dynamically filter out motor noise using RPM-based notch filters.`,
        realLifeExample: "Before DShot, pilots had to completely remove propellers and run an 'ESC Calibration' routine every time they built a drone. DShot eliminated this dangerous step entirely by using exact digital 0s and 1s.",
        quiz: [
          {
            question: "What is a major advantage of the DShot protocol over traditional PWM?",
            options: ["It requires precise analog calibration", "It is extremely slow", "It is an exact, noise-immune digital signal requiring no calibration", "It uses more electricity"],
            correctAnswer: 2,
            explanation: "DShot is a purely digital protocol. A '1' is a '1'. It cannot be slightly altered by electrical noise, rendering ESC calibration obsolete.",
            reviewSubChapterId: "ch15-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch16",
    title: "Chapter 16: Control Theory and PID Controllers",
    description: "The mathematics of drone stability.",
    subChapters: [
      {
        id: "ch16-s1",
        title: "16.1 The Proportional-Integral-Derivative (PID) Framework",
        content: `A drone is inherently aerodynamically unstable. Without a closed-loop feedback controller, it will crash immediately. The **PID Controller** is the mathematical algorithm that keeps it flying seamlessly.

### Closed-Loop Feedback
1. **Setpoint:** What you command via the radio transmitter (e.g., "Roll right at 200 degrees/sec").
2. **Measurement:** What the gyroscope says the drone is actually doing (e.g., "Currently rolling right at 150 degrees/sec").
3. **Error ($e(t)$):** Setpoint - Measurement = 50 deg/sec error.

The PID controller calculates how much power to apply to the motors to force the error to ZERO. It uses three separate terms.`,
        realLifeExample: "Imagine driving a car perfectly straight. If a gust of wind pushes you left (Error), you steer right to compensate (Controller). The PID loop does this for your drone thousands of times a second.",
        quiz: [
          {
            question: "In a closed-loop control system, what is the 'Error'?",
            options: ["A hardware failure", "The difference between the desired Setpoint and the actual Measurement", "A bug in the code", "The battery voltage sag"],
            correctAnswer: 1,
            explanation: "Error is the mathematical difference between what the pilot wants the drone to do and what the sensors say the drone is currently doing.",
            reviewSubChapterId: "ch16-s1"
          }
        ]
      },
      {
        id: "ch16-s2",
        title: "16.2 Deconstructing the P, I, and D Terms",
        content: `The output of the controller ($u(t)$) is the sum of the Proportional, Integral, and Derivative calculations.

### Proportional (P) - "The Present"
$P_{out} = K_p \times e(t)$
P provides the immediate push. The bigger the error, the harder it pushes the motors.
- **Too low:** Drone feels mushy, slow, and unresponsive.
- **Too high:** Drone corrects too hard, overshoots, and starts trembling or shaking rapidly (high-frequency oscillation).

### Integral (I) - "The Past"
$I_{out} = K_i \times \int e(t) dt$
I accumulates past errors over time. If a steady crosswind is pushing the drone, P isn't strong enough to fix a tiny residual error. I builds up over time and "leans" the drone into the wind permanently.
- **Too low:** Drone drifts over time, cannot hold its angle perfectly.
- **Too high:** Drone feels stiff, mechanical, and experiences slow "bobbing" oscillations.

### Derivative (D) - "The Future"
$D_{out} = K_d \times \frac{de(t)}{dt}$
D looks at the *rate of change* of the error. It acts as a shock absorber. If the drone is snapping to an angle very fast, D predicts an overshoot and applies "brakes" to soften the landing.
- **Too low:** Drone overshoots its target after a sharp flip (bounce back).
- **Too high:** Motors overheat massively because D aggressively fights normal vibrations.`,
        realLifeExample: "If you do a fast flip and the drone 'bounces' or wobbles when you let go of the stick, you need to increase your 'D' gain to dampen that stop.",
        quiz: [
          {
            question: "Which PID term acts like a 'shock absorber' to prevent the drone from overshooting its target?",
            options: ["Proportional (P)", "Integral (I)", "Derivative (D)", "Feedforward (F)"],
            correctAnswer: 2,
            explanation: "The Derivative term predicts future error by analyzing the rate of change, applying a counter-force to dampen movement and prevent overshoot.",
            reviewSubChapterId: "ch16-s2"
          }
        ]
      },
      {
        id: "ch16-s3",
        title: "16.3 Feedforward and Advanced Filters",
        content: `Modern flight controllers have advanced beyond simple PID to include elements like Feedforward and dynamic filtering.

### Feedforward (FF)
PID only reacts *after* an error occurs. **Feedforward** looks directly at your radio stick movement and instantly blips the motors *before* any error happens. This results in zero-latency stick feel.
- High FF makes the drone track your stick movements like it implies psychic connection, but too much causes overshoot.

### Filtering (Handling Noise)
The Derivative term (D) is highly sensitive to noise. If motor vibrations reach the gyro, D will amplify them, causing the motors to scream and overheat instantly.

**Low Pass Filters (PT1, Biquad):** Smear out high-frequency noise, but add latency to the system.
**Notch Filters:** Surgically cut out specific frequencies (like the exact RPM buzz of the motor) while leaving the rest of the signal intact. 
**RPM Filter (Bidirectional DShot):** The holy grail of filtering. It reads exactly how fast the motors are spinning and dynamically moves a notch filter to follow the motor noise precisely. This allows you to run less general filtering, minimizing latency and maximizing flight feel.`,
        realLifeExample: "Before RPM filtering was invented natively in Betaflight, pilots struggled to tune out motor noise without adding massive latency. RPM filtering drastically changed FPV performance forever.",
        quiz: [
          {
            question: "Why does Bidirectional DShot dramatically improve drone flight performance?",
            options: ["It spins the motors faster", "It uses less battery", "It allows the FC to apply dynamic notch filters that target exact motor RPM noise", "It adds video transmission"],
            correctAnswer: 2,
            explanation: "By knowing exact RPMs, the FC can surgically filter out motor noise in real-time without adding latency to the control loop.",
            reviewSubChapterId: "ch16-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch17",
    title: "Chapter 17: FPV Systems and Video Transmission",
    description: "The magic of flying from the drone's perspective.",
    subChapters: [
      {
        id: "ch17-s1",
        title: "17.1 Analog Video Transmission",
        content: `First-Person View (FPV) relies on transmitting a live video feed from the drone to the pilot's goggles. 

### How Analog FPV Works
Analog video (NTSC or PAL) is transmitted, usually over the 5.8GHz frequency band, directly to the goggles. 
- **Pros:** True zero-latency. If the signal degrades, it degrades gracefully into static ("snow"), allowing the pilot to still see shapes and recover. Extremely cheap and lightweight.
- **Cons:** Standard definition (often 600 TVL), susceptible to color shifting, multipathing (bouncing off walls), and interference.

### Video Transmitter (VTX) Power
VTX power is measured in milliwatts (mW).
- **25mW:** Indoor racing, legal limit in many countries, range < 200m.
- **200mW - 400mW:** Standard park flying, forest trails.
- **800mW - 1000mW+:** Long-range mountain surfing (penetrates foliage better).`,
        realLifeExample: "Top-tier drone racers often still prefer Analog over Digital because an analog signal has a pure fixed latency of ~10ms, whereas digital latency fluctuates based on interference.",
        quiz: [
          {
            question: "What happens to an analog FPV video feed when the signal gets weak?",
            options: ["The video completely freezes", "The latency goes up to 500ms", "The video gracefully degrades into static/snow", "The video turns black and white instantly"],
            correctAnswer: 2,
            explanation: "Analog video degrades gracefully. It introduces static and 'snow' but continues updating in real-time, helping the pilot fly out of danger.",
            reviewSubChapterId: "ch17-s1"
          }
        ]
      },
      {
        id: "ch17-s2",
        title: "17.2 Digital HD FPV Systems",
        content: `Digital FPV disrupted the industry by offering pristine 720p or 1080p high frame-rate video inside the goggles.

### The Major Digital Ecosystems
1. **DJI O3/Vista:** The dominant system. Unmatched image quality and penetration. Variable latency (~25ms). 
2. **Walksnail Avatar:** A strong competitor with 1080p canvas and smaller VTX options.
3. **HDZero:** Unique approach. Not H.264 compressed. Offers fixed, ultra-low latency (like analog) but in 720p digital quality. Degrades via distinct digital blocking.

### How Digital FPV works
Unlike a simple analog broadcast, HD systems compress the video (H.264/H.265 codec), packetize it, and repeatedly re-transmit lost packets to ensure a clean image. 
- **The Drawback:** When the signal gets weak, a digital system will try so hard to re-transmit that it will drastically increase latency (up to >100ms) and eventually hard-freeze the frame, causing an instant crash if flying fast.`,
        realLifeExample: "A pilot flying through an abandoned factory with a DJI O3 unit enjoys a crystal-clear 4K view, but when they drop behind a thick concrete wall, the video stutters and freezes for a split second.",
        quiz: [
          {
            question: "What is the main drawback of current Digital HD systems compared to Analog when flying behind thick obstacles?",
            options: ["They drain the battery in seconds", "The video can freeze or spike in latency", "They explode", "They only transmit in black and white"],
            correctAnswer: 1,
            explanation: "Digital systems use packet re-transmission to maintain image clarity. When signal blocks, trying to recover those packets causes massive latency spikes or frozen frames.",
            reviewSubChapterId: "ch17-s2"
          }
        ]
      },
      {
        id: "ch17-s3",
        title: "17.3 FPV Antennas: Polarization and Multipathing",
        content: `Your $200 VTX is useless without proper antennas.

### Multipathing Interference
When you fly near concrete or metal, your radio wave bounces. Your goggles receive the main signal, and a fraction of a second later, they receive the bounced signal. In analog, this causes tears in the video.

### Circular Polarization (CP) to the Rescue
Instead of a straight wire (Linear Polarization), most FPV systems use Circular Polarized antennas (mushroom or cloverleaf shaped). They send the wave spiraling like a corkscrew — either Right-Hand (RHCP) or Left-Hand (LHCP).
- When an RHCP signal bounces off a wall, it reverses direction and becomes LHCP.
- If your goggles have an RHCP antenna, it mechanically rejects the bounced LHCP signal, completely eliminating multipathing interference!

### Antenna Gain and Directionality
- **Omni Antennas:** Broadcast in a 360-degree donut shape. Good for flying all around you. Moderately low gain (2-3 dbi).
- **Patch/Helical Antennas:** Broadcast in a focused cone (like a flashlight). Incredible range in front of you, totally blind behind you. High gain (8-13 dbi).`,
        realLifeExample: "Long-range pilots use 'Diversity' receivers on their goggles: one Omni antenna (for when the drone is taking off nearby) and one high-gain Patch antenna pointed at the mountain they intend to surf 5 miles away.",
        quiz: [
          {
            question: "Why do FPV pilots use Circular Polarized (RHCP/LHCP) antennas instead of standard Linear antennas?",
            options: ["They look cooler", "To reject bounced signals (multipathing) and provide a cleaner video feed", "They weigh less", "They boost VTX power"],
            correctAnswer: 1,
            explanation: "When a circular signal bounces, it reverses its polarization. The receiving antenna inherently rejects the reversed polarized bounce, cleaning up the video.",
            reviewSubChapterId: "ch17-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch18",
    title: "Chapter 18: Radio Control Links",
    description: "ELRS, Crossfire, and how to never failsafe.",
    subChapters: [
      {
        id: "ch18-s1",
        title: "18.1 Control Link Frequencies",
        content: `The control link connects your radio transmitter (TX) to the drone's receiver (RX). 

### 2.4 GHz vs 900 MHz
**2.4 GHz (Traditional, ELRS 2.4, FrSky):**
- **Pros:** Shorter antenna, higher bandwidth/packet rate (up to 1000Hz), global legality.
- **Cons:** Stopped by dense trees and concrete.

**900 MHz (TBS Crossfire, ELRS 900):**
- **Pros:** Incredible penetration. Lower frequencies pass through solid objects much better. Used for extreme long-range (10km+).
- **Cons:** Massive antennas. Lower refresh rate (50-150Hz).

**The Failsafe:** If the drone loses the receiver signal, it triggers a "Failsafe." In a racing drone, it immediately drops from the sky to prevent a flyaway. In a GPS drone, it initiates Return-to-Home (RTH).`,
        realLifeExample: "Flying behind a small hill with a traditional 2.4GHz FrSky radio will cause an immediate failsafe. Using 900MHz TBS Crossfire allows the pilot to safely surf down the backside of the mountain.",
        quiz: [
          {
            question: "Why is the 900 MHz frequency band preferred for long-range and mountain flying?",
            options: ["It transmits HD Video", "Lower frequencies penetrate solid obstacles like trees and dirt much better than 2.4GHz", "The antennas are much smaller", "It's faster"],
            correctAnswer: 1,
            explanation: "Physics dictates that lower frequency electromagnetic waves penetrate physical objects far better than high frequencies, ensuring a solid control link behind obstacles.",
            reviewSubChapterId: "ch18-s1"
          }
        ]
      },
      {
        id: "ch18-s2",
        title: "18.2 ExpressLRS (ELRS) Protocol",
        content: `ExpressLRS (ELRS) is an open-source RC link that has completely revolutionized the drone industry. It out-performs legacy systems costing ten times as much.

### The Magic of LoRa
ELRS uses hardware chips equipped with **LoRa (Long Range) modulation**, originally designed for IoT devices bridging miles of distance on tiny watch batteries. LoRa can pull a signal out of the noise floor even when the signal-to-noise ratio is negative!

### Packet Rates and Latency
ELRS 2.4GHz can run at 1000Hz (1000 packets per second). This results in an incredibly low end-to-end latency of ~2ms. To a pilot, this feels like their fingers are physically connected to the drone's motors.

### Flashing and Binding
Because it is open source with rapid development, ELRS relies on a WiFi flashing process. You build a custom firmware image with your unique "Binding Phrase". When the receiver boots up, it automatically connects to any radio transmitting your binding phrase — meaning you never have to push tiny bind buttons again.`,
        realLifeExample: "A pilot buys three different drones from three different companies. Because they all have ELRS receivers flashed with his personal binding phrase, his radio instantly controls them all without ever pressing a bind button.",
        quiz: [
          {
            question: "What underlying modulation technology allows ExpressLRS to achieve incredible range and interference rejection?",
            options: ["Bluetooth", "LoRa (Long Range) Modulation", "5G Cellular", "PWM"],
            correctAnswer: 1,
            explanation: "LoRa modulation allows the receiver to interpret signals that are physically operating beneath the surrounding background noise floor.",
            reviewSubChapterId: "ch18-s2"
          }
        ]
      },
      {
        id: "ch18-s3",
        title: "18.3 Telemetry and OpenTX/EdgeTX",
        content: `A modern radio transmitter is a fully programmable computer running an open-source operating system like EdgeTX.

### Telemetry (The Downlink)
The control link is bi-directional. While the transmitter sends stick positions, the drone sends Telemetry back.
- Critical telemetry includes: RX Battery (vbat), Link Quality (LQ), RSSI (Signal Strength), and GPS Coordinates.
- If your drone crashes in tall grass, you can look at the last known GPS coordinates on your radio screen.

### RSSI vs. Link Quality (LQ)
- **RSSI (Received Signal Strength Indicator):** How "loud" the radio wave is.
- **LQ (Link Quality):** Out of 100 packets sent, how many were successfully received? 
If you have high LQ (100%) but low RSSI, you are fine — the LoRa chip is doing its job. In ELRS, LQ dropping below 70% is your primary warning to turn around.

### EdgeTX Programming
EdgeTX allows you to program logical switches. E.g., "If telemetry battery drops below 14.0V AND throttle is over 50%, make the radio speak 'Battery Critical'."`,
        realLifeExample: "A pilot loses their video feed entirely. Instead of panicking, they look at their EdgeTX radio telemetry, see they are facing North, use the radio telemetry to initiate a GPS Rescue, and the drone safely lands itself.",
        quiz: [
          {
            question: "When evaluating ELRS signal health, which metric is the most reliable indicator that you are about to failsafe?",
            options: ["RSSI Drop", "Link Quality (LQ) dropping below 70%", "Battery Voltage", "Video Static"],
            correctAnswer: 1,
            explanation: "Due to LoRa technology, RSSI can be extremely low while maintaining perfect control. Link Quality (the percentage of successful packets) is the true measure of link health.",
            reviewSubChapterId: "ch18-s3"
          }
        ]
      }
    ]
  }
];
