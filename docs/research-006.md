# Research 006 — Two worlds, one invariant
For odd p, let d be a nonsquare and K=F_p[u]/(u²−d). Conjugation sends u to −u; N(a+bu)=a²−db². On the unit Hermitian quadric N(a)+N(b)=1, define H(a,b)=(2 Re(conj(a)b),2 Im_u(conj(a)b),N(a)−N(b)), with Im_u the coefficient of u, not a real imaginary part. Then x²−dy²+z²=4N(a)N(b)+(N(a)−N(b))²=1. Multiplication by any norm-one scalar leaves H invariant.

For the projective chart [1:w], write w=A+Bu and n=1+N(w). For n≠0 the image is (2A/n,2B/n,(1−N(w))/n); the line at infinity maps to (0,0,−1). Conversely if z≠−1, w=(x+yu)/(1+z). The equation implies N(w)=(1−z)/(1+z), so n=2/(1+z) is nonzero. If z=−1, then x²−dy²=0 forces x=y=0 because d is nonsquare. Thus the finite quadric is in bijection with the nonisotropic lines and has p(p−1) points. Each point has p+1 unit representatives.

The multiplicative group of a finite field is cyclic; its norm-one subgroup has order p+1. Choosing a generator and any unit representative yields an ordered orbit of all p+1 representatives, each with identical H. The implementation independently enumerates every modular quadric point and checks the orbit for all supported primes. The complex Hopf map is recovered by replacing the quadratic norm with the complex norm, giving x²+y²+z²=1.

## Visualization conventions
The real sphere is sampled by latitude and longitude curves. Finite points are shown using centered integer residues in a Euclidean viewing window, not a metric intrinsic to the finite field. Rotation is only a display transformation. The cyclic wheel uses exponents of a generator, not geometric distances. No continuum limit, physical identification or literature novelty is claimed. The two models share the algebraic norm identity, not an asserted equivalence of their geometries.

See [Research 005](research-005.md) for the count and zeta function and [Research 004](research-004.md) for continuous holonomy.
