# HOPF — Observatory

An interactive research playground for the complex Hopf fibration and possible geometric foundations of physics, inspired by Jenny Lorraine Nielsen's [TUFT](https://philpapers.org/rec/NIETTU).

- [Observatory (once Pages is enabled)](https://svyable.github.io/hopf/)
- [Projective atlas (research 002)](https://svyable.github.io/hopf/atlas.html)
- [Research notebook 001](docs/research.md)
- [Research notebook 002](docs/research-002.md)
- [GitHub Pages settings](https://github.com/Svyable/hopf/settings/pages)

## Run locally
```sh
python3 -m http.server 8000 --directory docs
# Open http://localhost:8000
node --test tests/*.test.mjs
```

No build, dependencies, external scripts or tracking. Static files live in docs/. To deploy, set Settings → Pages → Build and deployment → Source to GitHub Actions. The Pages workflow tests the mathematical model before publishing on main. If using branch-based Pages instead, choose main /docs (the workflow is designed for Actions mode).

## Research standards
Distinguish established mathematics, derived model results, and hypotheses. Do not claim experimental validation, verified novelty, or a derivation of particle masses from scalar eigenvalues. Report counterexamples and limitations in the ledger; contributions should include reproducible calculations.
