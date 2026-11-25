# HOPF — Observatory

An interactive research playground for the complex Hopf fibration and possible geometric foundations of physics, inspired by Jenny Lorraine Nielsen's [TUFT](https://philpapers.org/rec/NIETTU).

- [Observatory (once Pages is enabled)](https://svyable.github.io/hopf/)
- [Projective atlas (research 002)](https://svyable.github.io/hopf/atlas.html)
- [Research notebook 001](docs/research.md)
- [Research notebook 002](docs/research-002.md)
- [Symmetry laboratory](https://svyable.github.io/hopf/symmetry.html)
- [Research notebook 003](docs/research-003.md)
- [GitHub Pages settings](https://github.com/Svyable/hopf/settings/pages)

- [Fiber studio](https://svyable.github.io/hopf/studio.html)
- [Research notebook 004](docs/research-004.md)
- [Research notebook 007: linked fibers, Villarceau tori, Hopf invariant](docs/research-007.md)

- [Arithmetic observatory](https://svyable.github.io/hopf/arithmetic.html)
- [Research notebook 005](docs/research-005.md)

## Run locally
```sh
python3 -m http.server 8000 --directory docs
# Open http://localhost:8000
node --test tests/*.test.mjs
```

No build, dependencies, external scripts or tracking. Static files live in docs/. To deploy, set Settings → Pages → Build and deployment → Source to GitHub Actions. The Pages workflow tests the mathematical model before publishing on main. If using branch-based Pages instead, choose main /docs (the workflow is designed for Actions mode).

## Research standards
Distinguish established mathematics, derived model results, and hypotheses. Do not claim experimental validation, verified novelty, or a derivation of particle masses from scalar eigenvalues. Report counterexamples and limitations in the ledger; contributions should include reproducible calculations.

## Visualization controls
The shared observatory experience includes laboratory navigation, active section highlighting, Hopf azimuth/latitude/categorical palettes, zoom, PNG capture, filtered spectral modes, keyboard-accessible mode selection, and SVG figure export. All scientific formulas remain in the model modules.

## Geometry bridge
The arithmetic page now includes a linked continuous-sphere / finite-quadric explorer, coordinate slices, an ordered norm-one orbit microscope, exact invariant checks, and shareable/exportable experiments. [Proof notebook 006](docs/research-006.md).

## Matter atlas
[Explore matter](https://svyable.github.io/hopf/matter.html): all 118 element symbols, exact valence-charge accounting, editable ion compositions, spin-½ Born probabilities and Hopf phase, analytic hydrogenic orbitals, and calculated vacuum wavelengths compared with NIST reference ionization energies. [Research 008](docs/research-008.md).

## Dimension Observatory
[Interactive heat-kernel and dimensional flow laboratory](https://svyable.github.io/hopf/heat.html) · [Research notebook 009](docs/research-009.md). Exact scalar heat trace, controlled truncation, noncommuting short-time/collapse limits, and phase-weight suppression.

## Arithmetic of Resonance
[Research 010 laboratory](https://svyable.github.io/hopf/resonance.html) · [Proof notebook](docs/research-010.md). Rational–irrational sector dichotomy, exact Gaussian prime shells, Landau–Ramanujan asymptotics and downloadable BigInt certificates.

## Coherence Observatory
[Research 011 laboratory](https://svyable.github.io/hopf/coherence.html) · [Proofs, sources and experimental protocol](docs/research-011.md). Synthetic Kuramoto and common-drive controls, exact projective phase geometry, Markov lumpability and a blinded morphic-resonance-inspired hypothesis simulator. No empirical EEG analysis or claim of nonlocal consciousness.

## Temporal Information Observatory
[Research 012 laboratory](https://svyable.github.io/hopf/temporal.html) · [Proofs and proposed protocol](docs/research-012.md). Adversarial synthetic presentiment benchmark: causal versus centered filters, known versus wrong target probabilities, anytime-valid evidence mixtures, exact finite null enumeration and information-theoretic bounds. No real anticipatory physiology or retrocausality claim.

## Observer Universe
[Research 013 laboratory](https://svyable.github.io/hopf/observer.html) · [Proof notebook](docs/research-013.md). Exact multiway rewriting DAG, hook-length counts, observation extensions and strong-lumpability certificates. Inspired by Wolfram and Bennett; independent finite toy model.
