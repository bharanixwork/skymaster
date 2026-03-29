import { Chapter } from '../../types';

export const module6Chapters: Chapter[] = [
  {
    id: "ch31",
    title: "Chapter 31: Industrial Inspections",
    description: "Telecom towers, wind turbines, and bridges.",
    subChapters: [
      {
        id: "ch31-s1",
        title: "31.1 Cell Tower and Infrastructure Inspection",
        content: `Climbing a 300-foot telecom tower is one of the most dangerous jobs in the world. Drones remove humans from this equation entirely.

**Automated Flight Profiles:** Drones like the Skydio X10 use advanced SLAM to execute an automated "Cylinder Sweep." The pilot taps the tower in the app, and the drone autonomously maps a 360-degree helical pattern up and down the tower, snapping thousands of 45-megapixel photos. 
These photos are processed into a millimeter-accurate 3D Digital Twin, allowing engineers back in the office to measure the exact down-tilt angle of an antenna instantly.`,
        quiz: [
          {
            question: "Instead of flying manually, how do professional drones inspect cell towers?",
            options: ["They crash into it", "They perform automated, precise helical sweep patterns guided by AI software", "They drop cameras on the tower", "They just fly straight up and down once"],
            correctAnswer: 1,
            explanation: "Helical sweeps ensure perfectly overlapping photos with zero pilot error, capturing the entire circumference of the structure.",
            reviewSubChapterId: "ch31-s1"
          }
        ]
      },
      {
        id: "ch31-s2",
        title: "31.2 Wind Turbine Operations",
        content: `Wind turbines pose an extreme challenge: they are 400+ feet tall and constantly buffeted by massive winds.

**Blade Degradation:** The leading edge of a fiberglass turbine blade spins at over 150 mph. Rain and dirt physically erode the edge, causing severe aerodynamic turbulence that saps power generation.
**The Inspection:** Pilots use high-end zoom cameras (e.g., DJI H20T - 200x Hybrid Zoom) to photograph hairline fractures in the fiberglass from 100 feet away, ensuring they don't crash into the massive blades. Advanced software uses AI to automatically detect the severity of cracks and generate repair reports.`,
        realLifeExample: "A wind farm operating 100 turbines can hire rope-access technicians to repel down blades—which takes 3 weeks—or they can hire two drone crews and finish the entire farm in 3 days, saving tens of thousands of dollars in lost power generation.",
        quiz: [
          {
            question: "Why do drone operators use massive telephoto zoom lenses to inspect wind turbines?",
            options: ["To take cool cinematic shots", "To stay safely away from the massive spinning blades while inspecting hairline fractures", "Because the drone is too heavy to fly near the turbine", "To increase flight time"],
            correctAnswer: 1,
            explanation: "Staying incredibly far away using powerful optical zooms mitigates the severe crash risk posed by high winds at 400 feet.",
            reviewSubChapterId: "ch31-s2"
          }
        ]
      },
      {
        id: "ch31-s3",
        title: "31.3 Confined Space Deliverables",
        content: `Drones like the Flyability Elios 3 are designed specifically to fly inside completely dark, GPS-denied concrete sewers, boilers, and nuclear reactor containment vessels.

**The Physics:** Confined space drones are encased entirely in a carbon-fiber collision cage.
- **Lighting:** Since it's pitch black, they carry 10,000+ lumen LED strobe grids.
- **Navigation:** Because GPS doesn't exist underground, they rely 100% on onboard LiDAR SLAM to prevent crashing into walls and to build 3D maps of totally unmapped, toxic subterranean pipe networks.`,
        quiz: [
          {
            question: "What is the key structural feature of a drone designed for confined space (like a sewer pipe)?",
            options: ["A full carbon-fiber collision-tolerant cage enclosing all propellers", "It is made of sponge", "It has massive 15-inch propellers", "It has no camera"],
            correctAnswer: 0,
            explanation: "Sewer pilots bounce drones directly off walls. An external freely-rotating collision cage makes this completely safe.",
            reviewSubChapterId: "ch31-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch32",
    title: "Chapter 32: Environmental and Marine Drone Ops",
    description: "Monitoring the oceans, weather, and wildlife.",
    subChapters: [
      {
        id: "ch32-s1",
        title: "32.1 SnotBot: Whale Research",
        content: `One of the most profound uses of drones is marine biology observation. Previously, researchers had to chase whales with loud speedboats, causing the whales massive stress.

**The Solution:** The "SnotBot" drone. Specially modified multi-rotors fly hundreds of feet above a breaching whale and hover stationary. When the whale dramatically exhales through its blowhole, the drone dives through the mist, capturing the whale's mucus on a collection pad. 
This mucus is sequenced for DNA, stress hormones, and stomach microbiomes—providing a complete health profile of an 80-ton animal without ever touching it.`,
        quiz: [
          {
            question: "What is the biological advantage of using a drone to collect whale breath droplets (SnotBot)?",
            options: ["It looks cooler on Instagram", "It prevents severe stress on the whale caused by approaching in noisy speedboats", "The drone swims faster", "It measures the water temperature"],
            correctAnswer: 1,
            explanation: "Non-invasive research is immensely critical. Drones at 50 FT altitude cause zero disturbance to cetaceans.",
            reviewSubChapterId: "ch32-s1"
          }
        ]
      },
      {
        id: "ch32-s2",
        title: "32.2 Meteorological Drones",
        content: `Small drones are beginning to replace weather balloons.

**Meteodrones:** Traditional weather balloons pop in the stratosphere and pollute the environment. Weather drones fly aggressive vertical paths straight into thunderheads, carrying high-precision barometers, humidity, and temperature sensors to profile the atmospheric boundary layer.
This data is uploaded instantly via 5G to massive supercomputers updating severe weather forecast models (like tornado paths) in real time.`,
        realLifeExample: "In the United States, storm-chasing universities deploy drones structurally reinforced with Kevlar directly into the feeder bands of supercells to measure pressure gradients, helping issue Tornado Warnings 15 minutes faster.",
        quiz: [
          {
            question: "How do meteorological drones gain an advantage over traditional weather balloons?",
            options: ["They are cheaper to lose", "They can launch into severe storms to gather atmospheric pressure data and then fly back to be reused", "They carry heavier cameras", "They fly to outer space"],
            correctAnswer: 1,
            explanation: "Balloons are unguided and single-use. Drones can profile specific altitude bands repetitively and return safely.",
            reviewSubChapterId: "ch32-s2"
          }
        ]
      },
      {
        id: "ch32-s3",
        title: "32.3 Water Sampling and Bathymetry",
        content: `Drones are being heavily adopted by water quality engineers.

**Water Sampling:** Heavy-lift hexacopters are rigged with a winch carrying a 1-liter bottle. The drone flies to the exact center of a toxic algae bloom in a lake, descends the bottle to precisely 2 meters deep, caps it, and flies it back. It keeps humans utterly safe from hazardous exposure.
**Bathymetry Maps:** Instead of mapping the ground with LiDAR, specialized drones drag Green-Laser Bathymetric LiDAR systems or small Sonar buoys to map the topographical floor of lakes, rivers, and shallow coastal reefs.`,
        quiz: [
          {
            question: "Which technology is specifically used by drones to map the underwater depth (bathymetry) of coastal shorelines?",
            options: ["Thermal Cameras", "Green-Laser Bathymetric LiDAR", "Infrared sensors", "Microphones"],
            correctAnswer: 1,
            explanation: "Standard near-infrared LiDAR bounces off water. Green-laser LiDAR can penetrate clear water to map the seafloor below.",
            reviewSubChapterId: "ch32-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch33",
    title: "Chapter 33: Fixed-Wing vs Hybrid eVTOL Aircraft",
    description: "The mechanics of extreme range flight.",
    subChapters: [
      {
        id: "ch33-s1",
        title: "33.1 The Aerodynamics of Fixed-Wing Drones",
        content: `Multi-rotors are horribly inefficient because they waste 90% of their energy fighting gravity. Fixed-wing drones (planes) use aerodynamic lift.

**The Lift-to-Drag Ratio (L/D):** This is the measure of a fixed-wing drone's glide efficiency. A typical multi-rotor has an L/D near zero. A high-end fixed-wing drone achieves an L/D ratio of 15:1. This means it glides 15 feet forward for every 1 foot it drops. 
Once moving at a 35mph cruise speed, the motor only thrusts forward to overcome minimal drag, tripling or quadrupling flight times. Ranges of 50-100 kilometers are standard.`,
        quiz: [
          {
            question: "What is the primary aerodynamic metric that allows fixed-wing drones to fly vastly longer ranges than quadcopters?",
            options: ["The Hover thrust", "The Lift-to-Drag (L/D) Ratio", "The amount of propellers", "The weight"],
            correctAnswer: 1,
            explanation: "An extremely high Lift-to-Drag ratio allows the drone to ride the air like a surfer, sipping battery power just to overcome drag.",
            reviewSubChapterId: "ch33-s1"
          }
        ]
      },
      {
        id: "ch33-s2",
        title: "33.2 Hybrid Regional VTOL Architecture",
        content: `Fixed-wings are incredibly efficient but require a runway or a dangerous hand-launch to take off, and a belly-landing that often damages expensive cameras.

**The Hybrid VTOL (Vertical Take-off and Landing):** The ultimate solution. 
These drones look like a traditional airplane, but have four standard quadcopter motors mounted to the wings (e.g., WingtraOne, Quantum Trinity). 
- **The Transition:** They hover straight up like a quadcopter to 200 feet. Then, they initiate **Transition Flight.** A rear pusher-prop engages, pushing the drone forward. Once it hits 30mph, the wings generate lift, and the four hover motors entirely shut down.
The drone is now an airplane. When it finishes its 90-minute mapping mission, it slows down, stalls precisely over the launch pad, fires the hover motors back up, and lands gently like a helicopter.`,
        realLifeExample: "The WingtraOne stands straight up on its tail. It literally takes off vertically like a SpaceX rocket, then physically snaps 90-degrees horizontal in the air into airplane mode.",
        quiz: [
          {
            question: "What is 'Transition Flight' in a Hybrid VTOL drone?",
            options: ["Changing the battery mid-flight", "The incredibly complex phase where the drone shifts from relying on quadcopter thrust (Hover) to fixed-wing aerodynamic lift (Cruise)", "Flipping the drone upside down", "Updating the firmware"],
            correctAnswer: 1,
            explanation: "Transition flight is the most dangerous and mathematically complex moment in VTOL flight, requiring the PID controller to smoothly hand off control entirely from motors to control surfaces (ailerons/elevators).",
            reviewSubChapterId: "ch33-s2"
          }
        ]
      },
      {
        id: "ch33-s3",
        title: "33.3 Battery Management for VTOLs",
        content: `A VTOL has conflicting battery requirements.
- The 4 hover motors require sudden, aggressive 100 Amp bursts (High C-Rating required).
- The single forward cruise motor requires a tiny, sustained 5 Amp draw for two hours (High Capacity, low weight required).

**The Battery Compromise:** VTOL manufacturers utilize Lithium-Ion (Li-Ion) 18650 or 21700 cells instead of standard LiPos. 
Li-Ions have far greater energy density (they hold drastically more mAh per gram), but they have very low discharge rates (C-Ratings). The launch is meticulously programmed to draw just under the Li-Ion's failure limit, sacrificing climb speed to maximize 2-hour cruise capacities.`,
        quiz: [
          {
            question: "Why do long-range fixed-wing VTOL drones primarily use Lithium-Ion (Li-Ion) cells instead of Lithium Polymer (LiPo)?",
            options: ["Because they look bigger", "Because Li-Ion cells have significantly higher energy density (more flight time per gram), despite their lower burst current capability", "Because Li-Ion cells are fireproof", "Because LiPos are illegal"],
            correctAnswer: 1,
            explanation: "Since 90% of a VTOL flight is a low-amp cruise, the massive energy density of Li-Ions vastly outweighs the high-burst capability of LiPos.",
            reviewSubChapterId: "ch33-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch34",
    title: "Chapter 34: Law Enforcement and Public Safety Ops",
    description: "The role of UAS in police, fire, and tactical ops.",
    subChapters: [
      {
        id: "ch34-s1",
        title: "34.1 DFR (Drone as First Responder)",
        content: `The traditional 911 response involves immediately dispatching a patrol car. 

**The DFR Model:** Police departments (like Chula Vista PD) place "Drone-in-a-Box" systems on tall roofs across the city. When a 911 call drops, an officer in a command center hits launch. Because a drone flies at 50mph over traffic, it arrives at the crime scene in exactly **90 seconds**—minutes before officers.
The drone spots a suspect escaping an alley and streams a 200x optical zoom feed directly to the phones of incoming officers, vastly de-escalating violence and increasing situational awareness safely.`,
        quiz: [
          {
            question: "What is the primary advantage of the Drone as First Responder (DFR) program?",
            options: ["It shoots weapons", "It arrives on the 911 scene immediately, providing perfect oversight and intelligence to the ground units before they arrive blindly", "It drops water payloads", "It is cheaper than paying police"],
            correctAnswer: 1,
            explanation: "Information is life-saving. Knowing exactly what a suspect is doing before officers pull up to the curb defuses massively volatile situations.",
            reviewSubChapterId: "ch34-s1"
          }
        ]
      },
      {
        id: "ch34-s2",
        title: "34.2 Tactical Indoor Ops & SWAT",
        content: `Entering a barricaded house with a suspect is the most dangerous operation in law enforcement.

**Indoor Tactical FPV:** SWAT teams now utilize specialized indoor drones (like the DJI Avata or custom FPV 'turtlemode' whoops). These drones feature heavily guarded props, ultra-bright LED headlights, and 2-way audio speakers.
The team flies the drone through a broken window, clears every room of the house dynamically via video goggles, and can literally speak to the suspect through the drone to negotiate surrender, entirely neutralizing the danger to human SWAT members.`,
        realLifeExample: "A suspect is hiding in a dark attic. The SWAT team throws a 1-pound protected FPV drone through the drywall hole. It crashes gracefully, uses 'turtle mode' to flip itself back over, and turns on its floodlights, finding the suspect instantly.",
        quiz: [
          {
            question: "What feature is imperative for indoor tactical FPV drones flown by SWAT?",
            options: ["A 4K movie camera", "Aggressive propeller guards and 'Turtle Mode' (the ability to flip over if crashed)", "A massive payload drop system", "A parachute"],
            correctAnswer: 1,
            explanation: "Inside tight homes, the drone will eventually hit a wall and crash on its back. Turtle Mode allows the pilot to flip it upright and keep clearing rooms.",
            reviewSubChapterId: "ch34-s2"
          }
        ]
      },
      {
        id: "ch34-s3",
        title: "34.3 Firefighting Multi-rotor Solutions",
        content: `Fire departments are deploying rapid-response drones to structure fires and wildfires.

**Overhead Thermal Command:** A chief stands identically in front of the burning building. However, the drone hovering above provides a radiometric thermal view of the roof. The Chief watches a bright white thermal blob expand under the roof shingles and immediately radios firefighters on the roof to evacuate exactly 20 seconds before the structural timbers collapse.
Furthermore, specialized heavy lifters drop "Dragon Eggs"—ignition spheres that start controlled backburns to starve sweeping wildfires in mountain ranges inaccessible to humans.`,
        quiz: [
          {
            question: "How does a thermal drone directly save the lives of firefighters working on a burning roof?",
            options: ["By dropping water on them", "It can see the exact massive heat signature of structural fire destroying the trusses underneath the roof, predicting collapse", "By providing them light", "By carrying them off the roof"],
            correctAnswer: 1,
            explanation: "A standard roof looks identical to the naked eye until the second it drops. A radiometric thermal camera sees extreme temperatures raging under the tiles.",
            reviewSubChapterId: "ch34-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch35",
    title: "Chapter 35: Extreme Long Range and LoRa Protocols",
    description: "Pushing the absolute boundaries of RC flight.",
    subChapters: [
      {
        id: "ch35-s1",
        title: "35.1 The 100km Flight Challenge",
        content: `Extreme Long Range (LR) FPV involves flights pushing 10, 20, or even 100 kilometers out and back. It is the marathon of drone building.

**The Physics of LR:** A standard 5-inch drone cannot achieve LR. You must build a 7-inch to 10-inch custom quadcopter or use a highly efficient fixed-wing.
- **The Frame:** Uses long arms to swing 7-inch Bi-blade (not Tri-blade) props. Bi-blades are far more aerodynamically efficient.
- **The Battery:** Heavy Li-Ion (Lithium Ion) packs configured in 6S2P (6 cells in series, 2 rows in parallel) pushing 8000mAh.
- **The Weight:** Every gram counts. A GoPro is often stripped of its battery and screen ("Naked GoPro") purely to shave 70 grams of drag and mass.`,
        quiz: [
          {
            question: "Why do Long Range drones use 7-inch Bi-Blade (two bladed) propellers instead of the standard Tri-blades used by racers?",
            options: ["They look much cooler", "Bi-blade propellers offer significantly higher aerodynamic efficiency and longer flight times during cruise", "They spin faster", "They are heavier"],
            correctAnswer: 1,
            explanation: "While tri-blades offer fantastic cornering grip for racers, they suffer from high drag. Bi-blades slice the air cleanly, sipping battery for long straight-line cruising.",
            reviewSubChapterId: "ch35-s1"
          }
        ]
      },
      {
        id: "ch35-s2",
        title: "35.2 Advanced Antenna Tracking",
        content: `If you fly a drone 10 miles away behind a mountain, standard omnidirectional antennas will lose video immediately.

**Directional Patches:** You need a high-gain, 15+ dbi directional patch antenna focused like a sniper scope on the exact location of the drone.
**Antenna Trackers:** If the drone moves outside the 15-degree cone of the patch antenna, you lose video. Long Range pilots build "Antenna Trackers." A tripod mounted on the ground receives the drone's active GPS coordinates via Crossfire telemetry, runs them through a microprocessor, and physically aims motorized servos to keep the massive video antenna pointed flawlessly at the drone as it orbits a mountain miles away.`,
        realLifeExample: "Surfing mountain peaks in the Swiss Alps requires exact LOS. Pilots stand on one peak, facing the tracker at another peak 5km away, flying entirely via the directional microwave tunnel created by the tracker.",
        quiz: [
          {
            question: "What is an Antenna Tracker's primary purpose during an extreme long range flight?",
            options: ["To keep the battery charged", "To use the drone's incoming GPS telemetry to mechanically aim high-gain directional antennas directly at the drone", "To cool the video transmitter", "To log flight data"],
            correctAnswer: 1,
            explanation: "High gain antennas have extremely narrow beams. The tracker automatically rotates to keep the drone dead-center in that beam at all times.",
            reviewSubChapterId: "ch35-s2"
          }
        ]
      },
      {
        id: "ch35-s3",
        title: "35.3 Rescue Protocols and GPS Failsafe Setup",
        content: `When a drone drops behind a mountain 5 miles out, video goes to static and the radio link completely disconnects. Panic is death. Engineering is survival.

**GPS Rescue (Betaflight) / RTL (ArduPilot):**
When the receiver loses packets for 1.5 seconds, it initiates absolute takeover:
1. **Level and Climb:** The drone instantly shoots straight up to a pre-defined altitude (e.g., 500 feet) to clear whatever trees/mountains are blocking the signal.
2. **Point to Home:** It references the GPS arrow and physically yaws the nose back toward the launch pad.
3. **Cruise:** It flies forward at 30mph.
Within 30 seconds, the drone clears the mountain, reconnects control link and video to the pilot's goggles, and the pilot physically takes manual control back, laughing with extreme relief.`,
        quiz: [
          {
            question: "Why is the first step of a 'GPS Rescue / RTL' failsafe immediately climbing to a high altitude?",
            options: ["To cool down the motors", "To physically clear the terrain/buildings that are blocking the radio and video signals", "To do a flip", "To use more battery"],
            correctAnswer: 1,
            explanation: "Signal loss is almost always caused by an obstacle breaking Line of Sight. Gaining massive altitude is the fastest way to re-establish an unobstructed radio connection.",
            reviewSubChapterId: "ch35-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch36",
    title: "Chapter 36: Professional Drone Maintenance",
    description: "Preventative care, lifecycle, and teardowns.",
    subChapters: [
      {
        id: "ch36-s1",
        title: "36.1 Bearings, Bells, and Stators",
        content: `Brushless motors are practically indestructible, except for one massive weak point: the bearings.

**Bearing Wear:** A 5-inch racing drone motor spins at 40,000 RPM. A tiny speck of sand entering the sealed bearing will grind the microscopic steel balls to dust. 
*Symptoms:* The motor gets unusually hot. You can hear an aggressive grinding or "crunchy" metallic scratching.
*Fix:* A professional builder will pop the C-clip off the bottom of the motor shaft, slide the bell off the stator, use a press tool to pop out the $2 Japanese EZO bearing, press a brand new one in, and restore the motor to buttery 100% capacity without spending $30 on a new motor.`,
        quiz: [
          {
            question: "What is usually the first mechanical component to fail on a brushless drone motor, causing heat and grinding noises?",
            options: ["The copper wire", "The magnets", "The micro steel/ceramic bearings supporting the shaft", "The ESC"],
            correctAnswer: 2,
            explanation: "Bearings undergo the highest friction and mechanical load. Sand, dirt, and violent crashes frequently destroy the bearing races before the motor ever burns an electrical wire.",
            reviewSubChapterId: "ch36-s1"
          }
        ]
      },
      {
        id: "ch36-s2",
        title: "36.2 The Blackbox: Diagnosing Failures",
        content: `When a drone falls out of the sky for "no reason," the only way to find out why is the Blackbox flight data log.

**Analyzing the Log:** Betaflight Blackbox logs literally every gyro movement, motor output, and stick command every millisecond.
- **Desync:** If you look at the graph and see Motor #3 command spike to 100%, but the Gyro shows the drone violently dipping toward Motor #3, you immediately know Motor #3 or its ESC completely failed mid-air.
- **Vibration:** If the Gyro graph is a massive fuzzy block instead of a clean line, your frame is violently vibrating, causing your PID controller to freak out. You need to physically repair a loose arm or broken prop.`,
        realLifeExample: "A pilot kept complaining their drone 'wobbled' after 3 minutes. The Blackbox trace revealed identical low-frequency oscillations matching exactly to the RPM noise of Motor 4. The pilot realized the motor screw was loose, shaking the whole arm only when it hit a certain speed.",
        quiz: [
          {
            question: "If a Blackbox log shows a motor was commanded to 100% throttle but the drone still violently flipped toward that identical motor, what occurred?",
            options: ["A perfect loop", "An ESC or Motor Desync/Failure", "A strong tailwind", "Too much battery"],
            correctAnswer: 1,
            explanation: "If the FC screaming for 100% power does not result in the drone correcting itself, it proves mechanically or electrically that specific motor has completely stopped pushing thrust.",
            reviewSubChapterId: "ch36-s2"
          }
        ]
      },
      {
        id: "ch36-s3",
        title: "36.3 Battery Internal Resistance and Degradation",
        content: `Batteries don't just die; they age slowly and painfully.

**Internal Resistance (IR):** The absolute true measure of a battery's health. Measured in milliohms (mΩ) per cell.
- **Brand New High-end LiPo:** 2.0 to 4.0 mΩ per cell. The battery feels punchy, delivers rapid 150A bursts, and barely sags voltage.
- **Old Abused LiPo:** 15.0 to 25.0+ mΩ per cell. The chemicals have physically degraded. The battery resists giving up electrons. Every time you punch the throttle, the voltage artificially plummets from 16V to 11V, triggering low battery alarms.
Always use a smart charger to check the exact IR of every cell. A massive difference between Cell 1 and Cell 4 (e.g., 3mΩ vs 19mΩ) means the pack is dangerous and ready to be safely discharged and disposed of.`,
        quiz: [
          {
            question: "How do you definitively test the health and degradation of an aging LiPo battery?",
            options: ["Smelling it", "Measuring the Internal Resistance (IR) of the cells in milliohms", "Weighing it", "Charging it to 5V"],
            correctAnswer: 1,
            explanation: "Internal Resistance literally measures exactly how degraded the chemical pathways are. A high IR means the battery cannot safely dump power to the drone anymore.",
            reviewSubChapterId: "ch36-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch37",
    title: "Chapter 37: 3D Printing & Rapid Prototyping",
    description: "Designing your own mounts, frames, and repairs.",
    subChapters: [
      {
        id: "ch37-s1",
        title: "37.1 Drafting in Fusion 360",
        content: `A top-tier drone engineer does not buy heavy, generic brackets; they design exact, aerodynamic parts.

**Parametric CAD:** Using programs like Autodesk Fusion 360 or Onshape. An engineer measures the exact 19mm bolt pattern of an HD camera. They sketch a 2D profile and extrude it into 3D. 
*The Iteration Loop:* Print the mount, test fit the camera. It’s 1mm too tight. Edit the parameter in Fusion 360, sprint upstairs to the printer, and 40 minutes later, the flawless completely-custom camera mount is bolted to the carbon fiber frame. Rapid prototyping is the heartbeat of custom drone construction.`,
        quiz: [
          {
            question: "What is the primary benefit of designing custom drone parts using parametric CAD software like Fusion 360?",
            options: ["It looks cooler", "The ability to rapidly prototype dimensionally exact, perfectly lightweight custom geometry for specific electronics", "It makes the drone waterproof", "It costs less than tape"],
            correctAnswer: 1,
            explanation: "Parametric CAD allows for rapid iteration of parts tailored exactly to your wildly customized drone build, eliminating the need to tie-wrap components dangerously to the frame.",
            reviewSubChapterId: "ch37-s1"
          }
        ]
      },
      {
        id: "ch37-s2",
        title: "37.2 Thermoplastic Polyurethane (TPU)",
        content: `There is one magical material that keeps FPV drones intact: **TPU (Thermoplastic Polyurethane).**

Unlike PLA or ABS which snap like potato chips into jagged shards during an 80mph concrete crash, TPU is essentially a rigid rubber. It flexes immensely and returns perfectly to its original shape. 
Every GoPro mount, antenna holder, and arm-bumper on a professional FPV drone is printed entirely out of 95A durometer TPU. It absorbs impact vibrations brilliantly and makes the camera mount acts as a natural shock absorber against frame noise.`,
        realLifeExample: "A racer obliterates their drone hitting a steel gate at 100mph. The carbon fiber arm completely snaps. The $400 GoPro? Completely untouched, because the flexible TPU mount absorbed the kinetic energy like a bouncy ball.",
        quiz: [
          {
            question: "Why is TPU universally deemed the best 3D printing filament for FPV drone components?",
            options: ["It is incredibly stiff", "It melts at room temperature", "It is highly flexible and absorbs catastrophic impact energy without shattering", "It is conductive"],
            correctAnswer: 2,
            explanation: "Rigid plastics shatter instantly upon drone-speed impacts. TPU acts like rubber armor, flexing and bouncing back.",
            reviewSubChapterId: "ch37-s2"
          }
        ]
      },
      {
        id: "ch37-s3",
        title: "37.3 Carbon Fiber Milling & CNC",
        content: `If you want to create an entirely new drone company, you must design your own frame. 

**CNC Machining:** Once your Fusion 360 prototype is perfect, you export the 2D (.DXF) files to a CNC Router. The router uses a diamond-carbide endmill to cut perfectly precise arms and body plates out of thick 3K Twill Carbon Fiber sheets. 
*Safety:* Cutting Carbon Fiber produces microscopic dust that is identical to asbestos in your lungs. A massive water-bath or industrial vacuum system is required during milling. After cutting, engineers must chamfer the edges so the sharp carbon knife-edge doesn't slice open the battery straps mid-flight.`,
        quiz: [
          {
            question: "What is the most severe danger when custom-cutting (CNC milling) a new Carbon Fiber drone frame?",
            options: ["The machine shaking", "Inhaling microscopic carbon fiber dust which acts similarly to asbestos in human lungs", "Cutting it too thick", "Dulling the router bit"],
            correctAnswer: 1,
            explanation: "Carbon fiber dust is a profound respiratory hazard. Proper PPE and water-submersion milling techniques must rigidly be adhered to.",
            reviewSubChapterId: "ch37-s3"
          }
        ]
      }
    ]
  }
];
