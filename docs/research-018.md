# Research 018 — Spacetime Observatory
## Scope
Independent interactive derivations and numerical models of standard special/general relativity and semiclassical black-hole thermodynamics. No claim that Hopf geometry derives Einstein gravity, no quantum gravity result, no Hawking/Einst​ein endorsement. Use G=c=M=1 for dimensionless Schwarzschild equations; SI for thermodynamic readouts.

## Lorentz transformation
t'=γ(t−βx), x'=γ(x−βt), γ=(1−β²)^−1/2. Expanding gives t'^2−x'^2=t²−x². Timelike proper time of a piecewise inertial six-unit return trip is 6/γ, ignoring instantaneous reversal duration. The diagram uses equal x and ct scale; the twin readouts are separate from the selected event.

## Horizon and curvature
Schwarzschild metric ds²=−(1−2/r)dt²+(1−2/r)^−1 dr²+r²dΩ². Static clock dτ/dt=√(1−2/r) outside r=2. Frequency ratio to infinity equals this factor. Kretschmann scalar R_abcd R^abcd=48/r⁶ in M=1 units. In ingoing Painlevé–Gullstrand time ds²=−dt²+(dr+√(2/r)dt)²+r²dΩ². Setting radial ds²=0 gives dr/dt=−√(2/r)±1. The horizon is regular in this chart; at r<2 both future radial directions have decreasing r. No inference that local light speed changes.

## Photon trajectories
Equatorial null geodesics have u=1/r, u''+u=3u² with first integral (u')²+u²−2u³=1/b², b=L/E. Start at r=30, inward u'>0. The maximum of u²−2u³ at u=1/3 is 1/27, giving critical b=√27. For inward initial rays on the outer branch, smaller b captures, larger scatters. RK4 fixed step .003 in φ, max 14,000 steps; residual of first integral reported. Stop at r=2 or outward return to r=30, with approximate endpoint. This is not full ray tracing or an image of the observed shadow. Numerical resolution near separatrix finite.

## Circular timelike orbits
ṙ²+V=E² with V=(1−2/r)(1+L²/r²). V'=0 gives L²=r²/(r−3), E=(1−2/r)/√(1−3/r). Second derivative at fixed L equals 2(r−6)/(r³(r−3)); stable for r>6, marginal at 6. E_ISCO=√(8/9), L_ISCO=√12. Ω=r^−3/2.

## Hawking thermodynamics
r_s=2GM/c², A=4πr_s², T=ℏc³/(8πGMk_B), S/k_B=4πGM²/(ℏc), S/(k_B ln 2) in bits. A conventional idealized luminosity P=ℏc⁶/(15360πG²M²), dM/dt=−P/c², gives t_life=5120πG²M³/(ℏc⁴). Then M/M0=(1−t/t_life)^(1/3), A/A0=(M/M0)² and T/T0=M0/M. Luminosity coefficient/lifetime approximate, neglecting greybody factors, species thresholds, environment and late quantum gravity. Semiclassical Hawking emission has not been directly detected from astrophysical black holes. No solution of information paradox claimed.
 
## FLRW
Flat matter-plus-Lambda E(z)=sqrt(Ωm(1+z)^3+ΩΛ). H(z)=H0 E(z). D_C=(c/H0)∫ dz/E; lookback H0^-1∫ dz/[(1+z)E]; D_L=(1+z)D_C, D_A=D_C/(1+z). Composite Simpson integration; radiation ignored. For EdS Ωm=1, D_C=2c/H0(1−1/√(1+z)), lookback=2/(3H0)(1−(1+z)^−3/2), used as analytic control. The model accepts curvature in the core, UI flat only. No observational fitting.

## Sources
- [Einstein Online, relativity](https://www.einstein-online.info/en/)
- [Hawking, Particle creation by black holes (1975)](https://doi.org/10.1007/BF02345020)
- [Wald, Thermodynamics of Black Holes (2001)](https://doi.org/10.12942/lrr-2001-6)
- [Hogg, Distance measures in cosmology](https://arxiv.org/abs/astro-ph/9905116)
- [Carroll, Lecture Notes on General Relativity](https://arxiv.org/abs/gr-qc/9712019)
