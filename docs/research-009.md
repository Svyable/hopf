# Research 009 — A dimension can disappear from a spectral probe

## Domain
Compact Riemannian S⁹ with canonical Hopf metric g_t=g_H+t²η², 0<t≤1, unit round horizontal length. We do NOT hold total volume fixed. t=0 denotes the CP⁴ neutral limit only. All diffusion times s are in units of the squared horizontal radius. No spacetime or quantum gravity dynamics is assumed.

## 009-A — The heat trace
From notebook 001, λ_{ℓ,k}(t)=ℓ(ℓ+8)+(t⁻²−1)k², ℓ≥0, k=−ℓ,−ℓ+2,…,ℓ. With p=(ℓ+k)/2, q=(ℓ−k)/2, the complex multiplicity is C(p+4,4)C(q+4,4)−C(p+3,4)C(q+3,4). The code evaluates the equivalent product C(p+4,4)C(q+4,4)·4(ℓ+4)/((p+4)(q+4)) to avoid cancellation. Include ℓ=0 with multiplicity one.

Z_t(s)=Σ d_{ℓ,k} exp(−sλ_{ℓ,k}), M_t(s)=Σ λ_{ℓ,k} d_{ℓ,k} exp(−sλ_{ℓ,k}), and d_s(t,s)=−2∂log Z_t/∂log s=2sM_t/Z_t. This is a scale-dependent heat-trace diagnostic. On a homogeneous space the normalized integrated return probability Z/Vol has the same logarithmic slope. For fixed t>0 Weyl/heat asymptotics give Z_t(s)~Vol(g_t)/(4πs)^(9/2), hence d_s→9 as s→0. The heat-trace expansion also gives the derivative asymptotic.

Neutral k=0 modes have ℓ=2m, λ=4m(m+4); these are exactly the scalar spectrum of CP⁴ with the Fubini–Study submersion metric. The neutral heat trace Z_0(s) has dimension 8 in its short-time asymptotics. Thus the limits of d_s do not commute: lim_{t→0}lim_{s→0} d_s=9, but lim_{s→0}lim_{t→0} d_s=8. At fixed t, s→∞ gives d_s→0 since the zero mode dominates. The collapse is a standard geometric mechanism, not a discovery of physically missing dimensions.

## 009-B — Quantitative suppression
For nonzero integer k, k²≥1. Therefore each nonzero sector is suppressed relative to its t=1 term by at least exp[−s(t⁻²−1)] and
Z_t(s)−Z_0(s) ≤ exp[−s(t⁻²−1)] (Z_1(s)−Z_0(s)).
At fixed s>0, dominated convergence applies also to M_t: use λe^(−sλ) ≤ (2/(es))e^(−sλ/2), and λ≥ℓ(ℓ+8). This proves convergence of d_s to the base result. A near-eight regime is possible when t²≪s≪1 (with curvature corrections). This is not a general prediction of a four-dimensional universe.

## Numerical truncation control
For degree ℓ the round multiplicity summed over all weights is D_ℓ=(ℓ+4)/4 · C(ℓ+7,7). For t≤1, λ≥a_ℓ=ℓ(ℓ+8). Hence the omitted heat trace above cutoff L is bounded by Σ_{ℓ>L} D_ℓ e^(−sa_ℓ). The ratio of successive terms is R_ℓ=(ℓ+5)/(ℓ+4)·(ℓ+8)/(ℓ+1)·exp[−s(2ℓ+9)], decreasing for ℓ≥1. For the first omitted degree j=L+1, if R_j<1 the geometric upper bound is B_Z=D_j e^(−sa_j)/(1−R_j). If sa_j≥1, λe^(−sλ) is decreasing for λ≥a_j and the analogous bound is B_M=a_j D_j e^(−sa_j)/(1−R_j a_{j+1}/a_j), when the denominator is positive. The ratio a_{ℓ+1}/a_ℓ decreases as well. The resulting exact-arithmetic interval is
2sM_L/(Z_L+B_Z) ≤ d_s ≤ 2s(M_L+B_M)/Z_L.
The chosen L=ceil(sqrt(55/s)) provides conservative truncation estimates throughout the UI. Calculations use double precision; the interval estimates truncation only, not floating-point rounding. Values in the graphs are numerical approximations to the exact sums. All formulas and tests are local and reproducible.

## References
- [Spectral geometry of Riemannian submersions, Encyclopedia of Mathematics](https://encyclopediaofmath.org/wiki/Spectral_geometry_of_Riemannian_submersions).
- L. Bérard-Bergery and J.-P. Bourguignon, Laplacians and Riemannian submersions with totally geodesic fibres, Illinois Journal of Mathematics 26 (1982), 181–200.
- [F. Baudoin, Riemannian foliations: Model spaces](https://fabricebaudoin.blog/2014/10/06/lecture-2-riemannian-foliations-model-spaces/).
- [Spectral dimension in a quantum-gravity context, for comparison only](https://link.springer.com/article/10.1140/epjc/s10052-022-10313-0).
- [Notebook 001](research.md).

No priority claim is made; the exact limits follow from standard spectral geometry. The new contribution to this observatory is a reproducible, error-controlled scalar heat-trace experiment and the explicit bound on phase-sector decoupling.
