import { Chapter } from '../../types';

export const module4Chapters: Chapter[] = [
  {
    id: "ch19",
    title: "Chapter 19: Sensors & Data Fusion",
    description: "How drones perceive their exact orientation and location.",
    subChapters: [
      {
        id: "ch19-s1",
        title: "19.1 The IMU (Gyroscope & Accelerometer)",
        content: `The Inertial Measurement Unit (IMU) is the heart of flight stability.

**Gyroscope:** Measures rotational velocity (degrees per second) across Roll, Pitch, and Yaw axes (X, Y, Z). It responds instantly but is susceptible to "drift" over time.
**Accelerometer:** Measures linear acceleration, including Earth's constant 1g gravity vector. This provides the drone's absolute "Down" reference. It is immune to drift but highly susceptible to vibration (noise).

*Sensor Fusion:* The flight controller uses a complementary or Kalman filter to combine these. It trusts the Gyro for short, fast movements, and the Accelerometer for long-term leveling.`,
        quiz: [
          {
            question: "Which sensor provides the absolute 'Down' reference for leveling the drone?",
            options: ["Gyroscope", "Accelerometer", "Barometer", "Magnetometer"],
            correctAnswer: 1,
            explanation: "The accelerometer measures Earth's 1g gravitational pull, constantly showing the flight controller which way is down.",
            reviewSubChapterId: "ch19-s1"
          }
        ]
      },
      {
        id: "ch19-s2",
        title: "19.2 Magnetometer & Barometer",
        content: `Altitude and heading require additional sensors.

**Magnetometer (Compass):** Measures Earth's magnetic field to provide an absolute Yaw heading (North). Critical for waypoint navigation. 
*Warning:* Electro-magnetic interference (EMI) from the drone's power wires will severely distort the compass if mounted too close. This is why GPS/Compass modules are placed on tall stalks on professional drones.

**Barometer:** Measures atmospheric pressure to estimate altitude. Because air pressure Drops as altitude Increases, it provides relative height. Susceptible to temperature changes and wind gusts (prop wash).`,
        quiz: [
          {
            question: "Why are Magnetometers (Compasses) often mounted high up on a stalk away from the drone body?",
            options: ["To get closer to satellites", "To avoid electromagnetic interference from high-current battery wires", "To measure wind speed", "To look cool"],
            correctAnswer: 1,
            explanation: "High current flowing from the battery to the ESCs creates powerful magnetic fields that blind the sensitive compass. Mounting it far away solves this.",
            reviewSubChapterId: "ch19-s2"
          }
        ]
      },
      {
        id: "ch19-s3",
        title: "19.3 Global Navigation Satellite Systems (GNSS) & RTK",
        content: `GNSS includes GPS (US), GLONASS (Russia), Galileo (EU), and BeiDou (China).

**Standard GPS:** Achieves ~2-5 meter accuracy by trilaterating timing signals from multiple satellites. It is prone to atmospheric delays and multipathing in urban canyons.

**Real-Time Kinematic (RTK) GPS:** The game-changer for professional drones. RTK uses a fixed Ground Base Station that precisely knows its location. It measures the satellite timing errors caused by the atmosphere and broadcasts real-time corrections to the drone.
*Result:* **Centimeter-level accuracy (1-2cm).** Essential for surveying, agriculture, and precision autonomous landing.`,
        quiz: [
          {
            question: "What accuracy does an RTK GPS system typically provide?",
            options: ["10-15 meters", "2-5 meters", "1-2 centimeters", "0.1 millimeters"],
            correctAnswer: 2,
            explanation: "By combining a moving rover unit with a stationary base station that broadcasts atmospheric corrections, RTK achieves centimeter-level absolute positioning.",
            reviewSubChapterId: "ch19-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch20",
    title: "Chapter 20: Autonomous Flight & ArduPilot",
    description: "Waypoint navigation and mission planning.",
    subChapters: [
      {
        id: "ch20-s1",
        title: "20.1 ArduPilot & PX4 Flight Stacks",
        content: `While Betaflight is built for manual FPV racing, **ArduPilot** and **PX4** are built for full autonomy.

These open-source flight stacks run sophisticated Position Estimators (EKF - Extended Kalman Filter) that fuse 10+ sensors perfectly. They support VTOLs, rovers, submarines, and multi-rotors.
- **Flight Modes:** Loiter (holds exact 3D position), RTL (Return to Launch), Auto (executes pre-programmed waypoints), and Follow Me.`,
        quiz: [
          {
            question: "Which firmware is the industry standard for complex, autonomous data-gathering drone missions?",
            options: ["Betaflight", "KISS", "ArduPilot / PX4", "Cleanflight"],
            correctAnswer: 2,
            explanation: "ArduPilot and PX4 are robust, feature-rich flight stacks designed specifically for autonomous waypoint navigation and surveying.",
            reviewSubChapterId: "ch20-s1"
          }
        ]
      },
      {
        id: "ch20-s2",
        title: "20.2 Ground Control Stations (GCS) and MAVLink",
        content: `A Ground Control Station (e.g., Mission Planner, QGroundControl) is the software interface for autonomous flight.

**MAVLink** is the micro air vehicle communication protocol. The drone and GCS constantly exchange MAVLink messages (e.g., "Go to Waypoint 3," or "My battery is at 14.5V").
In a professional mission, the pilot rarely touches a joystick. They monitor the MAVLink telemetry on a ruggedized tablet, ready to hit "RTL" if parameters deviate.`,
        quiz: [
          {
            question: "What is MAVLink?",
            options: ["A brand of motor", "A lightweight communication protocol used between the GCS and the drone", "An obstacle avoidance algorithm", "A type of battery"],
            correctAnswer: 1,
            explanation: "MAVLink is the industry standard telemetry and command protocol used by ArduPilot and PX4.",
            reviewSubChapterId: "ch20-s2"
          }
        ]
      },
      {
        id: "ch20-s3",
        title: "20.3 Waypoint Mission Planning",
        content: `Planning a successful autonomous mission requires considering safety, battery, and data overlap.

**Grid Missions (Mapping):** To map a field, the GCS generates a lawnmower pattern. 
- **Side Overlap:** The drone flies paths close enough that photos overlap by 60-80% left-to-right.
- **Front Overlap:** The camera fires fast enough to overlap photos 70% front-to-back.
*Crucial:* Altitude must be safe from highest obstacles (trees/towers), but low enough to achieve the desired GSD (Ground Sample Distance - cm per pixel).`,
        realLifeExample: "Surveyors set an overlap of 80% because standard photogrammetry software needs to see the exact same feature from multiple distinct angles to triangulate its 3D depth.",
        quiz: [
          {
            question: "Why must grid mapping missions have 70-80% image overlap?",
            options: ["In case a photo is blurry", "To allow photogrammetry software to triangulate 3D depth from multiple angles", "To burn more battery", "To make a cool time-lapse"],
            correctAnswer: 1,
            explanation: "Overlap provides the necessary parallax angles for the software to recreate a 3D model of the terrain.",
            reviewSubChapterId: "ch20-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch21",
    title: "Chapter 21: Computer Vision and SLAM",
    description: "Giving drones spatial intelligence.",
    subChapters: [
      {
        id: "ch21-s1",
        title: "21.1 Optical Flow and VIO",
        content: `What happens when you fly indoors and lose GPS? The drone must still hold position.

**Optical Flow:** A small downward-facing camera compares consecutive frames to detect ground movement (like an optical computer mouse). If pixels shift left, the drone knows it drifted right, and the FC corrects it.
**Visual Inertial Odometry (VIO):** Combines Optical Flow with IMU data. High-end drones use Stereo cameras to track feature points in 3D space, estimating velocity and position with incredible accuracy purely mathematically, zero GPS required.`,
        quiz: [
          {
            question: "How does a drone hold its exact position indoors without GPS?",
            options: ["By listening to echoes", "Using Visual Inertial Odometry (Optical Flow + IMU)", "Assuming the room has no wind", "Using a magnetic anchor"],
            correctAnswer: 1,
            explanation: "Downward facing cameras track pixel movement to mathematically calculate frame-by-frame drift, known as Optical Flow/VIO.",
            reviewSubChapterId: "ch21-s1"
          }
        ]
      },
      {
        id: "ch21-s2",
        title: "21.2 SLAM (Simultaneous Localization & Mapping)",
        content: `The absolute holy grail of robotics is SLAM. A drone enters an unknown, unmapped building, builds a 3D map of it using sensors, and tracks its exact location *within* that map simultaneously.

**LiDAR SLAM:** Uses spinning laser scanners to create massive 3D point clouds. Perfect for underground mines.
**Visual SLAM:** Employs multiple stereo cameras (like Skydio) to build a voxel representation of the world. It maps every tree branch and calculates the safest path through them in real-time.`,
        quiz: [
          {
            question: "What is SLAM used for?",
            options: ["Speeding up the motors", "Navigating unknown, GPS-denied environments by mapping and tracking simultaneously", "Transmitting higher quality video", "Charging batteries"],
            correctAnswer: 1,
            explanation: "SLAM allows a robot to build a map of an unknown area while keeping track of where it is inside that map.",
            reviewSubChapterId: "ch21-s2"
          }
        ]
      },
      {
        id: "ch21-s3",
        title: "21.3 Obstacle Avoidance Algorithms",
        content: `How does a drone physically avoid a tree tracked by SLAM?

**A* (A-Star) Pathfinding:** Plans the shortest route through a voxel grid from Point A to Point B.
**VFH (Vector Field Histogram):** For real-time reactive avoidance. The drone generates a 360-degree polar histogram of obstacles. It finds the "valleys" (gaps between trees) and dynamically adjusts cost weights to steer the drone through the widest, most direct gap toward the goal.`,
        realLifeExample: "The Skydio 2 runs 6 navigation cameras feeding an Nvidia Jetson TX2 processor running real-time VFH and SLAM to chase mountain bikers through dense forests without hitting trees.",
        quiz: [
          {
            question: "Which algorithm is highly effective for planning the shortest global route through a known grid of obstacles?",
            options: ["VFH", "A* (A-Star)", "PID", "Kalman"],
            correctAnswer: 1,
            explanation: "A* uses heuristics to rapidly calculate the most efficient path from start to finish across a mapped grid.",
            reviewSubChapterId: "ch21-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch22",
    title: "Chapter 22: AI & Companion Computers",
    description: "ROS, Edge AI, and neural networks in flight.",
    subChapters: [
      {
        id: "ch22-s1",
        title: "22.1 The Companion Computer Architecture",
        content: `A Flight Controller (FC) is busy running 8000Hz PID loops. It doesn't have the brainpower for Neural Networks. Enter the **Companion Computer**.

A Companion Computer (e.g., Raspberry Pi, Nvidia Jetson Nano) is mounted on the drone. It handles heavy lifting—Computer Vision, AI, and SLAM. It then sends simple commands down to the Flight Controller via UART/MAVLink (e.g., "Roll right 10 degrees to avoid that bird").
This separation of concerns ensures that if the complex AI code crashes, the FC keeps the drone hovering safely.`,
        quiz: [
          {
            question: "Why do advanced drones separate the Flight Controller from the Companion Computer?",
            options: ["To save battery", "Because the FC runs critical real-time stabilization and shouldn't be bogged down by heavy AI tasks", "To make the drone look cooler", "Because one uses 5V and the other uses 12V"],
            correctAnswer: 1,
            explanation: "Dividing critical flight stability (FC) from complex, crash-prone logic (Companion Computer) ensures the drone stays in the air even if the AI software fails.",
            reviewSubChapterId: "ch22-s1"
          }
        ]
      },
      {
        id: "ch22-s2",
        title: "22.2 Robot Operating System (ROS 2)",
        content: `ROS isn't an operating system; it's an open-source framework and middleware suite for writing robot software.

**Nodes & Topics:** ROS breaks complex AI into small programs called *Nodes*. A 'Camera Node' captures images and publishes them to an 'Image Topic'. An 'Object Detection Node' subscribes to that topic, finds humans, and publishes coordinates to a 'Nav Topic'. This modularity allows developers to piece together amazing autonomous systems using community-written packages.`,
        quiz: [
          {
            question: "In ROS, how do separate programs (Nodes) typically communicate with each other?",
            options: ["By sharing a hard drive", "By publishing and subscribing to Topics", "Via bluetooth", "Using the Flight Controller"],
            correctAnswer: 1,
            explanation: "ROS uses a powerful publish-subscribe messaging architecture (Topics) allowing highly modular, decoupled software development.",
            reviewSubChapterId: "ch22-s2"
          }
        ]
      },
      {
        id: "ch22-s3",
        title: "22.3 Neural Networks and YOLO",
        content: `Drones use highly optimized Convolutional Neural Networks (CNNs) for edge-computing object detection.

**YOLO (You Only Look Once):** The gold standard for real-time object detection. A drone running YOLOv8 on an Nvidia Jetson can look at a 4K video feed and draw bounding boxes around cars, people, and wildlife at 60 FPS. 
**Use Case:** Search and Rescue drones fly vast grids autonomously. The AI scans the thermal and RGB cameras, instantly placing a waypoint and alerting the operator if it detects a human heat signature.`,
        realLifeExample: "Anti-poaching units in Africa use fixed-wing drones running custom trained YOLO models on thermal feeds to automatically detect and track poachers hiding in the brush at night.",
        quiz: [
          {
            question: "Why is YOLO (You Only Look Once) highly favored for drone object detection?",
            options: ["It has zero latency", "It is extremely fast at processing full images in real-time on edge hardware", "It uses no battery", "It requires no training data"],
            correctAnswer: 1,
            explanation: "YOLO processes entire images simultaneously through a single neural network, allowing for blazingly fast real-time detection crucial for moving drones.",
            reviewSubChapterId: "ch22-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch23",
    title: "Chapter 23: Drone Building, Soldering, and Wiring",
    description: "Hands-on engineering capstone.",
    subChapters: [
      {
        id: "ch23-s1",
        title: "23.1 Essential Soldering Techniques",
        content: `A drone relies on hundreds of soldered connections that endure massive vibration and 100+ Amp current spikes. A cold solder joint will cause a drone to fall out of the sky.

**The Golden Rules of Drone Soldering:**
1. **Use Flux:** Flux is a chemical cleaning agent. It prevents oxidation and makes solder flow easily. Always use a flux pen.
2. **High Heat (400°C+):** Drone pads (like ESC battery pads) absorb massive heat. A cheap 15W iron will fail. Use a high-quality TS100 or Pinecil at 400°C.
3. **Pre-tin Everything:** Apply a tiny blob of solder to the pad, and a tiny blob to the wire. Then touch the iron to the pad and slide the wire into the liquid pool. 
A perfect joint is shiny and smooth like a tiny volcano, not dull or balled up.`,
        quiz: [
          {
            question: "What is the primary purpose of Flux in soldering?",
            options: ["To make the iron hotter", "To cool down the joint", "To clean the metal, prevent oxidation, and make solder flow smoothly", "To insulate the wire"],
            correctAnswer: 2,
            explanation: "Flux chemically cleans the surfaces and removes oxides precisely when heat is applied, ensuring a clean, perfect metallurgical bond.",
            reviewSubChapterId: "ch23-s1"
          }
        ]
      },
      {
        id: "ch23-s2",
        title: "23.2 Conformal Coating and Weatherproofing",
        content: `Drones often land in wet grass. A single drop of water across the 5V and ground pins of a Flight Controller will instantly fry it.

**Conformal Coating:** A silicone or acrylic liquid painted over the PCBs. It dries into a waterproof, non-conductive armor. 
*Warning:* NEVER paint over the Barometer hole (it needs to feel air pressure), and never paint inside the USB-C port or connector plugs. 
If done perfectly, a conformal coated drone can crash fully submerged in a freshwater lake, be pulled out, and immediately flown again.`,
        quiz: [
          {
            question: "Which component on a flight controller must NEVER be covered in conformal coating?",
            options: ["The Barometer", "The MCU chip", "The ESC pads", "The Gyroscope"],
            correctAnswer: 0,
            explanation: "The barometer specifically measures atmospheric air pressure. Coating it seals the tiny hole, completely blinding the sensor to altitude changes.",
            reviewSubChapterId: "ch23-s2"
          }
        ]
      },
      {
        id: "ch23-s3",
        title: "23.3 Frame Assembly and Vibration Isolation",
        content: `Vibration is the gyro's worst enemy. High-frequency motor noise translates directly into extremely hot motors and terrible flight performance.

**Soft-Mounting:** Always mount the Flight Controller on silicone "gummies". These act as shock absorbers. Ensure no wires are pulled tight across the FC; tight wires transmit vibration directly, bypassing the gummies.
**Carbon Fiber Care:** Use a diamond file to sand the sharp edges of the carbon fiber frame. Sharp edges will eventually slice through motor wires in a crash. Use Loctite (threadlocker) on all metal-to-metal bolts, as vibration will shake them loose within weeks.`,
        realLifeExample: "A pilot spent 3 hours trying to PID tune a jittery drone, only to realize the thick battery strap was physically rubbing against the flight controller, transferring raw frame vibration straight into the gyroscope.",
        quiz: [
          {
            question: "Why do we use silicone 'gummies' to mount the Flight Controller?",
            options: ["To insulate it from static electricity", "To physically isolate the Gyroscope from the violent structural vibrations of the frame", "To look colorful", "To save weight"],
            correctAnswer: 1,
            explanation: "Isolating the FC from frame vibration is critical. Raw motor noise reaching the gyro ruins the PID controller and burns up motors.",
            reviewSubChapterId: "ch23-s3"
          }
        ]
      }
    ]
  }
];
