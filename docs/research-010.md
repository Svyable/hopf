# Research 010 — Arithmetic of resonance on Berger S9

Scope: scalar Laplacian with horizontal scale fixed, t>0, a=t^(-2)−1>−1. Write x=ℓ+4, k=|Hopf weight|. Admissible x,k are integers with x≥k+4, k≥0 and x≡k mod 2. The eigenvalue is x²+ak²−16. We count *unsigned harmonic sectors*, not their complex representation dimensions or physical particles.

## 010-A: rational–irrational dichotomy

If two distinct admissible pairs have equal energy, k must differ (otherwise positive x is determined), so a=(x₂²−x₁²)/(k₁²−k₂²) is rational.

Conversely fix reduced a=A/B>−1, B>0, and any integer m≥1. Choose m distinct integers n≥|A|+4. D_n=B n²+A>0. The rational parametrization u_n=(B n²−A)/D_n, v_n=2Bn/D_n satisfies u_n²+a v_n²=1. For these n, u_n−v_n>0 and v_n strictly decreases: derivative of 2Bn/(Bn²+A) has sign A−Bn²<0. Let L=lcm(D_n) and R=4L. Put x_n=Ru_n, k_n=Rv_n. Both are multiples of 4 and x_n−k_n≥4 because their positive difference is a multiple of 4. Thus ℓ_n=x_n−4,k_n are admissible, distinct, and all have λ=R²−16. The construction also works at a=0 and negative rational a>−1. It proves unbounded sector count across eigenvalues for each rational metric parameter. It does not assert that every eigenvalue is highly degenerate. Both rational and irrational parameters are dense. For a perturbation δa, the difference between two formerly coincident levels is exactly δa(k₁²−k₂²). Exact degeneracy is not robust to arbitrary metric perturbations.

## 010-B: exact prime shell

At a=1 let P be a product of r≥1 distinct rational primes 1 mod 4. The Gaussian integers factor uniquely; each prime is a product of nonassociate conjugate primes. The standard sum-of-two-squares theorem gives r₂(P)=4·2^r ordered signed pairs. P is odd, not a square and not twice a square, so no axis or diagonal points occur. Modulo signs and permutation there are exactly 2^(r−1) pairs u>v>0. Multiply by 4: x=4u,k=4v, so x−k≥4 and parity holds. Conversely any representation x²+k²=16P has x,k divisible by 4 (twice apply the mod 4 squares argument). Consequently the shell λ=16P−16 contains exactly 2^(r−1) unsigned sectors. The generator multiplies Gaussian factors in both conjugate choices, deduplicates signs and order, and verifies each integer identity. A certificate with all such choices is complete by unique factorization, not a search up to a cutoff.

## 010-C: a Landau–Ramanujan law for distinct scalar eigenvalues

Let D(N) count distinct shifted energies x²+k²≤N and S(N) count all unsigned admissible sectors at a=1. Every shifted energy is even because x,k have equal parity. The even sums of two squares ≤N are in bijection with sums of two squares ≤N/2: x²+k²=2[(x+k)/2]²+2[(x−k)/2]² for equal parity, with inverse (u,v)→(u+v,u−v). Normalize x≥k≥0. The only even represented integers that might not give an admissible pair have x−k=0 or 2 (including small energies); at most O(√N) such integers. Thus D(N)=B(N/2)+O(√N), where B counts positive sums of two squares. The classical Landau–Ramanujan theorem B(X)~KX/√log X yields D(N)~K N/(2√log N). K≈0.7642236535892207.

S(N) is the lattice count in an angular sector of opening π/4 and radius √N, with same-parity sublattice index 2 and a constant-width strip removed near the diagonal. The area is πN/8, so S(N)=πN/16+O(√N). Consequently S(N)/D(N)~π√log N/(8K). This counts distinct unsigned sectors per distinct level, not Weyl's eigenvalue counting with representation multiplicities. The numerical scan iterates every admissible pair for N≤4,000,000, recording integer counts and record shells; leading asymptotic is not a finite-N error bound. No priority claim.

## Sources
- [Full Laplace spectrum of distance spheres in symmetric spaces of rank one](https://doi.org/10.1112/blms.12650).
- [Sum of two squares, Stanford notes](https://crypto.stanford.edu/pbc/notes/numberfield/sumsquares.html).
- [Berndt and Moree, Sums of two squares and the tau-function: Ramanujan's trail](https://doi.org/10.1016/j.exmath.2025.125721).
- [Research 001](research.md).

## Open problems
For rational a=A/B≠1, determine leading constants for represented integers of the quadratic form Bx²+Ak² under the admissible parity and wedge restriction (indefinite when a<0). For irrational a, quantify near coincidences via Diophantine approximation at a finite resolution. Compare weighted representation multiplicities and eigenvalue statistics separately. Physical mass and chirality are outside this theorem.
