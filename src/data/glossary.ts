export interface GlossaryItem {
  term: string;
  definition: string;
}

export const glossary: GlossaryItem[] = [
  {
    term: "UAS",
    definition: "Unmanned Aerial System. The entire system including the drone, the ground control station, and the communication link."
  },
  {
    term: "VTOL",
    definition: "Vertical Take-Off and Landing. The ability of an aircraft to take off, hover, and land vertically."
  },
  {
    term: "VLOS",
    definition: "Visual Line of Sight. The requirement for the pilot to be able to see the drone with their own eyes at all times."
  },
  {
    term: "AGL",
    definition: "Above Ground Level. The altitude measured relative to the ground directly below the aircraft."
  },
  {
    term: "IMU",
    definition: "Inertial Measurement Unit. A sensor package containing gyroscopes and accelerometers to measure orientation and acceleration."
  },
  {
    term: "ESC",
    definition: "Electronic Speed Controller. A device that regulates the speed of a brushless motor based on signals from the flight controller."
  },
  {
    term: "LiPo",
    definition: "Lithium Polymer. A type of rechargeable battery known for high energy density and high discharge rates."
  },
  {
    term: "PID",
    definition: "Proportional-Integral-Derivative. A control loop feedback mechanism used to maintain stability and follow commands."
  },
  {
    term: "LiDAR",
    definition: "Light Detection and Ranging. A remote sensing method that uses pulsed laser light to measure distances and create 3D maps."
  },
  {
    term: "SITL",
    definition: "Software In The Loop. A simulation mode where the actual flight firmware runs on a computer to simulate flight behavior."
  },
  {
    term: "ROS",
    definition: "Robot Operating System. A flexible framework for writing robot software, providing tools and libraries for complex robot behavior."
  },
  {
    term: "CFD",
    definition: "Computational Fluid Dynamics. A branch of fluid mechanics that uses numerical analysis and data structures to analyze and solve problems that involve fluid flows."
  },
  {
    term: "Reynolds Number",
    definition: "A dimensionless quantity used in fluid mechanics to help predict flow patterns in different fluid flow situations."
  },
  {
    term: "Kalman Filter",
    definition: "An algorithm that uses a series of measurements observed over time, containing statistical noise and other inaccuracies, and produces estimates of unknown variables."
  },
  {
    term: "A*",
    definition: "A graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency."
  },
  {
    term: "RTOS",
    definition: "Real-Time Operating System. An operating system intended to serve real-time applications that process data as it comes in, typically without buffer delays."
  },
  {
    term: "CAN Bus",
    definition: "Controller Area Network. A robust vehicle bus standard designed to allow microcontrollers and devices to communicate with each other's applications without a host computer."
  },
  {
    term: "OpenCV",
    definition: "Open Source Computer Vision Library. A library of programming functions mainly aimed at real-time computer vision."
  },
  {
    term: "Reinforcement Learning",
    definition: "An area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward."
  },
  {
    term: "Dijkstra",
    definition: "An algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks."
  },
  {
    term: "Haar Cascades",
    definition: "An object detection method used to identify faces, pedestrians, or other objects in images or videos."
  },
  {
    term: "EKF",
    definition: "Extended Kalman Filter. The nonlinear version of the Kalman filter which linearizes about an estimate of the current mean and covariance."
  },
  {
    term: "NDVI",
    definition: "Normalized Difference Vegetation Index. A graphical indicator used to assess the health of live green vegetation by analyzing multispectral data."
  },
  {
    term: "Gimbal",
    definition: "A pivoted support that allows the rotation of an object about a single axis. In drones, 3-axis gimbals are used to stabilize cameras."
  },
  {
    term: "SAR",
    definition: "Search and Rescue. The search for and provision of aid to people who are in distress or imminent danger."
  },
  {
    term: "uORB",
    definition: "Micro Object Request Broker. An asynchronous messaging system used for inter-thread communication in the PX4 flight stack."
  },
  {
    term: "Voxel",
    definition: "A value on a regular grid in three-dimensional space. Used in drone pathfinding to represent 3D environments."
  },
  {
    term: "SLAM",
    definition: "Simultaneous Localization and Mapping. The computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location."
  },
  {
    term: "UAVCAN",
    definition: "A lightweight protocol designed for aerospace and robotic applications using CAN Bus. Now also known as Cyphal."
  },
  {
    term: "BIM",
    definition: "Building Information Modeling. A holistic process of creating and managing information for a built asset."
  },
  {
    term: "Photogrammetry",
    definition: "The science of making measurements from photographs, especially for recovering the exact positions of surface points."
  },
  {
    term: "Orthomosaic",
    definition: "A geometrically corrected aerial image that is composed of multiple individual photos stitched together to create a single, high-resolution map."
  },
  {
    term: "Remote ID",
    definition: "A digital license plate for drones that allows authorities to identify a drone and its operator in real-time."
  },
  {
    term: "eVTOL",
    definition: "Electric Vertical Take-Off and Landing. A type of aircraft that uses electric power to hover, take off, and land vertically."
  }
];
