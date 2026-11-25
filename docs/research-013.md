# Research 013 — The observer universe: exact multiway histories and autonomous quotients

## Motivation
Inspired by [Wolfram's multiway systems](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/) and [Bennett's weakness framework](https://arxiv.org/abs/2301.12987), with [his temporal consciousness preprint](https://arxiv.org/abs/2601.11620) as a further motivation. This finite construction is neither the Ruliad nor Stack Theory nor a consciousness model. No endorsement or priority claim.

## 013-A: event poset and history count
Start at 0^m 1^n; asynchronously replace any adjacent 01 by 10. Define rank as the number of one-before-zero pairs. Each update raises rank by exactly one; all terminal words have no 01 and therefore equal 1^n 0^m. All maximal histories have mn events. Label the zeros from right to left and ones from left to right. Each event (i,j) exchanges zero i and one j. The prerequisites are (i−1,j) and (i,j−1) when present, since relative orders of identical bits are preserved. Conversely any minimal unperformed event in this product poset is an adjacent exchange. Thus histories are linear extensions of [m]×[n], states are order ideals, and there are C(m+n,m) states (binary words with the fixed population; each reachable by reversing adjacent inversions to the start). The rectangular Young-tableau hook formula yields H=(mn)!/∏(m+n−i−j−1) over zero-based i,j. Dynamic programming over the DAG independently computes path counts both to and from every state. Their product counts complete histories through that node. It is a known combinatorial identity, not a discovery of universal physics or computational irreducibility. Termination and a common normal form establish confluence here; this alone is not the full Wolfram causal-invariance condition. The event-poset construction supplies stronger schedule-independent dependencies for this particular model.

## 013-B: observer quotient theorem
Choose uniform probability among enabled events, terminal self-loop. For observation f, group microstates with identical f. Strong lumpability means ∑_{z:f(z)=b}P(x,z)=∑_{z:f(z)=b}P(y,z) whenever f(x)=f(y), for every b. The exact checker cross-multiplies integer successor counts; a failed certificate includes x,y,b and both fractions. Rank is strongly lumpable because every event raises rank by one, with absorbing top rank. Full-state observation is trivially lumpable. Prefix, rank-plus-prefix and enabled-move counts are not guaranteed to be lumpable; compute the actual result for each finite world. A failure excludes a Markov quotient valid for all initial states, not every possible stationary or history-dependent reduced model.

## 013-C: constraint extensions
For a selected state, its description f(x) has extension {y:f(y)=f(x)}. Cardinality measures how many possibilities remain consistent with this description in this finite universe. This is inspired by, but not identical to, Bennett's formal definition of weakness; no learning-optimality theorem is claimed. The rank quotient illustrates that a coarse description can still predict its own future exactly. Other descriptions may need more memory. The computational experiments distinguish descriptive compression, extension size and predictive closure.

## Open research
Generalize to competing rewrite systems, find minimal predictive refinements, compare weakness with code-length priors on held-out tasks, and examine observer-dependent spectral invariants. Introduce genuinely embedded observers and explicit resource budgets before drawing conclusions about cognition. Relate discrete observer equivalence to the Hopf phase quotient only via proved invariants, not analogy alone.

## Sources
- [Bennett, The Optimal Choice of Hypothesis Is the Weakest, Not the Shortest](https://arxiv.org/abs/2301.12987).
- [Bennett, A Mind Cannot Be Smeared Across Time](https://arxiv.org/abs/2601.11620).
- [Wolfram, The Concept of the Ruliad](https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad/).
- [Wolfram Physics Project, Causal Invariance](https://wolframphysics.org/technical-introduction/the-updating-process-in-our-models/causal-invariance/).
- [Young diagrams and linear extensions](https://www.symmetricfunctions.com/posets.htm).
