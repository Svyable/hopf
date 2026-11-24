# Research 002 — Projective states and the homogeneous index obstruction

## 002-A: A stronger obstruction
Take CP⁴ = GL(5,C)/P for the maximal parabolic stabilizing a line. Consider an irreducible homogeneous holomorphic vector bundle associated with an irreducible parabolic representation, using the Borel–Weil–Bott weight convention λ=(λ₁; λ₂≥λ₃≥λ₄≥λ₅), with integers. Choose the canonical Spin-c Dirac operator twisted by that holomorphic bundle: its index equals the holomorphic Euler characteristic.

Borel–Weil–Bott: add ρ=(4,3,2,1,0). Repeated coordinates imply all cohomology vanishes. Otherwise sort decreasingly, subtract ρ, and obtain a dominant weight μ. The unique nonzero cohomology is in degree q equal to the inversion count of λ+ρ, with representation dimension D=∏_{i<j}(μ_i−μ_j+j−i)/(j−i). Thus index = (−1)^q D. The convention gives χ(O(k)) for λ=(k,0,0,0,0); dualizing the representation convention does not alter the dimension.

Every nontrivial irreducible SU(5) representation has dimension at least 5. Proof: a dominant weight is a nonnegative sum of fundamental weights. The Weyl dimension formula is coordinatewise nondecreasing in these Dynkin labels, and the fundamental dimensions are 5,10,10,5. A representation trivial on SU(5) has dimension 1. Hence no such individual homogeneous irreducible bundle can have index ±3.

This is not a no-go theorem for all bundles. Reducible bundles, nonhomogeneous holomorphic bundles, different operators, symmetry breaking or more general physical constructions can evade the hypotheses. Even an index of three does not identify three Standard Model generations.

## 002-B: Nested projective spaces
χ(CPⁿ,O(k))=∏_{j=1}^n(k+j)/n!. For k≥0 this is C(k+n,n), and for −n≤k≤−1 it is zero. By Serre duality negative twists k≤−n−1 give (−1)^n χ(O(−k−n−1)). The smallest positive index above one is n+1. Absolute index three therefore occurs for n=1 at k=2,−4 and n=2 at k=1,−4, but never for n=3 or 4. The CP² triplet at k=1 transforms nontrivially under SU(3) (or the dual representation); it is not three independent gauge singlets.

## Projective state geometry
A unit vector z in C⁵ is a point on S⁹. The orbit e^{iφ}z is one Hopf fiber. Its ray can be encoded by the rank-one Hermitian projector ρ=zz†. Direct multiplication proves ρ is unchanged by common phase. Fidelity to unit vector w is |⟨w,z⟩|²=tr(ρ_zρ_w); Fubini–Study distance in the chosen normalization is arccos |⟨w,z⟩|. These are exact quantum-state geometry results; they do not derive physical spacetime or establish that the universe is a five-state quantum system.

## Reproducibility
The atlas includes an exact integer Weyl dimension product using BigInt, finite slider bounds, and numerical ray-invariance tests. The no-go result itself is analytical and does not rely on a finite search. Novelty in the literature is not established.

## Sources
- [Bott–Borel–Weil theorem, Encyclopedia of Mathematics](https://encyclopediaofmath.org/wiki/Bott-Borel-Weil_theorem)
- [Fubini–Study metric, Encyclopedia of Mathematics](https://encyclopediaofmath.org/wiki/Fubini-Study_metric)
- [Dolan and Nash — The Standard Model Fermion Spectrum From Complex Projective Spaces](https://arxiv.org/abs/hep-th/0207078)
- [Nielsen — TUFT](https://philpapers.org/rec/NIETTU)

## 002-C: Next question
Seek a higher-rank, nonhomogeneous or physically motivated reducible bundle whose index three follows from a selection principle. Check representations and gauge anomaly cancellation before making any particle identification. 
