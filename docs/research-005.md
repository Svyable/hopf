# Research 005 — An arithmetic analogue of the Hopf fibration

## Construction and scope
Let q be an odd prime power and K=F_{q²}. Consider X_m={z∈K^m: sum N(z_i)=1}, with norm N:K→F_q. The norm-one torus T acts freely by scalar multiplication. The quotient B_m is the open variety of nondegenerate lines in the Weil restriction of projective space: over the algebraic closure it is the complement of the incidence divisor in P^{m−1}×(P^{m−1})*. Frobenius swaps the two factors under the quadratic descent (using the Hermitian pairing). This is an algebraic analogue of the compact Hopf construction, not the complex Hopf bundle itself. Over a finite field a nondegenerate Hermitian line has q+1 unit representatives by surjectivity of the norm. In the split case, a point is a line and a dual line with nonzero pairing, and unit representatives form a G_m torsor. Thus the displayed quotient point count is valid over each extension (also follows from Lang's theorem for the connected torus).

## Count proof
For Q=q^r and ε=(-1)^r, the torus has Q−ε points. In odd degree, each nonzero norm value has Q+1 preimages and zero has just one. If A_m is the number of vectors of norm sum 1 and Z_m of norm sum 0, then Z_m+(Q−1)A_m=Q^{2m}. The recurrence A_{m+1}=A_m+(Q+1)[Z_m+(Q−2)A_m]=(Q+1)Q^{2m}−Q A_m, with A_1=Q+1. Induction yields A_m=Q^{m−1}(Q^m−(−1)^m). In even degree the quadratic algebra splits, so the equation is x·y=1 with x,y∈F_Q^m. There are Q^m−1 nonzero x, each admitting Q^{m−1} choices of y. Unified count: |X_m|=Q^{m−1}(Q^m−ε^m). Divide by Q−ε to get |B_m|=Σ_{j=0}^{m−1} ε^j Q^{2m−2−j}.

For m=2 and r=1 this is q(q−1). There are q²+1 lines in P¹(F_{q²}), of which q+1 are isotropic; the remaining q(q−1) each have q+1 unit representatives. The UI enumerates the affine chart and the line at infinity independently.

## Zeta function
Define Z(B_m,T)=exp(Σ_{r≥1}|B_m(F_{q^r})| T^r/r). Substituting the finite power sum yields
Z(B_m,T)=∏_{j=0}^{m−1}(1−(−1)^j q^{2m−2−j} T)^{-1}.
For m=2, Z=1/[(1−q²T)(1+qT)]. These reciprocal poles are not classical Riemann zeta zeros. The elementary identity determines point counts; it is not a proof of the Weil conjectures or a claim of a new theorem. The variety has complex dimension 2m−2 after base change (algebraic dimension, not a physical dimension). The UI uses BigInt for exact powers and checks the count against the trace sum.

## Further reading
- [Levent Alpöge — research and publications](https://alpo.ge/)
- [Stacks Project — Weil restriction](https://stacks.math.columbia.edu/tag/05Y8)
- [Milne — Étale Cohomology](https://www.jmilne.org/math/CourseNotes/LEC.pdf)
- [Nielsen — TUFT record](https://philpapers.org/rec/NIETTU)

The connection to arithmetic geometry is mathematical; no claim is made that Alpöge endorses or has reviewed the project.
