# Research 020 — Spectral detection of loop holonomy
## Problem and prior art
Can a spectral observer recover the scale and type of the first globally inconsistent loop? [Walks and eigenvalues of signed graphs](https://doi.org/10.1515/spma-2023-0104) establishes the signed-graph analogue, so we do not claim that as new. Our Z4 extension is an elementary derivation; broader gain-graph literature priority remains unresolved. Method adapted from [ScientistTwo](https://scientist-two.github.io/), not its code or agents.

## Derivation
On a finite connected simple graph label oriented edges by a_e∈Z4, reversing sign on reversal. For character j, adjacency A_j has complex entries i^(j a_e) along edges and conjugate reverse entries. It is Hermitian. Define D_j(k)=Tr(A_0^k)−Tr(A_j^k). A closed walk has flux h∈Z4. If N_h(k) counts such rooted directed walks, reversal gives N_1=N_3. Consequently D_1=N_1+N_3+2N_2 and D_2=2(N_1+N_3), exact nonnegative integers.

Let g be the shortest nonzero-flux simple cycle length, or infinity if flat. Any closed walk splits into simple cycles and backtracks; if its flux is nonzero at least one component has nonzero flux. Thus D_1(k)=0 for k<g, positive at g if finite. At g every nonzero-flux closed walk is itself a simple cycle, counted 2g times (orientations and roots). Let c_odd count flux ±1 cycles and c_half count flux 2 cycles of that length. Then:
D_1(g)=2g c_odd+4g c_half; D_2(g)=4g c_odd.
c_odd=D_2(g)/(4g); c_half=(D_1(g)−D_2(g)/2)/(4g).
The pair of characters distinguishes these types; character 2 is nonfaithful, invisible to flux 2. A single first faithful deficit cannot in general identify both counts from that scalar alone. Vertex switching preserves every closed flux. A tree has no nontrivial cycles.

Connection to research 019: choose d≥max degree, K_j=dI−L_j=A_j+diag(d−deg). Closed walks with stays contribute identically through order g−1; at order g a nonzero-flux walk cannot contain a stay. Hence the first nonzero coefficient of Tr exp(−tL_0)−Tr exp(−tL_1) is D_1(g)/g! at t^g, also when d varies over admissible shifts. This is an exact asymptotic statement for the chosen discrete connection, not a physical observation.

## Fixed pilot
Protocol committed as 155f75dca96cd4cd1be656a630f783c13b585e0f before computing results. Not externally preregistered or blinded. The screening and validation sets are specified in [020-protocol.json](research/020-protocol.json). Enumerate all 4^cycle-rank tree-gauge assignments, which exhaust switching classes of Z4 edge labels. DP propagates counts in the four-sheet lift; independent DFS lists unoriented simple cycles by minimum vertex and orientation. Integer counts fit exact JS safe integers in these small graphs. Compare exact length and both cycle counts, and recompute under deterministic vertex switching. Report all mismatch counts and first witness per category. The term "validation" means fixed second graph family, not secret holdout.

Screen: 88 assignments, 0 primary and switching misses, 12 nonfaithful misses. Validation: 1,301 assignments, 0 primary and switching misses, 50 nonfaithful misses, 3 fundamental-cycle shortcut misses. Ordinary girth (given nonflatness) succeeds on all fixed cases; benchmark cannot establish superiority to that baseline. Post-benchmark exploratory challenge: a triangle and square joined by a bridge, only square twisted. Ordinary girth 3, true first deficit at 4, D1=8, D2=16. Keep separate from validation results. All results in [020-results.json](research/020-results.json).

## Critique and rebuttal / same-author, not independent review
- "You rediscovered an existing signed-graph result." Correct: prior art recorded. Z4 character decomposition and heat coefficient derived here; no novelty assertion.
- "The favorable benchmark is too small." Correct: fixed nine small graphs; baseline girth success reported. Exploratory challenge does not change primary metrics. Expand future fixed datasets with mixed-cycle graphs.
- "The trace computation might simply reproduce the same enumeration." DP enumerates walks with states (vertex, flux); DFS independently lists simple cycles. An additional direct matrix multiplication control checks character traces on small graphs.
- "Automated review is not scientific acceptance." Correct; no external peer review, no citation-completeness audit, no SOTA or physical claim. Source existence and relevance checked for the signed result and ScientistTwo methodology, broader priority not certified.

## Reproduction and evidence
From root: node --test tests/research-method.test.mjs. The test recomputes fixed results and separately tests the exploratory witness. The research page loads the same benchmark manifest/results and exposes individual flux assignments, trace deficits and cycle witnesses. CI checks software and result alignment, not publication validity.
