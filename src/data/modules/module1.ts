import { Chapter } from '../../types';

export const module1Chapters: Chapter[] = [
  {
    id: "ch1",
    title: "Chapter 1: Welcome to Unmanned Aerial Systems",
    description: "Your journey into the world of professional drone technology begins here.",
    subChapters: [
      {
        id: "ch1-s1",
        title: "1.1 What is an Unmanned Aerial System?",
        content: `The term **Unmanned Aerial System (UAS)** encompasses far more than just the flying machine. A complete UAS consists of three critical components working in harmony. A failure in any of these components leads to what engineers call a "Loss of Link" (LOL) or complete system failure.

### The Three Pillars of UAS Architecture

- **The Aircraft (UA):** The physical execution layer. This includes the airframe, the propulsion systems (ESCs, brushless motors), the flight controller running real-time operating systems (RTOS) like PX4 or ArduPilot, and mission payloads.
- **The Ground Control Station (GCS):** The command and control (C2) layer. This ranges from handheld RC transmitters executing 2.4GHz FHSS to complex mobile operation centers running QGroundControl. The GCS is responsible for mission planning, waypoint generation, and rendering live telemetry.
- **The Communication Data Link:** The invisible but most critical RF bridge. Modern systems utilize multiplexed data links. For instance, command and control (C2) might operate on the robust 900MHz spectrum for range, while high-bandwidth video telemetry streams simultaneously over 5.8GHz.

### Deep Dive: Telemetry & MAVLink Protocols

When the aircraft speaks to the GCS, they don't just send raw voltages. They communicate using rigorously designed protocols. The industry standard is **MAVLink (Micro Air Vehicle Link)**, a highly lightweight, header-only message marshaling library. MAVLink packages critical data—like GPS coordinates, battery cell voltage, and pitch/roll vector attitudes—into tiny byte packets transmitted up to 50 times per second. 

Understanding the packet structure of MAVLink is what separates a hobbyist from a true systems engineer.

### Why "System" Matters Professionally

Understanding the entire system rather than just the airframe allows engineers to calculate the **Link Budget** and identify single points of failure.

> **Technical Insight:** The most expensive drone ever built is useless if the 2.4GHz RF environment is completely saturated by local WiFi interference. Professional operators use **Spectrum Analyzers** to monitor the noise floor before every critical mission. The link is the only thing standing between a successful flight and a "Fly-Away" event.`,
        realLifeExample: "During a major industrial pipeline inspection, a drone hit a 'Geofence' failure because the GCS telemetry lost satellite lock due to multi-path interference from metal structures. The operator, understanding the system, switched to a manual RF-only flight mode bypassing the GPS requirement.",
        quiz: [
          {
            question: "What are the three core architectural pillars of a complete UAS?",
            options: ["Motor, Battery, Propeller", "Aircraft, Ground Control Station, Communication Data Link", "GPS, Camera, Controller", "Frame, ESC, Flight Controller"],
            correctAnswer: 1,
            explanation: "A UAS is a complete system: the aircraft itself, the ground control station the pilot uses, and the communication data link connecting them.",
            reviewSubChapterId: "ch1-s1"
          },
          {
            question: "What is the primary function of MAVLink in a drone system?",
            options: ["To spin the motors", "To generate lift", "A lightweight protocol for packing and sending telemetry and command data", "A video encoding format"],
            correctAnswer: 2,
            explanation: "MAVLink is the industry-standard message marshaling library used to communicate telemetry and commands efficiently between the drone and the GCS.",
            reviewSubChapterId: "ch1-s1"
          },
          {
            question: "Which RF frequency is often preferred for long-range, robust Command & Control (C2) rather than high-bandwidth video?",
            options: ["5.8GHz", "2.4GHz", "900MHz", "1.2GHz"],
            correctAnswer: 2,
            explanation: "Lower frequencies like 900MHz have better penetration and range, making them ideal for critical C2 links compared to higher frequencies like 5.8GHz used for video.",
            reviewSubChapterId: "ch1-s1"
          },
          {
            question: "What does the ICAO acronym stand for?",
            options: ["International Civil Aviation Organization", "Interstate Commerce Aviation Order", "Internal Control & Automation Office", "Integrated Circuit Aerodynamics Organization"],
            correctAnswer: 0,
            explanation: "ICAO stands for International Civil Aviation Organization, the global body that defines aviation standards including UAS definitions.",
            reviewSubChapterId: "ch1-s1"
          },
          {
            question: "Why might a drone fail to operate near massive metal structures if relying entirely on autonomous navigation?",
            options: ["The battery drains faster", "The motors short-circuit", "Multi-path interference can disrupt the GPS signal required by the GCS logic", "The RF completely stops working"],
            correctAnswer: 2,
            explanation: "Massive metal structures can bounce and reflect GPS signals, causing multi-path interference and resulting in a loss of positional lock.",
            reviewSubChapterId: "ch1-s1"
          }
        ]
      },
      {
        id: "ch1-s2",
        title: "1.2 The Drone Industry Landscape",
        content: `The global drone industry is experiencing exponential growth. Understanding the market landscape is essential for any professional entering this field.

### Market Segments

- **Consumer:** Photography drones like DJI Mavic, Mini — the largest segment by unit volume.
- **Commercial/Enterprise:** Inspection, surveying, delivery — the fastest growing segment by revenue.
- **Military/Defense:** Reconnaissance, strike, logistics — the largest segment by total spending.
- **Public Safety:** Law enforcement, fire departments, search and rescue.

### Key Industry Players

| Company | Specialty | Market Share |
|---------|-----------|-------------|
| DJI | Consumer & Enterprise | ~70% consumer |
| Skydio | AI-powered autonomy | Leading US manufacturer |
| Autel Robotics | Prosumer & Enterprise | Growing rapidly |
| AgEagle (senseFly) | Mapping & Survey | Fixed-wing leader |

### The $54 Billion Opportunity

The drone services market is projected to reach **$54 billion by 2030**. The biggest areas of growth are in:
1. **Infrastructure inspection** (bridges, power lines, wind turbines)
2. **Precision agriculture** (crop health monitoring)
3. **Delivery logistics** (last-mile delivery)
4. **Urban Air Mobility** (air taxis — eVTOL aircraft)`,
        realLifeExample: "Amazon Prime Air has been testing drone delivery since 2013 and now operates in select cities, delivering packages under 5 pounds in under 60 minutes using custom-built hexacopter drones.",
        quiz: [
          {
            question: "Which market segment is the fastest growing by revenue in the drone industry?",
            options: ["Consumer photography", "Military/Defense", "Commercial/Enterprise", "Toy drones"],
            correctAnswer: 2,
            explanation: "Commercial and enterprise applications like inspection, surveying, and delivery represent the fastest-growing revenue segment.",
            reviewSubChapterId: "ch1-s2"
          },
          {
            question: "What is the projected market value of drone services by 2030?",
            options: ["$10 Billion", "$54 Billion", "$100 Billion", "$1 Trillion"],
            correctAnswer: 1,
            explanation: "The drone services market is projected to reach $54 billion by 2030, driven by infrastructure and logistics.",
            reviewSubChapterId: "ch1-s2"
          },
          {
            question: "Which company is the global leader in consumer drone market share?",
            options: ["Skydio", "DJI", "Autel", "Parrot"],
            correctAnswer: 1,
            explanation: "DJI holds approximately 70% of the consumer drone market share globally.",
            reviewSubChapterId: "ch1-s2"
          },
          {
            question: "What does eVTOL stand for in the context of Urban Air Mobility?",
            options: ["Electric Vertical Take-Off and Landing", "Electronic Velocity Tracking of Lift", "Engineered Vertical Transport of Logistics", "Extra Vertical Thrust and Output Load"],
            correctAnswer: 0,
            explanation: "eVTOL stands for Electric Vertical Take-Off and Landing, the technology powering future air taxis.",
            reviewSubChapterId: "ch1-s2"
          },
          {
            question: "In which area is precision agriculture primarily using drones?",
            options: ["Last-mile delivery", "Crop health monitoring and spraying", "Livestock transport", "Racing"],
            correctAnswer: 1,
            explanation: "Precision agriculture uses drones for crop health monitoring (multispectral imaging) and targeted spraying.",
            reviewSubChapterId: "ch1-s2"
          }
        ]
      },
      {
        id: "ch1-s3",
        title: "1.3 Career Paths in Drone Technology",
        content: `The drone industry offers diverse career paths across engineering, operations, and business. This section maps out the key professional tracks.

### Engineering Careers

- **Drone Design Engineer:** CAD modeling, frame design, CFD analysis. Salary: $80K-$130K.
- **Embedded Systems Engineer:** Flight controller firmware, sensor integration, RTOS programming. Salary: $90K-$150K.
- **Autonomy Engineer:** Computer vision, SLAM, path planning, AI/ML. Salary: $120K-$200K.
- **RF/Communications Engineer:** Antenna design, protocol development, spectrum management. Salary: $85K-$140K.

### Operations Careers

- **Commercial Drone Pilot (Part 107):** Aerial photography, inspection, mapping. Salary: $40K-$100K.
- **Drone Program Manager:** Fleet management, regulatory compliance, safety officer. Salary: $70K-$120K.
- **GIS/Photogrammetry Specialist:** Data processing, orthomosaic creation, 3D modeling. Salary: $55K-$95K.

### Certifications That Matter

1. **FAA Part 107** — Required for all commercial operations in the US
2. **AUVSI TOP** — Trusted Operator Program certification
3. **Pix4D/DroneDeploy** — Software-specific mapping certifications
4. **Thermography certification** — For thermal inspection work

### Your Degree Outcome

By completing this SkyMaster UAS program, you will have the knowledge equivalent to a professional drone engineer and operator, capable of designing, building, programming, and flying any UAS.`,
        realLifeExample: "A wind turbine inspector who adds drone piloting skills (Part 107 + thermography certification) can increase their earning potential by 40-60% and reduce their physical risk significantly.",
        quiz: [
          {
            question: "Which US certification is REQUIRED for all commercial drone operations?",
            options: ["AUVSI TOP", "FAA Part 107", "Pix4D Certification", "DJI Academy"],
            correctAnswer: 1,
            explanation: "FAA Part 107 Remote Pilot Certificate is legally required for any commercial drone operations in the United States.",
            reviewSubChapterId: "ch1-s3"
          },
          {
            question: "What is an Embedded Systems Engineer's primary responsibility in drone design?",
            options: ["Painting the frame", "Writing flight controller firmware and integrating sensors", "Marketing the drone sales", "Legal regulatory compliance"],
            correctAnswer: 1,
            explanation: "Embedded engineers work on the 'intelligence' layer—the code that runs on the flight controller and electronic speed controllers.",
            reviewSubChapterId: "ch1-s3"
          },
          {
            question: "What does CFD stand for in the context of drone design engineering?",
            options: ["Constant Flight Data", "Computational Fluid Dynamics", "Circular Frame Design", "Computer Frequency Detection"],
            correctAnswer: 1,
            explanation: "CFD is used to simulate airflow over the drone's arms and propellers to optimize aerodynamics without building multiple physical prototypes.",
            reviewSubChapterId: "ch1-s3"
          },
          {
            question: "A 'GIS Specialist' in the drone industry primarily works with what?",
            options: ["Sound recording", "Mapping, photogrammetry, and spatial data analysis", "Battery chemistry", "Motor winding"],
            correctAnswer: 1,
            explanation: "GIS (Geographic Information Systems) specialists use drone-captured data to create orthomosaics, 3D models, and topographical maps.",
            reviewSubChapterId: "ch1-s3"
          },
          {
            question: "Which certification is specifically valuable for inspecting electrical infrastructure or seeking heat leaks?",
            options: ["Part 107", "Thermography Certification", "Radio License", "SORA Certification"],
            correctAnswer: 1,
            explanation: "Thermography (infrared) certification is specialized training for interpreting thermal sensor data used in industrial inspections.",
            reviewSubChapterId: "ch1-s3"
          }
        ]
      }
    ],
    finalExam: [

      {
        question: "Which pioneer demonstrated a remote-controlled boat in 1898, proving radio control was possible?",
        options: ["Orville Wright", "Nikola Tesla", "Thomas Edison", "Guglielmo Marconi"],
        correctAnswer: 1,
        explanation: "Nikola Tesla's 'teleautomaton' boat was the first public demonstration of radio control.",
        reviewSubChapterId: "ch2-s1"
      },
      {
        question: "A UAS consists of the aircraft, the communication link, and what else?",
        options: ["The battery charger", "The case", "The Ground Control Station (GCS)", "The Propeller Wrench"],
        correctAnswer: 2,
        explanation: "GCS is the command core of the three-pillar UAS architecture.",
        reviewSubChapterId: "ch1-s1"
      },
      {
        question: "What is the primary role of an ESC in a drone?",
        options: ["To stabilize the camera", "To process GPS signals", "To convert battery DC to AC for brushless motors", "To control the LED lights"],
        correctAnswer: 2,
        explanation: "ESCs (Electronic Speed Controllers) manage the power delivered to the motors based on FC commands.",
        reviewSubChapterId: "ch4-s3"
      },
      {
        question: "The 'Queen Bee' aircraft of 1935 is significant because it is credited with giving drones what?",
        options: ["Their wings", "Their name", "Their landing gear", "Their explosive payloads"],
        correctAnswer: 1,
        explanation: "The radio-controlled DH.82B was named 'Queen Bee', leading the military to call its target aircraft 'drones'.",
        reviewSubChapterId: "ch2-s1"
      },
      {
        question: "If a motor's KV rating is low, what type of propeller is it usually designed to spin?",
        options: ["Tiny, high-pitch props", "Large, heavy props for more torque", "Plastic props only", "Props with 5 blades or more"],
        correctAnswer: 1,
        explanation: "Low KV motors have more torque and are typically paired with larger propellers.",
        reviewSubChapterId: "ch4-s3"
      },
      {
        question: "Which flight stack is professional-grade open-source and often used in complex research or enterprise UAS?",
        options: ["Betaflight", "PX4", "Minecraft", "Arduinos"],
        correctAnswer: 1,
        explanation: "PX4 is a professional-grade flight stack used in many commercial and research applications.",
        reviewSubChapterId: "ch2-s3"
      },
      {
        question: "What is 'Link Budget' a measure of?",
        options: ["The cost of the drone", "The total gain and loss in a communication system", "The number of GPS satellites available", "The battery's internal resistance"],
        correctAnswer: 1,
        explanation: "Link budget covers all the gains and losses from the transmitter to the receiver.",
        reviewSubChapterId: "ch1-s1"
      },
      {
        question: "The MQ-9 Reaper's endurance is approximately how long?",
        options: ["2 hours", "10 hours", "27+ hours", "1 week"],
        correctAnswer: 2,
        explanation: "The Reaper is a Long-Endurance platform capable of staying airborne for over a day.",
        reviewSubChapterId: "ch2-s2"
      },
      {
        question: "What does Part 107 specifically regulate in the United States?",
        options: ["Commercial drone operations", "Military drone swarms", "Toy drones for kids", "Drone racing competitions"],
        correctAnswer: 0,
        explanation: "FAA Part 107 is the legal framework for commercial small UAS operations.",
        reviewSubChapterId: "ch1-s3"
      },
      {
        question: "LiPo batteries are favored for drones because they have high what?",
        options: ["Internal resistance", "Cost", "Power-to-weight ratio", "Charging time"],
        correctAnswer: 2,
        explanation: "Lithium Polymer (LiPo) batteries provide a massive amount of power relative to their weight.",
        reviewSubChapterId: "ch2-s3"
      }
    ]
  },
  {
    id: "ch3",
    title: "Chapter 3: UAS Connectivity & RF Engineering",
    description: "The science of the invisible link: RF frequencies, link budgets, and interference mitigation.",
    subChapters: [
      {
        id: "ch3-s1",
        title: "3.1 Understanding the Radio Frequency Spectrum",
        content: `To operate a UAS, you must master the medium through which it communicates: the **Radio Frequency (RF)** spectrum. Different bands offer different trade-offs between range, bandwidth, and penetration.

### The Standard Drone Bands

1. **900 MHz (Sub-GHz):** Used for long-range Command and Control (C2). Its long wavelength provides excellent obstacle penetration through trees and buildings.
2. **2.4 GHz (The Crowd):** The global standard for both C2 and short-range video. It's heavily congested by WiFi, Bluetooth, and microwaves, requiring advanced 'Frequency Hopping' (FHSS) to stay reliable.
3. **5.8 GHz (High Bandwidth):** Used primarily for High-Definition video telemetry. While it carries massive data, it has a 'Line of Sight' (LOS) requirement—even a single leaf can disrupt a 5.8GHz feed.

### The Physics of Attenuation

Signal strength drops off exponentially with distance, a principle known as the **Inverse Square Law**. In UAS engineering, we calculate this using the **Friis Transmission Equation**.

> **Pro Tip:** If you double your distance from the drone, you typically lose 75% of your signal power (6dB drop).`,
        realLifeExample: "A pilot flying a bridge inspection found their 2.4GHz link failing due to the massive steel structure. Switching to a 900MHz Crossfire link allowed them to fly 'behind' the pillars without losing control.",
        quiz: [
          {
            question: "Which frequency band is most susceptible to being blocked by physical obstacles like leaves or buildings?",
            options: ["433 MHz", "900 MHz", "2.4 GHz", "5.8 GHz"],
            correctAnswer: 3,
            explanation: "Higher frequencies like 5.8 GHz have shorter wavelengths and are easily absorbed or reflected by physical objects.",
            reviewSubChapterId: "ch3-s1"
          },
          {
            question: "What does FHSS stand for in drone radio technology?",
            options: ["Fast High Signal Strength", "Frequency Hopping Spread Spectrum", "Fixed Harmonic Signal Standard", "Frequency Hybrid System Sync"],
            correctAnswer: 1,
            explanation: "FHSS rapidly switches among many frequency channels to avoid interference and maintain a robust link.",
            reviewSubChapterId: "ch3-s1"
          },
          { question: "If you double your distance, signal power drops by how many decibels (dB)?", options: ["2dB", "3dB", "6dB", "10dB"], correctAnswer: 2, explanation: "Doubling distance results in a 6dB loss in free space path loss.", reviewSubChapterId: "ch3-s1" },
          { question: "In highly congested urban environments, which link is most likely to suffer 'noise' interference?", options: ["900 MHz", "2.4 GHz", "1.2 GHz", "433 MHz"], correctAnswer: 1, explanation: "2.4 GHz is shared by WiFi and Bluetooth, making it the most 'noisy' band.", reviewSubChapterId: "ch3-s1" },
          { question: "Which equation is used to calculate received signal power at a distance?", options: ["Ohm's Law", "Bernoulli's Principle", "Friis Transmission Equation", "Maxwell's Equations"], correctAnswer: 2, explanation: "The Friis equation relates received power to transmitted power, antenna gains, and distance.", reviewSubChapterId: "ch3-s1" }
        ]
      },
      {
        id: "ch3-s2",
        title: "3.2 Antenna Theory & Polarization",
        content: `Your link is only as good as your antennas. An antenna converts electrical signals into electromagnetic waves.

### Polarization: Linear vs. Circular

- **Linear Polarization (Dipoles):** Signals travel in a flat plane (horizontal or vertical). If the drone tilts, the planes misalign, causing a 'Polarization Loss' of up to 20dB.
- **Circular Polarization (LHCP/RHCP):** Signals travel in a corkscrew pattern. This is the gold standard for FPV drones because the signal remains strong even when the drone is doing flips or rolls.

### Gain and Directivity

**dBic** is the measure of antenna gain. 
- **Omni-Directional:** 360-degree coverage but shorter range (e.g., a standard 'Rubber Duck' antenna).
- **Directional (Patch/Helical):** Focuses all energy in one direction like a flashlight. It provides massive range but requires the pilot to point the antenna at the drone.`,
        quiz: [
          { question: "Which antenna type is best for a drone that will be performing acrobatic maneuvers?", options: ["Linear Dipole", "Circularly Polarized", "Yagi Antenna", "Patch Antenna"], correctAnswer: 1, explanation: "Circular polarization prevents signal loss when the aircraft's orientation changes.", reviewSubChapterId: "ch3-s2" },
          { question: "If you use a 14dBic Patch antenna, what is the trade-off?", options: ["Less weight", "Massive range but very narrow beam width", "Worse signal quality", "Slower data transmission"], correctAnswer: 1, explanation: "High gain directional antennas have a very narrow 'sweet spot'.", reviewSubChapterId: "ch3-s2" },
          { question: "What happens if you use a LHCP antenna on your drone and a RHCP antenna on your goggles?", options: ["The signal is twice as strong", "No impact", "A massive 20-30dB signal loss", "The colors turn black and white"], correctAnswer: 2, explanation: "Cross-polarization (mixing LHCP and RHCP) results in nearly complete signal rejection.", reviewSubChapterId: "ch3-s2" },
          { question: "What is the standard unit used to measure antenna gain relative to a circular isotropic source?", options: ["dB", "dBi", "dBic", "Watts"], correctAnswer: 2, explanation: "dBic (decibels relative to circular isotropic) is the standard for CP antennas.", reviewSubChapterId: "ch3-s2" },
          { question: "A 'Rubber Duck' antenna is an example of what type of radiation pattern?", options: ["Unidirectional", "Directional", "Omnidirectional", "Bi-directional"], correctAnswer: 2, explanation: "Omnidirectional antennas radiate in a 360-degree 'donut' shape.", reviewSubChapterId: "ch3-s2" }
        ]
      },
      {
        id: "ch3-s3",
        title: "3.3 Link Budget & EIRP Calculations",
        content: `A **Link Budget** is the complete accounting of all signal gains and losses from transmitter to receiver. It determines the maximum usable range of a radio system.

### The Link Budget Formula

$$P_{rx} = P_{tx} + G_{tx} - L_{path} - L_{cable} + G_{rx}$$

Where (all values in dBm or dB):
- $P_{tx}$ = Transmitter power
- $G_{tx}$ = Transmit antenna gain (dBi)
- $L_{path}$ = Free Space Path Loss (FSPL)
- $G_{rx}$ = Receive antenna gain (dBi)

### Free Space Path Loss (FSPL)

$$FSPL_{dB} = 20\\log_{10}(d) + 20\\log_{10}(f) + 20.4$$

Where $d$ is distance in km and $f$ is frequency in MHz.

### EIRP (Effective Isotropic Radiated Power)

$$EIRP = P_{tx} + G_{antenna}$$

EIRP is the regulatory limit — most countries cap it at **+30 dBm (1 Watt)** for the 2.4GHz band. This is why you cannot simply buy a 10W VTX legally.

> **Practical Rule:** Every 6dB improvement in your link budget doubles your usable range.`,
        realLifeExample: "A long-range pilot calculated his link budget and found he had 18dB of margin at 10km. Switching from a 2dBi omni to a 10dBi patch antenna at the GCS added 8dB — extending theoretical range to nearly 25km.",
        quiz: [
          { question: "What does EIRP stand for?", options: ["Effective Isotropic Radiated Power", "Electronic Interference Rejection Protocol", "Emergency Internal Radio Power", "Equivalent Input RF Power"], correctAnswer: 0, explanation: "EIRP accounts for both transmit power and antenna gain to give the equivalent power a perfect isotropic antenna would need.", reviewSubChapterId: "ch3-s3" },
          { question: "How much does doubling the distance affect Free Space Path Loss?", options: ["Adds 3dB", "Adds 6dB", "Adds 10dB", "Adds 20dB"], correctAnswer: 1, explanation: "FSPL follows the inverse square law — doubling distance adds 6dB of loss.", reviewSubChapterId: "ch3-s3" },
          { question: "If you improve link budget by 6dB, your range approximately:", options: ["Stays the same", "Increases by 50%", "Doubles", "Triples"], correctAnswer: 2, explanation: "Every 6dB of link budget improvement represents a doubling of usable range.", reviewSubChapterId: "ch3-s3" },
          { question: "Which regulatory value is the typical EIRP limit at 2.4GHz?", options: ["+10 dBm (10mW)", "+20 dBm (100mW)", "+30 dBm (1W)", "+40 dBm (10W)"], correctAnswer: 2, explanation: "Most jurisdictions cap EIRP at +30 dBm (1 Watt) for consumer 2.4GHz devices.", reviewSubChapterId: "ch3-s3" },
          { question: "What does L_path represent in the link budget equation?", options: ["Cable losses", "Free Space Path Loss from distance and frequency", "Lightning protection loss", "Latency penalty"], correctAnswer: 1, explanation: "L_path is the Free Space Path Loss — signal energy lost simply due to spreading over distance.", reviewSubChapterId: "ch3-s3" }
        ]
      }
    ],
    finalExam: [
      { question: "What is the primary cause of signal 'fading' in urban areas?", options: ["Atmospheric pressure", "Multi-path interference (Bounce)", "Gravity", "Battery sag"], correctAnswer: 1, explanation: "Signal bouncing off buildings causes multiple copies of the signal to arrive at slightly different times, cancelling each other out.", reviewSubChapterId: "ch3-s1" },
      { question: "Which antenna type is best for long-range flying in one fixed direction?", options: ["Rubber duck omni", "Dipole", "Patch/Helical directional", "Random wire"], correctAnswer: 2, explanation: "Patch antennas focus all energy in one direction, providing maximum gain for fixed-direction long-range links.", reviewSubChapterId: "ch3-s2" }
    ]
  },
  {
    id: "ch4",
    title: "Chapter 4: Propulsion Dynamics",
    description: "The physics of thrust: Motors, ESCs, and Propellers.",
    subChapters: [
      {
        id: "ch4-s1",
        title: "4.1 Brushless Motor Fundamentals",
        content: `Drones use **Brushless DC (BLDC)** motors. Unlike brushed motors, they use electronic commutation, making them more efficient, more powerful, and virtually maintenance-free.

### Anatomy of a BLDC Motor

1. **Stator:** The stationary copper coils that generate magnetic fields.
2. **Rotor (Bell):** The rotating outer shell containing high-strength Neodymium magnets.
3. **KV Rating:** RPM per volt. A 2400KV motor on a 10V battery will spin at 24,000 RPM (unloaded).

### Selecting the Right Motor
- **High KV (e.g., 2700KV):** Spins faster, suited for small, light propellers (3-5 inch). High speed, low torque.
- **Low KV (e.g., 900KV):** Spins slower, suited for large, heavy propellers (10+ inch). Low speed, high torque.`,
        quiz: [
          { question: "What does the 'KV' rating of a motor represent?", options: ["Kilo-Volts", "Knots per Velocity", "RPM per Volt (unloaded)", "Kilograms of Vertical thrust"], correctAnswer: 2, explanation: "KV determines how fast the motor spins for every volt applied.", reviewSubChapterId: "ch4-s1" },
          { question: "Why are brushless motors preferred over brushed motors for UAS?", options: ["They are cheaper", "No physical brushes to wear out, higher efficiency", "They only work on AC", "They are heavier"], correctAnswer: 1, explanation: "Electronic commutation reduces friction and wear.", reviewSubChapterId: "ch4-s1" },
          { question: "A 1000KV motor on a 4S LiPo (14.8V) will spin at approximately what RPM unloaded?", options: ["1,000 RPM", "14,800 RPM", "10,000 RPM", "20,000 RPM"], correctAnswer: 1, explanation: "1000 * 14.8 = 14,800 RPM.", reviewSubChapterId: "ch4-s1" },
          { question: "Which part of the brushless motor contains the magnets?", options: ["Stator", "Bell (Rotor)", "Commutator", "Windings"], correctAnswer: 1, explanation: "The Rotor/Bell contains the permanent magnets that rotate around the stator.", reviewSubChapterId: "ch4-s1" },
          { question: "When building a heavy-lift cargo drone, which motor type would you select?", options: ["High KV", "Low KV", "Brushed", "None of these"], correctAnswer: 1, explanation: "Low KV motors provide the high torque needed to spin large props for heavy lifting.", reviewSubChapterId: "ch4-s1" }
        ]
      },
      {
        id: "ch4-s2",
        title: "4.2 Electronic Speed Controllers (ESCs)",
        content: `The **Electronic Speed Controller (ESC)** is the translator between the Flight Controller's digital signals and the motor's analog power needs.

### How an ESC Works

An ESC converts the direct current (DC) from the battery into a three-phase alternating current (AC) to drive the brushless motor. It does this by rapidly switching field-effect transistors (FETs) on and off.

### ESC Protocols

The protocol dictates how fast the Flight Controller can tell the ESC to change RPM:
1. **PWM:** Oldest, slowest (50Hz - 400Hz).
2. **OneShot125:** Much faster analog signal.
3. **DShot (Digital Shot):** The modern standard (DShot150, 300, 600, 1200). Digital protocols don't require calibration and are immune to electrical noise.

### ESC Ratings

ESCs are rated in Amps (A). A "30A ESC" can safely pass 30 Amps of continuous current. A "Burst Rating" (e.g., 40A for 10 seconds) indicates what it can handle during rapid acceleration without melting.

> **Important:** Your ESC's amp rating must exceed your motor's maximum current draw at full throttle, otherwise the ESC will burn out.`,
        quiz: [
          { question: "What is the primary function of an ESC?", options: ["To measure battery voltage", "To convert DC battery power into 3-phase AC power to drive the motors", "To stabilize the drone", "To transmit video"], correctAnswer: 1, explanation: "The ESC regulates the speed of the brushless motor by switching DC power into 3-phase AC power.", reviewSubChapterId: "ch4-s2" },
          { question: "Which ESC protocol is fully digital and does not require throttle calibration?", options: ["PWM", "OneShot125", "MultiShot", "DShot"], correctAnswer: 3, explanation: "DShot is a digital protocol that sends exact numerical values to the ESC, eliminating the need to calibrate analog waveforms.", reviewSubChapterId: "ch4-s2" },
          { question: "If a motor draws a maximum of 35A at full throttle, which ESC continuous rating should you choose?", options: ["20A", "30A", "45A", "None of the above"], correctAnswer: 2, explanation: "You must choose an ESC with an amp rating higher than the motor's maximum draw to prevent overheating and failure.", reviewSubChapterId: "ch4-s2" },
          { question: "What does the 'Burst Rating' of an ESC indicate?", options: ["How many batteries it can handle", "The maximum current it can handle for short periods (usually ~10s)", "How loud it is", "Its maximum voltage"], correctAnswer: 1, explanation: "Burst rating provides headroom for rapid acceleration spikes without damaging the ESC components.", reviewSubChapterId: "ch4-s2" },
          { question: "What components inside the ESC do the actual switching of electrical current?", options: ["Capacitors", "Inductors", "FETs (Field-Effect Transistors)", "Resistors"], correctAnswer: 2, explanation: "FETs rapidly switch on and off to route current to the correct motor phases at the right time.", reviewSubChapterId: "ch4-s2" }
        ]
      },
      {
        id: "ch4-s3",
        title: "4.3 Propeller Science: Pitch and Diameter",
        content: `Propellers convert rotational energy into thrust. Their size and shape drastically affect how a drone flies.

### Propeller Nomenclature (e.g., 5045)

A common shorthand like "5045" describes the two most critical metrics:
- **Diameter (5.0 inches):** The distance from tip to tip.
- **Pitch (4.5 inches):** The theoretical forward distance the propeller would travel in one full rotation if moving through a solid medium (like a screw in wood).

### Diameter vs. Pitch Trade-offs

**1. Diameter:**
- *Larger Diameter:* More thrust, higher efficiency (better for lift/hovering), but takes longer to change RPM (sluggish feel).
- *Smaller Diameter:* Less thrust, less efficient, but changes RPM instantly (snappy, acrobatic feel).

**2. Pitch:**
- *High Pitch (e.g., 5.0):* High top speed, strong "grip" in the air, but draws immense current and causes "prop wash" instability at low speeds.
- *Low Pitch (e.g., 3.0):* Lower top speed, very efficient, smooth control, easy on batteries.

### Blade Count

- **Bi-blade (2 blades):** Most efficient, highest top speed, least grip.
- **Tri-blade (3 blades):** The gold standard for FPV. Great balance of grip, thrust, and efficiency.
- **Quad-blade (4+ blades):** Insane grip, very smooth, but highly inefficient (battery drains fast).`,
        realLifeExample: "Cinewhoops (drones designed to carry heavy cameras slowly and smoothly near people) often use 5-blade propellers. Inefficiency doesn't matter much for a 3-minute flight, but the ultra-smooth 'grip' on the air provides perfectly stable video.",
        quiz: [
          { question: "In a '5040' propeller, what does the '40' represent?", options: ["40 millimeters in diameter", "4.0 inches of pitch", "40 grams of weight", "4 struts"], correctAnswer: 1, explanation: "The last two digits determine pitch (4.0 inches), meaning the prop theoretically advances 4 inches per rotation.", reviewSubChapterId: "ch4-s3" },
          { question: "Which propeller combination will generally drain a battery the fastest?", options: ["Small diameter, low pitch", "Large diameter, high pitch", "Small diameter, high pitch", "Large diameter, low pitch"], correctAnswer: 1, explanation: "Large diameter with high pitch requires massive torque to spin, drawing the most electrical current.", reviewSubChapterId: "ch4-s3" },
          { question: "Why do most FPV freestyle pilots prefer Tri-blade (3-blade) propellers over Bi-blades?", options: ["They are cheaper", "Better grip and cornering authority without killing efficiency", "They are quieter", "They spin faster"], correctAnswer: 1, explanation: "Tri-blades offer the 'sweet spot' — enough surface area for sharp cornering without the massive efficiency penalty of quad-blades.", reviewSubChapterId: "ch4-s3" },
          { question: "If you want to build a long-range cruising drone, what propeller type is best?", options: ["Low pitch Bi-blade", "High pitch Quad-blade", "Low pitch Tri-blade", "High pitch Hex-blade"], correctAnswer: 0, explanation: "Bi-blades with low pitch offer the highest possible efficiency, maximizing flight times for long-range cruising.", reviewSubChapterId: "ch4-s3" },
          { question: "What is the primary drawback of a massive diameter propeller on an acrobatic drone?", options: ["Too much thrust", "Rotational inertia makes RPM changes sluggish, reducing agility", "It draws too little current", "It creates too much lift"], correctAnswer: 1, explanation: "Large props are heavy. The physics of inertia means the motor takes longer to speed them up and slow them down, making the drone feel 'floaty' or delayed.", reviewSubChapterId: "ch4-s3" }
        ]
      }
    ],
    finalExam: [
      { question: "Which component bridges the digital logic of the Flight Controller to the analog power needs of the motors?", options: ["PDB (Power Distribution Board)", "ESC (Electronic Speed Controller)", "VTx (Video Transmitter)", "RX (Receiver)"], correctAnswer: 1, explanation: "The ESC translates digital throttle commands into 3-phase AC power pulses.", reviewSubChapterId: "ch4-s2" },
      { question: "You replace a 5030 prop with a 5050 prop on the same motor. What is the immediate consequence?", options: ["Current draw decreases", "Top speed decreases", "Current draw and top speed both increase", "Flight time increases"], correctAnswer: 2, explanation: "Higher pitch (50) moves more air per rotation, increasing top speed but forcing the motor to draw significantly more amps.", reviewSubChapterId: "ch4-s3" }
    ]
  },
  {
    id: "ch5",
    title: "Chapter 5: Energy Systems (LiPo Technology)",
    description: "Powering the flight: Chemistry, safety, and charging.",
    subChapters: [
      {
        id: "ch5-s1",
        title: "5.1 Lithium Polymer (LiPo) Fundamentals",
        content: `Drones are powered by **Lithium Polymer (LiPo)** batteries. They offer the highest power-to-weight ratio available, but they are chemically volatile.

### Volts and Cells
- **1S:** 3.7V (Nominal) / 4.2V (Full)
- **4S:** 14.8V (Nominal) / 16.8V (Full)
- **6S:** 22.2V (Nominal) / 25.2V (Full)

### The C-Rating (Discharge Rate)
The 'C' rating tells you how fast the battery can safely be discharged. If a 1000mAh battery has a 100C rating, it can provide **100 Amps** of current (1Ah * 100).`,
        quiz: [
          { question: "What is the 'Nominal' voltage of a single LiPo cell?", options: ["1.5V", "3.7V", "4.2V", "12V"], correctAnswer: 1, explanation: "3.7V is the standard nominal voltage used for capacity calculations.", reviewSubChapterId: "ch5-s1" },
          { question: "At what voltage should a LiPo cell be stored for long periods?", options: ["0V", "3.0V", "3.85V", "4.2V"], correctAnswer: 2, explanation: "Storing at 3.8-3.85V per cell is the most chemically stable state.", reviewSubChapterId: "ch5-s1" },
          { question: "What is the maximum safe charged voltage for a standard LiPo cell?", options: ["3.7V", "4.0V", "4.2V", "4.35V"], correctAnswer: 2, explanation: "Charging beyond 4.2V per cell (except for LiHV) can lead to fire.", reviewSubChapterId: "ch5-s1" },
          { question: "If a 2000mAh (2Ah) battery has a 50C rating, what is its max continuous current?", options: ["50 Amps", "100 Amps", "200 Amps", "500 Amps"], correctAnswer: 1, explanation: "2Ah * 50 = 100 Amps.", reviewSubChapterId: "ch5-s1" },
          { question: "What does 'S' stand for in '4S Battery'?", options: ["Size", "Serial (Cells in series)", "Speed", "Standard"], correctAnswer: 1, explanation: "S denotes the number of cells wired in series to increase voltage.", reviewSubChapterId: "ch5-s1" }
        ]
      },
      {
        id: "ch5-s2",
        title: "5.2 Battery Maintenance & Safety",
        content: `LiPo batteries are incredibly energy-dense. Mishandling them can result in rapid thermal runaway (fire). Proper handling is the hallmark of a professional drone pilot.

### The Golden Rules of LiPo Safety

1. **Never leave a charging battery unattended.**
2. **Never charge a damaged or 'puffy' battery.** Puffs indicate chemical breakdown and trapped flammable gases inside the foil pouch.
3. **Always charge in a fireproof container** (e.g., a "Bat-Safe" or military ammo box).
4. **Never over-discharge.** Dropping below 3.2V per cell permanently damages the internal chemistry, increasing internal resistance and risk of future failure.

### Storage Voltage

LiPo chemistry is most stable at exactly **3.80V - 3.85V per cell**.
- Storing at 4.2V (fully charged) for more than a few days causes cell degradation, loss of capacity, and puffing.
- Storing below 3.5V can cause the voltage to drop below the point of no return.

### Disposal

To safely dispose of a dead or damaged LiPo, it must be completely discharged to 0V. This is usually done by connecting a 12V halogen light bulb or immersing the battery in a saltwater bath (though the bulb method is preferred by professionals).`,
        realLifeExample: "A pilot left a fully charged 6S LiPo in their hot car during summer. The heat caused the chemistry to expand, puffing the battery. When they tried to charge it later that night, the internal layers shorted out, causing a fire that destroyed their charging station.",
        quiz: [
          { question: "What does it mean if a LiPo battery feels 'puffy' or swollen?", options: ["It has extra energy stored", "The internal chemistry is breaking down and releasing flammable gas", "It is perfectly normal", "It needs to be charged immediately"], correctAnswer: 1, explanation: "Swelling is caused by outgassing of the lithium polymer chemistry when stressed or over-discharged. It is highly dangerous.", reviewSubChapterId: "ch5-s2" },
          { question: "At what voltage per cell should a LiPo battery be stored if you aren't flying it for a week?", options: ["0V", "3.2V", "3.85V", "4.2V"], correctAnswer: 2, explanation: "3.85V is the 'storage' voltage where the internal chemistry is most stable, preventing degradation and puffing.", reviewSubChapterId: "ch5-s2" },
          { question: "What is the absolute minimum voltage per cell you should never drop below to avoid permanent damage?", options: ["1.0V", "2.5V", "3.2V", "3.8V"], correctAnswer: 2, explanation: "Dropping below ~3.2V permanently damages the internal resistance of the cell, making it dangerous to charge again.", reviewSubChapterId: "ch5-s2" },
          { question: "What is the safest way to dispose of a damaged LiPo battery?", options: ["Throw it in the trash", "Puncture it to let the gas out", "Discharge it completely to 0V using a resistor or light bulb, then recycle", "Charge it to 4.2V and put it in saltwater"], correctAnswer: 2, explanation: "A battery with 0V has no stored energy and cannot catch fire, making it safe for e-waste recycling.", reviewSubChapterId: "ch5-s2" },
          { question: "Why is it dangerous to leave a fully charged LiPo sitting for weeks?", options: ["It will slowly leak acid", "The internal resistance rises, degrading the battery and potentially causing it to puff up", "It will lose its memory", "It isn't dangerous at all"], correctAnswer: 1, explanation: "Fully charged (4.2V) is a highly energetic and unstable chemical state that causes rapid wear if left sitting.", reviewSubChapterId: "ch5-s2" }
        ]
      },
      {
        id: "ch5-s3",
        title: "5.3 Power Distribution & Connectors",
        content: `Getting power from the battery to the components requires specialized boards and heavy-duty connectors designed for massive current flow.

### Battery Connectors

- **XT60:** The hobby industry standard. Can handle 60A continuous current. Yellow color.
- **XT30:** Smaller version for micro drones under 250 grams (30A continuous).
- **XT90:** Heavy-duty version for massive cinema/agricultural drones (90A continuous).

### The Power Distribution Board (PDB)

The PDB takes the massive raw voltage from the battery and splits it to where it's needed.

**1. High-Current Pads:** Raw voltage is routed through thick copper traces directly to the ESCs to power the motors.
**2. Voltage Regulators (BEC):** The flight controller, camera, and VTX cannot handle a raw 25V (6S) battery. The PDB uses built-in **BECs (Battery Eliminator Circuits)** to step the voltage down cleanly:
- **5V BEC:** Powers the Flight Controller and Receiver.
- **9V/12V BEC:** Powers the Video Transmitter (VTX) and Camera to ensure perfectly clean video without motor electrical noise.

> **Modern Trend:** Many modern Flight Controllers have the PDB built directly into them, known as an AIO (All-In-One) FC.`,
        quiz: [
          { question: "What does 'BEC' stand for in drone electronics?", options: ["Battery Energy Cell", "Battery Eliminator Circuit", "Board Electronic Control", "Bottom End Capacitor"], correctAnswer: 1, explanation: "A BEC acts as a voltage regulator, stepping high battery voltage down to clean 5V or 9V for sensitive electronics.", reviewSubChapterId: "ch5-s3" },
          { question: "Which connector standard is most commonly used on standard 5-inch FPV drones?", options: ["USB-C", "XT30", "XT60", "Deans / T-Plug"], correctAnswer: 2, explanation: "The XT60 is the industry standard for mid-sized drones, capable of handling 60A continuous current.", reviewSubChapterId: "ch5-s3" },
          { question: "Why doesn't the Flight Controller run directly off the raw 6S battery voltage?", options: ["It would short circuit", "Raw battery voltage fluctuates wildly and is too high (~25V), which would instantly fry 5V processors", "The battery voltage is too low", "It needs AC power"], correctAnswer: 1, explanation: "Processors run on 3.3V or 5V logic. Feeding them raw battery voltage would destroy them instantly.", reviewSubChapterId: "ch5-s3" },
          { question: "What component is responsible for stepping down battery voltage to power the camera?", options: ["ESC", "Motors", "Voltage Regulator / BEC on the PDB", "Receiver"], correctAnswer: 2, explanation: "The BEC (Battery Eliminator Circuit) actively regulates voltage down to a clean stream for video equipment.", reviewSubChapterId: "ch5-s3" },
          { question: "What is the primary purpose of the thick copper pads on a Power Distribution Board?", options: ["To attach the flight controller securely", "To route massive amounts of electrical current from the battery to the ESCs without melting", "To look cool", "To cool the drone down"], correctAnswer: 1, explanation: "Motors draw hundreds of amps at full throttle. The incredibly thick copper traces on the PDB carry this heavy load safely.", reviewSubChapterId: "ch5-s3" }
        ]
      }
    ],
    finalExam: [
      { question: "What happens if a LiPo battery is repeatedly over-discharged below 3.0V per cell?", options: ["It gains more capacity", "Internal resistance permanently increases, destroying its ability to deliver high current safely", "Nothing happens", "It turns into a lithium-ion battery"], correctAnswer: 1, explanation: "Deep discharging damages the chemical formulation, permanently ruining the battery's performance and safety.", reviewSubChapterId: "ch5-s2" },
      { question: "Why do modern flight controllers require a 5V BEC rather than using raw battery power?", options: ["Batteries do not produce 5V", "Raw battery power fluctuates wildly as motors spin and its voltage is far too high for microprocessors", "BECs provide AC power", "To save weight"], correctAnswer: 1, explanation: "Processors require perfectly stable, low-voltage (usually 5V or 3.3V) DC power to function.", reviewSubChapterId: "ch5-s3" }
    ]
  },
  {
    id: "ch6",
    title: "Chapter 6: Flight Controllers & PID Logic",
    description: "The brain of the drone: How logic maintains stability.",
    subChapters: [
      {
        id: "ch6-s1",
        title: "6.1 The PID Control Loop",
        content: `A drone is inherently unstable. It stays level because the **Flight Controller (FC)** calculates motor adjustments thousands of times per second using a **PID Loop**.

### P (Proportional): 'The Present'
Corrects the current error. If the drone is tilted left, P pushes right. High P makes the drone feel 'locked in' but can cause fast oscillations.

### I (Integral): 'The Past'
Corrects persistent errors over time, like wind-drift. It 'remembers' that the drone hasn't reached its target and adds more force.

### D (Derivative): 'The Future'
The 'shock absorber'. It predicts where the drone is going and slows down the movement to prevent overshooting.`,
        quiz: [
          { question: "Which part of the PID loop acts as a 'shock absorber' to prevent overshooting?", options: ["Proportional", "Integral", "Derivative", "None"], correctAnswer: 2, explanation: "Derivative math looks at the rate of change and provides damping.", reviewSubChapterId: "ch6-s1" },
          { question: "If your drone is 'drifting' slowly in the wind and won't hold its angle, which value likely needs increasing?", options: ["P", "I", "D", "Throttle"], correctAnswer: 1, explanation: "Integral is responsible for correcting errors that accumulate over time.", reviewSubChapterId: "ch6-s1" },
          { question: "What sensor provides the raw data for the PID loop to maintain level flight?", options: ["GPS", "IMU (Gyroscope/Accelerometer)", "Barometer", "Compass"], correctAnswer: 1, explanation: "The IMU provides angular velocity and acceleration data to the FC.", reviewSubChapterId: "ch6-s1" },
          { question: "Fast, audible oscillations (vibration) are usually caused by having which value too high?", options: ["P Gain", "I Gain", "Battery Voltage", "Prop Pitch"], correctAnswer: 0, explanation: "High Proportional gain causes the system to over-correct too quickly.", reviewSubChapterId: "ch6-s1" },
          { question: "A PID loop is an example of what kind of system?", options: ["Open Loop", "Closed Loop Feed-back", "Manual Control", "Passive System"], correctAnswer: 1, explanation: "It continuously measures its own output and adjusts based on the error.", reviewSubChapterId: "ch6-s1" }
        ]
      },
      {
        id: "ch6-s2",
        title: "6.2 IMU (Inertial Measurement Unit)",
        content: `The PID loop needs to know the drone's actual state before it can correct errors. It gets this data from the **Inertial Measurement Unit (IMU)**, which contains a Gyroscope and an Accelerometer.

### The Gyroscope (Gyro)

The gyro measures **rotation rate** (Angular Velocity) in degrees per second on three axes:
- **Pitch:** Tilting forward/backward (like nodding).
- **Roll:** Tilting left/right.
- **Yaw:** Spinning flatly left/right.

The FC relies almost entirely on the gyro during acrobatic flight (Acro Mode) to maintain the exact angle the pilot requested.

### The Accelerometer (Accel)

The accelerometer measures **linear acceleration** and, crucially, **gravity**.
- It knows which way is "down" by feeling the constant 1G pull of gravity.
- It is required for self-leveling modes (Angle/Horizon mode). Without it, the drone wouldn't know how to return to a flat hover.

> **Why two sensors?** Accelerometers are highly susceptible to vibration from the motors (they feel every vibration as acceleration). Gyros are smoother but drift over time. The FC fuses data from both to get an accurate picture.`,
        quiz: [
          { question: "What two sensors make up a standard drone IMU?", options: ["GPS and Barometer", "Gyroscope and Accelerometer", "Magnetometer and Sonar", "Camera and VTX"], correctAnswer: 1, explanation: "The IMU relies on the Gyro to measure rotation and Accelerometer to measure gravity/linear acceleration.", reviewSubChapterId: "ch6-s2" },
          { question: "Which sensor is absolutely required for a drone to have a 'self-leveling' flight mode like Angle or Horizon?", options: ["Gyroscope", "Accelerometer", "GPS", "Lidar"], correctAnswer: 1, explanation: "The accelerometer detects the constant pull of Earth's gravity to know which way is mathematically 'down', allowing it to level out.", reviewSubChapterId: "ch6-s2" },
          { question: "What does the Gyroscope measure?", options: ["Magnetic north", "Altitude", "Angular velocity (how fast it is spinning)", "Wind speed"], correctAnswer: 2, explanation: "Gyros measure the rate of rotation in degrees per second around the pitch, roll, and yaw axes.", reviewSubChapterId: "ch6-s2" },
          { question: "Why doesn't the Flight Controller just use the Accelerometer for all stabilization?", options: ["It breaks easily", "It is highly susceptible to mechanical vibrations from the motors, making the data very 'noisy'", "It uses too much battery power", "It doesn't work upside down"], correctAnswer: 1, explanation: "Accelerometers feel every tiny bump and motor vibration, so the FC relies heavily on the smoother gyro data for split-second corrections.", reviewSubChapterId: "ch6-s2" },
          { question: "What is 'Yaw'?", options: ["Moving forward", "Moving up", "Tilting left", "Rotating flatly left or right like a spinning top"], correctAnswer: 3, explanation: "Yaw is rotation around the vertical Z-axis.", reviewSubChapterId: "ch6-s2" }
        ]
      },
      {
        id: "ch6-s3",
        title: "6.3 Filters & Blackbox Data",
        content: `A drone is a violent mechanical environment. The motors and propellers generate massive amounts of vibration. If this vibration reaches the PID loop, the drone will shake, motors will overheat, and it may fly away uncontrollably.

### The Role of Software Filtering

The flight controller uses complex mathematical **filters** to clean the noisy data from the IMU before feeding it into the PID loop.
- **Low-Pass Filter:** Allows low frequencies (real drone movement) to pass through to the PID loop, but blocks high frequencies (motor vibrations).
- **Notch Filter:** Targets a very specific, narrow frequency band (like the exact frequency a bent propeller is vibrating at) and completely removes it.

> **The Trade-off:** More filtering makes a drone smoother, but filters introduce **Latency (Delay)**. If the delay is too high, the PID loop is acting on past data, causing "prop wash" handling issues.

### Blackbox Logging

Professional pilots use **Blackbox** to record everything the FC is "thinking" at 1000+ times per second. By reviewing this data using Blackbox Explorer software, engineers can perfectly tune PID values and eliminate specific mechanical resonance frequencies affecting flight performance.`,
        quiz: [
          { question: "What is the primary danger if mechanical vibrations make it into the PID loop without being filtered?", options: ["The battery will die faster", "The drone will fly perfectly", "The motors will wildly overcorrect, rapidly overheating and potentially catching fire", "The video feed will cut out"], correctAnswer: 2, explanation: "The motors will try to 'correct' the vibration, drawing massive amps and burning themselves out.", reviewSubChapterId: "ch6-s3" },
          { question: "What type of filter blocks high-frequency motor noise but lets low-frequency pilot inputs pass through?", options: ["Coffee filter", "Low-Pass Filter", "High-Pass Filter", "Band-Pass Filter"], correctAnswer: 1, explanation: "A low-pass filter literally lets low frequencies pass while blocking high ones.", reviewSubChapterId: "ch6-s3" },
          { question: "What is the negative side effect of adding too much software filtering?", options: ["It uses too much storage space", "It introduces latency (delay) to the control loop, causing handling issues", "It limits top speed", "It damages the IMU"], correctAnswer: 1, explanation: "Math takes time. Heavy filtering means the PID loop is reacting to what the drone was doing milliseconds ago, not what it is doing right now.", reviewSubChapterId: "ch6-s3" },
          { question: "What type of filter acts like a 'sniper', targeting and removing a very specific frequency of vibration?", options: ["Low-Pass", "High-Pass", "Notch Filter", "Kalman Filter"], correctAnswer: 2, explanation: "A Notch filter removes a very narrow band of frequencies without affecting the data above or below it.", reviewSubChapterId: "ch6-s3" },
          { question: "What tool allows engineers to view EXACTLY what the Gyro, PID loop, and motors were doing during a flight?", options: ["A multimeter", "Blackbox Data Logging", "A wind tunnel", "An oscilloscope"], correctAnswer: 1, explanation: "Blackbox logging records all internal FC variables to an SD card or flash chip at high speed for post-flight analysis.", reviewSubChapterId: "ch6-s3" }
        ]
      }
    ],
    finalExam: [
      { question: "Which sensor is responsible for feeling rotational velocity in Acro mode?", options: ["Barometer", "Gyroscope", "Accelerometer", "GPS"], correctAnswer: 1, explanation: "The gyro measures angular velocity, which is the core metric needed to maintain a specific angle.", reviewSubChapterId: "ch6-s2" },
      { question: "How does excessive filtering negatively impact drone handling?", options: ["It drains the battery", "It limits the maximum throttle", "It introduces phase delay (latency) so the PID loop corrects 'old' errors", "It causes motor desync"], correctAnswer: 2, explanation: "Filter delay causes the PID loop to react too late, which usually manifests as bad prop-wash handling.", reviewSubChapterId: "ch6-s3" }
    ]
  },
  {
    id: "ch7",
    title: "Chapter 7: Sensor Fusion",
    description: "Integrating GPS, IMU, and Magnetometers for autonomous flight.",
    subChapters: [
      {
        id: "ch7-s1",
        title: "7.1 GPS and EKF (Extended Kalman Filters)",
        content: `For a drone to know its position in 3D space, it must fuse data from multiple sensors. We call this **Sensor Fusion**, and it's managed by the **Extended Kalman Filter (EKF)**.

### GNSS (Global Navigation Satellite System)
Modern drones don't just use GPS (US). They also use **GLONASS** (Russia), **Galileo** (EU), and **BeiDou** (China) simultaneously.

### The IMU and Magnetometer
The EKF uses the GPS for 'where I am', the IMU for 'which way am I moving', and the Magnetometer (Compass) for 'which way am I facing'. Without a calibrated compass, autonomous modes like 'Return to Home' will fail.`,
        quiz: [
          { question: "What does the EKF stand for in drone sensor logic?", options: ["Electronic Kinetic Filter", "Extended Kalman Filter", "Emergency Kill Function", "Engineered Kalman Flow"], correctAnswer: 1, explanation: "EKF is the algorithm that fuses noisy sensor data into a single clean estimate of position.", reviewSubChapterId: "ch7-s1" },
          { question: "Which sensor is most likely to be affected by flying near large magnetic structures?", options: ["GPS", "Barometer", "Magnetometer (Compass)", "Gyroscope"], correctAnswer: 2, explanation: "Compasses are very sensitive to local magnetic interference from steel and power lines.", reviewSubChapterId: "ch7-s1" },
          { question: "How many satellites are typically required for a reliable 3D GPS lock?", options: ["1", "3", "6+", "50"], correctAnswer: 2, explanation: "While 4 is technically enough for 3D, 6 or more are needed for safety and accuracy in UAS.", reviewSubChapterId: "ch7-s1" },
          { question: "Which sensor measures altitude based on air pressure?", options: ["GPS", "Barometer", "Sonar", "Magnetometer"], correctAnswer: 1, explanation: "Barometric sensors measure the weight of the air above to estimate height.", reviewSubChapterId: "ch7-s1" },
          { question: "What is 'GNSS'?", options: ["A specific satellite", "The collective system of all navigation satellite constellations", "A type of motor", "A flight controller"], correctAnswer: 1, explanation: "GNSS is the umbrella term for all systems like GPS, Galileo, and GLONASS.", reviewSubChapterId: "ch7-s1" }
        ]
      },
      {
        id: "ch7-s2",
        title: "7.2 Altitude & Position: Barometers and Optical Flow",
        content: `While GPS provides global positioning, it is surprisingly inaccurate at determining precise altitude (vertical Z-axis). To maintain a perfectly stable hover, drones rely on secondary sensors.

### The Barometer

A barometer measures atmospheric pressure. Because air pressure decreases deterministically as you go higher, the drone uses this to calculate altitude.
- **Precision:** Can detect altitude changes as small as 10 centimeters.
- **Vulnerability:** Highly sensitive to wind gusts and the "prop wash" from the drone's own propellers, which changes local air pressure. Barometers are usually covered with a piece of open-cell foam to protect them from wind noise.

### Optical Flow Sensors

Optical flow uses a tiny downward-facing camera to stare at the ground and track the movement of pixels.
- If the pixels move left, the drone knows it drifted right, and automatically corrects.
- This is how drones like the DJI Mini can hover perfectly still indoors where there is no GPS signal.
- **Limitations:** Fails over featureless surfaces (like glass or smooth water) and doesn't work in the dark.`,
        quiz: [
          { question: "Why do drones use a barometer instead of relying solely on GPS for altitude?", options: ["GPS doesn't work in the sky", "GPS vertical altitude estimation is significantly less precise than its horizontal accuracy", "Barometers use less battery", "Barometers look cooler"], correctAnswer: 1, explanation: "GPS is great for X/Y position, but geometry makes it poor at calculating Z (altitude) precisely. A barometer fills this gap.", reviewSubChapterId: "ch7-s2" },
          { question: "What physical metric does a barometer measure to determine altitude?", options: ["Temperature", "Wind speed", "Atmospheric air pressure", "Distance to the ground"], correctAnswer: 2, explanation: "Air pressure decreases as altitude increases. The barometer senses this minute drop in pressure.", reviewSubChapterId: "ch7-s2" },
          { question: "Why is the barometer on a flight controller usually covered with a piece of foam?", options: ["To keep it warm", "To shield it from wind gusts and propeller drafts that would cause false pressure readings", "To make it waterproof", "To protect it during crashes"], correctAnswer: 1, explanation: "Wind blowing directly into the tiny hole on a barometer creates a pressure spike, confusing the FC into thinking its altitude suddenly changed.", reviewSubChapterId: "ch7-s2" },
          { question: "How does an Optical Flow sensor stabilize a drone indoors?", options: ["By reading the WiFi signals in the building", "By using a downward camera to track the movement of patterns/textures on the floor", "By bouncing sound waves off the walls", "By detecting the Earth's magnetic field"], correctAnswer: 1, explanation: "Optical flow acts like an optical computer mouse, tracking the shift of pixels to detect ground movement.", reviewSubChapterId: "ch7-s2" },
          { question: "Over which surface would an Optical Flow sensor likely fail?", options: ["A highly patterned carpet", "Concrete pavement", "A featureless, completely smooth mirror or perfectly calm water", "Grass"], correctAnswer: 2, explanation: "If the surface is uniform and has no features (like clear glass or dark water), the camera cannot detect movement because all pixels look the same.", reviewSubChapterId: "ch7-s2" }
        ]
      },
      {
        id: "ch7-s3",
        title: "7.3 Lidar and Obstacle Avoidance",
        content: `Advanced autonomous drones rely heavily on active sensors to "see" the world around them in 3D and avoid crashing.

### Lidar (Light Detection and Ranging)

Lidar works by firing millions of microscopic laser pulses every second and measuring exactly how long they take to bounce back (Time of Flight).
- **Result:** It generates a highly accurate, millimeter-precise "Point Cloud" — a 3D digital map of the surrounding environment.
- **Use Case:** Creating detailed topographical maps, penetrating through forest canopies to see the ground below, and high-end obstacle avoidance.

### Stereoscopic Vision

Many drones (like DJI's Mavic series) use dual cameras mounted side-by-side to mimic human depth perception.
- The software compares the slightly different images from the left and right cameras to calculate the distance to objects.
- **Advantage:** Cheaper, lighter, and uses less power than Lidar.
- **Disadvantage:** Fails in low light or fog, and struggles with small/thin objects like bare tree branches or power lines.`,
        quiz: [
          { question: "How does Lidar determine the distance to an object?", options: ["By taking two photos and comparing them", "By measuring the Time of Flight of a laser pulse bouncing off the object", "By using ultrasonic sound waves", "By measuring changes in air pressure"], correctAnswer: 1, explanation: "Lidar fires a laser and times exactly how long the light takes to return, knowing that light travels at a constant speed.", reviewSubChapterId: "ch7-s3" },
          { question: "What is the primary output generated by a Lidar scan?", options: ["A high-resolution photograph", "A 2D map", "A 3D 'Point Cloud' composed of millions of data points", "A thermal image"], correctAnswer: 2, explanation: "Every laser bounce becomes a single dot in a massive 3D model called a point cloud.", reviewSubChapterId: "ch7-s3" },
          { question: "Why is Lidar highly valued in forestry and surveying?", options: ["It is very cheap", "The laser pulses can slip through gaps in the tree canopy to map the ground underneath", "It doesn't use any battery", "It takes high-color photos"], correctAnswer: 1, explanation: "Unlike a standard camera that only sees the top of a forest, millions of Lidar pulses can penetrate the gaps in leaves to hit the dirt below, allowing mapmakers to 'remove' the trees digitally.", reviewSubChapterId: "ch7-s3" },
          { question: "How does Stereoscopic Vision generally calculate depth?", options: ["Using lasers", "Using sound", "By comparing the perspective shift between two side-by-side cameras", "By using a thermometer"], correctAnswer: 2, explanation: "Like human eyes, stereoscopic systems use the parallax difference between two lenses to triangulate distance.", reviewSubChapterId: "ch7-s3" },
          { question: "What is a major limitation of camera-based (stereoscopic) obstacle avoidance compared to Lidar?", options: ["It is too heavy", "It fails in low light/darkness and struggles with thin objects like power lines", "It is illegal to use", "It only works indoors"], correctAnswer: 1, explanation: "Cameras need light to see, and they lack the sheer resolution to reliably detect thin, untextured wires that a laser would ping.", reviewSubChapterId: "ch7-s3" }
        ]
      }
    ],
    finalExam: [
      { question: "If your drone is indoors where there is no GPS signal, what two sensors does it rely on to maintain a stable hover in one place?", options: ["Magnetometer and Lidar", "Optical Flow (for X/Y position) and Barometer or Sonar (for Z altitude)", "Gyroscope and Magnetometer", "Camera and VTX"], correctAnswer: 1, explanation: "Without GPS, the drone uses downward visual tracking to hold position and pressure/sonar to hold its height.", reviewSubChapterId: "ch7-s2" },
      { question: "What type of sensor creates a 3D point cloud by measuring the time-of-flight of laser pulses?", options: ["Stereoscopic Camera", "Radar", "Lidar", "Sonar"], correctAnswer: 2, explanation: "Lidar is the premier technology for generating high-density 3D spatial data using light.", reviewSubChapterId: "ch7-s3" }
    ]
  }
];
