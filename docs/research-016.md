# Research 016 — Structure and randomness
Finite sign functions f:F₂ⁿ→{−1,+1}, n=2–8. Inspired by Gowers uniformity and Tao's structure/randomness framework. No claim of new inverse theorem or physical consciousness model.

## Exact norms
Let N=2^n, W(a)=Σ_x f(x)(−1)^(a·x). By Fourier orthogonality U²⁴=Σ_a W(a)^4/N^4. With Δ_h f(x)=f(x)f(x+h), the cube definition gives U³⁸=E_h ||Δ_h f||_U²^4=Σ_{h,a} W(Δ_h f)(a)^4/N^5. Both numerators are exact BigInt. Every cube including repeated vertices counts. A quadratic phase has constant third multiplicative derivative +1; hence U³=1. For nondegenerate quadratic phase in even dimension Walsh magnitudes are sqrt(N), so U²=N^(-1/4).

## Identical power, different structure
On F₂³×F₂³ take f(x,y)=(-1)^(x·y) and g(x,y)=(-1)^(x·π(y)), where π swaps 0 and 1 and fixes other elements. The Walsh sum over x vanishes except when π(y)=a; consequently every coefficient has magnitude 8 for both functions. Their power spectra agree exactly. The second phase is not quadratic: π is not affine (an affine permutation of F₂³ cannot fix six points and move two, because its fixed set is an affine subspace); at least one coordinate has degree ≥2 and multiplying by the independent x coordinate raises degree. Thus some third derivative is nonconstant/nonzero, U³<1. This is a standard Maiorana–McFarland bent-function construction used here as a counterexample to the sufficiency of power spectra. No priority claim.

## Finite inverse oracle
Enumerate all squarefree monomials of degree 1 and 2, no constant. Their Boolean phase bitmasks fit in uint32 for n≤5. Gray-code enumeration visits all 2^(n+n(n−1)/2) coefficient choices, toggling a monomial at each step; Hamming distance yields exact dot product. Absolute value accounts for the omitted constant. Best affine and quadratic correlations are exact; ties retain first Gray-order witness. This is a bounded exhaustive search, not the general inverse theorem.

## Additive structure
r(s)=#ordered pairs in A² with sum s, E=Σ_s r(s)^2 counts additive quadruples. Cauchy–Schwarz gives |A|⁴≤|A+A|E. Affine span rank is computed by XOR elimination on differences from one element. Empty-set doubling is undefined. In F₂, 3-term APs degenerate; no claim about long progressions in integers.

## Rule bridge and exhaustive atlas
A subset of binary words reachable under length-preserving rules embeds in F₂ⁿ. Membership signs distinguish reachable/unreachable. These statistics depend on the encoding, not arbitrary vertex relabelings. On F₂⁴ enumerate every one of 2^16 sign tables and bucket by exact U²⁴ numerator. Each bucket includes a representative, total counts and CSV export. Open directions: classify U³ within equal Walsh-power families, compare reachability sets across relabelings, and search quantitative structure-versus-complexity tradeoffs with preregistered finite ranges.

## Sources
- [Tao, Structure and randomness in combinatorics](https://arxiv.org/abs/0707.4269).
- [Green & Tao, An inverse theorem for the Gowers U³ norm](https://arxiv.org/abs/math/0503014).
- [Tao, inverse conjecture finite field notes](https://terrytao.wordpress.com/2010/05/20/254b-notes-5-the-inverse-conjecture-for-the-gowers-norm-i-the-finite-field-case/).
