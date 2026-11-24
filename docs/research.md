# HOPF / Observatory — Research notebook 001

Independent mathematical exploration inspired by [Jenny Lorraine Nielsen, TUFT](https://philpapers.org/rec/NIETTU). No endorsement, physical validation, or priority claim is implied. The interactive experiments concern a controlled scalar/Spin-c model, not a reproduction of TUFT's proposed particle spectrum. A fixed version of the manuscript must be obtained before attributing specific operator definitions to it.

## Conventions
Unit round S^9, Hopf bundle S^1 → S^9 → CP^4, normalized principal connection η with integral over the fiber 2π. F=dη, complex orientation chosen so the first Chern number is +1. The Berger metric is g_t=g_H+t²η² (t>0), volume t times round volume. Fixed-volume rescaling multiplies scalar eigenvalues and scalar curvature by t^(2/9).

## 001-A — Curvature extremum
The horizontal sectional curvatures are those of the Fubini–Study base minus 3t² times the squared Kähler pairing; the mixed sectional curvatures are t². Summing gives R=80−8t². E=(80−8t²)t^(2/9). E'=160/9 t^(-7/9)(1−t²), E''(1)=−320/9. Unique global maximum within this family; no claim about all perturbations or Lorentzian dynamics.

## 001-B — Spectrum and crossing
Harmonics of bidegree (p,q) have ℓ=p+q, k=p−q, λ=ℓ(ℓ+8)+(t^(-2)−1)k². Complex multiplicity is C(p+4,4)C(q+4,4)−C(p+3,4)C(q+3,4), by subtracting traces. Since λ=ℓ(ℓ+8)−k²+k²/t² and |k|≤ℓ, for ℓ≥2 the neutral ℓ=2 mode is the minimum among those degrees (for |k|=1, ℓ≥3; for |k|≥2, λ≥8ℓ+k²/t², which cannot beat the |k|=1, ℓ=1 mode). Thus λ₁=min(20,8+t^(-2)). The crossing t=1/√12 has multiplicity 34 (24 neutral +10 nonzero weight). The normalized gap G=t^(2/9)λ₁ has a strict local minimum at t=1 (G''(1)=32/9); a local maximum at the crossing, but no global maximum for t>0, because G grows without bound for t→∞. These are scalar modes, not physical masses.

## 001-C — Candidate curl and symbol obstruction
Ordinary ★d sends one-forms to seven-forms in dimension nine. A candidate B(a)=★(F³∧da) maps one-forms to one-forms and vanishes on exact forms. Integration by parts on a closed manifold using dF=0 establishes formal symmetry. For horizontal ξ≠0, decompose a into horizontal and vertical parts: the horizontal wedge output is proportional to the horizontal volume and the vertical input gives an independent horizontal output after Hodge duality. Thus the symbol has rank two (including a nonzero horizontal symplectic pairing); it remains degenerate even modulo gauge directions. This candidate is our construction, not a verified transcription of TUFT. A contact-complex operator is a possible alternative, not yet developed.

## 001-D — Characteristic invariant
Fiber integration gives (2π)^(-5) ∫η∧F⁴=∫CP⁴ (F/2π)⁴=1. It does not vary with the Berger metric and is fixed for normalized connections on this bundle. It cannot alone select t. This statement does not apply to every possible metric-dependent term in an action.

## 001-E — Index obstruction
w₂(TCP⁴)=x mod 2 ≠0: CP⁴ is not spin, but is Spin-c. The canonical Spin-c Dirac index twisted by O(k) is the holomorphic Euler characteristic, (k+1)(k+2)(k+3)(k+4)/24. For k≥0 it is C(k+4,4); for −4≤k≤−1 it is zero; for k≤−5 it equals the value at −k−5 by Serre duality. The positive sequence starts 1,5,15,35, so three is impossible for any integer twist. Index counts net chirality, not particle species or masses.

## 001-F — Open hypothesis
Topological multiplicity and metric-dependent mass may arise from distinct mechanisms. Next: investigate natural higher-rank bundles with index 3, representation content, anomaly cancellation, and selection principles; then causal spacetime and independent dimensionless physical predictions. Avoid numerical fitting.

## Qubit phase
For z=(cos(θ/2), e^(iφ)sin(θ/2)), A=−iz†dz gives A=sin²(θ/2)dφ, so ∮A=π(1−cosθ) modulo 2π. The conventional Berry phase i∮z†dz has opposite sign. The visualization is a schematic of the latitude.

## Sources and context
- [Nielsen — TUFT record](https://philpapers.org/rec/NIETTU)
- [Hatcher — Vector Bundles and K-Theory](https://pi.math.cornell.edu/~hatcher/VBKT/VBpage.html)
- [Bérard-Bergery and Bourguignon — Laplacians and Riemannian submersions with totally geodesic fibres](https://doi.org/10.1215/S0012-7094-82-04928-3)
- [Dolan and Nash — The Standard Model Fermion Spectrum From Complex Projective Spaces](https://arxiv.org/abs/hep-th/0207078)
- [Simon — Holonomy, the Quantum Adiabatic Theorem, and Berry's Phase](https://doi.org/10.1103/PhysRevLett.51.2167)
- [Peralta-Salas and Slobodeanu — Contact structures and Beltrami fields on the torus and the sphere](https://arxiv.org/abs/2004.10185)

These results are independently reconstructed applications of known mathematics; novelty in the literature has not been established.
