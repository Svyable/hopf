# Research 019 — Gauge holonomy and the spectral cost of global inconsistency

Finite connected undirected simple graph, n≤32, arbitrary orientation (stored smaller index → larger). The model is classical phase transport, not a physical magnetic field, quantum brain or consciousness claim. Numerical eigensolver output is distinguished from exact integer determinants and analytic proofs.

## 019-A: Local gauge freedom
Let D be the oriented vertex-edge incidence matrix, with −1 at the tail and +1 at the head. For real edge phases a define Q_a(z)=Σ_(u,v)|z_v−e^(ia_uv) z_u|². The corresponding Hermitian L_a is positive semidefinite. Under a→a+Dᵀθ, z→diag(e^(iθ))z, Q is unchanged. Thus spectra are gauge invariant. For any cycle vector c∈ker D, cᵀa is unchanged as a real number and its exponential is the holonomy. A connected graph has λ_min(L_a)=0 iff all cycle holonomies are 1: vanishing energy forces parallel transport along every edge, nonzero equal modulus everywhere, hence unit loop products; conversely, define z along a spanning tree and use trivial cycle holonomy to satisfy every chord. This is a connection-Laplacian obstruction to perfect phase alignment, not a claim about EEG.

## 019-B: Cycle Gram and perturbation
Use fundamental cycles from a spanning tree as columns of B (oriented chord coefficient +1). They span ker D and form an integral lattice basis. G=BᵀB positive definite for nonzero cycle rank. Given unwrapped flux φ=Bᵀa, the unique minimum-norm lift is h=B G^−1 φ. Indeed it satisfies the flux constraint and all other lifts differ by an orthogonal vector in im Dᵀ. Therefore ||h||²=φᵀG^−1φ. For a tree both sides are zero. The constant test vector in harmonic gauge gives
0≤λ_min(L_(εa))≤(1/n)Σ_e 2(1−cos(εh_e))≤ε²φᵀG^−1φ/n.
For small ε, the simple zero eigenvalue at ε=0 has an analytic branch. In harmonic gauge Dh=0, so L'(0) applied to the constant vector is zero. The second derivative of the eigenvalue is therefore the expectation of L''(0) on the normalized constant vector, equal to 2||h||²/n. Complex conjugation maps ε→−ε, so the branch is even. Hence
λ_min(L_(εa))=ε² φᵀG^−1φ/n + O(ε⁴).
This is a deduction from established perturbation theory, not a priority claim. For an n-cycle, λ_k=2−2cos((2πk+φ)/n), exact by a uniform gauge and Fourier modes. At small φ the coefficient is φ²/n².

## 019-C: Heat trace and strictness
Choose d≥maximum degree and K_a=dI−L_a. Diagonal entries d−deg≥0; off-diagonal entries are edge unit phases. Expand Tr exp(−tL_a)=e^(-td)Σ_(k≥0) t^k Tr(K_a^k)/k!. Every term in each trace is a weighted closed walk; untwisted weights are nonnegative, and real parts of twisted weights are at most their untwisted values. Thus magnetic heat trace ≤ ordinary heat trace for t>0. If a cycle has nontrivial holonomy its closed walk has cosφ<1, making at least one coefficient strictly smaller; all other differences nonnegative. Equality iff connection is flat. The proof uses Hermitian spectral trace, not a stochastic interpretation of complex transport.

## 019-D: Cycle determinant and spanning trees
Cauchy–Binet expands det(BᵀB) as sum of squared maximal minors of B. A selected row set S of size cycle rank has nonzero minor iff its complementary edges form a spanning tree: if the complement contains a cycle, a nonzero cycle vanishes on S; if the complement is a tree, fundamental cycles with chords S give an integer lattice basis whose restriction to S is identity. Two integral bases differ by a unimodular matrix, so the minor is ±1. Each spanning tree contributes one. Thus det G=τ(graph), equal independently to any reduced Laplacian determinant by the matrix-tree theorem. Empty determinant is one. Numerical inverse Gram and spectra are not interval-certified; integer Bareiss determinants are exact.

## Sources and limits
- [Forman, Determinants of Laplacians on graphs](https://doi.org/10.1016/0040-9383(93)90021-6)
- [Kenyon, Spanning forests and the vector bundle Laplacian](https://arxiv.org/abs/1001.4028)
- [Singer, Angular synchronization by eigenvectors and semidefinite programming](https://arxiv.org/abs/0905.3174)
- [Research 015](research-015.md), [Research 011](research-011.md).
Next: measure curvature of the flux-response tensor under rule transformations, compare different gauges with independently measured complex cross-spectra, and investigate higher-dimensional connections. Classical statistical and physiological claims need separate data and null models. No new physical law or consciousness mechanism established.
