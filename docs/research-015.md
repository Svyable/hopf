# Research 015 — Euler–Riemann invariant observatory
Scope: connected undirected simple graph (up to 32 nodes), from finite rewrite worlds or named graph benchmarks. Directions and multiplicities are discarded. The metric and walk are modeling choices, not inferred physical spacetime.

## 015-A: Exact Ollivier–Ricci curvature
At a vertex x of degree d_x>0 define μ_x(x)=1/2, μ_x(y)=1/(2d_x) for neighbors. For adjacent x,y, κ=1−W₁(μ_x,μ_y), with graph shortest-path cost. Scale by 2 lcm(d_x,d_y) to integer supplies/demands. The bipartite transport network has integral capacities and costs, so successive shortest augmenting paths with residual reverse edges produce an integral optimum; shortest paths use Bellman–Ford. The result is an exact rational value. A solitary vertex has no edge to measure. See [Ollivier (2009)](https://arxiv.org/abs/math/0701886).

## 015-B: Persistent homology
The metric Rips filtration has vertex birth zero, edge birth d(i,j), triangle birth max of its three edge distances. Sort by birth, then dimension, then lexicographic labels; every face precedes its coface. Reduce boundary columns over F₂ using XOR and unique low pivots; a zero column creates a class, a nonzero column kills its pivot class. Record H0 and H1, including zero-lifetime bars in the export. Higher simplices are irrelevant for H0/H1, but would matter for H2; all Euler characteristics below refer only to the 2-skeleton. [Persistence matrix reduction background](https://doi.org/10.1007/s41468-023-00156-3).

## 015-C: Hodge and heat
For oriented boundary maps B1 (vertices × edges) and B2 (edges × triangles), B1 B2=0. Δ0=B1 B1ᵀ, Δ1=B1ᵀ B1+B2 B2ᵀ, Δ2=B2ᵀ B2. The positive spectrum of Δ2 equals the positive spectrum of B2 B2ᵀ with zero modes padded to triangle count. Independently diagonalize Δ0, Δ1 and B2 B2ᵀ using Jacobi rotations (cap 80 edges). For each positive eigenvalue, d+d* pairs even and odd eigenspaces, since (d+d*)²=Δ; only harmonic dimensions contribute to the alternating heat trace. Thus Tr exp(−tΔ0)−Tr exp(−tΔ1)+Tr exp(−tΔ2)=V−E+F for all t≥0. Numerically verify on the same complex selected in the filtration. The real Hodge nullities and F₂ persistence use different coefficient fields, so do not identify them in general. [Knill, discrete McKean–Singer](https://arxiv.org/abs/1301.1408).

## 015-D: Information geometry
For probability vectors p,q let a=√p,b=√q, θ=arccos(a·b). Fisher–Rao distance is 2θ; the interpolation is the square of sin((1−t)θ)a/sin θ + sin(tθ)b/sin θ, with identical endpoints handled by continuity. This is the shorter spherical geodesic with nonnegative coordinates. It is a classical statistical metric, not a quantum or consciousness model.

## 015-E: Euler products and Hopf spectral zeta
From research 010 at a=1: x=ℓ+4, 0≤k≤ℓ and x≡k mod 2. Set u=(x+k)/2, v=(x−k)/2, hence u≥v≥2, and λ+16=2(u²+v²). Define Z_H(s)=sum_{u≥v≥2}[2(u²+v²)]^(−s), Re s>1. The sum-of-two-squares identity sum r₂(n)n^(−s)=4ζ(s)β(s) gives the nonnegative ordered wedge sum (including axis and diagonal) ζβ/2 + (1+2^(−s))ζ(2s)/2. Subtract v=0 and v=1 to obtain:
Z_H(s)=2^(−s−1)[ζ(s)β(s)+(2^(−s)−1)ζ(2s)]−2^(−s)sum_{u≥1}(u²+1)^(−s).
For truncation u≤M, |tail|≤2^(−σ)sum_{u>M}u^(1−2σ)≤2^(−σ)M^(2−2σ)/(2σ−2). Gaussian Euler product ζβ has local factors (1−p^(−s))⁻¹(1−χ₋₄(p)p^(−s))⁻¹; log-tail absolute bound for p>P is ≤2P^(1−σ)/[(σ−1)(1−(P+1)^(−σ))], by geometric series and integral comparison. The complex portrait evaluates the direct sum only for σ>1, not analytic continuation. A strict tail-disk separation excludes a zero in exact arithmetic; floating-point roundoff not certified. No claim about critical-strip zeros or the Riemann hypothesis. [Sum of squares](https://crypto.stanford.edu/pbc/notes/numberfield/sumsquares.html).

## 015-F: Inverse spectral obstruction
Rook and Shrikhande graphs on Z₄² have parameters (16,6,2,2): each pair of distinct vertices shares exactly two neighbors. Hence A²=4I+2J, with adjacency eigenvalues 6,2,−2 and multiplicities 1,6,9; Laplacian spectrum 0,4,8 with same multiplicities. Independently compute exact characteristic polynomial using Faddeev–LeVerrier integer recurrence. Rook has eight four-cliques (four rows and four columns); Shrikhande has none. This proves nonisomorphism despite identical spectrum. Established example, not newly discovered. [Shrikhande graph](https://mathworld.wolfram.com/ShrikhandeGraph.html). The graph metric is not uniquely recoverable from the scalar spectrum. No claim of inverse spectral rigidity for the rewrite family.

All experiments local, reproducible and exportable. No literature-priority claim.

The exact transport solver further distinguishes the benchmarks: all 48 rook edges have κ=1/3 and all 48 Shrikhande edges have κ=1/6 under the specified half-lazy walk. This is a finite verified computation, not a claim of mathematical priority. The curvature certificate lists each integer transport cost and denominator.
