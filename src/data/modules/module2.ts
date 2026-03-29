import { Chapter } from '../../types';

export const module2Chapters: Chapter[] = [
  {
    id: "ch8",
    title: "Chapter 8: The Four Forces of Flight",
    description: "Mastering Lift, Weight, Thrust, and Drag.",
    subChapters: [
      {
        id: "ch8-s1",
        title: "8.1 Lift: How Propellers Create Upward Force",
        content: `Lift is the aerodynamic force that opposes gravity and keeps the drone airborne. In multi-rotor drones, lift is generated entirely by spinning propellers.

### How a Propeller Generates Lift

A propeller blade is an **airfoil** — curved on top, flatter on bottom, and set at an angle of attack (the blade pitch). As it spins:

1. The blade's angle forces air **downward** (deflection)
2. Air moves faster over the curved top surface, creating **low pressure** above (Bernoulli's principle)
3. Higher pressure below the blade **pushes it upward**
4. The combined effect produces a net upward force — **lift**

### The Lift Equation

$$L = \\frac{1}{2} \\rho v^2 S C_L$$

Where:
- $L$ = lift force (N)
- $\\rho$ = air density (kg/m³) — typically 1.225 at sea level
- $v$ = relative airspeed of the blade (m/s)
- $S$ = blade surface area (m²)
- $C_L$ = coefficient of lift (depends on airfoil shape and angle of attack)

### Controlling Lift in a Quadcopter

A quadcopter controls flight by varying lift on individual motors:
- **Climb:** All four motors increase speed equally
- **Descend:** All motors slow equally
- **Roll Right:** Left motors speed up, right motors slow down
- **Pitch Forward:** Rear motors speed up, front motors slow down
- **Yaw:** Diagonal motor pairs change speed (using counter-torque)

All flight maneuvers are achieved by **differential thrust** — varying individual motor speeds.`,
        realLifeExample: "When your drone tilts forward to fly, some of the vertical lift is redirected horizontally. The total lift doesn't change, but the vertical component decreases — this is why your drone loses altitude when you pitch forward aggressively.",
        quiz: [
          {
            question: "How does a quadcopter roll to the right?",
            options: ["All motors spin faster", "Right motors speed up, left slow down", "Left motors speed up, right motors slow down", "Front motors speed up"],
            correctAnswer: 2,
            explanation: "To roll right, the left side motors increase thrust while the right side motors decrease thrust, creating a net torque that tilts the drone rightward.",
            reviewSubChapterId: "ch8-s1"
          }
        ]
      },
      {
        id: "ch8-s2",
        title: "8.2 Weight: The Constant Enemy",
        content: `Weight is the gravitational force pulling the drone toward Earth. Every gram counts in drone design — it directly affects flight time, agility, and payload capacity.

### The Weight Equation

$$W = m \\cdot g$$

Where $g = 9.81$ m/s² at sea level. A 1 kg drone experiences a weight force of 9.81 N downward — *constantly*.

### Weight Breakdown of a Typical 5" FPV Drone

| Component | Weight | Percentage |
|-----------|--------|-----------|
| Frame | 80g | 11% |
| 4× Motors | 120g | 17% |
| 4-in-1 ESC | 15g | 2% |
| Flight Controller | 10g | 1.4% |
| Battery (4S 1300mAh) | 180g | 25% |
| Camera + VTX | 25g | 3.5% |
| Propellers (4×) | 20g | 2.8% |
| Wires, screws, antenna | 30g | 4.2% |
| **Total AUW** | **~700g** | **100%** |

**AUW** = All-Up Weight (total weight ready to fly)

### The Weight–Flight Time Trade-off

Adding weight has cascading effects:
1. More weight → need more lift → need more thrust
2. More thrust → more current draw → more battery drain
3. More battery drain → shorter flight time
4. To compensate, add bigger battery → **but that adds more weight!**

This circular dependency creates a **diminishing returns curve**. There is an optimal battery size for every build.

### The Optimal Battery Formula (Simplified)

The optimal battery weight is approximately **40-60%** of the drone's dry weight (without battery). This is the sweet spot between capacity and weight penalty.`,
        realLifeExample: "Professional FPV builders weigh every component on a precision scale and use titanium screws instead of steel ones (saving ~3g per screw) because those tiny savings compound into noticeably better flight performance.",
        quiz: [
          {
            question: "Approximately what percentage of a drone's total weight should the battery ideally be?",
            options: ["10-20%", "25-35%", "40-60% of dry weight", "75-90%"],
            correctAnswer: 2,
            explanation: "The optimal battery weight is typically 40-60% of the drone's dry weight (frame + motors + electronics). Too light = short flights; too heavy = diminishing returns.",
            reviewSubChapterId: "ch8-s2"
          }
        ]
      },
      {
        id: "ch8-s3",
        title: "8.3 Thrust vs. Drag: The Horizontal Battle",
        content: `While Lift and Weight battle vertically, Thrust and Drag battle horizontally. Understanding this relationship is key to speed, range, and efficiency.

### Thrust in Multi-Rotors

Multi-rotors generate **all** their force through propellers — there is no separate thruster. Forward motion is achieved by tilting the drone, redirecting some of the lift vector horizontally.

$$F_{horizontal} = L \\cdot \\sin(\\theta)$$
$$F_{vertical} = L \\cdot \\cos(\\theta)$$

Where $\\theta$ is the tilt angle. At 45° tilt, thrust is split equally between horizontal and vertical components.

### Drag: The Speed Tax

Aerodynamic drag opposes motion and increases with the square of speed:

$$D = \\frac{1}{2} \\rho v^2 C_D A$$

**The speed-efficiency trade-off:**
- At low speed → drag is small → most power goes to maintaining altitude
- At moderate speed → induced drag decreases (more efficient lifting) while parasitic drag is still low → **sweet spot**
- At high speed → parasitic drag dominates → power consumption skyrockets

### Maximum Speed

A drone reaches maximum speed when the available horizontal thrust equals the drag force:

$$F_{thrust} \\cdot \\sin(\\theta_{max}) = \\frac{1}{2} \\rho v_{max}^2 C_D A$$

In practice, the maximum tilt angle is limited by the need to maintain enough vertical lift to not descend:

$$L \\cdot \\cos(\\theta) \\geq mg$$

### Optimum Cruise Speed

The speed that maximizes range is *not* the maximum speed. There exists an **optimum cruise speed** where the ratio of distance/energy is maximized. For most multi-rotors, this is approximately **30-50% of maximum speed**.

This is analogous to the "sweet spot" RPM range for fuel efficiency in a car.`,
        realLifeExample: "DJI Mavic 3 has a max speed of 75 km/h but achieves maximum range at about 35 km/h — flying at half speed nearly triples the total distance the drone can cover on one battery.",
        quiz: [
          {
            question: "At what percentage of maximum speed does a multi-rotor typically achieve maximum range?",
            options: ["10-20%", "30-50%", "75-90%", "100% (full speed)"],
            correctAnswer: 1,
            explanation: "The optimum cruise speed for maximum range is typically 30-50% of max speed, where the balance between drag and efficiency is optimal.",
            reviewSubChapterId: "ch8-s3"
          }
        ]
      }
    ],
    finalExam: [
      {
        question: "A drone tilts forward to move. What physically happens to its total lift vector?",
        options: ["It disappears", "It splits: vertical component decreases while a horizontal thrust component appears", "It doubles", "Nothing changes"],
        correctAnswer: 1,
        explanation: "When a drone pitches forward, the lift vector tilts. The vertical component decreases requiring higher RPM while the horizontal component drives forward speed.",
        reviewSubChapterId: "ch8-s3"
      },
      {
        question: "What does AUW stand for in drone engineering?",
        options: ["Altitude Under Wind", "All-Up Weight — total takeoff mass including battery, camera, and payload", "Average Upward Watts", "Autopilot Unlock Warning"],
        correctAnswer: 1,
        explanation: "AUW (All-Up Weight) is the total mass of a drone completely ready to fly.",
        reviewSubChapterId: "ch8-s2"
      },
      {
        question: "If you double a drone's forward speed, drag force becomes:",
        options: ["Twice as large", "The same", "Four times as large", "Half as large"],
        correctAnswer: 2,
        explanation: "Drag is proportional to v² (velocity squared). Doubling speed quadruples drag.",
        reviewSubChapterId: "ch8-s3"
      },
      {
        question: "The optimal battery weight relative to a drone's dry weight is approximately:",
        options: ["10-20%", "40-60%", "80-90%", "100%+"],
        correctAnswer: 1,
        explanation: "The 40-60% rule balances capacity versus the diminishing returns of carrying too much additional weight in the battery itself.",
        reviewSubChapterId: "ch8-s2"
      },
      {
        question: "Which maneuver requires opposing motor pairs to change speed rather than all four motors?",
        options: ["Climb", "Hover", "Yaw rotation", "Descend"],
        correctAnswer: 2,
        explanation: "Yaw is produced by changing the relative torque of counter-rotating diagonal motor pairs, not all four motors equally.",
        reviewSubChapterId: "ch8-s1"
      }
    ]
  },
  {
    id: "ch9",
    title: "Chapter 9: Bernoulli's Principle & Airfoil Theory",
    description: "The fluid dynamics that make flight possible.",
    subChapters: [
      {
        id: "ch9-s1",
        title: "9.1 Fluid Dynamics Fundamentals",
        content: `Air is a fluid — it flows, has pressure, and obeys the laws of fluid mechanics. Understanding these fundamentals is essential for drone propeller and airframe design.

### What is a Fluid?

A **fluid** is any substance that flows — both liquids and gases. Air is a fluid with specific properties:
- **Density ($\\rho$):** 1.225 kg/m³ at sea level, 15°C
- **Viscosity ($\\mu$):** Air's resistance to flow (1.81 × 10⁻⁵ Pa·s)
- **Compressibility:** Negligible at drone speeds (< 0.3 Mach)

### Bernoulli's Equation

For an ideal, incompressible fluid flowing along a streamline:

$$P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}$$

Where:
- $P$ = static pressure (Pa)
- $\\frac{1}{2}\\rho v^2$ = dynamic pressure (kinetic energy per unit volume)
- $\\rho g h$ = hydrostatic pressure (potential energy per unit volume)

**Key Insight:** As fluid speed ($v$) increases, static pressure ($P$) must decrease to keep the sum constant. This is the fundamental principle behind aerodynamic lift.

### Reynolds Number

The **Reynolds Number (Re)** determines whether airflow is smooth (laminar) or turbulent:

$$Re = \\frac{\\rho v L}{\\mu}$$

Where $L$ is the characteristic length (for propellers, the blade chord width).

| Reynolds Number | Flow Type | Typical Application |
|----------------|-----------|-------------------|
| < 100,000 | Laminar | Small props (micro drones) |
| 100,000–500,000 | Transitional | FPV drone propellers |
| > 500,000 | Turbulent | Large props, manned aircraft |

Drone propellers operate in the **transitional regime**, making their aerodynamic design particularly challenging.`,
        realLifeExample: "When you blow across the top of a piece of paper and it rises, you're demonstrating Bernoulli's principle — the fast air over the top creates lower pressure than the still air below, pushing the paper upward.",
        quiz: [
          {
            question: "According to Bernoulli's principle, what happens to static pressure as fluid speed increases?",
            options: ["It increases", "It decreases", "It stays the same", "It oscillates"],
            correctAnswer: 1,
            explanation: "Bernoulli's equation shows that along a streamline, as velocity increases, static pressure must decrease — this pressure difference is what creates lift.",
            reviewSubChapterId: "ch9-s1"
          }
        ]
      },
      {
        id: "ch9-s2",
        title: "9.2 Airfoil Geometry & Characteristics",
        content: `An **airfoil** is the cross-sectional shape of a wing or propeller blade. Its geometry determines how effectively it generates lift and how much drag it produces.

### Airfoil Anatomy

- **Leading Edge:** The front (rounded) edge that meets incoming air first
- **Trailing Edge:** The sharp rear edge where airflow departs
- **Chord Line:** A straight line from leading to trailing edge
- **Camber Line:** The curved line equidistant between upper and lower surfaces
- **Maximum Camber:** The maximum distance between chord line and camber line
- **Thickness:** The maximum distance between upper and lower surfaces

### How Airfoil Shape Creates Lift

The curved upper surface forces air to travel a longer path, accelerating it (Bernoulli → lower pressure above). The angle of the chord line relative to incoming air (angle of attack, $\\alpha$) further deflects air downward (Newton's Third Law → reaction lift).

### Angle of Attack ($\\alpha$)

$$C_L = C_{L_0} + C_{L_\\alpha} \\cdot \\alpha$$

- Increasing $\\alpha$ increases lift — up to a point
- Beyond the **critical angle of attack** (~12-16° for most airfoils), airflow separates from the upper surface
- This causes a sudden loss of lift called a **stall**

### Common Drone Propeller Airfoils

| Airfoil | Type | Application |
|---------|------|-------------|
| Clark Y | Flat bottom, moderate camber | General purpose props |
| NACA 4412 | Cambered, efficient | Efficiency-optimized props |
| E63 (Eppler) | High lift, low speed | Slow-flying large props |
| Symmetrical | Zero camber | Aerobatic props (equal lift inverted) |

### Twist Distribution

A propeller blade is not a uniform airfoil — it is **twisted**. The root (near the hub) has a steep pitch angle, while the tip has a shallow angle. This ensures that every section of the blade operates at an optimal angle of attack despite the difference in speed (the tip moves much faster than the root).`,
        realLifeExample: "High-end racing propellers like Gemfan use custom airfoil profiles developed through CFD simulation — the difference between a well-designed and poorly-designed airfoil can mean 15% more thrust for the same power.",
        quiz: [
          {
            question: "What happens when a propeller blade exceeds its critical angle of attack?",
            options: ["It generates maximum lift", "It stalls — airflow separates and lift drops dramatically", "It spins faster", "Nothing noticeable happens"],
            correctAnswer: 1,
            explanation: "Beyond the critical angle of attack, airflow separates from the upper surface causing a dramatic loss of lift — this is called a stall.",
            reviewSubChapterId: "ch9-s2"
          }
        ]
      },
      {
        id: "ch9-s3",
        title: "9.3 Pressure Distribution & Lift Generation",
        content: `Understanding how pressure is distributed around an airfoil explains exactly how lift is created and how to optimize propeller performance.

### Pressure Distribution Around an Airfoil

When air flows around an airfoil at a positive angle of attack:

**Upper Surface (Suction Side):**
- Air accelerates as it flows over the curved surface
- Pressure drops below atmospheric (negative gauge pressure)
- Creates a "suction" effect that pulls the blade upward
- **Contributes approximately 60-70% of total lift**

**Lower Surface (Pressure Side):**
- Air slows down as it impacts the lower surface
- Pressure increases above atmospheric (positive gauge pressure)
- Pushes the blade upward
- **Contributes approximately 30-40% of total lift**

### The Pressure Coefficient

$$C_p = \\frac{P - P_\\infty}{\\frac{1}{2}\\rho V_\\infty^2}$$

Where $P_\\infty$ and $V_\\infty$ are freestream (undisturbed) values. Negative $C_p$ indicates suction (above the blade), positive $C_p$ indicates pressure (below).

### Circulation Theory (Kutta-Joukowski)

A more advanced explanation of lift uses **circulation** ($\\Gamma$):

$$L' = \\rho V_\\infty \\Gamma$$

Where $L'$ is lift per unit span. The airfoil shape and angle of attack create a net circulation of air around the blade, and this circulation directly produces lift. This theory accurately predicts lift for many conditions.

### Ground Effect

When a drone hovers close to the ground (within 1 rotor diameter), the ground acts as a "wall" that:
- Prevents air from moving freely downward
- Increases pressure below the propellers
- Reduces induced drag (tip vortices are suppressed)
- **Result: 10-25% increase in hover efficiency near the ground**

This is why your drone feels "floaty" during takeoff near the ground — it transitions out of ground effect as it climbs.`,
        realLifeExample: "Helicopter pilots are trained extensively on ground effect because a helicopter that can hover at 10 feet may not have enough power to hover at 100 feet — the ground effect bonus disappears with altitude.",
        quiz: [
          {
            question: "Which surface of an airfoil contributes more to total lift generation?",
            options: ["Lower surface (pressure side)", "Upper surface (suction side)", "Both contribute equally", "Neither — lift comes from the trailing edge"],
            correctAnswer: 1,
            explanation: "The upper surface (suction side) contributes approximately 60-70% of total lift through the low-pressure region created by accelerated airflow.",
            reviewSubChapterId: "ch9-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch10",
    title: "Chapter 10: Rotary Wing Aerodynamics",
    description: "The unique physics of spinning blades.",
    subChapters: [
      {
        id: "ch10-s1",
        title: "10.1 Momentum Theory & Disc Loading",
        content: `Momentum Theory (also called Actuator Disk Theory) models the propeller as a thin disk that accelerates air uniformly. This simplified but powerful model predicts hover performance.

### The Actuator Disk Model

The propeller disk is modeled as an infinitely thin actuator that:
1. Draws air in from above (freestream velocity = 0 in hover)
2. Accelerates it through the disk
3. Ejects it downward at some increased velocity

### Induced Velocity

The velocity of air through the disk in hover:

$$v_i = \\sqrt{\\frac{T}{2\\rho A}}$$

Where:
- $T$ = thrust (N)
- $\\rho$ = air density (kg/m³)
- $A$ = disk area = $n \\times \\pi r^2$ (for $n$ rotors of radius $r$)

### Disc Loading

**Disc loading** is thrust per unit disk area — the most important efficiency metric:

$$DL = \\frac{T}{A} \\quad \\text{(N/m²)}$$

| Platform | Disc Loading | Efficiency |
|----------|-------------|-----------|
| Large helicopter | 150-500 N/m² | Excellent |
| Multi-rotor (7" props) | 80-200 N/m² | Good |
| Multi-rotor (5" props) | 200-500 N/m² | Moderate |
| Multi-rotor (3" props) | 500-1500 N/m² | Poor |

**Lower disc loading = more efficient hover.** This is why large propellers are always more efficient than small ones for the same total thrust.

### Ideal Hover Power

$$P_{ideal} = T \\cdot v_i = \\frac{T^{3/2}}{\\sqrt{2\\rho A}}$$

This equation proves mathematically why bigger props win: increasing disk area ($A$) directly reduces hover power requirement.

### Figure of Merit (FM)

$$FM = \\frac{P_{ideal}}{P_{actual}}$$

A figure of merit of 0.7 (70%) is typical for well-designed drone propellers. The theoretical maximum is 1.0 (impossible due to real-world losses).`,
        realLifeExample: "This is why a DJI Mavic Mini with tiny 6-inch props has worse hover efficiency (higher disc loading) than a DJI Mavic 3 with larger 9.5-inch props — even though it weighs much less.",
        quiz: [
          {
            question: "What does lower disc loading indicate about a propeller system?",
            options: ["Less thrust capability", "Higher efficiency in hover", "The propellers are damaged", "The drone is too heavy"],
            correctAnswer: 1,
            explanation: "Lower disc loading means the thrust is spread over a larger propeller area, requiring less induced velocity and therefore less power to hover — more efficient.",
            reviewSubChapterId: "ch10-s1"
          }
        ]
      },
      {
        id: "ch10-s2",
        title: "10.2 Blade Element Theory (BET)",
        content: `While Momentum Theory treats the propeller as a simple disk, **Blade Element Theory (BET)** divides each blade into small sections and analyzes the aerodynamics of each piece independently.

### The BET Approach

1. **Divide** each blade into many small radial sections (elements)
2. For each element at radius $r$ from the hub:
   - Calculate the local velocity: $v = \\omega r$ (angular velocity × radius)
   - Determine the local angle of attack
   - Look up lift and drag coefficients from airfoil data
   - Calculate the element's contribution to thrust and torque
3. **Integrate** all elements from hub to tip for total values

### Why BET Matters

BET reveals critical insights that momentum theory misses:

**1. Tip Speed Effects**
The blade tip moves much faster than the root:
- At root ($r = 0.1R$): $v = 0.1 \\omega R$  
- At tip ($r = R$): $v = \\omega R$

This 10:1 speed ratio means the tip generates far more lift per unit area — but also more drag and noise.

**2. Optimal Twist Distribution**
Because speed increases with radius, the optimal blade design uses **twist** — the root has a steep angle while the tip has a shallow angle. This ensures uniform angle of attack across the entire blade.

$$\\theta(r) = \\theta_{tip} + \\frac{\\theta_{root} - \\theta_{tip}}{R} \\cdot (R - r)$$

**3. The 80/20 Rule**
Approximately **80% of a propeller's thrust** comes from the outer **50%** of the blade. The inner portion near the hub contributes relatively little — this is why many high-performance propellers have thin or cutaway root sections.

### Combining BET with Momentum Theory (BEMT)

The most accurate analytical method combines both theories. BET provides the blade aerodynamics while momentum theory provides the induced velocity distribution. The **Blade Element Momentum Theory (BEMT)** iterates between both until they converge on a consistent solution.`,
        realLifeExample: "HQProp designed their 5x4.5x3 triblade propeller using BEMT analysis to optimize the twist distribution and airfoil selection at each radial station — resulting in 12% more thrust-per-watt than their previous design.",
        quiz: [
          {
            question: "Why are propeller blades twisted from root to tip?",
            options: ["For structural strength", "Because the tip moves much faster, so it needs a shallower angle to maintain optimal angle of attack", "For aesthetic reasons", "To make more noise"],
            correctAnswer: 1,
            explanation: "The blade tip travels much faster than the root. Without twist, the tip would stall while the root barely generates lift. Twist keeps each section at optimal angle of attack.",
            reviewSubChapterId: "ch10-s2"
          }
        ]
      },
      {
        id: "ch10-s3",
        title: "10.3 Vortex Theory & Prop Wash Effects",
        content: `Real propellers produce complex vortex structures that significantly affect performance. Understanding these vortices is key to advanced drone design.

### Tip Vortices

Air flowing from the high-pressure bottom to the low-pressure top at the blade tips creates spinning vortices that:
- Trail behind each blade tip in a helical pattern
- Represent **wasted energy** — kinetic energy in the vortex doesn't contribute to thrust
- Create **induced drag** — the vortex changes the local airflow angle, effectively tilting the lift vector backward
- Generate the characteristic "whoosh" sound of a drone

### Propeller Wake Structure

The wake (downwash) from a propeller is not a uniform column of air. It's a complex helical structure:

1. **Near-wake:** Organized helical tip vortices and sheet vortices from the blade trailing edges
2. **Far-wake (2-5 diameters downstream):** Tip vortices begin to merge and become turbulent
3. **Fully-mixed wake (>5 diameters):** Turbulent, roughly uniform downwash

### Prop Wash Interference in Multi-Rotors

In a multi-rotor, propeller wakes interact with each other and the frame:

**1. Rotor-Rotor Interaction**
Adjacent propellers' tip vortices can interact, causing:
- Periodic thrust fluctuations
- Increased vibration
- 2-5% efficiency loss compared to isolated propellers

**2. Frame Wake**
The frame, arms, and body obstruct the propeller inflow, creating:
- Non-uniform inflow → thrust imbalance → vibration
- **Arm-crossing noise** — the distinctive buzzing sound as a blade passes over the arm

**3. Ground Effect Recirculation**
Near the ground, the propeller wake reflects back upward and is partially re-ingested, creating:
- Turbulent inflow
- "Cushion" effect (increased lift)
- Potential instability (pilot sees drone "bounce")

### Reducing Vortex Effects

| Strategy | Effect |
|----------|--------|
| Larger prop diameter | Reduces tip loading, weaker vortices |
| More blades (triblade) | Distributes load, smaller individual vortices |
| Winglets / tip fences | Reduce tip vortex formation |
| Prop ducts / shrouds | Contain tip vortices, increase thrust 10-15% |`,
        realLifeExample: "DJI's Avata uses a ducted propeller design that contains the tip vortices, both increasing thrust efficiency by ~15% AND making the drone significantly quieter — a major advantage for indoor and cinematic flying.",
        quiz: [
          {
            question: "What primarily causes the 'buzzing' noise characteristic of multi-rotor drones?",
            options: ["Motor vibration", "ESC switching frequency", "Blade tips passing over the frame arms, creating pressure pulses", "Wind"],
            correctAnswer: 2,
            explanation: "The dominant noise source is the periodic pressure disturbance created when each blade tip passes over the arm below it, creating the characteristic multi-rotor buzzing sound.",
            reviewSubChapterId: "ch10-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch11",
    title: "Chapter 11: Environmental Factors & Atmospheric Science",
    description: "How weather, altitude, and atmosphere affect every flight.",
    subChapters: [
      {
        id: "ch11-s1",
        title: "11.1 Air Density, Temperature & Altitude Effects",
        content: `Air density is the single most important environmental factor affecting drone performance. It varies significantly with temperature, altitude, and humidity.

### The Ideal Gas Law

$$\\rho = \\frac{P}{R_{specific} \\cdot T}$$

Where $R_{specific} = 287.05$ J/(kg·K) for dry air. This equation reveals:
- **Higher altitude → Lower pressure → Lower density**
- **Higher temperature → Lower density** (air expands)
- **Higher humidity → Lower density** (water vapor is lighter than N₂/O₂)

### Standard Atmosphere (ISA)

The **International Standard Atmosphere** provides reference values:
| Altitude | Temperature | Pressure | Density |
|----------|-----------|---------|---------|
| Sea Level | 15°C | 1013.25 hPa | 1.225 kg/m³ |
| 1000m | 8.5°C | 899 hPa | 1.112 kg/m³ |
| 2000m | 2°C | 795 hPa | 1.007 kg/m³ |
| 3000m | -4.5°C | 701 hPa | 0.909 kg/m³ |

### Density Altitude

**Density altitude** is the altitude at which the current air density would be found in the standard atmosphere. On a hot day at low altitude, the density altitude may be thousands of feet higher than actual altitude.

### Performance Impact

Since lift is proportional to air density ($L \\propto \\rho$):
- At 3000m elevation, density is ~26% lower → propellers produce ~26% less lift
- Motors must spin ~15% faster to compensate → drawing much more current
- Flight time can drop by 30-40% at high altitude

### The Temperature Factor

A hot summer day (40°C) at sea level has the same air density as a mild day (15°C) at approximately 850m altitude. Your drone "feels" like it's flying almost 3,000 feet higher than it actually is.`,
        realLifeExample: "Pilots flying DJI drones in places like La Paz, Bolivia (3,640m altitude) report needing to reduce payload by 30-40% and seeing flight times shortened to about 60% of sea-level performance.",
        quiz: [
          {
            question: "How does hot weather affect drone performance?",
            options: ["Improves it — motors run cooler", "No effect", "Reduces performance — less air density means less lift", "Only affects the battery"],
            correctAnswer: 2,
            explanation: "Hot air is less dense, providing fewer air molecules for propellers to push against. This reduces lift and forces motors to work harder, drawing more current and reducing flight time.",
            reviewSubChapterId: "ch11-s1"
          }
        ]
      },
      {
        id: "ch11-s2",
        title: "11.2 Wind: The Invisible Force",
        content: `Wind is the most common environmental challenge for drone operations. Understanding wind effects is critical for safe and efficient flight.

### Wind Speed Classifications for Drones

| Wind Speed | Category | Flight Advisory |
|-----------|----------|----------------|
| 0-10 km/h | Calm | Ideal flying conditions |
| 10-20 km/h | Light | Suitable for experienced pilots |
| 20-35 km/h | Moderate | Advanced pilots only, reduced flight time |
| 35-50 km/h | Strong | Most drones should not fly |
| 50+ km/h | Dangerous | Ground all operations |

### Wind Effects on Flight

**1. Headwind (Flying into wind)**
- Reduces ground speed
- Increases flight time for same distance
- Increases drag power: $P_{drag} \\propto (v_{air} + v_{wind})^2$

**2. Tailwind (Flying with wind)**
- Increases ground speed
- Reduces flight time
- Caution: If tailwind exceeds max speed, drone cannot return!

**3. Crosswind**
- Drone must crab (tilt sideways) to maintain track
- Reduces net forward thrust
- Creates lateral drift that the FC must correct

**4. Wind Gradient**
Wind speed increases with altitude (surface friction slows wind near ground):

$$v(h) = v_{ref} \\cdot \\left(\\frac{h}{h_{ref}}\\right)^\\alpha$$

Where $\\alpha \\approx 0.14$ for open terrain. Wind at 120m is typically **50-70% stronger** than at ground level.

### Wind Gusts & Turbulence

Gusts are rapid changes in wind speed/direction. They create:
- Sudden altitude changes
- Attitude disturbances (unexpected tilting)
- Increased PID controller workload → possible oscillations

**The "2/3 Rule":** Never fly in sustained winds greater than **2/3 of your drone's maximum speed** — otherwise, it may not have enough margin to handle gusts while returning home.`,
        realLifeExample: "Several DJI Mini drones have been lost when pilots fly them downwind without realizing the drone cannot fight back against the wind to return — the tiny motors cannot overcome a strong headwind.",
        quiz: [
          {
            question: "According to the '2/3 Rule', a drone with a max speed of 60 km/h should not fly in sustained winds exceeding what speed?",
            options: ["20 km/h", "30 km/h", "40 km/h", "50 km/h"],
            correctAnswer: 2,
            explanation: "The 2/3 Rule: 60 km/h × 2/3 = 40 km/h maximum wind speed. This leaves enough margin for gusts and ensures the drone can always return home.",
            reviewSubChapterId: "ch11-s2"
          }
        ]
      },
      {
        id: "ch11-s3",
        title: "11.3 Weather Hazards & Precipitation",
        content: `Beyond wind, many weather phenomena pose serious threats to drone operations. A professional pilot must understand these hazards.

### Rain & Moisture

Most consumer drones are **NOT waterproof** (IP ratings typically IP40 or lower):
- Water on propellers changes aerodynamic profile → unstable lift
- Water in motors → short circuit → motor failure
- Water on electronics → immediate or delayed corrosion damage
- Water on camera lens → unusable imagery

**IP Ratings for Drones:**
- IP43: Light rain protection (DJI Matrice 300 RTK)
- IP54: Dust/splash protection (some industrial drones)
- IP67: Full submersion protection (rare, specialized drones)

### Fog & Low Visibility

- Reduces visual reference for VLOS operations
- Water droplets obscure camera/sensor
- Cold fog can cause ice formation on propellers
- **Dense fog (< 200m visibility):** Ground all aircraft

### Lightning & Thunderstorms

**NEVER fly near thunderstorms.** Lightning can:
- Directly strike the drone (metal + carbon fiber = conductor)
- Create powerful microbursts and wind shear
- Generate static electricity that damages electronics

**30-30 Rule:** If thunder follows lightning by less than 30 seconds, stop flying. Wait 30 minutes after the last thunder before resuming.

### Cold Weather Operations

| Temperature | Risk Level | Precautions |
|------------|-----------|-------------|
| 0°C to 10°C | Low | Pre-warm batteries to 20°C |
| -10°C to 0°C | Moderate | Insulate battery, shorten flights |
| -20°C to -10°C | High | LiPo capacity drops 30-50%, risk of voltage sag |
| Below -20°C | Extreme | Most LiPo batteries may not deliver sufficient power |

### Pre-Flight Weather Assessment

Professional pilots always check:
1. **METAR** — Current weather conditions at nearby airports
2. **TAF** — Terminal Area Forecast (next 24-30 hours)
3. **Winds aloft** — Wind speed at operating altitude
4. **TFRs** — Temporary Flight Restrictions from weather events`,
        realLifeExample: "A drone inspection company had a $15,000 Matrice 600 fail mid-flight when unexpected rain shorted the ESCs. Despite the financial loss, the bigger impact was losing the contract. Now they always check weather radar 2 hours before every job.",
        quiz: [
          {
            question: "What does the '30-30 Rule' state about flying near thunderstorms?",
            options: ["Fly 30 meters high for 30 minutes", "If thunder follows lightning by < 30 seconds, stop. Wait 30 minutes after last thunder.", "Cancel if winds exceed 30 km/h for 30 minutes", "Only fly for 30 minutes if storms are within 30 km"],
            correctAnswer: 1,
            explanation: "The 30-30 Rule: If you hear thunder within 30 seconds of seeing lightning, the storm is dangerously close. Do not fly again until 30 minutes after the last thunder.",
            reviewSubChapterId: "ch11-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch12",
    title: "Chapter 12: Computational Fluid Dynamics for Drones",
    description: "Using computers to simulate and optimize airflow.",
    subChapters: [
      {
        id: "ch12-s1",
        title: "12.1 Introduction to CFD Simulation",
        content: `**Computational Fluid Dynamics (CFD)** uses numerical methods to solve fluid flow problems that are too complex for analytical solutions. It allows drone designers to test hundreds of design variations without building physical prototypes.

### The Governing Equations

CFD is built on the **Navier-Stokes equations** — a set of partial differential equations that describe fluid motion:

**Conservation of Mass (Continuity):**
$$\\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot (\\rho \\vec{v}) = 0$$

**Conservation of Momentum:**
$$\\rho \\frac{D\\vec{v}}{Dt} = -\\nabla P + \\mu \\nabla^2 \\vec{v} + \\rho \\vec{g}$$

**Conservation of Energy:**
$$\\rho c_p \\frac{DT}{Dt} = k \\nabla^2 T + \\Phi$$

These equations are *incredibly difficult* to solve — no general analytical solution exists. This is why we need computers.

### The CFD Workflow

**1. Geometry Creation:** Design your 3D drone model in CAD (Fusion 360, SolidWorks, OpenSCAD)

**2. Meshing:** Divide the 3D space around the drone into millions of tiny cells. Mesh quality directly determines accuracy. Finer mesh near surfaces, coarser mesh far away.

**3. Boundary Conditions:** Define:
- Inlet velocity (airspeed)
- Outlet pressure
- Wall conditions (no-slip on drone surfaces)
- Propeller rotation (via actuator disk or moving mesh)

**4. Solving:** The computer solves Navier-Stokes equations at every mesh cell, iterating until the solution converges.

**5. Post-Processing:** Visualize results — streamlines, pressure maps, velocity contours, force reports.

### CFD Software for Drone Design

| Software | Cost | Best For |
|----------|------|----------|
| ANSYS Fluent | $$$$ | Industry standard |
| OpenFOAM | Free | Open-source, powerful |
| SimScale | Free tier | Browser-based, easy |
| XFLR5 | Free | 2D airfoil analysis |`,
        realLifeExample: "Drone racing frame manufacturer ImpulseRC used CFD to redesign their Apex frame — reducing drag by 18% and increasing top speed by 8 mph without changing any electronics.",
        quiz: [
          {
            question: "What are the fundamental equations that CFD solves to simulate fluid flow?",
            options: ["Maxwell's equations", "Schrödinger equations", "Navier-Stokes equations", "Euler-Lagrange equations"],
            correctAnswer: 2,
            explanation: "The Navier-Stokes equations describe the motion of viscous fluids and are the mathematical foundation of all CFD simulations.",
            reviewSubChapterId: "ch12-s1"
          }
        ]
      },
      {
        id: "ch12-s2",
        title: "12.2 Turbulence Modeling",
        content: `Turbulence is the chaotic, unpredictable behavior of fluid at high Reynolds numbers. Accurately modeling turbulence is the biggest challenge in CFD.

### What is Turbulence?

Fluid flow transitions from **laminar** (smooth, predictable) to **turbulent** (chaotic, mixing) when the Reynolds number exceeds a critical value. In drone aerodynamics, most flows are turbulent.

Turbulent flow features:
- **Eddies** — swirling vortices of various sizes
- **Energy cascade** — large eddies break into smaller eddies, which break into even smaller ones
- **Enhanced mixing** — turbulence mixes momentum, heat, and mass much faster than laminar flow

### Turbulence Modeling Approaches

**1. RANS (Reynolds-Averaged Navier-Stokes)**
- Most common for engineering applications
- Averages out turbulent fluctuations
- Fast computation (hours, not weeks)
- Models: k-ε, k-ω SST (the standard for drone CFD)
- **Accuracy: Good for average forces, poor for unsteady flows**

**2. LES (Large Eddy Simulation)**
- Directly computes large eddies, models small ones
- Captures unsteady flow features (vortex shedding, wake dynamics)
- 10-100x more expensive than RANS
- **Accuracy: Very good for complex flows**

**3. DNS (Direct Numerical Simulation)**
- Solves ALL scales of turbulence directly
- No modeling required — pure physics
- Computationally extreme (millions of CPU hours)
- **Accuracy: Perfect, but impractical for most drone applications**

### Choosing the Right Model

| Application | Recommended Model |
|-------------|------------------|
| Frame drag estimation | RANS (k-ω SST) |
| Propeller performance | Unsteady RANS or LES |
| Prop-frame interaction | LES |
| Noise prediction | LES or DNS |
| Quick design iteration | RANS |

### The k-ω SST Model

The **Shear Stress Transport (SST)** model by Menter combines the advantages of k-ω (good near walls) and k-ε (good in free stream). It is the recommended starting point for nearly all drone CFD analyses.`,
        realLifeExample: "DJI's acoustic team uses LES simulations to predict and reduce propeller noise — this is how the Mavic 3's redesigned blades are 40% quieter than the Mavic 2 Pro despite producing more thrust.",
        quiz: [
          {
            question: "Which turbulence model is recommended as the standard starting point for drone CFD analysis?",
            options: ["k-ε standard", "k-ω SST", "DNS", "Spalart-Allmaras"],
            correctAnswer: 1,
            explanation: "The k-ω SST model combines the strengths of k-ω (accurate near walls) and k-ε (stable in free stream), making it the best all-around choice for drone aerodynamics.",
            reviewSubChapterId: "ch12-s2"
          }
        ]
      },
      {
        id: "ch12-s3",
        title: "12.3 Practical CFD: Optimizing Your Drone Design",
        content: `With CFD fundamentals understood, let's apply them to real drone design optimization problems.

### Case Study 1: Frame Arm Cross-Section

The cross-section of the frame arm significantly affects both structural integrity and aerodynamic drag.

**Tested Shapes:**
- **Square:** High drag ($C_D \\approx 2.0$), easy to manufacture
- **Circular:** Moderate drag ($C_D \\approx 1.2$), good for 3D printing
- **Teardrop:** Low drag ($C_D \\approx 0.04$), complex to manufacture
- **Flat/Rectangular:** Low frontal area but high drag per unit width

**Result:** A teardrop-shaped arm has **50x less drag** than a square arm of the same width! However, manufacturing constraints usually make circular or chamfered square sections the practical choice.

### Case Study 2: Propeller Duct Design

Ducted propellers (shrouded rotors) can increase thrust by containing tip vortices. CFD helps optimize:
- **Duct lip radius** — Too sharp creates flow separation; too round adds weight
- **Duct expansion angle** — A slight divergence (5-10°) recovers pressure
- **Duct length** — Longer ducts capture more vortex energy but add weight
- **Inlet/outlet area ratio** — Controls the acceleration of flow through the duct

**Typical result:** An optimized duct increases static thrust by **10-20%** at the cost of **15-25% additional weight**.

### Case Study 3: Component Placement for Cooling

CFD can simulate thermal flow patterns to optimize component placement:
- Place hot components (VTX, ESCs) in the propeller wash zone
- Avoid dead-air zones behind structural members
- Ensure the flight controller IMU is NOT in a vibration hot zone

### Running Your First Simulation

**Using SimScale (free, browser-based):**
1. Upload your frame STL file
2. Set up an external aerodynamics study
3. Set inlet velocity to your cruise speed
4. Use k-ω SST turbulence model
5. Run and analyze drag forces on each component
6. Iterate — modify geometry, re-run, compare

Even rough CFD results are better than guessing. A 10% drag reduction from a 20-minute simulation can translate directly into longer flight times.`,
        realLifeExample: "A university drone racing team used free OpenFOAM CFD simulations to optimize their competition drone's canopy shape, reducing frontal drag by 22% and winning the top speed category at the MultiGP Drone Racing Championship.",
        quiz: [
          {
            question: "By how much can an optimized propeller duct typically increase static thrust?",
            options: ["1-5%", "10-20%", "50-75%", "100-200%"],
            correctAnswer: 1,
            explanation: "A well-designed propeller duct captures tip vortex energy and increases static thrust by 10-20%, at the cost of 15-25% additional weight.",
            reviewSubChapterId: "ch12-s3"
          }
        ]
      }
    ]
  },
  {
    id: "ch13",
    title: "Chapter 13: Advanced Aerodynamics — Vortex & Wake Theory",
    description: "The cutting edge of propeller science.",
    subChapters: [
      {
        id: "ch13-s1",
        title: "13.1 Vortex Ring State (VRS)",
        content: `**Vortex Ring State (VRS)** is one of the most dangerous aerodynamic conditions for multi-rotor drones. Understanding and avoiding it is critical for safe flight.

### What is VRS?

VRS occurs when a drone descends rapidly into its own downwash. The propellers re-ingest the turbulent air they just pushed down, creating a toroidal (donut-shaped) vortex ring around each propeller.

### Conditions for VRS

VRS is most likely when:
1. **Descending vertically or near-vertically**
2. **Descent rate exceeds ~70% of hover-induced velocity** ($v_{descent} > 0.7 \\cdot v_i$)
3. **Low horizontal speed** (not enough forward flight to "fly out" of the dirty air)

### The Danger

In VRS:
- Propellers are operating in their own disturbed wake
- Lift production becomes chaotic and reduces significantly
- Increasing motor RPM makes it **worse** (pushes more air into the vortex ring)
- The drone enters an uncontrolled descent that may not be recoverable at low altitude

### VRS Warning Signs

- Drone starts to "sink" despite high throttle
- Altitude fluctuations during descent
- Flight controller oscillations
- Increased vibration and irregular motor sounds

### How to Escape VRS

1. **Move horizontally** — fly forward, backward, or sideways. This breaks the vortex ring by injecting fresh air.
2. **Do NOT pull up on throttle** — this seems counterintuitive but it feeds the vortex.
3. The horizontal airspeed needed to escape is approximately **70% of hover induced velocity**.

### Prevention

- **Never descend vertically at more than 1-2 m/s** in calm air
- Descend at a gentle angle (maintain some forward speed)
- If you must descend fast, fly a "toilet bowl" spiral pattern
- Some modern FCs detect VRS signatures and provide warnings`,
        realLifeExample: "Several DJI inspire crashes have been attributed to VRS when operators commanded rapid vertical descents to rush through a shot. The drone enters an uncontrollable 'sinking spell' and impacts the ground despite full throttle.",
        quiz: [
          {
            question: "What is the correct recovery technique for Vortex Ring State?",
            options: ["Pull throttle to maximum", "Move horizontally to fly out of the disturbed air", "Cut motors completely", "Increase altitude quickly"],
            correctAnswer: 1,
            explanation: "Moving horizontally introduces fresh, undisturbed air to the propellers, breaking the vortex ring. Increasing throttle makes VRS worse by pushing more air into the ring.",
            reviewSubChapterId: "ch13-s1"
          }
        ]
      },
      {
        id: "ch13-s2",
        title: "13.2 Retreating Blade Stall & Advancing Effects",
        content: `While primarily associated with helicopters, retreating blade effects also occur on drone propellers during fast forward flight.

### The Asymmetry Problem

When a drone flies forward at speed $V_{forward}$, each propeller blade experiences different velocities depending on its position:

**Advancing blade** (moving into the wind):
$$V_{tip} = \\omega R + V_{forward} \\cdot \\sin(\\alpha)$$

**Retreating blade** (moving with the wind):
$$V_{tip} = \\omega R - V_{forward} \\cdot \\sin(\\alpha)$$

### What This Means

On the advancing side, the blade sees faster airflow → generates more lift.
On the retreating side, the blade sees slower airflow → generates less lift.

This creates a **lift asymmetry** that:
- Generates a rolling moment (the drone wants to roll toward the advancing side)
- Must be corrected by the flight controller differential thrust
- Wastes energy on correction rather than useful flight

### Retreating Blade Stall

At very high forward speeds, the retreating blade airspeed can drop so low that sections of the blade **stall** (exceed their critical angle of attack). This creates:
- Violent vibration
- Loss of control authority
- Potential structural failure

### The Advance Ratio ($\\mu$)

$$\\mu = \\frac{V_{forward}}{\\Omega R}$$

Where $\\Omega R$ is the tip speed. When $\\mu$ approaches 0.4 or higher, retreating blade effects become significant.

For a typical 5" FPV drone with propellers at 30,000 RPM:
- Tip speed: $\\Omega R \\approx 100$ m/s
- Critical forward speed: $\\mu = 0.4 \\rightarrow V = 40$ m/s (144 km/h)

This is why racing drones begin to feel "unstable" or "washy" above ~140 km/h — the retreating blade regions are approaching stall.

### Mitigation Strategies

- Higher RPM (increases $\\Omega R$, reducing $\\mu$)
- Stiffer propellers (resist deformation under asymmetric loading)
- Higher blade count (distributes load more evenly)
- Flight controller adaptation (some FCs detect and compensate for RPM-dependent asymmetry)`,
        realLifeExample: "World-record drone speed attempts (over 250 mph) require specially designed propellers with extremely stiff blades and high RPM to avoid retreating blade stall at those extreme velocities.",
        quiz: [
          {
            question: "What causes 'retreating blade stall' in a forward-flying drone?",
            options: ["Motor overheating", "Battery voltage sag", "The blade moving with the wind sees reduced airspeed, causing it to exceed its critical angle of attack", "Propeller damage"],
            correctAnswer: 2,
            explanation: "During forward flight, the retreating side blade moves opposite to the direction of travel, so the wind subtracts from its speed. At high forward speeds, this can reduce airflow enough to cause stall.",
            reviewSubChapterId: "ch13-s2"
          }
        ]
      },
      {
        id: "ch13-s3",
        title: "13.3 Acoustic Aerodynamics: Drone Noise",
        content: `Noise is one of the biggest barriers to widespread drone adoption. Understanding the aeroacoustic sources of drone noise is key to designing quieter aircraft.

### Noise Sources in Multi-Rotors

**1. Tonal Noise (Blade Passage Frequency)**
The dominant noise source. Each blade creates a pressure pulse as it passes a given point:

$$f_{BPF} = \\frac{n \\cdot N}{60}$$

Where $n$ = blade count, $N$ = RPM. A triblade prop at 25,000 RPM: $f = 3 \\times 25000/60 = 1250$ Hz

**2. Broadband Noise**
Caused by turbulent flow over blade surfaces:
- Turbulent boundary layer trailing edge noise
- Laminar boundary layer vortex shedding
- Blade tip vortex noise

**3. Motor and Structural Noise**
- Electromagnetic noise from motor coils
- Frame vibration and resonance
- ESC switching frequency artifacts

### Why Drones Sound Annoying

Research shows human **annoyance** from drone noise is higher than from ground vehicles at the same decibel level because:
- High-frequency tonal components are more irritating
- Rapidly varying pitch (from motor speed changes) increases perceived annoyance
- Multiple propellers create complex interference patterns (beating)

### Noise Reduction Strategies

| Strategy | Reduction | Complexity |
|----------|----------|-----------|
| Lower tip speed (larger, slower props) | 6-10 dB | Low |
| Reduced blade count (from 3 to 2) | 3-5 dB | Low |
| Toroidal propellers ("ring" shape) | 3-8 dB | Medium |
| Propeller ducts/shrouds | 5-8 dB | High |
| Unequal motor spacing | 2-4 dB (tonal) | Medium |
| Phase-synchronized motors | 3-6 dB | High |
| Active noise cancellation | 5-15 dB | Very High |

### Toroidal Propellers

A recent innovation — the blade tips are connected by a ring, eliminating tip vortices entirely. MIT researchers demonstrated **3-8 dB** noise reduction with no loss in thrust efficiency. These are being adopted by commercial drone manufacturers for urban operations.

### Regulatory Noise Limits

As drone delivery and urban air mobility grow, governments are establishing noise standards:
- **EU:** Maximum 75 dB(A) at 4m distance proposed
- **NASA/FAA:** Studying "community noise impact" for urban drone operations
- **Switzerland:** Some municipalities have drone noise ordinances already in effect`,
        realLifeExample: "DJI's latest propellers use a specially designed 'swept tip' shape (similar to winglets on airplane wings) that reduces tip vortex noise by 5 dB — making the Mavic 3 noticeably quieter than its predecessor.",
        quiz: [
          {
            question: "What is the most effective single strategy for reducing drone noise?",
            options: ["Using metal propellers", "Increasing motor RPM", "Using larger, slower-spinning propellers to reduce tip speed", "Painting the propellers"],
            correctAnswer: 2,
            explanation: "Reducing tip speed by using larger, slower propellers is the most effective noise reduction strategy, achieving 6-10 dB reduction. Noise is proportional to tip speed to the 5th-6th power.",
            reviewSubChapterId: "ch13-s3"
          }
        ]
      }
    ]
  }
];
