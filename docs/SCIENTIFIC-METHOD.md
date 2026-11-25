# HOPF scientific research protocol
Adapted from [ScientistTwo](https://scientist-two.github.io/) ([preprint](https://arxiv.org/abs/2609.19644)). This is a repository workflow, not the ScientistTwo agent system. Its reported automated reviews are not external publication decisions.

1. **Problem and prior art:** state a bounded question, strongest known result, a plausible alternative, and what would falsify the claim. Verify references against title, author and relevant content; never confuse existence with support.
2. **Freeze the protocol:** commit a machine-readable manifest before evaluation; declare domain, baseline, screening and validation partitions, primary metric, stopping and exclusions. Version changes; do not relabel exploratory results as blinded confirmation.
3. **Screen and evaluate:** run cheap tests, then fixed larger domain; preserve negative results and every counterexample. Avoid tuning on the validation split. In theorem research use exact arithmetic where possible and independent algorithms.
4. **Ablate:** remove assumptions or information, compare simpler diagnostics, test invariance, check boundary cases and adverse examples.
5. **Critique and rebut:** record explicit objections, answer them with proofs or targeted experiments, not rhetoric. Independent reviewer identity and status must be truthful; automated or same-author checks are not independent peer review.
6. **Integrity gates:** replay results from code; check benchmark completeness/specification; ground sources; reconcile text and implementation; classify novelty and physical evidence separately. CI must not equate software success with scientific acceptance.
7. **Publish:** retain protocol, executable code, machine-readable results, proof notes, limitations, unresolved objections and reproduction command. Keep a claim ledger with statuses established / finite verified / conjecture / refuted / empirical untested. Only claim new knowledge after a real novelty assessment; experimental claims need appropriate external data.
8. **Feedback:** use GitHub issues for challenges and follow-ups. Do not manufacture reviewer ratings or papers. Re-run after changes.

Pilot 020: Z4 holonomy moment diagnostics. Predeclared scope is in docs/research/020-protocol.json. No external review or continuous autonomous operation is implied.
