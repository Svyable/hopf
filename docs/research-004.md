# Research 004 — Hopf transport, gauge compensation and discrete holonomy

## Exact geometry
Use z=(cos(θ/2), e^{iφ}sin(θ/2)) and the Hopf map (2 Re(z0* z1), 2 Im(z0* z1), |z0|²−|z1|²). The fiber consists of all e^{iα}z. A normalized lift of the latitude φ=φ0+s is horizontal for A=−i z†dz precisely when α'(s)=−sin²(θ/2), hence α(s)=−s sin²(θ/2). After a full loop, α=−π(1−cos θ)=−Ω/2, with Ω the north-cap oriented solid angle. The lift is closed only when this angle vanishes modulo 2π. This is standard quantum geometric phase, not a prediction of TUFT.

## Gauge compensation
For the section multiplied by exp(i m s), A_s changes to sin²(θ/2)+m. Compensate by exp(−i(sin²(θ/2)+m)s); the product is exactly the same lift. Integer m makes this transformation periodic on the loop; it need not extend to a global smooth section. The underlying Hopf bundle is nontrivial.

## Discrete approximation
For N vertices with δ=2π/N, each adjacent overlap equals a+b exp(iδ), where a=cos²(θ/2), b=sin²(θ/2). Its cyclic product has phase N arg(a+b exp(iδ)); the discrete horizontal holonomy is its negative modulo 2π. The Taylor expansion of the argument at δ=0 is bδ−b(1−b)(1−2b)δ³/6+O(δ⁵), so the phase error is O(N⁻²) at fixed latitude. Leading coefficient vanishes at the equator and poles, so a generic convergence rate is not universal as an equality. At finite N the polygon differs from the latitude; agreement is an asymptotic check, not independent experimental evidence.

## Limitations and next work
Stereographic projection excludes one point; studio colatitudes are restricted to 5–160 degrees to keep rendered coordinates finite and readable. Its 3D view uses orthographic projection after rotation, not a visualization of S9. The polygon is a piecewise great-circle path between adjacent rays. No claim is made that internal phase is time, or that a qubit models the universe.

## Sources
- [Simon, Holonomy, the Quantum Adiabatic Theorem, and Berry's Phase (1983)](https://doi.org/10.1103/PhysRevLett.51.2167)
- [Berry, Quantal Phase Factors Accompanying Adiabatic Changes (1984)](https://doi.org/10.1098/rspa.1984.0023)
- [Samuel and Bhandari, General Setting for Berry's Phase (1988)](https://doi.org/10.1103/PhysRevLett.60.2339)
- [Nielsen, TUFT](https://philpapers.org/rec/NIETTU)
